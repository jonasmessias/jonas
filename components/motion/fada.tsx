'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/** Cadência: o tempo de um trecho entre estações, a parada no destino e o fade. */
const TRECHO_MS = 1100
const PAUSA_MS = 1600
const FADE_MS = 350

type Ponto = { x: number; y: number }
/** Um trecho entre duas estações: os pontos da poligonal e o comprimento acumulado de cada um. */
type Trecho = { pontos: Ponto[]; acumulado: number[]; total: number }

const suave = (u: number) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2)

/**
 * A fada: o poro luminoso que percorre as estações do diagrama. O desenho
 * (fios, nós, luz) é CSS; aqui só se mede onde cada nó está e se escreve o
 * transform/opacity da fada a cada quadro, com requestAnimationFrame.
 *
 * O caminho é lido do DOM ([data-no] dentro de children), então vale para
 * qualquer número de passos e para os dois layouts (escada em md+, fio
 * vertical abaixo): de um nó ao próximo, vai na horizontal até a coluna
 * do próximo e desce — no fio vertical a horizontal degenera em zero.
 *
 * Travas: não roda em reduced motion (e para se a preferência mudar com a
 * página aberta), só roda com a seção na tela, remede quando o container
 * muda de tamanho. Sem JS a fada não existe e os nós ficam todos acesos
 * (globals.css, `html:not(.js)`).
 */
export function Fada({ children, className, style }: Props) {
  const raizRef = useRef<HTMLDivElement>(null)
  const fadaRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const raiz = raizRef.current
    const fada = fadaRef.current
    if (!raiz || !fada) return

    const nos = Array.from(raiz.querySelectorAll<HTMLElement>('[data-no]'))
    if (nos.length < 2) return

    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)')
    let trechos: Trecho[] = []
    let quadro = 0
    let inicio = 0
    let naTela = false
    let acesas = -1

    const medir = () => {
      const R = raiz.getBoundingClientRect()
      const centros = nos.map((no) => {
        const r = no.getBoundingClientRect()
        return { x: r.left - R.left + r.width / 2, y: r.top - R.top + r.height / 2 }
      })
      trechos = centros.slice(0, -1).map((a, i) => {
        const b = centros[i + 1]
        const pontos = Math.abs(b.x - a.x) < 1 ? [a, b] : [a, { x: b.x, y: a.y }, b]
        const acumulado = [0]
        for (let k = 1; k < pontos.length; k++) {
          acumulado.push(acumulado[k - 1] + Math.hypot(pontos[k].x - pontos[k - 1].x, pontos[k].y - pontos[k - 1].y))
        }
        return { pontos, acumulado, total: acumulado[acumulado.length - 1] }
      })
    }

    const posicao = (t: Trecho, u: number): Ponto => {
      const d = t.total * u
      for (let k = 1; k < t.pontos.length; k++) {
        if (d <= t.acumulado[k] || k === t.pontos.length - 1) {
          const seg = t.acumulado[k] - t.acumulado[k - 1]
          const f = seg === 0 ? 1 : (d - t.acumulado[k - 1]) / seg
          const a = t.pontos[k - 1]
          const b = t.pontos[k]
          return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f }
        }
      }
      return t.pontos[t.pontos.length - 1]
    }

    const acender = (n: number) => {
      if (n === acesas) return
      acesas = n
      nos.forEach((no, i) => {
        if (i < n) no.setAttribute('data-acesa', '')
        else no.removeAttribute('data-acesa')
      })
    }

    const desenhar = (x: number, y: number, opacidade: number) => {
      fada.style.transform = `translate3d(${x}px, ${y}px, 0)`
      fada.style.opacity = opacidade.toFixed(3)
    }

    /* Um ciclo: fade de entrada na primeira estação, um trecho por par de
     * estações, parada no destino (com fade de saída no fim dela). */
    const passo = (agora: number) => {
      if (!trechos.length) medir()
      const viagem = TRECHO_MS * trechos.length
      const t = (agora - inicio) % (FADE_MS + viagem + PAUSA_MS)
      const primeiro = trechos[0].pontos[0]
      const ultimo = trechos[trechos.length - 1].pontos.at(-1) ?? primeiro

      if (t < FADE_MS) {
        acender(1)
        desenhar(primeiro.x, primeiro.y, t / FADE_MS)
      } else if (t < FADE_MS + viagem) {
        const tv = t - FADE_MS
        const i = Math.min(trechos.length - 1, Math.floor(tv / TRECHO_MS))
        const u = suave((tv - i * TRECHO_MS) / TRECHO_MS)
        acender(i + 1 + (u >= 0.98 ? 1 : 0))
        const p = posicao(trechos[i], u)
        desenhar(p.x, p.y, 1)
      } else {
        const tp = t - FADE_MS - viagem
        acender(nos.length)
        desenhar(ultimo.x, ultimo.y, Math.min(1, Math.max(0, (PAUSA_MS - tp) / FADE_MS)))
      }
      quadro = requestAnimationFrame(passo)
    }

    const parar = () => {
      if (quadro) cancelAnimationFrame(quadro)
      quadro = 0
    }

    const ligar = () => {
      if (quadro || !naTela || reduzir.matches) return
      medir()
      inicio = performance.now()
      acesas = -1
      quadro = requestAnimationFrame(passo)
    }

    const desligar = () => {
      parar()
      fada.style.opacity = '0'
      acesas = -1
      nos.forEach((no) => no.removeAttribute('data-acesa'))
    }

    const io = new IntersectionObserver(
      (entradas) => {
        naTela = entradas.some((e) => e.isIntersecting)
        if (naTela) ligar()
        else parar()
      },
      { threshold: 0.15 },
    )
    io.observe(raiz)

    const ro = new ResizeObserver(() => {
      if (quadro) medir()
    })
    ro.observe(raiz)

    const aoMudarPreferencia = () => (reduzir.matches ? desligar() : ligar())
    reduzir.addEventListener('change', aoMudarPreferencia)

    return () => {
      io.disconnect()
      ro.disconnect()
      reduzir.removeEventListener('change', aoMudarPreferencia)
      desligar()
    }
  }, [])

  return (
    <div ref={raizRef} className={className} style={style}>
      {children}
      <span ref={fadaRef} aria-hidden="true" className="fluxo-fada" />
    </div>
  )
}
