import { cn } from '@/utils/cn'
import type { ReactNode } from 'react'

type Props = {
  id: string
  titulo: string
  children: ReactNode
  /** Título à esquerda e conteúdo à direita a partir de md (o layout de Sobre, Stack, Contato). */
  colunas?: boolean
  /** Decoração sob o título (um Objeto, por exemplo). Só faz sentido com `colunas`, onde a coluna do título sobra. */
  ornamento?: ReactNode
  className?: string
}

/**
 * A casca de toda seção: âncora (`section[id]` já tem scroll-margin para o
 * header), largura de leitura, respiro responsivo e o fio de 1px no topo.
 * O h2 é mono — a voz técnica do site — em tinta, sem maiúsculas forçadas.
 */
export function Secao({ id, titulo, children, colunas = false, ornamento, className }: Props) {
  return (
    <section id={id} className={cn('py-16 md:py-24', className)}>
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className={cn('border-t border-rule pt-6', colunas ? 'grid gap-8 md:grid-cols-12' : 'flex flex-col gap-8')}>
          <div className={cn(colunas && 'md:col-span-3')}>
            <h2 className="font-mono text-base font-medium text-ink md:text-lg">{titulo}</h2>
            {ornamento}
          </div>
          <div className={cn(colunas && 'md:col-span-9')}>{children}</div>
        </div>
      </div>
    </section>
  )
}
