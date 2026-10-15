'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * O cursor de detalhe: um anel fino que segue o ponteiro com um pequeno
 * atraso, cresce sobre link e botão e puxa o alvo levemente na direção do
 * ponteiro (ímã). Sem GSAP: um requestAnimationFrame com interpolação
 * exponencial, independente da taxa de quadros.
 *
 * Travas:
 * - só com (pointer: fine) e sem reduced motion — as duas reativas: mouse
 *   desconectado ou preferência mudada no meio da sessão desligam tudo e
 *   devolvem o cursor nativo (html[data-cursor] sai, o CSS deixa de casar);
 * - o anel só nasce no primeiro pointermove: quem navega por Tab nunca o vê;
 * - aria-hidden + pointer-events: none (CSS): decoração que não intercepta;
 * - o ímã só pega alvo pequeno (botão, link de menu, ícone) — um card
 *   inteiro deslocando seria ruído — e só escreve `translate`, que compõe
 *   com qualquer transform que o alvo já tenha;
 * - cleanup remove tudo: listeners, atributo no <html>, translate dos alvos.
 */

const ALVOS = 'a, button, summary, label, [role="button"]'
/** Tamanho máximo de um alvo imantável (px). */
const IMA_ALVO_MAX = { largura: 280, altura: 72 }
const IMA_FATOR = 0.18
const IMA_MAX = 6

/** Escala do anel (o SVG mede 40px): repouso 12px, detalhe 40px, pressionado -12%. */
const ESCALA_REPOUSO = 0.3
const ESCALA_DETALHE = 1
const FATOR_PRESSAO = 0.88

/** Fatores de interpolação por quadro de 16,7ms. */
const SEGUIR = 0.22
const ANEL = 0.18
const FADE = 0.2

type Ima = { el: HTMLElement; x: number; y: number; ax: number; ay: number; solto: boolean }

const lerp = (a: number, b: number, k: number) => a + (b - a) * k
const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v))

export function Cursor() {
  const raizRef = useRef<HTMLDivElement>(null)
  const anelRef = useRef<SVGSVGElement>(null)
  const [ativo, setAtivo] = useState(false)

  useEffect(() => {
    const fino = window.matchMedia('(pointer: fine)')
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sincronizar = () => setAtivo(fino.matches && !reduzir.matches)
    sincronizar()
    fino.addEventListener('change', sincronizar)
    reduzir.addEventListener('change', sincronizar)
    return () => {
      fino.removeEventListener('change', sincronizar)
      reduzir.removeEventListener('change', sincronizar)
    }
  }, [])

  useEffect(() => {
    if (!ativo) return
    const raiz = raizRef.current
    const anel = anelRef.current
    if (!raiz || !anel) return

    document.documentElement.setAttribute('data-cursor', '')

    let quadro = 0
    let ultimo = 0
    let visivel = false
    let pressionado = false
    let alvo: HTMLElement | null = null
    let px = 0
    let py = 0
    let x = 0
    let y = 0
    let opacidade = 0
    let escala = ESCALA_REPOUSO
    let imaAtual: Ima | null = null
    const imasSoltos: Ima[] = []

    const escalaAlvo = () => (alvo ? ESCALA_DETALHE : ESCALA_REPOUSO) * (pressionado ? FATOR_PRESSAO : 1)

    const agendar = () => {
      if (!quadro) {
        ultimo = performance.now()
        quadro = requestAnimationFrame(passo)
      }
    }

    const passo = (agora: number) => {
      quadro = 0
      const dt = Math.min(64, agora - ultimo) / 16.7
      ultimo = agora
      const k = (f: number) => 1 - Math.pow(1 - f, dt)

      x = lerp(x, px, k(SEGUIR))
      y = lerp(y, py, k(SEGUIR))
      opacidade = lerp(opacidade, visivel ? 1 : 0, k(FADE))
      escala = lerp(escala, escalaAlvo(), k(ANEL))
      raiz.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
      raiz.style.opacity = opacidade.toFixed(3)
      anel.style.transform = `scale(${escala.toFixed(3)})`

      let ativoImas = false
      const imas = imaAtual ? [imaAtual, ...imasSoltos] : imasSoltos
      for (const ima of imas) {
        ima.x = lerp(ima.x, ima.ax, k(ANEL))
        ima.y = lerp(ima.y, ima.ay, k(ANEL))
        if (ima.solto && Math.abs(ima.x) < 0.05 && Math.abs(ima.y) < 0.05) {
          ima.el.style.removeProperty('translate')
          imasSoltos.splice(imasSoltos.indexOf(ima), 1)
          continue
        }
        ima.el.style.translate = `${ima.x.toFixed(2)}px ${ima.y.toFixed(2)}px`
        ativoImas = true
      }

      const quieto =
        Math.abs(x - px) < 0.05 &&
        Math.abs(y - py) < 0.05 &&
        Math.abs(opacidade - (visivel ? 1 : 0)) < 0.002 &&
        Math.abs(escala - escalaAlvo()) < 0.002 &&
        !ativoImas
      if (!quieto) quadro = requestAnimationFrame(passo)
    }

    const imantavel = (el: HTMLElement) => {
      const r = el.getBoundingClientRect()
      return r.width <= IMA_ALVO_MAX.largura && r.height <= IMA_ALVO_MAX.altura
    }

    const soltar = () => {
      if (!imaAtual) return
      imaAtual.solto = true
      imaAtual.ax = 0
      imaAtual.ay = 0
      imasSoltos.push(imaAtual)
      imaAtual = null
    }

    const sair = () => {
      if (!alvo) return
      soltar()
      alvo = null
      agendar()
    }

    const entrar = (novo: HTMLElement) => {
      if (alvo === novo) return
      soltar()
      alvo = novo
      if (imantavel(novo)) imaAtual = { el: novo, x: 0, y: 0, ax: 0, ay: 0, solto: false }
      agendar()
    }

    const aoMover = (e: PointerEvent) => {
      px = e.clientX
      py = e.clientY
      if (!visivel) {
        // Primeiro movimento: pula para o ponteiro e só então aparece.
        visivel = true
        x = px
        y = py
      }
      if (imaAtual) {
        const r = imaAtual.el.getBoundingClientRect()
        imaAtual.ax = clamp((px - (r.left + r.width / 2)) * IMA_FATOR, IMA_MAX)
        imaAtual.ay = clamp((py - (r.top + r.height / 2)) * IMA_FATOR, IMA_MAX)
      }
      agendar()
    }

    const aoEntrar = (e: PointerEvent) => {
      const el = e.target instanceof Element ? e.target.closest<HTMLElement>(ALVOS) : null
      if (el) entrar(el)
    }

    const aoSair = (e: PointerEvent) => {
      const rel = e.relatedTarget instanceof Element ? e.relatedTarget : null
      if (!rel) {
        // Saiu da janela: some até o próximo movimento.
        pressionado = false
        sair()
        visivel = false
        agendar()
        return
      }
      if (alvo && !alvo.contains(rel)) sair()
    }

    const aoPressionar = () => {
      pressionado = true
      agendar()
    }

    const aoSoltar = () => {
      pressionado = false
      agendar()
    }

    document.addEventListener('pointermove', aoMover, { passive: true })
    document.addEventListener('pointerover', aoEntrar, { passive: true })
    document.addEventListener('pointerout', aoSair, { passive: true })
    document.addEventListener('pointerdown', aoPressionar, { passive: true })
    document.addEventListener('pointerup', aoSoltar, { passive: true })

    return () => {
      document.removeEventListener('pointermove', aoMover)
      document.removeEventListener('pointerover', aoEntrar)
      document.removeEventListener('pointerout', aoSair)
      document.removeEventListener('pointerdown', aoPressionar)
      document.removeEventListener('pointerup', aoSoltar)
      if (quadro) cancelAnimationFrame(quadro)
      for (const ima of imaAtual ? [imaAtual, ...imasSoltos] : imasSoltos) ima.el.style.removeProperty('translate')
      document.documentElement.removeAttribute('data-cursor')
    }
  }, [ativo])

  if (!ativo) return null

  return (
    <div ref={raizRef} data-cursor-raiz="" aria-hidden="true">
      <svg ref={anelRef} data-cursor-anel="" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="19.5" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}
