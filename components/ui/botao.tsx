import { cn } from '@/utils/cn'
import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr'
import type { ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
  variante?: 'primario' | 'fantasma'
  /** Abre em nova aba, com seta e `rel` seguro. `rotuloNovaAba` vai para leitor de tela. */
  externo?: boolean
  rotuloNovaAba?: string
  className?: string
}

/**
 * O botão do site é uma âncora: canto reto, 44px de altura, fio de 1px.
 * `primario` é tinta sobre o fundo (inverte com o tema); `fantasma` é só o
 * fio. Hover do primário vai ao accent — medido nos dois temas contra ground.
 */
export function Botao({ href, children, variante = 'primario', externo, rotuloNovaAba, className }: Props) {
  const base =
    'inline-flex min-h-11 items-center gap-2 whitespace-nowrap px-5 py-2.5 text-sm font-medium transition-[background-color,border-color,color] duration-300 ease-fluid'
  const estilo =
    variante === 'primario'
      ? 'bg-ink text-ground hover:bg-accent hover:text-ground'
      : 'border border-rule text-ink hover:border-ink-2'
  return (
    <a
      href={href}
      className={cn(base, estilo, className)}
      {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {externo && (
        <>
          <ArrowUpRightIcon size={14} weight="regular" aria-hidden="true" />
          {rotuloNovaAba && <span className="sr-only"> ({rotuloNovaAba})</span>}
        </>
      )}
    </a>
  )
}
