'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

// Registrar plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GSAPScrollOptions {
  trigger?: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  markers?: boolean
  once?: boolean
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
}

/**
 * Hook para criar animações GSAP controladas por scroll
 * @param animation - Função que retorna a timeline ou animação GSAP
 * @param options - Opções do ScrollTrigger
 */
export const useGSAPScroll = <T extends Element = HTMLDivElement>(
  animation: (element: T) => gsap.core.Timeline | gsap.core.Tween | void,
  options: GSAPScrollOptions = {},
) => {
  const elementRef = useRef<T>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      const tl = animation(element)

      if (tl) {
        ScrollTrigger.create({
          trigger: options.trigger || element,
          start: options.start || 'top 80%',
          end: options.end || 'bottom 20%',
          scrub: options.scrub !== undefined ? options.scrub : false,
          pin: options.pin || false,
          markers: options.markers || false,
          once: options.once !== undefined ? options.once : true,
          animation: tl as gsap.core.Timeline,
          onEnter: options.onEnter,
          onLeave: options.onLeave,
          onEnterBack: options.onEnterBack,
          onLeaveBack: options.onLeaveBack,
        })
      }
    }, element)

    return () => ctx.revert()
  }, [animation, options])

  return elementRef
}

/**
 * Hook simples para revelar elementos ao scroll
 */
export const useGSAPReveal = <T extends Element = HTMLDivElement>(
  options: {
    from?: gsap.TweenVars
    to?: gsap.TweenVars
    duration?: number
    delay?: number
    stagger?: number
    start?: string
    once?: boolean
  } = {},
) => {
  const {
    from = { opacity: 0, y: 50 },
    to = { opacity: 1, y: 0 },
    duration = 1,
    delay = 0,
    stagger = 0,
    start = 'top 80%',
    once = true,
  } = options

  return useGSAPScroll<T>(
    (element) => {
      const children = element.children

      if (children.length > 1 && stagger > 0) {
        return gsap.fromTo(children, from, {
          ...to,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
        })
      }

      return gsap.fromTo(element, from, {
        ...to,
        duration,
        delay,
        ease: 'power3.out',
      })
    },
    { start, once },
  )
}

/**
 * Hook para parallax scroll
 */
export const useGSAPParallax = <T extends Element = HTMLDivElement>(
  speed: number = 0.5,
  direction: 'vertical' | 'horizontal' = 'vertical',
) => {
  return useGSAPScroll<T>(
    (element) => {
      const property = direction === 'vertical' ? 'yPercent' : 'xPercent'
      return gsap.to(element, {
        [property]: speed * 100,
        ease: 'none',
      })
    },
    {
      scrub: 1,
      start: 'top bottom',
      end: 'bottom top',
      once: false,
    },
  )
}

/**
 * Hook para split text reveal (letra por letra)
 */
export const useGSAPSplitText = <T extends HTMLElement = HTMLElement>(
  options: {
    delay?: number
    stagger?: number
    duration?: number
  } = {},
) => {
  const { delay = 0, stagger = 0.03, duration = 0.8 } = options

  return useGSAPScroll<T>(
    (element) => {
      const text = element.textContent || ''
      const chars = text.split('')

      // Limpar elemento
      element.innerHTML = ''

      // Criar spans para cada letra
      chars.forEach((char) => {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? '\u00A0' : char
        span.style.display = 'inline-block'
        element.appendChild(span)
      })

      const spans = element.querySelectorAll('span')

      return gsap.fromTo(
        spans,
        {
          opacity: 0,
          y: 20,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration,
          delay,
          stagger,
          ease: 'back.out(1.7)',
        },
      )
    },
    { start: 'top 70%', once: true },
  )
}

/**
 * Hook para animar números (counter)
 */
export const useGSAPCounter = (
  targetNumber: number,
  options: {
    duration?: number
    start?: string
  } = {},
) => {
  const { duration = 2, start = 'top 70%' } = options

  return useGSAPScroll<HTMLElement>(
    (element) => {
      const obj = { value: 0 }
      return gsap.to(obj, {
        value: targetNumber,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          element.textContent = Math.floor(obj.value).toString()
        },
      })
    },
    { start, once: true },
  )
}
