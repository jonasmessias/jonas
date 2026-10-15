import { cn } from '@/utils/cn'

/**
 * As etiquetas de stack (Experiência, Projetos) e o chip de estado dos
 * cards. Mono micro, fio de 1px, canto reto — o mesmo desenho nos dois
 * lugares para a tela ler "é a mesma coisa". Os itens chegam verbatim do
 * dossiê; `translate="no"` porque são nomes de tecnologia.
 */
export function Etiquetas({ itens, rotulo, className }: { itens: readonly string[]; rotulo?: string; className?: string }) {
  return (
    <ul aria-label={rotulo} className={cn('flex flex-wrap gap-1.5', className)}>
      {itens.map((item) => (
        <li
          key={item}
          translate="no"
          className="border border-rule px-2 py-1 font-mono text-micro text-ink-2 wrap-anywhere"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

/** O chip de estado ("Código privado"): sinal decorativo atrás, tinta na frente — legível nos dois temas. */
export function Chip({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border border-rule px-2 py-1 font-mono text-micro text-ink',
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 shrink-0 bg-signal" />
      {children}
    </span>
  )
}
