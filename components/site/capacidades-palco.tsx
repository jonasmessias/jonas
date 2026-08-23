'use client'

import { useMotion } from '@/components/motion/use-motion'
import { useEffect, useRef, type ReactNode } from 'react'

/**
 * O palco das capacidades (F5b): a entrada por scrub e a interação que
 * dirige o eixo wdth — o terceiro emprego do mesmo eixo no site (capa:
 * scroll; F4a: dado; aqui: interação). O CONTEÚDO não nasce aqui: chega
 * como children de SERVIDOR (o Capacidades é RSC; este wrapper só instala
 * mecanismo por cima). Nenhum import estático de motor: tudo gateado em
 * useMotion().motor.
 *
 * UM ScrollTrigger, e ele é só a ENTRADA: scrub sobre [data-capacidades],
 * 'top bottom' → 'top center', timeline de duração 1 — os fios se desenham
 * e as quatro palavras abrem por clip-path, escalonadas. A troca de
 * capacidade NÃO é scrub: é interação — gsap.to curto (0,3 s), ease suave,
 * disparado por hover, foco ou clique.
 *
 * A lei do layout (o CSS do bloco F5b é o outro lado deste contrato): as
 * quatro palavras NUNCA se movem. A caixa de cada palavra já nasce na
 * largura de wdth 125 (o molde invisível do RSC), então abrir 62→125
 * acontece DENTRO dela; o painel empilha os quatro <ul> na mesma célula e
 * este palco ainda mede o maior conjunto a cada refresh (refreshInit,
 * mesma correia do trilho) e escreve a altura em style inline — nunca
 * número mágico em CSS. Alternar entre as quatro tem que dar 0 px de
 * deslocamento em qualquer palavra e no painel.
 *
 * A interação, entrada a entrada:
 * - hover (só onde hover é hover: '(hover: hover) and (pointer: fine)', e
 *   nunca pointerType touch): ativa ao entrar na palavra; ao sair da
 *   SEÇÃO inteira, volta ao repouso — a fixada por clique, se houver,
 *   senão a primeira. O pointerleave é da seção, não da lista: atravessar
 *   da palavra até o painel para ler os termos é o uso normal do hover e
 *   não pode resetar no meio do caminho.
 * - foco de teclado: ativa — Tab percorre as quatro e o painel acompanha;
 *   Tab sai sem armadilha (nenhum foco é movido à mão).
 * - clique / toque: ativa e FICA (vira a âncora do reset de hover).
 * Sem capacidade de hover, hover não faz nada — teclado e toque dirigem.
 *
 * Estado escondido: botões e fios, e só pelo gate A-8 (html.js
 * [data-reveal]) no pré-paint; quando o motor pousa, gsap.set assume por
 * estilo inline (clip fechado / scaleX 0, opacity 1), que vence a classe.
 * A visibility dos <ul> inativos é MECANISMO do CSS F5b (atributo
 * data-ativa), não esconderijo de animação. Sem motor, sem html.js ou com
 * reduced motion, a marcação do servidor é o estado final: tudo visível.
 *
 * Limpeza total: listeners fora, tweens de interação mortos
 * (gsap.killTweensOf — não são do contexto), gsap.context().revert()
 * (trigger morto, clip/wdth/scaleX de volta ao HTML do servidor — os
 * gsap.set registrados no contexto são o caminho de volta dos tweens de
 * interação), e os dois estados que o gsap não registra apagados à mão: a
 * altura inline do painel e os atributos data-ativa/aria-expanded, que
 * voltam ao estado do servidor (primeira ativa).
 */

/* ── Coreografia, não fato ─────────────────────────────────────────────── */

/* Os dois pousos do wdth — os mesmos números do CSS F5b; wght preso em 600
 * (o peso do text-display): o gsap interpola só o wdth dentro da string. */
const FVS_ABERTO = "'wdth' 125, 'wght' 600"
const FVS_FECHADO = "'wdth' 62, 'wght' 600"

/* O clip da revelação — a mesma prova da F4a: abre da esquerda. */
const CLIP_FECHADO = 'inset(0% 100% 0% 0%)'
const CLIP_ABERTO = 'inset(0% 0% 0% 0%)'

/* A entrada (timeline de duração 1): palavra i abre em i·PASSO, o fio dela
 * vem logo atrás; a última fecha em 3·0,16 + 0,08 + 0,22 = 0,78 < 1. */
const PALAVRA_PASSO = 0.16
const PALAVRA_DUR = 0.3
const FIO_ATRASO = 0.08
const FIO_DUR = 0.22

/* A troca — interação, não cena: curta, ease suave, nunca scrub. */
const TROCA_DUR = 0.3
const TROCA_EASE = 'power2.out'
const ITEM_PASSO = 0.035

/* Hover só onde hover é hover de verdade. */
const QUERY_HOVER = '(hover: hover) and (pointer: fine)'

type Grupo = {
  id: string
  botao: HTMLButtonElement
  palavra: HTMLElement
  itensUl: HTMLElement
  itens: HTMLElement[]
}

type Props = {
  /** Nome acessível da seção, derivado do conteúdo pelo Capacidades (RSC). */
  rotulo: string
  children: ReactNode
}

export function CapacidadesPalco({ rotulo, children }: Props) {
  const { motor } = useMotion()
  const secaoRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!motor) return
    const secao = secaoRef.current
    if (!secao) return

    const lista = secao.querySelector<HTMLElement>('[data-capacidades-lista]')
    const painel = secao.querySelector<HTMLElement>('[data-capacidades-painel]')
    const botoes = Array.from(
      secao.querySelectorAll<HTMLButtonElement>('[data-capacidade]'),
    )
    const fios = Array.from(
      secao.querySelectorAll<HTMLElement>('[data-capacidade-fio]'),
    )
    if (!lista || !painel || botoes.length === 0) return

    /* O mapa da seção: botão → palavra → <ul> dos itens. Falhou um elo,
     * nada anima — guarda barata contra DOM alheio (o RSC garante a
     * estrutura no build). */
    const grupos: Grupo[] = []
    for (const botao of botoes) {
      const id = botao.dataset.id
      const palavra = botao.querySelector<HTMLElement>(
        '[data-capacidade-palavra]',
      )
      const itensUl = id
        ? painel.querySelector<HTMLElement>(
            `[data-capacidade-itens][data-de="${id}"]`,
          )
        : null
      if (!id || !palavra || !itensUl) return
      grupos.push({
        id,
        botao,
        palavra,
        itensUl,
        itens: Array.from(itensUl.querySelectorAll<HTMLElement>('li')),
      })
    }

    const { gsap, ScrollTrigger } = motor
    const primeiro = grupos[0].id
    let ativa =
      grupos.find((grupo) => grupo.botao.hasAttribute('data-ativa'))?.id ??
      primeiro
    let fixada: string | null = null

    /* A altura reservada do painel = o maior dos quatro conjuntos, medida
     * a cada refresh (resize, fonte que pousou) e escrita em style inline.
     * O empilhamento em grid do CSS F5b já reserva por layout; a medida
     * escrita é o contrato explícito de que a troca não move o painel. */
    const medir = () => {
      const alvo = Math.max(...grupos.map((grupo) => grupo.itensUl.offsetHeight))
      painel.style.minHeight = `${alvo}px`
    }
    medir()
    ScrollTrigger.addEventListener('refreshInit', medir)

    const ctx = gsap.context(() => {
      /* Estado inicial escondido nasce AQUI, nunca em CSS (lei 5): estilo
       * inline, que também vence o gate html.js [data-reveal] dos botões
       * e fios. O clip aberto dos itens é registrado DE PROPÓSITO: é por
       * ele que o revert devolve os tweens de interação ao HTML do
       * servidor. */
      gsap.set(fios, { scaleX: 0, transformOrigin: '0 50%', opacity: 1 })
      gsap.set(botoes, { clipPath: CLIP_FECHADO, opacity: 1 })
      grupos.forEach((grupo) => {
        gsap.set(grupo.palavra, {
          fontVariationSettings:
            grupo.id === ativa ? FVS_ABERTO : FVS_FECHADO,
        })
        gsap.set(grupo.itens, { clipPath: CLIP_ABERTO })
      })

      /* O ÚNICO ScrollTrigger da seção: a entrada. */
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: secao,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      /* As quatro palavras abrem escalonadas; o fio de cada uma se
       * desenha logo atrás, de cima para baixo. fromTo com from
       * explícito: refresh no meio do scroll nunca recaptura um começo
       * errado. */
      grupos.forEach((grupo, i) => {
        tl.fromTo(
          grupo.botao,
          { clipPath: CLIP_FECHADO },
          { clipPath: CLIP_ABERTO, duration: PALAVRA_DUR },
          i * PALAVRA_PASSO,
        )
      })
      fios.forEach((fio, i) => {
        tl.fromTo(
          fio,
          { scaleX: 0 },
          { scaleX: 1, duration: FIO_DUR },
          i * PALAVRA_PASSO + FIO_ATRASO,
        )
      })

      /* A régua até 1: tempo da timeline = p da entrada, literal. */
      tl.to({}, { duration: 0 }, 1)

      /* As pistas vizinhas escrevem altura em style inline nos próprios
       * efeitos — um refresh garante start/end medidos contra o layout
       * definitivo (e repassa pelo medir de cima). */
      ScrollTrigger.refresh()
    }, secao)

    /* A troca: atributos (o CSS F5b segue data-ativa para cor, âmbar do
     * ordinal e visibility do conjunto) + wdth por tween + os termos
     * entrando escalonados por clip-path, como a prova da F4a. Os tweens
     * daqui vivem FORA do contexto — o cleanup os mata à mão. */
    const trocar = (id: string) => {
      if (id === ativa) return
      const entrante = grupos.find((grupo) => grupo.id === id)
      if (!entrante) return
      ativa = id

      grupos.forEach((grupo) => {
        const aberta = grupo.id === id
        grupo.botao.toggleAttribute('data-ativa', aberta)
        grupo.botao.setAttribute('aria-expanded', String(aberta))
        grupo.itensUl.toggleAttribute('data-ativa', aberta)
        gsap.to(grupo.palavra, {
          fontVariationSettings: aberta ? FVS_ABERTO : FVS_FECHADO,
          duration: TROCA_DUR,
          ease: TROCA_EASE,
          overwrite: 'auto',
        })
      })

      gsap.fromTo(
        entrante.itens,
        { clipPath: CLIP_FECHADO },
        {
          clipPath: CLIP_ABERTO,
          duration: TROCA_DUR,
          ease: TROCA_EASE,
          stagger: ITEM_PASSO,
          overwrite: 'auto',
        },
      )
    }

    const mqHover = window.matchMedia(QUERY_HOVER)

    const aoEntrar = (evento: PointerEvent) => {
      if (!mqHover.matches || evento.pointerType === 'touch') return
      const botao = evento.currentTarget
      if (!(botao instanceof HTMLElement)) return
      const id = botao.dataset.id
      if (id) trocar(id)
    }

    const aoSair = (evento: PointerEvent) => {
      if (!mqHover.matches || evento.pointerType === 'touch') return
      trocar(fixada ?? primeiro)
    }

    const aoClicar = (evento: MouseEvent) => {
      const alvo = evento.target
      if (!(alvo instanceof Element)) return
      const id = alvo.closest<HTMLButtonElement>('[data-capacidade]')?.dataset.id
      if (!id) return
      fixada = id
      trocar(id)
    }

    const aoFocar = (evento: FocusEvent) => {
      const alvo = evento.target
      if (!(alvo instanceof Element)) return
      const id = alvo.closest<HTMLButtonElement>('[data-capacidade]')?.dataset.id
      if (id) trocar(id)
    }

    botoes.forEach((botao) => botao.addEventListener('pointerenter', aoEntrar))
    secao.addEventListener('pointerleave', aoSair)
    lista.addEventListener('click', aoClicar)
    lista.addEventListener('focusin', aoFocar)

    return () => {
      botoes.forEach((botao) =>
        botao.removeEventListener('pointerenter', aoEntrar),
      )
      secao.removeEventListener('pointerleave', aoSair)
      lista.removeEventListener('click', aoClicar)
      lista.removeEventListener('focusin', aoFocar)
      ScrollTrigger.removeEventListener('refreshInit', medir)

      /* Tweens de interação primeiro (não são do contexto), depois o
       * revert devolve tudo ao HTML do servidor. */
      grupos.forEach((grupo) => {
        gsap.killTweensOf(grupo.palavra)
        gsap.killTweensOf(grupo.itens)
      })
      ctx.revert()

      /* Os dois estados que o gsap não registra, de volta ao servidor. */
      painel.style.minHeight = ''
      grupos.forEach((grupo, i) => {
        const aberta = i === 0
        grupo.botao.toggleAttribute('data-ativa', aberta)
        grupo.botao.setAttribute('aria-expanded', String(aberta))
        grupo.itensUl.toggleAttribute('data-ativa', aberta)
      })
    }
  }, [motor])

  return (
    <section
      ref={secaoRef}
      data-capacidades
      aria-label={rotulo}
      className="stage"
    >
      {children}
    </section>
  )
}
