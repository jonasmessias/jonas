'use client'
import {
  useGSAPCounter,
  useGSAPParallax,
  useGSAPReveal,
  useGSAPSplitText,
} from '@/hooks/use-gsap-scroll'
import { ReactNode } from 'react'

interface GSAPRevealProps {
  children: ReactNode
  from?: {
    opacity?: number
    y?: number
    x?: number
    scale?: number
    rotate?: number
  }
  to?: {
    opacity?: number
    y?: number
    x?: number
    scale?: number
    rotate?: number
  }
  duration?: number
  delay?: number
  stagger?: number
  start?: string
  className?: string
}

/**
 * Componente para revelar elementos ao scroll
 */
export const GSAPReveal = ({
  children,
  from,
  to,
  duration,
  delay,
  stagger,
  start,
  className = '',
}: GSAPRevealProps) => {
  const ref = useGSAPReveal({
    from,
    to,
    duration,
    delay,
    stagger,
    start,
  })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface GSAPParallaxProps {
  children: ReactNode
  speed?: number
  direction?: 'vertical' | 'horizontal'
  className?: string
}

/**
 * Componente para efeito parallax
 */
export const GSAPParallax = ({
  children,
  speed = 0.5,
  direction = 'vertical',
  className = '',
}: GSAPParallaxProps) => {
  const ref = useGSAPParallax(speed, direction)

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface GSAPSplitTextProps {
  children: string
  delay?: number
  stagger?: number
  duration?: number
  className?: string
}

/**
 * Componente para revelar texto letra por letra
 */
export const GSAPSplitText = ({
  children,
  delay,
  stagger,
  duration,
  className = '',
}: GSAPSplitTextProps) => {
  const ref = useGSAPSplitText({ delay, stagger, duration })

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  )
}

interface GSAPCounterProps {
  target: number
  duration?: number
  start?: string
  suffix?: string
  prefix?: string
  className?: string
}

/**
 * Componente para animar números
 */
export const GSAPCounter = ({
  target,
  duration,
  start,
  suffix = '',
  prefix = '',
  className = '',
}: GSAPCounterProps) => {
  const ref = useGSAPCounter(target, { duration, start })

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
