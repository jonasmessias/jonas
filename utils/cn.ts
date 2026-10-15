import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * clsx + tailwind-merge, ensinado sobre os tokens do @theme (cor, tamanho de
 * texto, espaço). Sem isto o merge não sabe que `text-micro` e `text-sm` são
 * ambos tamanho de fonte (e mantém os dois), nem que `text-ink-2` é cor.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: ['ground', 'ink', 'ink-2', 'rule', 'accent', 'hot', 'signal'],
      text: ['display', 'lead', 'body', 'label', 'micro'],
      spacing: ['s-1', 's-2', 's-3', 's-4', 's-5', 's-6', 's-7', 'stage', 'header'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
