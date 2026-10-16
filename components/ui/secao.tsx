import { Octaedro } from '@/components/motion/octaedro'
import { Revelar } from '@/components/ui/revelar'
import { cn } from '@/utils/cn'
import type { ReactNode } from 'react'

type Props = {
  id: string
  titulo: string
  children: ReactNode
  /** Título à esquerda e conteúdo à direita a partir de md (o layout de Sobre, Stack, Contato). */
  colunas?: boolean
  className?: string
}

/**
 * A casca de toda seção: âncora (`section[id]` já tem scroll-margin para o
 * header), largura de leitura, respiro responsivo e o fio de 1px no topo.
 * O h2 é mono — a voz técnica do site — em tinta, sem maiúsculas forçadas.
 *
 * Antes do título, a marca da casa: o octaedro em 14px, o mesmo sólido da
 * capa, como o nó de uma estação. Ele se assenta (gira e aparece, CSS em
 * globals.css, `.secao-marca`) quando a seção entra na tela — por isso o
 * Revelar; sem JS ou com reduced motion ele já nasce parado e visível.
 */
export function Secao({ id, titulo, children, colunas = false, className }: Props) {
  return (
    <section id={id} className={cn('py-16 md:py-24', className)}>
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className={cn('border-t border-rule pt-6', colunas ? 'grid gap-8 md:grid-cols-12' : 'flex flex-col gap-8')}>
          <h2 className={cn('flex items-center gap-3 font-mono text-base font-medium text-ink md:text-lg', colunas && 'md:col-span-3 md:self-start')}>
            <Revelar as="span" className="secao-marca">
              <Octaedro />
            </Revelar>
            {titulo}
          </h2>
          <div className={cn(colunas && 'md:col-span-9')}>{children}</div>
        </div>
      </div>
    </section>
  )
}
