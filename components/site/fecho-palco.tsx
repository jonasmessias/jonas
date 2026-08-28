'use client'

import { useMotion } from '@/components/motion/use-motion'
import { useEffect, useRef, type ReactNode } from 'react'

/**
 * O palco do fecho (F5c) — que, como o percurso, NÃO é palco preso: a
 * seção é a última da página e chega em fluxo normal; o scrub lê a
 * chegada inteira. O CONTEÚDO não nasce aqui: chega como children de
 * SERVIDOR (o Fecho é RSC; este wrapper só anima o que o servidor já
 * pintou). Nenhum import estático de motor: tudo gateado em
 * useMotion().motor.
 *
 * UM ScrollTrigger, e ele é a única verdade: scrub sobre [data-fecho],
 * 'top bottom' → 'bottom bottom' — o range é a seção entrando até a
 * página acabar —, timeline de duração 1: o tempo da timeline é o p da
 * chegada, literal.
 *
 * A coreografia, no p:
 * - 0,00–0,20  os dois fios da placa se desenham (scaleX, origem 0 50%),
 *   escalonados;
 * - 0,20–0,55  as duas linhas de disponibilidade e os canais entram por
 *   clip-path, escalonados na ordem do DOM (o passo é calculado da
 *   contagem real — se o CV um dia existir, ele entra na conta sozinho);
 * - 0,55–1,00  o nome do rodapé abre de wdth 62 para wdth 125 — o laço
 *   da capa fechando: lá o mesmo objeto comprimiu 125 → 62; é o gesto
 *   invertido que faz a página TERMINAR em vez de simplesmente acabar.
 *   fontVariationSettings numa string tweenada (o gsap interpola o número
 *   do wdth dentro dela; o wght fica parado em 700, o peso do token
 *   mega), o mesmo padrão do gesto da capa (capa-palco.tsx).
 *
 * Estado escondido: fios, linhas e canais, e só pelo gate A-8 (html.js
 * [data-reveal]) no pré-paint; quando o motor pousa, gsap.set assume por
 * estilo inline (scaleX 0 / clip fechado, opacity 1), que vence a classe
 * do gate. O nome NUNCA se esconde: o pouso pré-motor em wdth 62 é do CSS
 * F5c (sob html.js), o gsap.set daqui só o reafirma inline antes de o
 * scrub dirigir o eixo. Sem JavaScript ou com reduced motion a marcação
 * do servidor é o estado final: tudo visível, nome em wdth 125, zero
 * transform.
 *
 * Limpeza por gsap.context().revert(): trigger morto, transforms, clips e
 * o wdth inline de volta ao HTML do servidor. Nenhum listener próprio,
 * nenhum atributo trocado fora do gsap — o foco dos canais é do CSS
 * (:focus-visible no bloco F5c), não deste efeito.
 */

/* ── Coreografia, não fato ─────────────────────────────────────────────── */

/* Os dois pousos do wdth — os mesmos números do CSS F5c; wght preso em 700
 * (o peso do text-mega): o gsap interpola só o wdth dentro da string. */
const FVS_ABERTO = "'wdth' 125, 'wght' 700"
const FVS_FECHADO = "'wdth' 62, 'wght' 700"

/* O clip da entrada — a mesma prova da F4a e da F5b: abre da esquerda. */
const CLIP_FECHADO = 'inset(0% 100% 0% 0%)'
const CLIP_ABERTO = 'inset(0% 0% 0% 0%)'

/* Os fios da placa: escalonados, o último fecha em p = 0,20. */
const FIO_FIM = 0.2
const FIO_DUR = 0.1

/* A entrada de disponibilidade + canais: janela 0,20–0,55, escalonada na
 * ordem do DOM; o passo é derivado da contagem real de elementos. */
const ENTRADA_INICIO = 0.2
const ENTRADA_FIM = 0.55
const ENTRADA_DUR = 0.15

/* O nome: abre de 0,55 até o fim exato da página (p = 1). */
const NOME_INICIO = 0.55

type Props = {
  /** Nome acessível da seção, derivado do conteúdo pelo Fecho (RSC). */
  rotulo: string
  children: ReactNode
}

export function FechoPalco({ rotulo, children }: Props) {
  const { motor } = useMotion()
  const secaoRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!motor) return
    const secao = secaoRef.current
    if (!secao) return

    const fios = Array.from(
      secao.querySelectorAll<HTMLElement>('[data-fecho-fio]'),
    )
    /* Um seletor só: a ordem do querySelectorAll É a ordem do DOM — as
     * duas linhas de disponibilidade primeiro, depois os canais. */
    const entradas = Array.from(
      secao.querySelectorAll<HTMLElement>(
        '[data-disponibilidade], [data-canal]',
      ),
    )
    const nome = secao.querySelector<HTMLElement>('[data-rodape-nome]')
    if (fios.length === 0 || entradas.length === 0 || !nome) return

    const { gsap, ScrollTrigger } = motor

    const ctx = gsap.context(() => {
      /* Estado inicial escondido nasce AQUI, nunca em CSS (lei 5): estilo
       * inline, que também vence o gate html.js [data-reveal]. O wdth
       * fechado do nome não é esconderijo — é o pouso pré-motor do CSS
       * F5c reafirmado inline, para o revert ter o caminho de volta. */
      gsap.set(fios, { scaleX: 0, transformOrigin: '0 50%', opacity: 1 })
      gsap.set(entradas, { clipPath: CLIP_FECHADO, opacity: 1 })
      gsap.set(nome, { fontVariationSettings: FVS_FECHADO })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: secao,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      /* OS FIOS — cada um se desenha da esquerda para a direita, de cima
       * para baixo. fromTo com from explícito: refresh no meio do scroll
       * nunca recaptura um começo errado. */
      const fioPasso = (FIO_FIM - FIO_DUR) / Math.max(fios.length - 1, 1)
      fios.forEach((fio, i) => {
        tl.fromTo(
          fio,
          { scaleX: 0 },
          { scaleX: 1, duration: FIO_DUR },
          i * fioPasso,
        )
      })

      /* A ENTRADA — disponibilidade e canais abrem por clip-path, na
       * ordem do DOM, dentro da janela 0,20–0,55. */
      const entradaPasso =
        (ENTRADA_FIM - ENTRADA_INICIO - ENTRADA_DUR) /
        Math.max(entradas.length - 1, 1)
      entradas.forEach((entrada, i) => {
        tl.fromTo(
          entrada,
          { clipPath: CLIP_FECHADO },
          { clipPath: CLIP_ABERTO, duration: ENTRADA_DUR },
          ENTRADA_INICIO + i * entradaPasso,
        )
      })

      /* O NOME — o gesto invertido da capa, terminando exatamente com a
       * página: wdth 62 → 125 no mesmo p da chegada. */
      tl.fromTo(
        nome,
        { fontVariationSettings: FVS_FECHADO },
        {
          fontVariationSettings: FVS_ABERTO,
          duration: 1 - NOME_INICIO,
        },
        NOME_INICIO,
      )

      /* A régua até 1: garante duração EXATAMENTE 1 mesmo se a conta dos
       * tweens mudar — tempo da timeline = p da chegada, literal. */
      tl.to({}, { duration: 0 }, 1)

      /* As pistas vizinhas (capa, F4a, F4b) escrevem altura em style
       * inline nos próprios efeitos — um refresh garante start/end desta
       * chegada medidos contra o layout definitivo. */
      ScrollTrigger.refresh()
    }, secao)

    return () => ctx.revert()
  }, [motor])

  return (
    <section ref={secaoRef} data-fecho aria-label={rotulo} className="stage">
      {children}
    </section>
  )
}
