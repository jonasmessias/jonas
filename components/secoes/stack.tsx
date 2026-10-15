import { IconeTech } from '@/components/ui/icone-tech'
import { Secao } from '@/components/ui/secao'
import { getUi } from '@/content/ui'
import { getEngenharia } from '@/lib/dossie'
import type { Locale } from '@/lib/locale'
import { cn } from '@/utils/cn'

type Props = { locale: Locale }

/**
 * Os grupos que a seção mostra, nesta ordem — é apresentação (o precedente
 * `IDS` de capacidades.tsx). Os outros grupos de engenharia.md continuam no
 * dossiê; só não cabem numa seção de leitura rápida. `secundarias` fecha a
 * lista, em tinta apagada, como o "Estudando" do site de referência.
 */
const IDS = ['linguagens', 'frontend', 'backend', 'dados', 'testes', 'entrega', 'secundarias'] as const

/**
 * Stack: uma linha por grupo, título em mono à esquerda, itens com ícone à
 * direita. Título e itens saem verbatim do dossiê; item sem ícone mapeado
 * sai só como texto (IconeTech devolve null). Hover do ícone em accent, não
 * na cor da marca — é a identidade do site, não a da ferramenta.
 */
export function Stack({ locale }: Props) {
  const engenharia = getEngenharia(locale)
  const ui = getUi(locale)
  const grupos = IDS.map((id) => {
    const g = engenharia.grupos.find((x) => x.id === id)
    if (!g) throw new Error(`engenharia.${locale}.md: grupo "${id}" ausente`)
    return g
  })

  return (
    <Secao id="stack" titulo={ui.stack.titulo}>
      <ul className="flex flex-col">
        {grupos.map((g) => {
          const apagado = g.id === 'secundarias'
          return (
            <li
              key={g.id}
              className="grid gap-2 border-t border-rule py-5 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-6"
            >
              <h3 className="font-mono text-micro text-ink-2 md:col-span-3 md:pt-1">{g.titulo}</h3>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 md:col-span-9">
                {g.itens.map((item) => (
                  <li
                    key={item}
                    className={cn('group flex items-start gap-2 text-sm leading-snug', apagado ? 'text-ink-2' : 'text-ink')}
                  >
                    <IconeTech
                      rotulo={item}
                      className="mt-0.5 text-ink-2 transition-colors duration-300 ease-fluid group-hover:text-accent"
                    />
                    <span translate="no" className="wrap-anywhere">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </Secao>
  )
}
