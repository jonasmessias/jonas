import { chaveDeRotulo, marcas, simbolos, type ChaveIcone } from '@/content/icones'
import { cn } from '@/utils/cn'

type Props = {
  /** O texto do dossiê ("React 19", "Cypress (E2E)"); a chave sai dele. */
  rotulo: string
  /** Chave explícita, quando o rótulo é uma frase e quem renderiza sabe a marca. */
  icone?: ChaveIcone
  size?: number
  className?: string
}

/**
 * Ícone monocromático (currentColor) ao lado de um item da stack. Renderiza
 * no servidor: a marca vira <svg><path>, o símbolo é um phosphor /ssr. Sem
 * chave que case, devolve null — o item fica só com o texto, nunca com um
 * ícone errado. É decorativo (aria-hidden): o rótulo ao lado é o nome.
 */
export function IconeTech({ rotulo, icone, size = 16, className }: Props) {
  const chave = icone ?? chaveDeRotulo(rotulo)
  if (!chave) return null

  if (chave in simbolos) {
    const Simbolo = simbolos[chave as keyof typeof simbolos]
    return <Simbolo size={size} weight="light" className={cn('shrink-0', className)} aria-hidden="true" />
  }

  const marca = marcas[chave as keyof typeof marcas]
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <path d={marca.path} />
    </svg>
  )
}
