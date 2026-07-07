'use client'

import { LanguageToggle } from '@/components/globals/language-toggle'
import Magnetic from '@/components/globals/magnetic'
import { Text } from '@/components/globals/text'
import { ThemeToggleButton } from '@/components/theme/theme-toggle-button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export const Header = () => {
  const t = useTranslations('navigation')

  const navLinks = [
    { key: 'about', href: '#about' },
    { key: 'technologies', href: '#technologies' },
    { key: 'projects', href: '#projects' },
    { key: 'experience', href: '#experience' },
    { key: 'contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/60">
      <nav className="py-3 sm:py-4 max-w-5xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Magnetic>
            <Link
              href="#home"
              className="font-mono text-sm sm:text-base font-semibold tracking-tight"
            >
              <span aria-hidden className="text-primary">{'>'}</span> {t('name')}
            </Link>
          </Magnetic>

          <ul className="hidden md:flex gap-5 lg:gap-7">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Magnetic>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Text tag="span" size="sm">
                      {t(link.key as any)}
                    </Text>
                  </Link>
                </Magnetic>
              </li>
            ))}
          </ul>

          <div className="flex gap-2 sm:gap-3 items-center">
            <LanguageToggle />
            <Magnetic>
              <ThemeToggleButton variant="circle" start="center" blur />
            </Magnetic>
          </div>
        </div>
      </nav>
    </header>
  )
}
