'use client'

import Magnetic from '@/components/globals/magnetic'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface PreloaderProps {
  onComplete: () => void
}

const CodeTerminal = ({ className = '' }: { className?: string }) => {
  const [currentCommand, setCurrentCommand] = useState(0)
  const [typingText, setTypingText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showTypedCommand, setShowTypedCommand] = useState(false)

  const commands = [
    'npm run dev',
    '> jonas@0.1.0 dev',
    '> next dev',
    '▲ Next.js 15.4.5',
    '- Local:        http://localhost:3000',
    '- Network:      http://00.00.00.000:3000',
    '✓ Starting...',
    '✓ Ready in 7s',
  ]

  useEffect(() => {
    const typeCommand = (command: string) => {
      setIsTyping(true)
      setTypingText('')

      let index = 0
      const typeInterval = setInterval(() => {
        if (index < command.length) {
          setTypingText(command.substring(0, index + 1))
          index++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)
          setShowTypedCommand(true)

          setTimeout(() => {
            setCurrentCommand((prev) => prev + 1)
          }, 100) // Reduzido de 200ms para 100ms
        }
      }, 30) // Reduzido de 50ms para 30ms - digitação mais rápida
    }

    if (currentCommand < commands.length) {
      typeCommand(commands[currentCommand])
    }
  }, [currentCommand])

  return (
    <div className={`${className}`}>
      <svg
        width="600"
        height="500"
        viewBox="0 0 600 500"
        className="w-full h-auto"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          x="10"
          y="10"
          width="580"
          height="480"
          fill="#000000"
          stroke="#1a1a1a"
          strokeWidth="2"
          filter="url(#glow)"
        />

        <rect
          x="15"
          y="15"
          width="570"
          height="35"
          fill="#1a1a1a"
          stroke="#333333"
          strokeWidth="1"
        />

        <text x="70" y="37" fill="#ffffff" fontSize="16" fontFamily="monospace">
          Terminal - jonas-messias
        </text>

        <circle cx="30" cy="33" r={5} fill="#ff0000" />
        <circle cx="43" cy="33" r={5} fill="#ffff00" />
        <circle cx="56" cy="33" r={5} fill="#00ff00" />

        <rect
          x="15"
          y="55"
          width="570"
          height="430"
          fill="#000000"
          stroke="#333333"
          strokeWidth="1"
        />

        <text x="25" y="85" fill="#00ff00" fontSize="14" fontFamily="monospace">
          ❯
        </text>

        {!showTypedCommand ? (
          <text
            x="40"
            y="85"
            fill="#ffffff"
            fontSize="14"
            fontFamily="monospace"
          >
            {typingText}
            {isTyping && (
              <motion.rect
                x={40 + typingText.length * 8.5}
                y="105"
                width="3"
                height="18"
                fill="#ffffff"
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </text>
        ) : (
          <text
            x="40"
            y="85"
            fill="#ffffff"
            fontSize="14"
            fontFamily="monospace"
          >
            npm run dev
          </text>
        )}

        {currentCommand >= 1 && (
          <text
            x="25"
            y="115"
            fill="#ffffff"
            fontSize="14"
            fontFamily="monospace"
          >
            &gt; jonas@0.1.0 dev
          </text>
        )}

        {currentCommand >= 2 && (
          <text
            x="25"
            y="145"
            fill="#ffffff"
            fontSize="14"
            fontFamily="monospace"
          >
            &gt; next dev
          </text>
        )}

        {currentCommand >= 3 && (
          <text
            x="25"
            y="175"
            fill="#8b5cf6"
            fontSize="14"
            fontFamily="monospace"
          >
            ▲ Next.js 15.4.5
          </text>
        )}

        {currentCommand >= 4 && (
          <text
            x="25"
            y="205"
            fill="#ffffff"
            fontSize="14"
            fontFamily="monospace"
          >
            - Local: http://localhost:3000
          </text>
        )}

        {currentCommand >= 5 && (
          <text
            x="25"
            y="235"
            fill="#ffffff"
            fontSize="14"
            fontFamily="monospace"
          >
            - Network: http://00.00.00.000:3000
          </text>
        )}

        {currentCommand >= 6 && (
          <text
            x="25"
            y="265"
            fill="#00ff00"
            fontSize="14"
            fontFamily="monospace"
          >
            ✓ Starting...
          </text>
        )}

        {currentCommand >= 7 && (
          <text
            x="25"
            y="295"
            fill="#00ff00"
            fontSize="14"
            fontFamily="monospace"
          >
            ✓ Ready in 7s
          </text>
        )}
      </svg>
    </div>
  )
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setTimeout(() => {
        onComplete()
      }, 500) // Delay para animação de saída
    }, 3000) // Reduzido para 3s - preloader mais rápido

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="terminal"
            initial={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="absolute inset-0 bg-black flex items-center justify-center"
          >
            <Magnetic>
              <CodeTerminal />
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
