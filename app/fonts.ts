import { Archivo, Martian_Mono } from 'next/font/google'

/**
 * As duas fontes da direção CORTE. O body declara a Archivo pelo CSS
 * (globals.css) consumindo --font-archivo; a microtipografia mono consome
 * --font-martian. As classes .variable no <body> são o que define essas
 * custom properties.
 *
 * - Archivo: display e texto — wght 100–900 e, DECLARADO DE PROPÓSITO,
 *   o eixo wdth 62–125. O `wdth` é o eixo de MOVIMENTO da direção: o nome
 *   no hero vai comprimir de `wdth 125` para `wdth 62` durante o scroll,
 *   e `transform: scaleX` deformaria a letra (hastes finas, curvas
 *   esmagadas) em vez de estreitá-la de verdade — largura variável troca
 *   o desenho do glifo, não a sua escala.
 * - Martian Mono: rótulo, legenda, microtipografia — wght variável.
 *   Ela TEM eixo wdth (75–112.5), mas não o declaramos: o gesto de
 *   largura pertence só ao display — usá-lo também na microtipografia
 *   diluiria o gesto e engordaria o arquivo da fonte por nada. Martian
 *   Mono fica na largura padrão (100) de propósito, não por falta de eixo.
 */
export const archivo = Archivo({
  weight: 'variable',
  axes: ['wdth'],
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
