'use client'

import { LanguageToggle } from '@/components/globals/language-toggle'
import Line from '@/components/globals/line'
import Magnetic from '@/components/globals/magnetic'
import { Text } from '@/components/globals/text'
import { ThemeToggleButton } from '@/components/theme/theme-toggle-button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export const Header = () => {
  const t = useTranslations('navigation')

  const navLinks = [
    { key: 'technologies', href: '#technologies' },
    { key: 'projects', href: '#projects' },
    { key: 'experience', href: '#experience' },
    { key: 'contact', href: '#contact' },
  ]

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="py-3 sm:py-4 max-w-600 mx-auto">
        <div className="px-4 sm:px-6 flex justify-between items-center">
          <div className="flex gap-2">
            <Magnetic>
              <Link href="#home">
                <Text size="lg" className="text-base sm:text-lg">
                  {t('name')}
                </Text>
              </Link>
            </Magnetic>
          </div>
          <ul className="hidden md:flex gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Magnetic>
                  <Text size="lg" className="capitalize text-sm lg:text-base">
                    <Link href={link.href}>{t(link.key as any)}</Link>
                  </Text>
                </Magnetic>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 sm:gap-4 items-center">
            <LanguageToggle />
            <Magnetic>
              <ThemeToggleButton variant="circle" start="center" blur />
            </Magnetic>
          </div>
        </div>
      </nav>
      <Line
        className="absolute -bottom-12 left-0 w-full h-12 opacity-50"
        animation={{ delay: 0.8, duration: 1.2, from: 'left' }}
      />
    </header>
  )
}
