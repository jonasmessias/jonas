'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Atraso em segundos, escrito como variável CSS — o CSS é quem anima. */
  atraso?: number
  as?: 'div' | 'li' | 'section' | 'article'
}

/**
 * Entrada curta ao aparecer na tela: o elemento nasce com data-reveal e
 * ganha data-visivel uma vez, quando 20% dele entra no viewport. O estado
 * escondido e a transição moram em globals.css, sob html.js — sem JS, ou
 * com reduced motion, nada aqui esconde coisa alguma.
 */
export function Revelar({ children, className, atraso = 0, as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.setAttribute('data-visivel', '')
      return
    }
    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          el.setAttribute('data-visivel', '')
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const style = atraso ? ({ '--atraso': `${atraso}s` } as CSSProperties) : undefined

  return (
    // O ref é tipado como HTMLElement porque a tag varia; React aceita.
    <Tag ref={ref as never} data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  )
}
