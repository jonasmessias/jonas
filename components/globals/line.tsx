'use client'
import { cn } from '@/utils/cn'
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'

interface CustomMouseEvent {
  movementY: number
  clientX: number
}

interface LineProps {
  audioSrc?: string
  volume?: number
  orientation?: 'horizontal' | 'vertical'
  className?: string
  /** Animação de entrada personalizada */
  animation?: {
    delay?: number
    duration?: number
    from?: 'left' | 'right' | 'top' | 'bottom' | 'center'
  }
}

export default function Line({
  audioSrc,
  volume = 0.5,
  orientation = 'horizontal',
  className = '',
  animation = { delay: 0, duration: 1, from: 'left' },
}: LineProps) {
  const path = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)

  let progress = 0
  let x = 0.5
  let time = Math.PI / 2
  let reqId: number | null = null

  useEffect(() => {
    setPath(progress)

    // Animação de entrada com GSAP
    if (containerRef.current) {
      const { delay = 0, duration = 1, from = 'left' } = animation

      // Definir estado inicial baseado na direção
      const initialState: gsap.TweenVars = {
        opacity: 0,
      }

      if (orientation === 'horizontal') {
        if (from === 'left') {
          initialState.x = -100
          initialState.scaleX = 0.3
        } else if (from === 'right') {
          initialState.x = 100
          initialState.scaleX = 0.3
        } else if (from === 'center') {
          initialState.scaleX = 0
        }
      } else {
        if (from === 'top') {
          initialState.y = -100
          initialState.scaleY = 0.3
        } else if (from === 'bottom') {
          initialState.y = 100
          initialState.scaleY = 0.3
        } else if (from === 'center') {
          initialState.scaleY = 0
        }
      }

      gsap.fromTo(containerRef.current, initialState, {
        opacity: 1,
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration,
        delay,
        ease: 'power3.out',
      })
    }

    // Só carrega áudio se audioSrc for fornecido
    if (audioSrc) {
      audioRef.current = new Audio(audioSrc)
      audioRef.current.volume = volume
      audioRef.current.preload = 'auto'

      audioRef.current.addEventListener('canplaythrough', () => {
        setIsAudioLoaded(true)
      })

      audioRef.current.addEventListener('error', () => {
        console.warn(`Failed to load audio: ${audioSrc}`)
        setIsAudioLoaded(false)
      })

      audioRef.current.addEventListener('ended', () => {
        // Audio ended
      })

      // Cleanup
      return () => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.src = ''
          audioRef.current = null
        }
      }
    }
  }, [audioSrc, volume, animation, orientation])

  const setPath = (progress: number) => {
    if (orientation === 'horizontal') {
      const width = window.innerWidth * 1
      path.current?.setAttributeNS(
        null,
        'd',
        `M0 250 Q${width * x} ${250 + progress}, ${width} 250`,
      )
    } else {
      // Vertical orientation
      const height = window.innerHeight * 1
      path.current?.setAttributeNS(
        null,
        'd',
        `M250 0 Q${250 + progress} ${height * x}, 250 ${height}`,
      )
    }
  }

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a

  const playAudio = () => {
    // Audio desabilitado temporariamente
    return

    // Código comentado temporariamente - descomentar para reativar o áudio
    // if (audioRef.current && isAudioLoaded) {
    //   // Só tenta tocar se o usuário já interagiu com a página
    //   audioRef.current.currentTime = 0
    //   const playPromise = audioRef.current.play()
    //
    //   if (playPromise !== undefined) {
    //     playPromise.catch(() => {
    //       // Silenciosamente ignora o erro se o usuário não interagiu ainda
    //     })
    //   }
    // }
  }

  const manageMouseEnter = () => {
    if (reqId) {
      cancelAnimationFrame(reqId)
      resetAnimation()
    }
  }

  const manageMouseMove = (e: CustomMouseEvent) => {
    const { movementY, clientX } = e

    const pathBound = path.current?.getBoundingClientRect()

    if (pathBound) {
      if (orientation === 'horizontal') {
        x = (clientX - pathBound.left) / pathBound.width
        progress += movementY * 0.5
      } else {
        // Vertical: usar clientY e movementX
        const clientY = (e as any).clientY
        const movementX = (e as any).movementX
        x = (clientY - pathBound.top) / pathBound.height
        progress += movementX * 0.5
      }
      setPath(progress)
    }
  }

  const manageMouseLeave = () => {
    if (Math.abs(progress) > 5) {
      playAudio()
    }
    animateOut()
  }

  const manageClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()

    if (orientation === 'horizontal') {
      const clickX = e.clientX - rect.left
      const clickRatio = clickX / rect.width
      x = clickRatio
    } else {
      const clickY = e.clientY - rect.top
      const clickRatio = clickY / rect.height
      x = clickRatio
    }

    progress = 50

    setPath(progress)

    playAudio()

    animateBounce()
  }

  const animateBounce = () => {
    const newProgress = progress * Math.sin(time)

    progress = lerp(progress, 0, 0.08)

    time += 0.3

    setPath(newProgress)

    if (Math.abs(progress) > 0.5) {
      reqId = requestAnimationFrame(animateBounce)
    } else {
      resetAnimation()
    }
  }

  const animateOut = () => {
    const newProgress = progress * Math.sin(time)

    progress = lerp(progress, 0, 0.025)

    time += 0.2

    setPath(newProgress)

    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut)
    } else {
      resetAnimation()
    }
  }

  const resetAnimation = () => {
    time = Math.PI / 2
    progress = 0
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        orientation === 'horizontal' ? 'w-full' : 'h-full',
        className,
      )}
    >
      {/* Área interativa invisível */}
      <div
        onMouseEnter={() => {
          manageMouseEnter()
        }}
        onMouseMove={(e) => {
          manageMouseMove(e)
        }}
        onMouseLeave={() => {
          manageMouseLeave()
        }}
        onClick={(e) => {
          manageClick(e)
        }}
        className={
          orientation === 'horizontal'
            ? 'relative z-10 h-12 w-full cursor-pointer'
            : 'relative z-10 w-12 h-full cursor-pointer'
        }
      >
        {/* SVG com a linha */}
        <svg
          className={
            orientation === 'horizontal'
              ? 'absolute w-full h-[500px] top-[-250px] left-0 pointer-events-none'
              : 'absolute h-full w-[500px] left-[-250px] top-0 pointer-events-none'
          }
        >
          <path
            ref={path}
            className="stroke-current text-black dark:text-white stroke-[1px] fill-none"
          ></path>
        </svg>
      </div>
    </div>
  )
}
