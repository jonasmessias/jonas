import { IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google'

/**
 * Shared brand fonts (Terminal / Engineer direction).
 * - IBM Plex Sans: UI, headings and body.
 * - JetBrains Mono: labels, tags, section numbers and code-like accents.
 */
export const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})
