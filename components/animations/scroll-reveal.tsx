'use client'
import {
  ScrollAnimationVariant,
  useScrollAnimation,
} from '@/utils/animations/use-scroll-animation'
import { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  variant?: ScrollAnimationVariant
  duration?: number
  delay?: number
  className?: string
  once?: boolean
}

/**
 * Componente para revelar elementos durante o scroll
 * Usa GSAP ScrollTrigger internamente
 *
 * @example
 * <ScrollReveal variant="fadeInUp" duration={1.2}>
 *   <h1>Animated Title</h1>
 * </ScrollReveal>
 */
export default function ScrollReveal({
  children,
  variant = 'fadeInUp',
  duration = 1,
  delay = 0,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const ref = useScrollAnimation({
    variant,
    duration,
    delay,
    once,
  })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
