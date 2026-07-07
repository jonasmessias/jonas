'use client'

import { ibmPlexSans, jetbrainsMono } from '@/app/fonts'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface PreloaderProps {
  onComplete: () => void
}

/**
 * Minimal, fast, on-brand preloader.
 * Driven by the progress animation (~1s) instead of a fixed timeout, with a
 * safety fallback. Fully skipped for users who prefer reduced motion.
 */
export default function Preloader({ onComplete }: PreloaderProps) {
  const prefersReducedMotion = useReducedMotion()
  const finished = useRef(false)

  const finish = () => {
    if (finished.current) return
    finished.current = true
    onComplete()
  }

  // Safety net so the intro can never hang.
  useEffect(() => {
    const timer = setTimeout(finish, prefersReducedMotion ? 200 : 1500)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A0E14]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      role="status"
      aria-label="Loading"
    >
      {/* Soft ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-64 w-64 rounded-full bg-[#8B5CF6]/10 blur-[90px]"
      />

      <div className="relative flex flex-col items-center gap-5 px-8 py-7">
        {/* Corner brackets echoing the site motif */}
        <span aria-hidden className="pointer-events-none absolute inset-0">
          <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-[#8B5CF6]/60" />
          <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-[#8B5CF6]/60" />
          <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-[#8B5CF6]/60" />
          <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[#8B5CF6]/60" />
        </span>

        <motion.span
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`${ibmPlexSans.className} text-2xl font-semibold tracking-tight text-[#E5E7EB] sm:text-3xl`}
        >
          Jonas Messias
        </motion.span>

        <div
          className={`${jetbrainsMono.className} flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#64748B]`}
        >
          <span>full-stack engineer</span>
          <motion.span
            aria-hidden
            className="inline-block h-3 w-[7px] bg-[#8B5CF6]"
            animate={prefersReducedMotion ? {} : { opacity: [1, 0.15, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Progress hairline */}
        <div className="mt-1 h-px w-40 overflow-hidden bg-[#1F2937] sm:w-48">
          <motion.div
            className="h-full w-full origin-left bg-[#8B5CF6]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: [0.65, 0, 0.35, 1] }}
            onAnimationComplete={() => setTimeout(finish, 150)}
          />
        </div>
      </div>
    </motion.div>
  )
}
