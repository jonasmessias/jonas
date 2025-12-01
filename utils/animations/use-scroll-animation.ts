'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

// Registrar plugin do GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export type ScrollAnimationVariant =
  | 'fadeIn'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'scaleIn'
  | 'slideInLeft'
  | 'slideInRight'

interface UseScrollAnimationOptions {
  variant?: ScrollAnimationVariant
  duration?: number
  delay?: number
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  once?: boolean
}

/**
 * Hook para criar animações com GSAP ScrollTrigger
 *
 * @example
 * const ref = useScrollAnimation({ variant: "fadeInUp", duration: 1 })
 * return <div ref={ref}>Animated content</div>
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {},
) {
  const {
    variant = 'fadeIn',
    duration = 1,
    delay = 0,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    markers = false,
    once = true,
  } = options

  const elementRef = useRef<T>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Definir estado inicial baseado na variante
    const initialState = getInitialState(variant)
    gsap.set(element, initialState)

    // Criar animação
    const animation = gsap.to(element, {
      ...getFinalState(variant),
      duration,
      delay,
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        markers,
        once,
      },
    })

    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
    }
  }, [variant, duration, delay, start, end, scrub, markers, once])

  return elementRef
}

// Helper: Estado inicial da animação
function getInitialState(variant: ScrollAnimationVariant) {
  const states = {
    fadeIn: { opacity: 0 },
    fadeInUp: { opacity: 0, y: 50 },
    fadeInDown: { opacity: 0, y: -50 },
    fadeInLeft: { opacity: 0, x: -50 },
    fadeInRight: { opacity: 0, x: 50 },
    scaleIn: { opacity: 0, scale: 0.8 },
    slideInLeft: { x: -100 },
    slideInRight: { x: 100 },
  }
  return states[variant]
}

// Helper: Estado final da animação
function getFinalState(variant: ScrollAnimationVariant) {
  const states = {
    fadeIn: { opacity: 1 },
    fadeInUp: { opacity: 1, y: 0 },
    fadeInDown: { opacity: 1, y: 0 },
    fadeInLeft: { opacity: 1, x: 0 },
    fadeInRight: { opacity: 1, x: 0 },
    scaleIn: { opacity: 1, scale: 1 },
    slideInLeft: { x: 0 },
    slideInRight: { x: 0 },
  }
  return states[variant]
}
