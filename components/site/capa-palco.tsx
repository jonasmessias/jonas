'use client'

import { useMotion } from '@/components/motion/use-motion'
import { Monolito, type MonolitoHandle } from '@/components/scene/monolito'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react'
import { ProgressoCapaContext, type ProgressoCapa } from './use-progresso-capa'

/**
 * O palco da capa (F3a): a pista de ~400vh, o palco preso por sticky, o
 * scrub único e o gesto tipográfico do nome. O CONTEÚDO não nasce aqui —
 * ele chega como children de SERVIDOR (a capa é RSC; este wrapper só
 * anima o que o servidor já pintou). Nenhum import estático de motor:
 * tudo gateado em useMotion().motor.
 *
 * UM ScrollTrigger, e ele é a única verdade: scrub sobre [data-hero],
 * 'top top' → 'bottom bottom'. Todo o resto deriva do MESMO p — o
 * monólito por setProgress(p), o nome pela timeline, e a F3b pelos
 * ouvintes de useProgressoCapa(). Nada de triggers paralelos.
 *
 * O gesto do nome (p ≈ 0.12→0.50): wdth 125 → 62 (medido nesta fonte:
 * 96,5% de diferença de largura — o glifo estreita de verdade, o que
 * scaleX não faz), junto de escala e translação até [data-marca-alvo],
 * o canto superior esquerdo, onde fica pelo resto da página. A geometria
 * do pouso é do CSS (posição e font-size do alvo); aqui só se mede.
 *
 * Empilhamento — a regra que faz o nome atravessar o objeto: o <h1> não
 * cria contexto de empilhamento (sem z-index, transform ou opacity NELE;
 * position: relative com z-index auto não cria — é só o containing block
 * do eco); quem anima e quem leva z-index são os <span> de linha. Por isso
 * os transforms do gesto vão nos spans, nunca no h1 — um transform no h1
 * criaria contexto próprio e achataria as duas palavras num plano só.
 *
 * O MERGULHO do JONAS (correção pós-F3b, medida): no repouso as DUAS
 * palavras ficam na frente do canvas — a entrelinha de 0.86 faz as linhas
 * se tocarem, e com o JONAS atrás desde o início o monólito ocluía 98,8%
 * da palavra em p=0. O sanduíche só engata quando o movimento começa. E
 * não é troca seca de z-index: a fração ocluída medida nunca cai de ~48%
 * durante a delaminação (94,5% em p=0.14 · 47,7% em p=0.28 · 60,2% em
 * p=0.30), então um flip discreto estouraria metade da palavra num tick
 * em QUALQUER p útil. O mecanismo é o ECO: um dublê aria-hidden do JONAS
 * em z-20, criado quando o motor pousa, no MESMO frame síncrono em que o
 * original desce para z-0 (via [data-eco] no palco) — troca coberta por
 * pixels idênticos. O eco então dissolve no scrub (opacity 1→0, janela
 * MERGULHO_*), e a dissolução só é visível onde há laje na frente: o
 * objeto engole a palavra progressivamente, o atravessamento é EVENTO
 * produzido pelo scroll, e rolar para cima o desfaz. Cleanup remove eco
 * e atributo — nada fica preso.
 */

/* A janela do gesto no p do palco — exportadas para a F3b compor no mesmo
 * relógio, nunca criar outro. */
export const GESTO_INICIO = 0.12
export const GESTO_FIM = 0.5

/* O mergulho do JONAS: o eco dissolve junto com o começo do movimento —
 * a janela é curta (30vh de scroll) e a dissolução só aparece onde uma
 * laje está por cima. Coreografia, não fato. */
const MERGULHO_INICIO = GESTO_INICIO
const MERGULHO_DUR = 0.1

/* Rede de segurança do gate A-8: se o motor não pousar até aqui (chunk
 * 404, rede caída), html.js sai e nada fica invisível para sempre. */
const MOTOR_TIMEOUT_MS = 2500

type Props = {
  camadas: number
  children: ReactNode
}

export function CapaPalco({ camadas, children }: Props) {
  const { ready, reduced, motor } = useMotion()

  const secaoRef = useRef<HTMLElement | null>(null)
  const palcoRef = useRef<HTMLDivElement | null>(null)
  const monolitoRef = useRef<MonolitoHandle | null>(null)
  const progressoRef = useRef(0)
  const ouvintesRef = useRef(new Set<(p: number) => void>())

  const aoScrub = useCallback((ouvinte: (p: number) => void) => {
    ouvintesRef.current.add(ouvinte)
    ouvinte(progressoRef.current)
    return () => {
      ouvintesRef.current.delete(ouvinte)
    }
  }, [])

  const contexto = useMemo<ProgressoCapa>(
    () => ({ progresso: progressoRef, monolito: monolitoRef, aoScrub }),
    [aoScrub],
  )

  /* O gate A-8 em runtime (a metade pré-paint é o script inline do
   * app/layout.tsx). Ordem deliberada: este efeito vem ANTES do efeito de
   * animação — quando o motor pousa, a classe (e a altura da pista) já
   * está no lugar quando o ScrollTrigger mede o layout.
   * - reduced → remove html.js: bloco estático, nada escondido;
   * - motor pousou → garante html.js (cobre o pouso tardio, depois de um
   *   timeout que removeu — os reveals já são do gsap por estilo inline);
   * - senão, ~2,5s sem motor → remove: falha de rede não esconde conteúdo. */
  useEffect(() => {
    if (!ready) return
    const raiz = document.documentElement
    if (reduced) {
      raiz.classList.remove('js')
      return
    }
    if (motor) {
      raiz.classList.add('js')
      return
    }
    const id = window.setTimeout(
      () => raiz.classList.remove('js'),
      MOTOR_TIMEOUT_MS,
    )
    return () => window.clearTimeout(id)
  }, [ready, reduced, motor])

  /* O scrub — um só. Timeline de duração 1 (o espaçador no fim garante),
   * então tempo da timeline = p do range da seção, literal. Limpeza total
   * por gsap.context().revert(): triggers mortos, estilos inline de volta
   * ao HTML do servidor. */
  useEffect(() => {
    if (!motor) return
    const secao = secaoRef.current
    const palco = palcoRef.current
    if (!secao || !palco) return

    const nome = palco.querySelector<HTMLElement>('[data-name-mark]')
    const alvo = palco.querySelector<HTMLElement>('[data-marca-alvo]')
    const linhas = Array.from(
      palco.querySelectorAll<HTMLElement>('[data-name-linha]'),
    )
    if (!nome || !alvo || linhas.length === 0) return

    const { gsap, ScrollTrigger } = motor

    /* O eco do JONAS (ver o docblock): dublê aria-hidden em z-20, texto
     * copiado do span do servidor (fato nenhum nasce aqui). Criá-lo e
     * marcar [data-eco] no MESMO frame síncrono em que o CSS derruba o
     * original para z-0 é o que torna a troca invisível: os pixels que o
     * original deixa de pintar, o eco pinta idênticos. */
    const eco = document.createElement('span')
    eco.textContent = linhas[0].textContent
    eco.setAttribute('data-name-eco', '')
    eco.setAttribute('aria-hidden', 'true')
    nome.appendChild(eco)
    palco.setAttribute('data-eco', '')

    const ctx = gsap.context(() => {
      /* Origem no topo-esquerdo de cada linha: escalar e transladar cada
       * uma com valores derivados da MESMA escala move o bloco inteiro
       * como corpo rígido, sem wrapper (que criaria contexto de
       * empilhamento e mataria o atravessamento). O eco entra com a
       * mesma origem: ele voa colado no JONAS. */
      gsap.set([...linhas, eco], { transformOrigin: '0 0' })

      /* A escala do pouso: font-size do alvo (CSS resolve o token) sobre
       * a font-size corrente do nome. Funções reavaliadas a cada refresh
       * (invalidateOnRefresh) — o gesto sobrevive a resize. */
      const escala = () =>
        parseFloat(getComputedStyle(alvo).fontSize) /
        parseFloat(getComputedStyle(nome).fontSize)

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: secao,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressoRef.current = self.progress
            monolitoRef.current?.setProgress(self.progress)
            ouvintesRef.current.forEach((ouvinte) => ouvinte(self.progress))
          },
        },
      })

      /* O gesto tipográfico: a string inteira tweenada — o gsap interpola
       * o número do wdth dentro dela; o wght fica parado em 700. No h1,
       * porque font-variation-settings herda e NÃO cria contexto de
       * empilhamento (transform criaria). fromTo com from explícito:
       * refresh no meio do scroll nunca recaptura um começo errado. */
      tl.fromTo(
        nome,
        { fontVariationSettings: "'wdth' 125, 'wght' 700" },
        {
          fontVariationSettings: "'wdth' 62, 'wght' 700",
          duration: GESTO_FIM - GESTO_INICIO,
        },
        GESTO_INICIO,
      )

      /* Escala e translação por linha, mesmos valores de corpo rígido:
       * linha i pousa em alvo + escala * (deslocamento dela na pilha).
       * Medições com transforms revertidos (é o que o refresh garante),
       * rects do mesmo container sticky — deltas imunes ao scroll.
       * O eco recebe os MESMOS valores do JONAS (as funções fecham sobre
       * `linha`, não sobre o alvo do tween): um corpo, duas pinturas. */
      linhas.forEach((linha, i) => {
        tl.fromTo(
          i === 0 ? [linha, eco] : linha,
          { x: 0, y: 0, scale: 1 },
          {
            x: () =>
              alvo.getBoundingClientRect().left -
              linha.getBoundingClientRect().left,
            y: () => {
              const a = alvo.getBoundingClientRect()
              const primeira = linhas[0].getBoundingClientRect()
              const propria = linha.getBoundingClientRect()
              return (
                a.top -
                primeira.top +
                (escala() - 1) * (propria.top - primeira.top)
              )
            },
            scale: escala,
            duration: GESTO_FIM - GESTO_INICIO,
          },
          GESTO_INICIO,
        )
      })

      /* O mergulho: o eco dissolve com o começo do movimento. A opacidade
       * interpola o que o z-index não interpola — e a mudança só tem pixel
       * onde uma laje está na frente do JONAS, então o que se vê é o
       * objeto engolindo a palavra, não um fade. Reversível com o scrub. */
      tl.fromTo(
        eco,
        { opacity: 1 },
        { opacity: 0, duration: MERGULHO_DUR },
        MERGULHO_INICIO,
      )

      /* O espaçador que estica a régua até 1: o scrub mapeia a duração
       * TOTAL no range da seção — sem ele, o gesto (que acaba em 0.5)
       * seria reescalado para acabar no fim do scroll. De 0.5 a 1 o nome
       * fica pousado no canto; é a metade que a F3b vai ocupar. */
      tl.to({}, { duration: 1 - GESTO_FIM }, GESTO_FIM)

      /* O palco acabou de ganhar a pista (html.js do efeito acima):
       * um refresh garante start/end medidos na altura definitiva. */
      ScrollTrigger.refresh()
    }, secao)

    return () => {
      ctx.revert()
      /* O eco e a marca do mergulho morrem juntos: sem motor, o JONAS
       * volta ao z-20 de base — nada fica preso atrás do canvas. */
      eco.remove()
      palco.removeAttribute('data-eco')
    }
  }, [motor])

  return (
    <ProgressoCapaContext.Provider value={contexto}>
      <section ref={secaoRef} data-hero>
        <div ref={palcoRef} data-hero-stage className="stage flex flex-col">
          {/* O alvo do pouso — geometria em CSS, medição no efeito acima. */}
          <div data-marca-alvo aria-hidden="true" />

          {/* z-10: entre o JONAS (z-0) e o MESSIAS (z-20) — o objeto passa
              fisicamente entre as duas palavras. Canvas com alpha, clear
              transparente: quem oclui é o sólido desenhado, não o retângulo.
              O wrapper [data-cena-veu] é o véu do handoff da F3b: o
              CapaDocumento apaga a cena por opacity AQUI (o div interno é
              da cena, e a cena não se conhece apagando). */}
          <div data-cena-veu className="pointer-events-none absolute inset-0 z-10">
            <Monolito ref={monolitoRef} camadas={camadas} className="absolute inset-0" />
          </div>

          {children}
        </div>
      </section>
    </ProgressoCapaContext.Provider>
  )
}
