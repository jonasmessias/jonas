'use client'

import AnimatedBackground from '@/components/animations/animated-background'
import AnimatedElement from '@/components/animations/animated-element'
import AnimatedText from '@/components/animations/animated-text'
import Magnetic from '@/components/globals/magnetic'
import Button from '@/components/ui/button'
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
  const [showModal, setShowModal] = useState(false)
  const [isDetaching, setIsDetaching] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDetaching(true)
      setLoading(false)
      setShowModal(true)
    }, 4500) // Reduzido de 10000ms (10s) para 4500ms (4.5s)

    return () => clearTimeout(timer)
  }, [])

  const handleModalClose = () => {
    setIsDetaching(true)
    setShowModal(false)
    setTimeout(() => {
      onComplete()
    }, 400) // Reduzido de 500ms para 400ms - saída mais rápida
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="terminal"
            initial={{
              opacity: 1,
              width: '100%',
              height: '100%',
              x: 0,
              y: 0,
              scale: 1,
            }}
            exit={{
              x: '-100%',
              scale: 0.8,
            }}
            animate={{
              x: isDetaching ? '-100%' : 0,
              y: isDetaching ? 0 : 0,
              scale: isDetaching ? 0.8 : 1,
            }}
            transition={{
              scale: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
              x: { duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            className="absolute inset-0 bg-black flex items-center justify-center"
          >
            <Magnetic>
              <CodeTerminal />
            </Magnetic>
          </motion.div>
        )}

        {showModal && (
          <motion.div
            key="modal"
            initial={{
              opacity: 1,
              x: '100%',
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1,
            }}
            transition={{
              x: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
              scale: {
                duration: 0.5,
                delay: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }}
            className="absolute inset-0 flex items-center justify-center bg-black"
            onClick={handleModalClose}
          >
            <AnimatedBackground />

            <motion.div
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                delay: 0.6,
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="p-8 max-w-lg w-full text-center relative z-10 bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatedText
                variant="typewriter"
                text="Welcome to my website!"
                className="text-3xl font-bold mb-6 text-black"
                staggerDelay={0.03}
              />

              <AnimatedElement variant="fadeInUp" delay={0.4}>
                <AnimatedText
                  variant="slideUp"
                  text="Here you will find my projects, skills"
                  className="text-black  text-lg"
                  staggerDelay={0.02}
                />
                <AnimatedText
                  variant="slideUp"
                  text="and experiences as a developer."
                  className="text-black mb-8 text-lg"
                  staggerDelay={0.02}
                />
              </AnimatedElement>

              <AnimatedElement variant="fadeInUp" delay={0.5}>
                <Button
                  onClick={handleModalClose}
                  magnetic
                  className="w-full border-2 border-black group"
                >
                  <span className="group-hover:animate-none animate-pulse">
                    Tap to start
                  </span>
                </Button>
              </AnimatedElement>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
