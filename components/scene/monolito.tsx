'use client'

import { useMotion } from '@/components/motion/use-motion'
import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
} from 'react'
import { FrameEstatico } from './frame-estatico'
import type { Monolito as CenaMonolito, MonolitoOpts } from './monolito.gl'

/**
 * A casca React do monólito. A regra dura de bundle — e ela é o motivo de
 * o F1 ter sido corrigido — é que `three` NÃO PODE entrar no First Load:
 * nada aqui importa './monolito.gl' (que importa three) estaticamente; os
 * imports acima dele são só de TIPO, apagados na compilação. O módulo
 * desce por await import() dentro do efeito, e só quando as DUAS
 * condições valem:
 *
 *   1. o movimento está autorizado — useMotion().reduced === false;
 *   2. o canvas está intersectando a viewport (IntersectionObserver).
 *
 * Enquanto o módulo não chegou, ou com reduced ligado, quem está na tela
 * é o <FrameEstatico /> — a mesma arte, parada, presente inclusive no
 * HTML do servidor (sem JavaScript o desenho continua lá).
 *
 * O gsap não entra aqui nem estaticamente nem por necessidade: esta casca
 * não anima nada — o scroll é do F3, que consome a instância pelo ref
 * (MonolitoHandle) para chamar setProgress e getEdgeScreenY.
 */

export type MonolitoHandle = {
  /** Guarda o progresso e aplica; se a cena ainda não desceu, o valor é
   *  reaplicado na criação — o F3 pode chamar desde o primeiro scroll. */
  setProgress: (p: number) => void
  /** null enquanto a cena não montou (módulo em voo, reduced, sem WebGL).
   *  O array devolvido é o interno da cena, mutado por chamada. */
  getEdgeScreenY: () => number[] | null
}

type Props = {
  camadas: number
  className?: string
  ref?: Ref<MonolitoHandle>
}

/** Lê os seis tokens de cor em :root. Vazio é erro, nunca fallback: um
 *  hex cru aqui quebraria a regra de uma fonte de token só. */
function lerCores(): MonolitoOpts['cores'] {
  const estilo = getComputedStyle(document.documentElement)
  const ler = (nome: string): string => {
    const valor = estilo.getPropertyValue(nome).trim()
    if (!valor) {
      throw new Error(
        `A custom property "${nome}" resolveu vazia em :root — sem token não há cor, e a cena não cai em hex de fallback.`,
      )
    }
    return valor
  }
  return {
    ground: ler('--color-ground'),
    ink: ler('--color-ink'),
    ink2: ler('--color-ink-2'),
    rule: ler('--color-rule'),
    accent: ler('--color-accent'),
    hot: ler('--color-hot'),
  }
}

export function Monolito({ camadas, className, ref }: Props) {
  const { ready, reduced } = useMotion()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const cenaRef = useRef<CenaMonolito | null>(null)
  const progressoRef = useRef(0)
  const [visivel, setVisivel] = useState(false)
  const [cenaViva, setCenaViva] = useState(false)

  useImperativeHandle(
    ref,
    () => ({
      setProgress(p: number) {
        progressoRef.current = p
        cenaRef.current?.setProgress(p)
      },
      getEdgeScreenY() {
        return cenaRef.current ? cenaRef.current.getEdgeScreenY() : null
      },
    }),
    [],
  )

  /* Condição 2: o canvas intersecta a viewport. O canvas só existe com
   * reduced desligado, por isso o efeito re-arma quando reduced muda. */
  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const io = new IntersectionObserver(([entrada]) =>
      setVisivel(entrada.isIntersecting),
    )
    io.observe(canvas)
    return () => io.disconnect()
  }, [reduced])

  /* A descida do módulo — as duas condições, e só então o await import().
   * A cena, uma vez criada, sobrevive a sair da viewport (o que para é o
   * loop); ela só morre com reduced ou no unmount. */
  useEffect(() => {
    if (!ready || reduced || !visivel) return
    if (cenaRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return

    let vivo = true
    ;(async () => {
      const { criarMonolito } = await import('./monolito.gl')
      if (!vivo || cenaRef.current) return
      try {
        const cena = criarMonolito({
          canvas,
          camadas,
          dprMax: 2,
          cores: lerCores(),
        })
        cena.setProgress(progressoRef.current)
        cena.render() // primeiro frame já, antes de o loop armar
        cenaRef.current = cena
        setCenaViva(true)
      } catch (erro) {
        /* Sem WebGL (ou token vazio) o frame estático FICA — é a mesma
         * arte. O erro não é engolido: vai para o console com contexto. */
        console.error('[monolito] cena WebGL não montou; o frame estático permanece.', erro)
      }
    })()
    return () => {
      vivo = false
    }
  }, [ready, reduced, visivel, camadas])

  /* reduced ligado ao vivo (a preferência é reativa no MotionProvider):
   * derruba a cena e devolve a tela ao frame estático. */
  useEffect(() => {
    if (!reduced) return
    cenaRef.current?.destroy()
    cenaRef.current = null
    setCenaViva(false)
  }, [reduced])

  /* Unmount: cleanup total — o loop morre com o efeito dele, aqui morre
   * a cena (dispose de renderer, geometria e materiais). */
  useEffect(
    () => () => {
      cenaRef.current?.destroy()
      cenaRef.current = null
    },
    [],
  )

  /* O loop: ligado só enquanto a cena existe E intersecta; desligado
   * quando sai da viewport (cleanup por `visivel`) e no blur da aba. */
  useEffect(() => {
    if (!cenaViva || !visivel) return
    let raf = 0
    let rodando = false
    const passo = () => {
      cenaRef.current?.render()
      raf = requestAnimationFrame(passo)
    }
    const ligar = () => {
      if (rodando) return
      rodando = true
      raf = requestAnimationFrame(passo)
    }
    const desligar = () => {
      rodando = false
      cancelAnimationFrame(raf)
    }
    ligar()
    window.addEventListener('blur', desligar)
    window.addEventListener('focus', ligar)
    return () => {
      desligar()
      window.removeEventListener('blur', desligar)
      window.removeEventListener('focus', ligar)
    }
  }, [cenaViva, visivel])

  /* Resize pelo retângulo do próprio canvas, não do window — é o que o
   * contrato de resize() da cena espera. Um render por resize mantém o
   * frame nítido mesmo com o loop desligado. */
  useEffect(() => {
    if (!cenaViva) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ro = new ResizeObserver(() => {
      cenaRef.current?.resize()
      cenaRef.current?.render()
    })
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [cenaViva])

  /* Decoração pura: a informação (rótulos de camada) é DOM do F3, fora
   * daqui. O empilhamento e o pointer-events-none vêm da capa via
   * className. Sem opacity: 0 em CSS — a troca frame↔canvas é por
   * montagem, depois da cena viva. */
  return (
    <div className={className} aria-hidden="true">
      {!reduced && <canvas ref={canvasRef} className="block h-full w-full" />}
      {(reduced || !cenaViva) && (
        <FrameEstatico camadas={camadas} className="absolute inset-0 h-full w-full" />
      )}
    </div>
  )
}
