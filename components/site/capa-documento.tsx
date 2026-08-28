'use client'

import type { Motor } from '@/components/motion/motion-provider'
import { useMotion } from '@/components/motion/use-motion'
import { useEffect, useRef, type ReactNode } from 'react'
import { GESTO_FIM, GESTO_INICIO } from './capa-palco'
import { useProgressoCapa } from './use-progresso-capa'

/**
 * O documento da capa (F3b): os rótulos de camada, o manifesto e os fios
 * do handoff. O CONTEÚDO chega como children de SERVIDOR (a capa é RSC;
 * este wrapper só anima o que o servidor já pintou) e NENHUM trigger nasce
 * aqui — tudo pendura no scrub único da F3a via useProgressoCapa().
 *
 * As três peças, todas função pura do MESMO p (reversíveis por construção):
 *
 * - RÓTULOS ([data-camada]): callouts em DOM sobre o canvas, um por laje,
 *   presos ao Y que a cena devolve em getEdgeScreenY() — a cena diz ao
 *   documento onde as coisas estão; o documento nunca adivinha. Entram
 *   escalonados durante a delaminação (dentro de GESTO_INICIO→GESTO_FIM)
 *   e seguem a aresta a cada tick até virarem a legenda da grade final.
 *
 * - MANIFESTO ([data-manifesto]): revelado linha a linha (SplitText tipo
 *   lines + clip-path inset) durante a travessia — o texto aparece nos
 *   vãos que a delaminação abriu, dentro do objeto, não numa seção à
 *   parte. Na resolução ele sai com o objeto (fade na janela P3→0.90):
 *   o beat final é a grade limpa, e quem rola devagar leu o texto sob o
 *   próprio controle do scrub; reduced motion e no-JS o têm por extenso.
 *
 * - HANDOFF ([data-fio] + [data-cena-veu]): no fim do scrub a cena projeta
 *   as arestas com espaçamento de grade; os fios (elementos de documento,
 *   borda 1px em rule) são postos EXATAMENTE nesses Y enquanto o véu do
 *   canvas apaga na mesma janela — entrega, não crossfade: a aresta some
 *   e o fio assume no mesmo pixel.
 *
 * Estado escondido: o gate A-8 (html.js [data-reveal]) cobre o pré-paint;
 * daqui em diante quem manda é estilo inline por gsap.set a cada tick.
 * Limpeza total no cleanup: SplitText.revert(), clearProps em tudo que
 * este efeito tocou, nenhum listener sobra.
 *
 * Rede de segurança da cena: se o WebGL nunca montar (motor vivo, cena
 * morta — getEdgeScreenY() devolve null para sempre), os rótulos não
 * podem ficar invisíveis: depois de SEM_CENA_MS o componente marca
 * [data-sem-cena] e o CSS devolve o documento ao layout estático de
 * lista — a informação é íntegra mesmo sem a cena.
 */

type SplitTextInstance = InstanceType<Motor['SplitText']>

/* ── As janelas no p do palco — coreografia, não fato. Compostas no
 *    relógio da F3a (GESTO_*) e nas fronteiras da cena (P3 = 0.82 em
 *    monolito.gl, o fim da travessia). ─────────────────────────────── */

/** = P3 da cena: onde a travessia termina e a resolução começa. */
const TRAVESSIA_FIM = 0.82

/* Rótulos: entram escalonados de baixo para cima durante a delaminação.
 * L01 abre em 0.16 e o último fecha em ~0.46 — dentro do gesto. */
const ROTULO_ATRASO = 0.04
const ROTULO_PASSO = 0.056
const ROTULO_DUR = 0.08
const rotuloInicio = (i: number) => GESTO_INICIO + ROTULO_ATRASO + i * ROTULO_PASSO
/** Deslize de entrada do rótulo, em px — constante de desenho. */
const DESLIZE_PX = 12

/* Manifesto: linhas reveladas na travessia; saída junto com a resolução. */
const MANIFESTO_INICIO = GESTO_FIM + 0.02
const MANIFESTO_FIM = 0.8
const LINHA_DUR = 0.1
const SAIDA_FIM = 0.9

/* Handoff: fios assumem e véu apaga na MESMA janela — entrega no pixel. */
const FIO_INICIO = 0.86
const FIO_FIM = 0.98

/** Quanto esperar pela cena antes de cair no layout de lista. */
const SEM_CENA_MS = 8000

/* Easing próprio em função pura, como em monolito.gl — o tick do scrub já
 * é dirigido pelo motor; aqui só se calcula valor. */
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t)
const suave = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
/** 0→1 dentro da janela [a, b] do p, com easing; constante fora dela. */
const janela = (p: number, a: number, b: number) => suave(clamp01((p - a) / (b - a)))

export function CapaDocumento({ children }: { children: ReactNode }) {
  const { motor } = useMotion()
  const canal = useProgressoCapa()
  const raizRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!motor || !canal) return
    const raiz = raizRef.current
    if (!raiz) return

    const { gsap, SplitText } = motor
    const rotulos = Array.from(raiz.querySelectorAll<HTMLElement>('[data-camada]'))
    const manifesto = raiz.querySelector<HTMLElement>('[data-manifesto]')
    /* O véu e os fios vivem em camadas irmãs do palco (o véu embrulha o
     * canvas em z-10; os fios ficam em z-0, atrás do nome, no plano em que
     * a aresta vivia); achados pela seção, nunca por id global. */
    const secao = raiz.closest<HTMLElement>('[data-hero]')
    const veu = secao?.querySelector<HTMLElement>('[data-cena-veu]')
    const fios = Array.from(
      secao?.querySelectorAll<HTMLElement>('[data-fio]') ?? [],
    )
    if (!manifesto || rotulos.length === 0 || fios.length === 0) return

    /* ── Manifesto: linhas do SplitText, clip por linha em função do p.
     *    autoSplit re-splita no resize e na chegada da fonte; o onSplit
     *    reaplica o estado corrente na hora — linha nova nunca fica um
     *    frame sem clip. Só se escreve no bloco DEPOIS de existir linha:
     *    antes disso o gate A-8 é quem o esconde. ──────────────────── */
    let linhas: HTMLElement[] = []

    const aplicarManifesto = (p: number) => {
      if (linhas.length === 0) return
      const n = linhas.length
      for (let i = 0; i < n; i++) {
        const a =
          MANIFESTO_INICIO +
          ((MANIFESTO_FIM - LINHA_DUR - MANIFESTO_INICIO) * i) / Math.max(n - 1, 1)
        const corte = (1 - janela(p, a, a + LINHA_DUR)) * 100
        gsap.set(linhas[i], { clipPath: `inset(0% 0% ${corte}% 0%)` })
      }
      gsap.set(manifesto, { opacity: 1 - janela(p, TRAVESSIA_FIM, SAIDA_FIM) })
    }

    /* ── Rótulos e fios: presos ao getEdgeScreenY() a cada tick. ────── */
    let rafEspera = 0
    let esperaInicio = 0

    const aplicarCena = (p: number) => {
      const arestas = canal.monolito.current?.getEdgeScreenY() ?? null
      if (!arestas) {
        esperarCena()
        return
      }
      if (raiz.dataset.semCena !== undefined) delete raiz.dataset.semCena

      const nR = Math.min(rotulos.length, arestas.length)
      for (let i = 0; i < nR; i++) {
        const t = janela(p, rotuloInicio(i), rotuloInicio(i) + ROTULO_DUR)
        gsap.set(rotulos[i], { y: arestas[i], x: DESLIZE_PX * (t - 1), opacity: t })
      }

      const tFio = janela(p, FIO_INICIO, FIO_FIM)
      const nF = Math.min(fios.length, arestas.length)
      for (let i = 0; i < nF; i++) {
        gsap.set(fios[i], { y: arestas[i], opacity: tFio })
      }
      /* A entrega: o véu do canvas apaga exatamente enquanto o fio assume. */
      if (veu) gsap.set(veu, { opacity: 1 - tFio })
    }

    /* A cena pode chegar DEPOIS do motor (módulo three em voo) — espera-se
     * por rAF até ela responder; passado SEM_CENA_MS sem cena (WebGL
     * indisponível), o documento cai no layout de lista via [data-sem-cena]
     * e nada fica invisível. Se a cena aparecer ainda mais tarde, o
     * próximo tick desfaz a marca e o tracking assume. */
    const esperarCena = () => {
      if (rafEspera) return
      if (raiz.dataset.semCena !== undefined) return
      if (!esperaInicio) esperaInicio = performance.now()
      const passo = () => {
        rafEspera = 0
        if (canal.monolito.current?.getEdgeScreenY()) {
          esperaInicio = 0
          aplicarCena(canal.progresso.current)
          return
        }
        if (performance.now() - esperaInicio > SEM_CENA_MS) {
          raiz.dataset.semCena = ''
          gsap.set(rotulos, { clearProps: 'transform', opacity: 1 })
          return
        }
        rafEspera = requestAnimationFrame(passo)
      }
      rafEspera = requestAnimationFrame(passo)
    }

    const aplicar = (p: number) => {
      aplicarCena(p)
      aplicarManifesto(p)
    }

    const split: SplitTextInstance = SplitText.create(manifesto, {
      type: 'lines',
      autoSplit: true,
      onSplit(self) {
        linhas = self.lines as HTMLElement[]
        aplicarManifesto(canal.progresso.current)
      },
    })

    const cancelar = canal.aoScrub(aplicar)
    /* Resize muda a projeção das arestas mesmo sem tick de scroll. */
    const aoRedimensionar = () => aplicar(canal.progresso.current)
    window.addEventListener('resize', aoRedimensionar)

    return () => {
      cancelar()
      window.removeEventListener('resize', aoRedimensionar)
      cancelAnimationFrame(rafEspera)
      /* revert() desfaz o split (nenhum <div> de linha órfão) e derruba os
       * listeners internos do autoSplit. clearProps devolve cada elemento
       * ao estilo do HTML do servidor — o gate A-8 volta a mandar. */
      split.revert()
      gsap.set([...rotulos, ...fios], { clearProps: 'transform,opacity' })
      gsap.set(manifesto, { clearProps: 'opacity' })
      if (veu) gsap.set(veu, { clearProps: 'opacity' })
      delete raiz.dataset.semCena
    }
  }, [motor, canal])

  return (
    <div ref={raizRef} data-hud>
      {children}
    </div>
  )
}
