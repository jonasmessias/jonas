'use client'

import { FlagIcon } from '@/components/globals/flag-icon'
import { localeNames, locales, type Locale } from '@/i18n/config'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false)
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const changeLocale = (newLocale: Locale) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border border-border hover:border-primary/50 transition-colors rounded-md bg-background"
        aria-label="Change language"
      >
        <FlagIcon locale={locale} className="w-5 h-4" />
        <span className="text-sm font-poppins uppercase">{locale}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 w-48 bg-background border border-border rounded-md shadow-lg overflow-hidden z-50"
          >
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => changeLocale(loc)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-colors ${
                  locale === loc ? 'bg-primary/5' : ''
                }`}
              >
                <FlagIcon locale={loc} className="w-6 h-5" />
                <span className="font-poppins text-sm">{localeNames[loc]}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
