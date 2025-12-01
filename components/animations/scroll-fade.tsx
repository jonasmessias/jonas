'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactNode, useEffect, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollFadeProps {
  children: ReactNode
  className?: string
  fadeOutOnScroll?: boolean
  start?: string
  end?: string
}

export default function ScrollFade({
  children,
  className = '',
  fadeOutOnScroll = false,
  start = 'top center',
  end = 'bottom top',
}: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const animation = gsap.to(element, {
      opacity: fadeOutOnScroll ? 0 : 1,
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub: true,
      },
    })

    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
    }
  }, [fadeOutOnScroll, start, end])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
