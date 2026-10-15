'use client'

import { clsx } from 'clsx'
import type { PointerEvent, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'li'
}

/**
 * Painel cuja borda acende sob o ponteiro. O pointermove escreve --x/--y
 * direto no estilo do elemento — sem estado React, mover o mouse nunca
 * re-renderiza. O desenho mora em .spotlight (globals.css), que se desliga
 * em telas sem hover e em reduced motion.
 */
export function PainelFoco({ children, className, as: Tag = 'div' }: Props) {
  const aoMover = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <Tag onPointerMove={aoMover} className={clsx('spotlight border border-rule bg-ground', className)}>
      {children}
    </Tag>
  )
}
