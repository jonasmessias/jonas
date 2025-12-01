'use client'
import { ReactNode } from 'react'
import Line from './line'

interface InteractiveBoxProps {
  children?: ReactNode
  className?: string
  audioSrc?: string
  volume?: number
  showTop?: boolean
  showRight?: boolean
  showBottom?: boolean
  showLeft?: boolean
}

export default function InteractiveBox({
  children,
  className = '',
  audioSrc,
  volume,
  showTop = true,
  showRight = true,
  showBottom = true,
  showLeft = true,
}: InteractiveBoxProps) {
  return (
    <div className={`relative ${className}`}>
      {showTop && (
        <div className="absolute top-0 left-0 w-full z-30">
          <Line
            orientation="horizontal"
            audioSrc={audioSrc}
            volume={volume}
            animation={{ delay: 0.1, duration: 1, from: 'left' }}
          />
        </div>
      )}
      {showRight && (
        <div className="absolute top-0 right-0 h-full z-30">
          <Line
            orientation="vertical"
            audioSrc={audioSrc}
            volume={volume}
            animation={{ delay: 0.2, duration: 1, from: 'top' }}
          />
        </div>
      )}
      {showBottom && (
        <div className="absolute bottom-0 left-0 w-full z-30">
          <Line
            orientation="horizontal"
            audioSrc={audioSrc}
            volume={volume}
            animation={{ delay: 0.3, duration: 1, from: 'right' }}
          />
        </div>
      )}
      {showLeft && (
        <div className="absolute top-0 left-0 h-full z-30">
          <Line
            orientation="vertical"
            audioSrc={audioSrc}
            volume={volume}
            animation={{ delay: 0.4, duration: 1, from: 'bottom' }}
          />
        </div>
      )}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  )
}
