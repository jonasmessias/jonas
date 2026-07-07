'use client'

import Preloader from '@/components/globals/preloader'
import { MarkdownFile } from '@/lib/markdown'
import { AnimatePresence } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'

interface ClientPageProps {
  children: ReactNode
  projects: MarkdownFile[]
  experiences: MarkdownFile[]
}

export default function ClientPage({ children }: ClientPageProps) {
  const [showPreloader, setShowPreloader] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('hasSeenPreloader')) {
      setShowPreloader(true)
    }
  }, [])

  const handlePreloaderComplete = () => {
    setShowPreloader(false)
    sessionStorage.setItem('hasSeenPreloader', 'true')
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {/* Content is always server-rendered; the preloader overlays it on first visit. */}
      <main className="min-h-screen w-full bg-background relative z-10">
        {children}
      </main>
    </>
  )
}
