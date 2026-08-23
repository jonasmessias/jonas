'use client'

import { useMotion } from '@/components/motion/use-motion'
import { useEffect, useRef, type ReactNode } from 'react'

/**
 * O palco do percurso (F5a) — que, de propósito, NÃO é palco preso: a
 * seção atravessa a viewport em fluxo normal (três seções presas seguidas
 * viram tique), e o scrub lê a travessia inteira. O CONTEÚDO não nasce
 * aqui: chega como children de SERVIDOR (o Percurso é RSC; este wrapper só
 * transforma o que o servidor já pintou). Nenhum import estático de motor:
 * tudo gateado em useMotion().motor.
 *
 * UM ScrollTrigger, e ele é a única verdade: scrub sobre [data-percurso],
 * 'top bottom' → 'bottom top' — o range é a seção atravessando a viewport
 * inteira —, timeline de duração 1: o tempo da timeline é o p da
 * travessia, literal.
 *
 * A paralaxe é DIFERENCIAL e a taxa vem da posição na linha do tempo — o
 * ano mais antigo é o mais lento (parece mais longe), o mais recente é o
 * mais rápido (parece mais perto). As taxas são distribuídas linearmente
 * pelo índice, de 0,80× (primeira linha) a 1,20× (última), calculadas de
 * linhas.length — nunca escritas à mão. Taxa é velocidade de MUNDO, como
 * na F4b: a coluna do texto corre a 1,00× (o próprio fluxo da página) e o
 * ano compensa a diferença em y — (1 − taxa) positivo atrasa (desce
 * relativo ao texto conforme o scroll sobe), negativo adianta. A amplitude
 * é proporcional à ALTURA DA PRÓPRIA LINHA (offsetHeight, medida por
 * função a cada refresh — nunca px capturado), simétrica em p=0,5: quando
 * a seção está no meio da viewport as colunas alinham, e é nas bordas da
 * travessia que o desvio abre — grande o bastante para se ver, pequeno o
 * bastante para o ano nunca sair da própria faixa (o desvio máximo fica
 * abaixo do respiro vertical s-5 da linha). Nenhum tween com relógio
 * próprio: tudo pendura no mesmo p.
 *
 * Os fios entram por scaleX no mesmo p, escalonados de cima para baixo
 * (como a F4a), dentro da janela de ENTRADA da seção — cada fio se
 * desenha mais ou menos quando a linha dele sobe na tela.
 *
 * Estado escondido: só os fios, e só pelo gate A-8 (html.js
 * [data-reveal]) no pré-paint; quando o motor pousa, gsap.set assume por
 * estilo inline (scaleX 0, opacity 1), que vence a classe do gate. Os
 * anos e o texto NUNCA se escondem — sem JavaScript ou com reduced motion
 * a marcação do servidor é o estado final, visível e legível, zero
 * transform.
 *
 * Limpeza por gsap.context().revert(): trigger morto, transforms e estilos
 * inline de volta ao HTML do servidor. Nenhum estilo fora do gsap para
 * devolver à mão, nenhum listener próprio — a seção não tem foco a
 * gerenciar (não há elemento focalizável no percurso).
 */

/* ── Coreografia, não fato ─────────────────────────────────────────────── */

/* As taxas de mundo nas pontas da linha do tempo; o meio interpola pelo
 * índice. 1,00× seria o fluxo — o texto da linha. */
const TAXA_PRIMEIRA = 0.8
const TAXA_ULTIMA = 1.2

/* A amplitude de referência da compensação, em alturas da própria linha.
 * Com as taxas acima, o desvio máximo de um ano é 0,2× disto — calibrado
 * para deslizar claramente contra o texto sem cruzar o fio da faixa. */
const FATOR_AMPLITUDE = 1

/* Os fios da strip: escalonados dentro da janela de entrada da seção —
 * o último fecha em p=0,45, quando a strip inteira já subiu na tela. */
const FIO_FIM = 0.45
const FIO_DUR = 0.1

type Props = {
  /** Nome acessível da seção, derivado do conteúdo pelo Percurso (RSC). */
  rotulo: string
  children: ReactNode
}

export function PercursoPalco({ rotulo, children }: Props) {
  const { motor } = useMotion()
  const secaoRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!motor) return
    const secao = secaoRef.current
    if (!secao) return

    const linhas = Array.from(
      secao.querySelectorAll<HTMLElement>('[data-percurso-linha]'),
    )
    const fios = Array.from(
      secao.querySelectorAll<HTMLElement>('[data-percurso-fio]'),
    )
    if (linhas.length === 0) return

    const { gsap, ScrollTrigger } = motor

    const ctx = gsap.context(() => {
      /* Estado inicial escondido nasce AQUI, nunca em CSS (lei 5): estilo
       * inline, que também vence o gate html.js [data-reveal]. */
      gsap.set(fios, { scaleX: 0, transformOrigin: '0 50%', opacity: 1 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: secao,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      /* A PARALAXE — um tween por ano, todos no mesmo p, duração 1 (a
       * travessia inteira). fromTo com from explícito e valores por
       * função: refresh no meio do scroll nunca recaptura um começo
       * errado, e o resize remede a altura da linha. */
      linhas.forEach((linha, i) => {
        const ano = linha.querySelector<HTMLElement>('[data-percurso-ano]')
        if (!ano) return
        const taxa =
          TAXA_PRIMEIRA +
          (i / Math.max(linhas.length - 1, 1)) * (TAXA_ULTIMA - TAXA_PRIMEIRA)
        /* A compensação de mundo: (1 − taxa) × amplitude. Positiva para
         * quem é mais lento que o fluxo (desce relativo ao texto),
         * negativa para quem é mais rápido (sobe). Simétrica: alinhado
         * em p=0,5, desvio pleno nas bordas da travessia. */
        const desvio = () =>
          (1 - taxa) * FATOR_AMPLITUDE * linha.offsetHeight
        tl.fromTo(
          ano,
          { y: () => -desvio() },
          { y: () => desvio(), duration: 1 },
          0,
        )
      })

      /* OS FIOS — cada um desenha da esquerda para a direita, de cima
       * para baixo, dentro da janela de entrada. */
      const fioPasso = (FIO_FIM - FIO_DUR) / Math.max(fios.length - 1, 1)
      fios.forEach((fio, i) => {
        tl.fromTo(
          fio,
          { scaleX: 0 },
          { scaleX: 1, duration: FIO_DUR },
          i * fioPasso,
        )
      })

      /* A régua até 1: garante duração EXATAMENTE 1 mesmo se a conta dos
       * tweens mudar — tempo da timeline = p da travessia, literal. */
      tl.to({}, { duration: 0 }, 1)

      /* As pistas vizinhas (capa, F4a, F4b) escrevem altura em style
       * inline nos próprios efeitos — um refresh garante start/end desta
       * travessia medidos contra o layout definitivo. */
      ScrollTrigger.refresh()
    }, secao)

    return () => ctx.revert()
  }, [motor])

  return (
    <section ref={secaoRef} data-percurso aria-label={rotulo} className="stage">
      {children}
    </section>
  )
}
