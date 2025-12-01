'use client'

import {
  AngularIcon,
  JavaIcon,
  JsIcon,
  MySQLIcon,
  NextIcon,
  PHPIcon,
  PostgreSQLIcon,
  ReactIcon,
  TypeScriptIcon,
} from '@/components/globals/icons'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface AnimatedBackgroundProps {
  className?: string
}

const technologies = [
  { label: 'JavaScript', icon: JsIcon },
  { label: 'Next.js', icon: NextIcon },
  { label: 'Angular', icon: AngularIcon },
  { label: 'React', icon: ReactIcon },
  { label: 'TypeScript', icon: TypeScriptIcon },
  { label: 'Java', icon: JavaIcon },
  { label: 'MySQL', icon: MySQLIcon },
  { label: 'PostgreSQL', icon: PostgreSQLIcon },
  { label: 'PHP', icon: PHPIcon },
]

interface IconState {
  x: number
  y: number
  vx: number
  vy: number
  element: HTMLElement
  size: number
}

export default function AnimatedBackground({
  className = '',
}: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const iconStatesRef = useRef<IconState[]>([])
  const containerBoundsRef = useRef<{ width: number; height: number }>()
  const [isVisible, setIsVisible] = useState(false)
  const [visibleIcons, setVisibleIcons] = useState<number[]>([])
  const hasStartedRef = useRef(false)

  useEffect(() => {
    if (!containerRef.current || !iconsRef.current) return

    const container = containerRef.current
    const icons = iconsRef.current
    const iconsArray = Array.from(icons.children) as HTMLElement[]

    const updateBounds = () => {
      const rect = container.getBoundingClientRect()
      containerBoundsRef.current = {
        width: rect.width,
        height: rect.height,
      }
    }

    updateBounds()
    window.addEventListener('resize', updateBounds)

    const getIconPixelSize = (label: string) => {
      switch (label) {
        case 'Java':
        case 'MySQL':
          return 140
        case 'PostgreSQL':
        case 'PHP':
        case 'React':
        case 'Next.js':
          return 120
        case 'JavaScript':
        case 'TypeScript':
        default:
          return 100
      }
    }

    const initializeIconStates = () => {
      iconStatesRef.current = iconsArray.map((icon, index) => {
        const bounds = containerBoundsRef.current!
        const size = getIconPixelSize(technologies[index].label)

        const x = Math.random() * (bounds.width - size)
        const y = Math.random() * (bounds.height - size)

        const speed = 0.5 + Math.random() * 0.4
        const angle = Math.random() * Math.PI * 2
        const vx = Math.cos(angle) * speed
        const vy = Math.sin(angle) * speed

        return {
          x,
          y,
          vx,
          vy,
          element: icon,
          size,
        }
      })
    }

    const animate = () => {
      const bounds = containerBoundsRef.current!
      const states = iconStatesRef.current

      states.forEach((state, index) => {
        state.x += state.vx
        state.y += state.vy

        if (state.x <= 0 || state.x >= bounds.width - state.size) {
          state.vx = -state.vx
          state.x = Math.max(0, Math.min(state.x, bounds.width - state.size))
        }

        if (state.y <= 0 || state.y >= bounds.height - state.size) {
          state.vy = -state.vy
          state.y = Math.max(0, Math.min(state.y, bounds.height - state.size))
        }

        states.forEach((otherState, otherIndex) => {
          if (index !== otherIndex) {
            const dx =
              state.x + state.size / 2 - (otherState.x + otherState.size / 2)
            const dy =
              state.y + state.size / 2 - (otherState.y + otherState.size / 2)
            const distance = Math.sqrt(dx * dx + dy * dy)
            const minDistance = (state.size + otherState.size) / 2

            if (distance < minDistance) {
              const angle = Math.atan2(dy, dx)

              const relativeVx = state.vx - otherState.vx
              const relativeVy = state.vy - otherState.vy

              const normalVx = dx / distance
              const normalVy = dy / distance

              const dotProduct = relativeVx * normalVx + relativeVy * normalVy

              if (dotProduct < 0) {
                const impulse = -dotProduct

                state.vx += impulse * normalVx
                state.vy += impulse * normalVy
                otherState.vx -= impulse * normalVx
                otherState.vy -= impulse * normalVy
              }

              const separation = minDistance - distance + 2
              const sepX = (dx / distance) * separation * 0.5
              const sepY = (dy / distance) * separation * 0.5

              state.x += sepX
              state.y += sepY
              otherState.x -= sepX
              otherState.y -= sepY
            }
          }
        })

        state.element.style.transform = `translate(${state.x}px, ${state.y}px)`
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      if (hasStartedRef.current) return
      hasStartedRef.current = true

      initializeIconStates()
      animate()
      setIsVisible(true)

      technologies.forEach((_, index) => {
        setTimeout(() => {
          setVisibleIcons((prev) => [...prev, index])
        }, index * 150 + 100)
      })
    }

    const timer = setTimeout(startAnimation, 100)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', updateBounds)
      clearTimeout(timer)
    }
  }, [])

  const getIconSize = (label: string) => {
    switch (label) {
      case 'Java':
      case 'MySQL':
        return 'w-30 h-30'
      case 'PostgreSQL':
      case 'PHP':
      case 'React':
      case 'Next.js':
        return 'w-28 h-28'
      case 'JavaScript':
      case 'TypeScript':
      default:
        return 'w-24 h-24'
    }
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: 1,
        x: 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
    >
      <motion.div
        ref={iconsRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute inset-0`}
      >
        {technologies.map((tech, index) => {
          const IconComponent = tech.icon
          const iconSize = getIconSize(tech.label)
          const isIconVisible = visibleIcons.includes(index)

          return (
            <div
              key={tech.label}
              className={`absolute flex items-center justify-center opacity-100 hover:opacity-80 transition-opacity duration-300 ${iconSize}`}
              title={tech.label}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={
                  isIconVisible
                    ? {
                        scale: [0, 1.8, 1],
                      }
                    : { scale: 0 }
                }
                transition={{
                  duration: 1,
                  times: [0, 0.3, 1],
                  ease: 'easeInOut',
                }}
                className="w-full h-full"
              >
                <IconComponent className="text-white w-full h-full" />
              </motion.div>
            </div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
