'use client'

import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react'

/**
 * O contrato de movimento da direção CORTE. Uma instância no <body>
 * (app/layout.tsx), envolvendo os children de SERVIDOR — passar children
 * de RSC por um componente de cliente não os transforma em cliente: a
 * marcação e o texto ficam no HTML do servidor, o cliente só anima.
 *
 * O MOTOR É TODO DINÂMICO, de propósito (correção pós-F1, medida):
 * estático, gsap + ScrollTrigger + SplitText + Lenis somavam ~53 kB gz na
 * frente do primeiro paint e estouravam o orçamento P-2. Aqui NADA de
 * `import` de valor em escopo de módulo — os módulos descem por
 * `await import(...)` depois da montagem, então:
 *   1. o First Load volta ao patamar de página estática;
 *   2. o LCP (o nome no DOM do servidor) pinta sem esperar o motor;
 *   3. quem tem prefers-reduced-motion nem BAIXA o motor.
 *
 * As duas regras que nenhum arquivo desta reconstrução pode quebrar:
 *
 * 1. Estado inicial escondido é criado por gsap.set() DENTRO do efeito de
 *    animação, nunca por CSS — com JavaScript desligado o efeito não roda
 *    e nada fica invisível (gate A-8 por construção).
 * 2. NADA ACIMA DA DOBRA depende de movimento para estar correto. O motor
 *    chega DEPOIS do paint; a capa em repouso É o estado estático do
 *    storyboard. Acima da dobra o motor só transforma no scroll — nunca
 *    esconde para revelar. Esconder-para-revelar só abaixo da dobra, onde
 *    o motor aterrissa muito antes de o usuário chegar.
 *
 * Consequência para F2/F3: componente de animação consome o motor por
 * `useMotion().motor` (null até aterrissar) — NUNCA por import estático de
 * 'gsap' ou '@gsap/react', que traria o núcleo de volta ao First Load.
 */

/* Tipos por import type inline — apagados na compilação, zero módulo real
 * no bundle. É o que permite tipar o motor sem pagar por ele. */
type Gsap = typeof import('gsap').gsap
type ScrollTriggerStatic = typeof import('gsap/ScrollTrigger').ScrollTrigger
type SplitTextStatic = typeof import('gsap/SplitText').SplitText
type LenisInstance = import('lenis').default

export type Motor = {
  gsap: Gsap
  ScrollTrigger: ScrollTriggerStatic
  SplitText: SplitTextStatic
  /** null em ponteiro grosso — o scroll fica com o nativo e o
   *  ScrollTrigger escuta o scroll do documento sozinho. */
  lenis: LenisInstance | null
}

export type MotionState = {
  /** prefers-reduced-motion: reduce — a pessoa pediu menos movimento. */
  reduced: boolean
  /** pointer: coarse — toque; sem Lenis, o smooth scroll fica com o nativo. */
  coarse: boolean
  /** As preferências já foram lidas no cliente (pós-hidratação). */
  ready: boolean
  /** O motor carregado, ou null: antes de aterrissar, com reduced ligado,
   *  ou sem JavaScript. Quem anima gateia nele. */
  motor: Motor | null
}

export const MotionContext = createContext<MotionState>({
  reduced: false,
  coarse: false,
  ready: false,
  motor: null,
})

const QUERY_REDUCED = '(prefers-reduced-motion: reduce)'
const QUERY_COARSE = '(pointer: coarse)'

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false)
  const [coarse, setCoarse] = useState(false)
  const [ready, setReady] = useState(false)
  const [motor, setMotor] = useState<Motor | null>(null)

  /* As duas preferências: lidas na montagem e REATIVAS a mudança — trocar
   * a preferência do sistema com a página aberta reconfigura o movimento
   * sem recarregar. */
  useEffect(() => {
    const mqReduced = window.matchMedia(QUERY_REDUCED)
    const mqCoarse = window.matchMedia(QUERY_COARSE)

    const syncReduced = () => setReduced(mqReduced.matches)
    const syncCoarse = () => setCoarse(mqCoarse.matches)

    syncReduced()
    syncCoarse()
    setReady(true)

    mqReduced.addEventListener('change', syncReduced)
    mqCoarse.addEventListener('change', syncCoarse)

    return () => {
      mqReduced.removeEventListener('change', syncReduced)
      mqCoarse.removeEventListener('change', syncCoarse)
    }
  }, [])

  /* O motor + a marca no documento. reduced nem baixa os módulos; coarse
   * baixa o gsap (ScrollTrigger anima com o scroll nativo) e pula só o
   * Lenis. Antes de o motor aterrissar, nenhuma classe de movimento — o
   * HTML do servidor não carrega estado de movimento nenhum. */
  useEffect(() => {
    if (!ready) return

    const root = document.documentElement

    if (reduced) {
      root.classList.add('motion-reduced')
      return () => {
        root.classList.remove('motion-reduced')
      }
    }

    let vivo = true
    let carregado: Motor | null = null
    let raf: ((time: number) => void) | null = null

    ;(async () => {
      const [nucleo, st, split, lenisMod] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('gsap/SplitText'),
        coarse ? null : import('lenis'),
      ])
      if (!vivo) return

      const { gsap } = nucleo
      const { ScrollTrigger } = st
      const { SplitText } = split

      /* Plugins registrados UMA vez, aqui e em nenhum outro lugar.
       * ScrollTrigger e SplitText vêm dentro do pacote público gsap@3.15
       * sob a Standard "no charge" license — sem token, sem gsap-trial. */
      gsap.registerPlugin(ScrollTrigger, SplitText)

      let lenis: LenisInstance | null = null
      if (lenisMod) {
        /* Integração canônica Lenis × GSAP: o Lenis dirige o ScrollTrigger
         * e o ticker do GSAP dirige o Lenis — um relógio só. */
        const l = new lenisMod.default({
          duration: 1.05,
          smoothWheel: true,
          syncTouch: false,
        })
        l.on('scroll', ScrollTrigger.update)
        const tick = (time: number) => l.raf(time * 1000)
        raf = tick
        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)
        lenis = l
      }

      carregado = { gsap, ScrollTrigger, SplitText, lenis }
      root.classList.add('motion-ready')
      setMotor(carregado)
    })()

    return () => {
      /* Cleanup total: o import em voo é abandonado, e se o motor chegou a
       * aterrissar, todo ScrollTrigger vivo morre aqui — some o provider
       * (unmount) ou a autorização de movimento, somem os triggers. */
      vivo = false
      if (carregado) {
        carregado.ScrollTrigger.getAll().forEach((t) => t.kill())
        if (raf) carregado.gsap.ticker.remove(raf)
        carregado.lenis?.destroy()
      }
      root.classList.remove('motion-ready')
      setMotor(null)
    }
  }, [ready, reduced, coarse])

  const value = useMemo(
    () => ({ reduced, coarse, ready, motor }),
    [reduced, coarse, ready, motor],
  )

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
}
