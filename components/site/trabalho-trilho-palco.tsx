'use client'

import { useMotion } from '@/components/motion/use-motion'
import { useEffect, useRef, type ReactNode } from 'react'

/**
 * O palco do trilho (F4b): a pista de altura calculada, o palco preso por
 * sticky — nunca pelo pin do ScrollTrigger — e o scrub único da travessia
 * horizontal. O CONTEÚDO não nasce aqui: chega como children de SERVIDOR
 * (o TrabalhoTrilho é RSC; este wrapper só translada o que o servidor já
 * pintou). Nenhum import estático de motor: tudo gateado em
 * useMotion().motor.
 *
 * A estrutura (o CSS do bloco F4b é o outro lado deste contrato):
 *
 *   <section data-trilho>                 a pista — altura escrita AQUI,
 *                                         em style inline: 100vh + a
 *                                         distância da travessia. A pista
 *                                         cresce com o conteúdo, não com
 *                                         número mágico.
 *     <div data-trilho-palco .stage>      sticky, top 0, 100vh
 *       <div data-trilho-janela>          a janela — leva a borda de corte
 *         <div data-trilho-esteira>       translada em X: é o que se move
 *           <article data-peca> × 3
 *         <div data-trilho-fio>           o fio de base, 1,35×
 *
 * UM ScrollTrigger, e ele é a única verdade: scrub sobre [data-trilho],
 * 'top top' → 'bottom bottom', timeline de duração 1 — o tempo da timeline
 * é o p da seção, literal. A travessia (p 0→1) leva a esteira de 0 até
 * -(esteira - janela), SEMPRE por função: invalidateOnRefresh reavalia no
 * resize; largura nunca é hard-code nem vw calculado em JS.
 *
 * A profundidade é diferencial — é ela que impede o "carrossel". Mas ela
 * vale para CENÁRIO, nunca para RÓTULO. Duas camadas sobre o MESMO p:
 *
 *   esteira (as peças)   1,00×   a taxa de referência
 *   fio de base          1,35×   corre na frente, parece mais perto
 *
 * O ORDINAL NÃO É CAMADA DE PROFUNDIDADE, e não pode voltar a ser.
 * Decisão do Jonas em 23/08/2026, olhando a tela. Três rodadas tentaram
 * calibrá-lo — 0,55× de velocidade de mundo (F4b) passeava ±900px em
 * torno de uma peça de 922px; reancorar na janela (F4c) prendeu o da
 * última peça em zero; 0,12× com recuo de 26% (F4d) devolveu a excursão.
 * Todas as três falharam pelo mesmo motivo, e não era a taxa: o número
 * NOMEIA a peça, e rótulo que desliza não lê como distância — lê como
 * defeito. No mesmo quadro um número aparecia no meio de um título e no
 * início de outro, e a conclusão do olho é dessincronia.
 *
 * O ordinal fica travado na peça, em left: 0 pelo CSS, sem tween nenhum.
 * A profundidade continua no fio de base, que não nomeia nada.
 *
 * Nada nasce escondido: em p=0 a peça 02 está na janela e as outras estão
 * fora por GEOMETRIA, não por opacidade — nenhum data-reveal, nenhum
 * gsap.set de esconderijo. O HTML do servidor é o estado de repouso.
 *
 * Foco num trilho transladado: focar link de peça fora da janela rolaria
 * para um elemento que a borda de corte não deixa aparecer. Num trilho
 * dirigido por scroll a posição vertical É a posição horizontal — então o
 * focusin rola a página até o p em que a peça focada cabe inteira no
 * quadro de conteúdo. Tab atravessa as três peças, tudo visível, e sai.
 *
 * Limpeza total: listeners fora, gsap.context().revert() (triggers mortos,
 * ScrollTrigger.getAll() volta ao que era, transforms de volta ao HTML do
 * servidor) e os dois estilos inline que o gsap não registra — a altura da
 * pista e a largura do fio — apagados à mão.
 */

/* A taxa de profundidade sobre o mesmo p — coreografia, não fato. É a
 * única que sobrou, e a única que pode existir: ela corre num fio de
 * cenário, não num rótulo. Ver o docblock. */
const TAXA_FIO = 1.35

/* A fração da própria largura que a peça percorre, depois de alcançar a
 * borda direita da janela, para --entrada ir de 0 a 1 — o desenho fecha
 * com a peça 45% dentro do quadro, antes de qualquer linha ser legível. */
const ENTRADA_FRACAO = 0.45

/** O gatilho vivo, para o handler de foco ler start/end/progress — tipo
 *  por import type inline, apagado na compilação (padrão do provider). */
type Gatilho = import('gsap/ScrollTrigger').ScrollTrigger

type Props = {
  /** id do <h2> da seção — alvo do aria-labelledby. */
  tituloId: string
  children: ReactNode
}

export function TrabalhoTrilhoPalco({ tituloId, children }: Props) {
  const { motor } = useMotion()
  const secaoRef = useRef<HTMLElement | null>(null)
  const palcoRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!motor) return
    const secao = secaoRef.current
    const palco = palcoRef.current
    if (!secao || !palco) return

    const janela = palco.querySelector<HTMLElement>('[data-trilho-janela]')
    const esteira = palco.querySelector<HTMLElement>('[data-trilho-esteira]')
    const fio = palco.querySelector<HTMLElement>('[data-trilho-fio]')
    const pecas = Array.from(palco.querySelectorAll<HTMLElement>('[data-peca]'))
    if (!janela || !esteira || !fio || pecas.length === 0) return

    const { gsap, ScrollTrigger, lenis } = motor
    const primeira = pecas[0]

    /* A distância da travessia: o que a esteira tem além da janela. Sempre
     * medida na hora — nunca capturada — para o resize nunca ler um mundo
     * velho. offsetLeft/offsetWidth ignoram transform: medem layout. */
    const distancia = () =>
      Math.max(esteira.offsetWidth - janela.clientWidth, 0)

    /* A posição de layout da peça dentro da esteira, relativa à primeira —
     * é a âncora do pouso do foco. */
    const posicao = (peca: HTMLElement) =>
      peca.offsetLeft - primeira.offsetLeft

    /* A pista cresce com o conteúdo: 100vh de palco + a travessia em
     * scroll, escrita em style inline no <section> (nunca em CSS estático)
     * e reavaliada a cada refresh — refreshInit roda ANTES de o
     * ScrollTrigger medir start/end, então o gatilho sempre lê a altura
     * definitiva. O comprimento do fio de base vai junto: janela + 1,35×
     * a distância, para a ponta dele fechar exatamente na borda em p=1. */
    const medir = () => {
      const d = distancia()
      secao.style.height = `calc(100vh + ${d}px)`
      fio.style.width = `${janela.clientWidth + TAXA_FIO * d}px`
    }

    medir()
    ScrollTrigger.addEventListener('refreshInit', medir)

    let gatilho: Gatilho | null = null

    const ctx = gsap.context(() => {
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
      gatilho = tl.scrollTrigger ?? null

      /* A esteira — 1,00×, a taxa de referência. fromTo com from
       * explícito: refresh no meio do scroll nunca recaptura um começo
       * errado. */
      tl.fromTo(esteira, { x: 0 }, { x: () => -distancia(), duration: 1 }, 0)

      /* Os ordinais não têm tween — ver o docblock. O CSS os põe em
       * left: 0 e nada aqui os move: o número fica travado na peça, na
       * mesma relação com o título nas três, em qualquer p. */

      /* O canal da entrada — um tween de --entrada por peça, na MESMA
       * timeline. O valor vai CRU (negativo antes da janela, >1 depois):
       * quem recorta sub-faixa e clampa é o CSS do bloco F4b, consumidor
       * a consumidor — por isso não há modifier aqui. from/to por função:
       * o invalidateOnRefresh reavalia no resize, como nos outros tweens.
       * É o que faz a peça se desenhar ao entrar em quadro (datum →
       * ordinal/nome → descrição → stack → links); o contrato completo
       * está no docblock e no comentário "O CANAL DA ENTRADA" do CSS. */
      pecas.forEach((peca) => {
        const entrada = (p: number) =>
          (janela.clientWidth -
            (esteira.offsetLeft + peca.offsetLeft - distancia() * p)) /
          (ENTRADA_FRACAO * peca.offsetWidth)
        tl.fromTo(
          peca,
          { '--entrada': () => entrada(0) },
          { '--entrada': () => entrada(1), duration: 1 },
          0,
        )
      })

      /* O fio de base — 1,35×, filho da janela: leva a taxa inteira. */
      tl.fromTo(fio, { x: 0 }, { x: () => -TAXA_FIO * distancia(), duration: 1 }, 0)

      /* A pista (html.js) já está na árvore quando o motor pousa — o gate
       * do CapaPalco vem antes na árvore; um refresh garante start/end
       * medidos na altura definitiva (e repassa pelo medir de cima). */
      ScrollTrigger.refresh()
    }, secao)

    /* O pouso do foco: se a peça do link focado não cabe inteira no
     * quadro de conteúdo (o respiro que a esteira carrega como padding),
     * rola a página — via Lenis quando ele dirige o scroll — até a borda
     * mais próxima do intervalo de p em que ela cabe. Sem salto quando já
     * está visível; instantâneo quando não está (é navegação, não cena). */
    const aoFocar = (evento: FocusEvent) => {
      const alvo = evento.target
      if (!(alvo instanceof Element)) return
      const peca = alvo.closest<HTMLElement>('[data-peca]')
      if (!peca || !gatilho) return
      const d = distancia()
      if (d <= 0) return

      const respiro = primeira.offsetLeft
      const quadro = janela.clientWidth - 2 * respiro
      const pos = posicao(peca)
      const pMax = Math.min(pos / d, 1)
      const pMin = Math.max((pos + peca.offsetWidth - quadro) / d, 0)
      const p = gatilho.progress
      if (p >= pMin && p <= pMax) return

      const alvoP = p > pMax ? pMax : pMin
      const y = gatilho.start + alvoP * (gatilho.end - gatilho.start)
      if (lenis) lenis.scrollTo(y, { immediate: true })
      else window.scrollTo(0, y)
    }
    palco.addEventListener('focusin', aoFocar)

    return () => {
      palco.removeEventListener('focusin', aoFocar)
      ScrollTrigger.removeEventListener('refreshInit', medir)
      ctx.revert()
      /* Os dois estilos que o revert não conhece, de volta ao servidor. */
      secao.style.height = ''
      fio.style.width = ''
    }
  }, [motor])

  return (
    <section ref={secaoRef} data-trilho aria-labelledby={tituloId}>
      <div ref={palcoRef} data-trilho-palco className="stage">
        {children}
      </div>
    </section>
  )
}
