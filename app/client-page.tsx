'use client'

import Preloader from '@/components/globals/preloader'
import { MarkdownFile } from '@/lib/markdown'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'

interface ClientPageProps {
  children: ReactNode
  projects: MarkdownFile[]
  experiences: MarkdownFile[]
}

export default function ClientPage({ children }: ClientPageProps) {
  const [loading, setLoading] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader')

    if (!hasSeenPreloader) {
      setLoading(true)
    } else {
      setShowContent(true)
    }
  }, [])

  const handlePreloaderComplete = () => {
    setLoading(false)
    setShowContent(true)
    sessionStorage.setItem('hasSeenPreloader', 'true')
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {showContent && (
        <motion.main
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="min-h-screen w-full bg-background relative z-10"
        >
          {children}
        </motion.main>
      )}
    </>
  )
}
