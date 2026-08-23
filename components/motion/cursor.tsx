'use client'

import { useEffect, useRef, useState } from 'react'
import { useMotion } from './use-motion'

/**
 * O cursor de detalhe (F6a) — a marca de detalhe do leitor. Num desenho
 * de corte, o trecho que merece ampliação recebe um círculo fino com um
 * identificador ao lado; aqui o círculo é o instrumento que o leitor
 * arrasta sobre a prancha. Anel de fio 1px, nunca disco: é vocabulário
 * de desenho técnico, não bolinha que segue o mouse.
 *
 * Enfeite não pode custar acesso — as quatro travas:
 * - o cursor NATIVO só some sob html.motion-ready E (pointer: fine), no
 *   CSS (bloco F6a): motor que não pousa, toque ou reduced motion deixam
 *   o cursor do sistema onde está;
 * - aria-hidden + pointer-events: none — decoração que leitor de tela
 *   não vê e que nunca intercepta clique;
 * - teclado intocado: o anel só nasce no primeiro pointermove, então quem
 *   navega por Tab nunca o vê, e o anel de foco continua o :focus-visible;
 * - z-index 90, abaixo do skip-link (100).
 *
 * O efeito gateia em TRÊS condições ao mesmo tempo (motor pousado, não
 * coarse, ponteiro fino) — e a de ponteiro fino é reativa: mouse
 * desconectado no meio da sessão desliga o efeito, o componente devolve
 * null e o CSS devolve o cursor nativo (a media query para de casar).
 *
 * O seguimento é gsap.quickTo, não gsap.to por evento — quickTo existe
 * para não alocar tween por pointermove; o atraso curto é o que dá peso
 * de instrumento. Posição por x/y (transform) sobre elemento fixed em
 * 0,0 — nunca left/top, que são layout e refluem a cada frame.
 *
 * O ímã escreve DUAS custom properties (--ima-x/--ima-y) que o CSS
 * aplica pela propriedade `translate` — independente de `transform`, ela
 * COMPÕE com o que o fecho já anima em [data-canal] em vez de brigar.
 * Nenhum transform escrito pelo ímã, em lugar nenhum. O alvo se descobre
 * por closest() num listener único no documento: zero atributo novo em
 * components/site/**. E o overwrite dos tweens de ímã é 'auto', nunca
 * true: true mataria TODOS os tweens do alvo — inclusive o clip-path que
 * o scrub do fecho mantém vivo em [data-canal] — e quebraria a entrada;
 * 'auto' só derruba tween da mesma propriedade, e --ima-* é só do ímã.
 *
 * Cleanup é gate: os cinco listeners saem do documento, todo tween de
 * ímã morre e as custom properties são REMOVIDAS de todo elemento que as
 * recebeu (o fallback var(--ima-x, 0) assume) — trocar de locale e
 * voltar não deixa órfão nem alvo deslocado. Nenhum ScrollTrigger é
 * criado aqui.
 */

/* ── Coreografia, não fato ─────────────────────────────────────────────── */

/* Os três estados do anel: repouso 12px, detalhe 40px, e o pressionado
 * encolhe 12% do estado corrente. */
const ANEL_REPOUSO = 12
const ANEL_DETALHE = 40
const FATOR_PRESSAO = 0.88

/* O atraso do seguimento — o peso do instrumento (contrato F6a). */
const SEGUIR_DUR = 0.35
const SEGUIR_EASE = 'power3'

/* O ímã: deslocamento = (ponteiro − centro) × 0,18, saturado em 6px. */
const IMA_FATOR = 0.18
const IMA_MAX = 6
const IMA_DUR = 0.4
const IMA_EASE = 'power3.out'

/* Abertura/fechamento do anel e entrada do rótulo. */
const ANEL_DUR = 0.3
const ROTULO_DUR = 0.2

/* Os alvos da página inteira — não há link inline em prosa, então o
 * closest() basta e nenhuma seção precisa de atributo novo. */
const ALVOS = 'a[data-link], button'
const ALVO_EXTERNO = 'a[data-link][target="_blank"]'

const QUERY_FINE = '(pointer: fine)'

type Props = {
  /** Rótulo do link externo, traduzido no servidor (messages/*.json →
   *  site.abrir) — o componente de cliente não lê messages/ sozinho. */
  rotuloAbrir: string
}

export function Cursor({ rotuloAbrir }: Props) {
  const { motor, coarse } = useMotion()
  const raizRef = useRef<HTMLDivElement | null>(null)
  const anelRef = useRef<HTMLDivElement | null>(null)
  const rotuloRef = useRef<HTMLSpanElement | null>(null)

  /* pointer: fine, reativo — o mesmo padrão do motion-provider para
   * prefers-reduced-motion: lê na montagem, escuta 'change', remove no
   * cleanup. Mouse desconectado devolve o cursor nativo sem recarregar. */
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(QUERY_FINE)
    const sync = () => setFine(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const ativo = motor !== null && !coarse && fine

  useEffect(() => {
    if (!ativo || !motor) return
    const raiz = raizRef.current
    const anel = anelRef.current
    const rotulo = rotuloRef.current
    if (!raiz || !anel || !rotulo) return

    const { gsap } = motor

    /* Estado inicial nasce AQUI, do JavaScript — invisível até o primeiro
     * movimento do ponteiro, então Tab nunca revela o instrumento. */
    gsap.set(raiz, { autoAlpha: 0 })
    gsap.set(rotulo, { autoAlpha: 0 })
    gsap.set(anel, { width: ANEL_REPOUSO, height: ANEL_REPOUSO })

    const xTo = gsap.quickTo(raiz, 'x', { duration: SEGUIR_DUR, ease: SEGUIR_EASE })
    const yTo = gsap.quickTo(raiz, 'y', { duration: SEGUIR_DUR, ease: SEGUIR_EASE })

    let visivel = false
    let pressionado = false
    let alvo: HTMLElement | null = null
    let externo = false
    /* Todo elemento que já recebeu --ima-*: é a lista do cleanup. */
    const imantados = new Set<HTMLElement>()

    /* O anel reflete o par (alvo, pressionado); o rótulo só existe sobre
     * link externo — mais rótulo é ruído numa página de dezessete alvos. */
    const aplicar = () => {
      const base = alvo ? ANEL_DETALHE : ANEL_REPOUSO
      const d = pressionado ? base * FATOR_PRESSAO : base
      gsap.to(anel, {
        width: d,
        height: d,
        duration: ANEL_DUR,
        ease: IMA_EASE,
        overwrite: 'auto',
      })
      gsap.to(rotulo, {
        autoAlpha: alvo && externo ? 1 : 0,
        duration: ROTULO_DUR,
        overwrite: 'auto',
      })
    }

    const soltarIma = (el: HTMLElement) => {
      gsap.to(el, {
        '--ima-x': '0px',
        '--ima-y': '0px',
        duration: IMA_DUR,
        ease: IMA_EASE,
        overwrite: 'auto',
      })
    }

    const sair = () => {
      if (!alvo) return
      soltarIma(alvo)
      alvo = null
      externo = false
      aplicar()
    }

    const entrar = (novo: HTMLElement) => {
      if (alvo === novo) return
      if (alvo) soltarIma(alvo)
      alvo = novo
      externo = novo.matches(ALVO_EXTERNO)
      imantados.add(novo)
      aplicar()
    }

    const clamp = (v: number) => Math.max(-IMA_MAX, Math.min(IMA_MAX, v))

    const onMove = (e: PointerEvent) => {
      if (!visivel) {
        /* Primeiro movimento: pula direto para o ponteiro (set, sem
         * tween) e só então aparece — nada de anel viajando de 0,0. */
        visivel = true
        gsap.set(raiz, { x: e.clientX, y: e.clientY })
        gsap.to(raiz, { autoAlpha: 1, duration: ROTULO_DUR, overwrite: 'auto' })
      }
      xTo(e.clientX)
      yTo(e.clientY)

      if (alvo) {
        const r = alvo.getBoundingClientRect()
        const dx = clamp((e.clientX - (r.left + r.width / 2)) * IMA_FATOR)
        const dy = clamp((e.clientY - (r.top + r.height / 2)) * IMA_FATOR)
        gsap.to(alvo, {
          '--ima-x': `${dx}px`,
          '--ima-y': `${dy}px`,
          duration: IMA_DUR,
          ease: IMA_EASE,
          overwrite: 'auto',
        })
      }
    }

    const onOver = (e: PointerEvent) => {
      const el =
        e.target instanceof Element ? e.target.closest<HTMLElement>(ALVOS) : null
      if (el) entrar(el)
    }

    const onOut = (e: PointerEvent) => {
      const rel = e.relatedTarget instanceof Element ? e.relatedTarget : null
      if (!rel) {
        /* Saiu da janela: solta o alvo e some até o próximo movimento. */
        pressionado = false
        sair()
        visivel = false
        gsap.to(raiz, { autoAlpha: 0, duration: ROTULO_DUR, overwrite: 'auto' })
        return
      }
      if (alvo && !alvo.contains(rel)) sair()
    }

    const onDown = () => {
      pressionado = true
      aplicar()
    }

    const onUp = () => {
      pressionado = false
      aplicar()
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerout', onOut, { passive: true })
    document.addEventListener('pointerdown', onDown, { passive: true })
    document.addEventListener('pointerup', onUp, { passive: true })

    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointerup', onUp)

      /* Os tweens do próprio instrumento (x/y do quickTo, anel, rótulo)
       * morrem aqui — os elementos saem do DOM logo em seguida. */
      gsap.killTweensOf([raiz, anel, rotulo])

      /* E todo alvo que recebeu ímã volta EXATAMENTE ao HTML do servidor:
       * tween de --ima-* morto (só de --ima-*: o scrub do fecho no mesmo
       * elemento sobrevive) e as properties removidas — o fallback
       * var(--ima-x, 0) do CSS assume. Sem isto um alvo ficaria deslocado
       * para sempre ao trocar de locale. */
      imantados.forEach((el) => {
        gsap.killTweensOf(el, '--ima-x,--ima-y')
        el.style.removeProperty('--ima-x')
        el.style.removeProperty('--ima-y')
      })
      imantados.clear()
    }
  }, [ativo, motor])

  /* Falhou qualquer condição → nada no DOM e o cursor nativo continua. */
  if (!ativo) return null

  return (
    <div ref={raizRef} data-cursor aria-hidden="true">
      <div ref={anelRef} data-cursor-anel />
      <span
        ref={rotuloRef}
        data-cursor-rotulo
        className="font-mono text-micro uppercase text-ink-2"
      >
        {rotuloAbrir}
      </span>
    </div>
  )
}
