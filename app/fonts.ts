import { Archivo, Martian_Mono } from 'next/font/google'

/**
 * As duas fontes do site. As classes .variable no <html> declaram
 * --font-archivo e --font-martian; o globals.css os consome.
 *
 * - Archivo: display e texto, peso variável.
 * - Martian Mono: rótulo, legenda, microtipografia.
 */
export const archivo = Archivo({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

export const martianMono = Martian_Mono({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-martian',
  display: 'swap',
})
