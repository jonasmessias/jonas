'use client'

import { useMotion } from '@/components/motion/use-motion'
import { useEffect, useRef, type ReactNode } from 'react'

/**
 * O palco da seção 01 (F4a): a pista de 250vh, o palco preso por sticky —
 * nunca pelo pin do ScrollTrigger — e o scrub único da legenda. O CONTEÚDO
 * não nasce aqui: chega como children de SERVIDOR (o TrabalhoOsm é RSC;
 * este wrapper só anima o que o servidor já pintou, inclusive os números,
 * que o HTML traz no VALOR FINAL). Nenhum import estático de motor: tudo
 * gateado em useMotion().motor.
 *
 * UM ScrollTrigger, e ele é a única verdade: scrub sobre [data-trabalho],
 * 'top top' → 'bottom bottom', timeline de duração 1 — o tempo da timeline
 * é o p da seção, literal. Os três beats penduram nela:
 *
 *   p 0.00–0.15  A PRANCHA   os fios da legenda desenham da esquerda para
 *                            a direita (scaleX 0→1, origem '0 50%'),
 *                            escalonados de cima para baixo
 *   p 0.15–0.65  A CONTAGEM  cada número conta de 0 até o valor —
 *                            nº1 0.15–0.35 · nº2 0.30–0.50 · nº3 0.45–0.65
 *                            — e, no MESMO tween, o eixo wdth vai de 62 a
 *                            125: o número engorda de largura enquanto
 *                            engorda de valor
 *   p 0.65–1.00  A PROVA     o aviso de código privado e os dois links no
 *                            ar entram por clip-path, escalonados; o
 *                            último fecha em p=1
 *
 * A contagem é reversível por construção porque é scrub: o valor final é o
 * que o SERVIDOR pinta; aqui só se faz gsap.set para "0" depois que o
 * motor pousa e se conta de volta — o alvo vem de data-valor, que o RSC
 * gravou do content (fato nenhum nasce neste arquivo). O wdth vai em
 * fontVariationSettings numa string tweenada (o gsap interpola o número
 * dentro dela), como o nome da capa; transform: scaleX deformaria a letra,
 * o eixo redesenha o glifo. O wght fica parado no 600 do --text-display.
 *
 * Estado escondido: o gate A-8 (html.js [data-reveal]) cobre o pré-paint;
 * quando o motor pousa, gsap.set assume por estilo inline (scaleX 0 nos
 * fios, clip fechado na prova, wdth 62 e texto "0" nos números) — inline
 * vence a classe do gate. Sem JavaScript ou com reduced motion nada disso
 * roda: a marcação do servidor É o estado final, fios desenhados e links
 * clicáveis.
 *
 * Limpeza por gsap.context().revert(): triggers mortos
 * (ScrollTrigger.getAll() volta ao que era), estilos inline de volta ao
 * HTML do servidor; o textContent dos números — que o gsap não registra —
 * volta à mão, pelo valor guardado antes de zerar.
 */

/* ── As janelas no p do palco — coreografia, não fato. ─────────────────── */

/* A PRANCHA: os fios da legenda, escalonados, todos dentro de 0–0.15. */
const FIO_FIM = 0.15
const FIO_DUR = 0.06

/* A CONTAGEM: nº1 em 0.15–0.35 · nº2 em 0.30–0.50 · nº3 em 0.45–0.65. */
const CONTAGEM_INICIO = 0.15
const CONTAGEM_PASSO = 0.15
const CONTAGEM_DUR = 0.2

/* O eixo da direção: o mesmo par 62↔125 do nome da capa, aqui abrindo —
 * e com o wght parado no peso do --text-display. */
const FVS_FECHADO = "'wdth' 62, 'wght' 600"
const FVS_ABERTO = "'wdth' 125, 'wght' 600"

/* A PROVA: entra da esquerda para a direita — o inset da direita recua. */
const PROVA_INICIO = 0.65
const PROVA_DUR = 0.2
const CLIP_FECHADO = 'inset(0% 100% 0% 0%)'
const CLIP_ABERTO = 'inset(0% 0% 0% 0%)'

type Props = {
  /** id do <h2> do título — alvo do aria-labelledby da seção. */
  tituloId: string
  children: ReactNode
}

export function TrabalhoOsmPalco({ tituloId, children }: Props) {
  const { motor } = useMotion()
  const secaoRef = useRef<HTMLElement | null>(null)
  const palcoRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!motor) return
    const secao = secaoRef.current
    const palco = palcoRef.current
    if (!secao || !palco) return

    const fios = Array.from(
      palco.querySelectorAll<HTMLElement>('[data-trabalho-fio]'),
    )
    const numeros = Array.from(
      palco.querySelectorAll<HTMLElement>('[data-numero]'),
    )
    const provas = Array.from(
      palco.querySelectorAll<HTMLElement>('[data-trabalho-prova]'),
    )
    if (fios.length === 0 || numeros.length === 0 || provas.length === 0) return

    const { gsap, ScrollTrigger } = motor

    /* O que o servidor pintou, guardado ANTES de zerar — é para cá que o
     * cleanup devolve o texto (o revert desfaz estilo, não textContent). */
    const originais = numeros.map((numero) => numero.textContent ?? '')

    const ctx = gsap.context(() => {
      /* Estado inicial escondido nasce AQUI, nunca em CSS (lei 5): estilo
       * inline, que também vence o gate html.js [data-reveal]. */
      gsap.set(fios, { scaleX: 0, transformOrigin: '0 50%', opacity: 1 })
      gsap.set(numeros, { fontVariationSettings: FVS_FECHADO, opacity: 1 })
      gsap.set(provas, { clipPath: CLIP_FECHADO, opacity: 1 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: secao,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      /* A PRANCHA — cada fio desenha da esquerda para a direita, de cima
       * para baixo; o último fecha em FIO_FIM. fromTo com from explícito:
       * refresh no meio do scroll nunca recaptura um começo errado. */
      const fioPasso = (FIO_FIM - FIO_DUR) / Math.max(fios.length - 1, 1)
      fios.forEach((fio, i) => {
        tl.fromTo(
          fio,
          { scaleX: 0 },
          { scaleX: 1, duration: FIO_DUR },
          i * fioPasso,
        )
      })

      /* A CONTAGEM — um tween por número: o wdth abre de 62 a 125 e, no
       * MESMO tween, o onUpdate deriva o texto do progresso — valor e
       * largura engordam juntos, e o scrub reverte os dois juntos. */
      numeros.forEach((numero, i) => {
        const alvo = Number(numero.dataset.valor)
        /* O RSC garante /^\d+$/ no build; guarda barata contra DOM alheio. */
        if (!Number.isFinite(alvo)) return
        numero.textContent = '0'
        const tween = gsap.fromTo(
          numero,
          { fontVariationSettings: FVS_FECHADO },
          { fontVariationSettings: FVS_ABERTO, duration: CONTAGEM_DUR, ease: 'none' },
        )
        tween.eventCallback('onUpdate', () => {
          numero.textContent = String(Math.round(tween.progress() * alvo))
        })
        tl.add(tween, CONTAGEM_INICIO + i * CONTAGEM_PASSO)
      })

      /* A PROVA — código privado e os dois links no ar, escalonados; o
       * passo é calculado para o último fechar exatamente em p=1. */
      const provaPasso =
        (1 - PROVA_DUR - PROVA_INICIO) / Math.max(provas.length - 1, 1)
      provas.forEach((prova, i) => {
        tl.fromTo(
          prova,
          { clipPath: CLIP_FECHADO },
          { clipPath: CLIP_ABERTO, duration: PROVA_DUR },
          PROVA_INICIO + i * provaPasso,
        )
      })

      /* A régua até 1: garante duração EXATAMENTE 1 mesmo se a conta dos
       * beats mudar — tempo da timeline = p da seção, literal. */
      tl.to({}, { duration: 0 }, 1)

      /* A pista (html.js) já está na árvore quando o motor pousa — o gate
       * do CapaPalco vem antes na árvore; um refresh garante start/end
       * medidos na altura definitiva. */
      ScrollTrigger.refresh()
    }, secao)

    return () => {
      ctx.revert()
      numeros.forEach((numero, i) => {
        numero.textContent = originais[i]
      })
    }
  }, [motor])

  return (
    <section ref={secaoRef} data-trabalho aria-labelledby={tituloId}>
      <div ref={palcoRef} data-trabalho-palco className="stage flex flex-col">
        {children}
      </div>
    </section>
  )
}
