import { IconeTech } from '@/components/ui/icone-tech'
import { Secao } from '@/components/ui/secao'
import { getConteudo } from '@/content'
import { getUi } from '@/content/ui'
import type { Locale } from '@/lib/locale'
import { cn } from '@/utils/cn'

type Props = { locale: Locale }

/** Stack: uma linha por grupo, só nomes, com ícone quando existe. A última linha é o que está sendo estudado. */
export function Stack({ locale }: Props) {
  const c = getConteudo(locale)
  const ui = getUi(locale)
  const linhas = [
    ...c.stack.map((g) => ({ ...g, apagado: false })),
    ...(c.estudando.length ? [{ grupo: ui.stack.estudando, itens: c.estudando, apagado: true }] : []),
  ]

  return (
    <Secao id="stack" titulo={ui.stack.titulo}>
      <ul className="flex flex-col">
        {linhas.map((g) => (
          <li key={g.grupo} className="grid gap-2 border-t border-rule py-5 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-6">
            <h3 className="font-mono text-micro text-ink-2 md:col-span-3 md:pt-1">{g.grupo}</h3>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 md:col-span-9">
              {g.itens.map((item) => (
                <li
                  key={item}
                  className={cn('group flex items-start gap-2 text-sm leading-snug', g.apagado ? 'text-ink-2' : 'text-ink')}
                >
                  <IconeTech
                    rotulo={item}
                    className="mt-0.5 text-ink-2 transition-colors duration-300 ease-fluid group-hover:text-accent"
                  />
                  <span translate="no">{item}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Secao>
  )
}
