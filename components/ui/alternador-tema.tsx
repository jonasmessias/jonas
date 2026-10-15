'use client'

import { aplicarTema, CHAVE_TEMA, type Tema } from '@/lib/tema'
import { clsx } from 'clsx'

type Props = {
  /** aria-label, de content/ui.ts — estático: não depende do tema atual. */
  rotulo: string
  className?: string
}

/**
 * O alternador de tema. Sol e lua estão os dois no DOM e o CSS decide qual
 * aparece a partir do data-theme do <html> — nenhum estado React, então o
 * HTML do servidor e o do cliente são idênticos e não há mismatch nem flash.
 * O clique lê o tema vigente do documento, inverte, grava e aplica.
 */
export function AlternadorTema({ rotulo, className }: Props) {
  const alternar = () => {
    const atual: Tema = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
    const proximo: Tema = atual === 'light' ? 'dark' : 'light'
    aplicarTema(proximo)
    try {
      localStorage.setItem(CHAVE_TEMA, proximo)
    } catch {
      // Modo privado ou armazenamento bloqueado: o tema vale só nesta página.
    }
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={rotulo}
      title={rotulo}
      className={clsx(
        'flex h-11 w-11 items-center justify-center text-ink-2 transition-colors duration-300 ease-fluid hover:text-ink',
        className,
      )}
    >
      <Sol />
      <Lua />
    </button>
  )
}

/* Desenhados à mão, 1px de traço: dois SVGs minúsculos pesam menos que um
 * ícone de biblioteca no bundle do cliente. */
function Sol() {
  return (
    <svg
      data-icone-tema="sol"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
    </svg>
  )
}

function Lua() {
  return (
    <svg
      data-icone-tema="lua"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  )
}
