"use client"
import React, { useEffect, useRef, useState } from "react"

interface CustomMouseEvent {
  movementY: number
  clientX: number
}

interface LineProps {
  audioSrc?: string
  volume?: number
}

export default function Line({ audioSrc = "/sounds/guitar-string.mp3", volume = 0.5 }: LineProps) {
  const path = useRef<SVGPathElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)

  let progress = 0
  let x = 0.5
  let time = Math.PI / 2
  let reqId: number | null = null

  useEffect(() => {
    setPath(progress)
    
    if (audioSrc) {
      audioRef.current = new Audio(audioSrc)
      audioRef.current.volume = volume
      audioRef.current.preload = "auto"
      
      audioRef.current.addEventListener("canplaythrough", () => {
        setIsAudioLoaded(true)
      })
      
      audioRef.current.addEventListener("ended", () => {
        // Audio ended
      })
    }
  }, [audioSrc, volume])

  const setPath = (progress: number) => {
    const width = window.innerWidth * 1

    path.current?.setAttributeNS(
      null,
      "d",
      `M0 250 Q${width * x} ${250 + progress}, ${width} 250`
    )
  }

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a

  const playAudio = () => {
    // Audio desabilitado temporariamente
    return;
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
      x = (clientX - pathBound.left) / pathBound.width
      progress += movementY * 0.5
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
    const clickX = e.clientX - rect.left
    const clickRatio = clickX / rect.width
    
    x = clickRatio
    
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
    <div className="relative w-full h-px mb-5">
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
        className="relative z-10 h-10 w-full top-[-40px] cursor-pointer"
      ></div>
      <svg className="absolute w-full h-[500px] top-[-250px] pointer-events-none">
        <path
          ref={path}
          className="stroke-current text-black dark:text-white stroke-[1px] fill-none"
        ></path>
      </svg>
    </div>
  )
}