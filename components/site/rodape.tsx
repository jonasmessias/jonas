import { getConteudo } from '@/content'
import { getUi } from '@/content/ui'
import type { Locale } from '@/lib/locale'
import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr'

type Props = { locale: Locale }

/** O rodapé: ano, nome e cidade; o código do site; voltar ao topo. */
export function Rodape({ locale }: Props) {
  const c = getConteudo(locale)
  const ui = getUi(locale)
  const ano = new Date().getFullYear()

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 font-mono text-micro text-ink-2 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="py-3">
          © {ano} · <span translate="no">{c.nome}</span> · {c.local}
        </p>
        <ul className="flex flex-wrap items-center gap-x-6">
          {c.repositorio && (
            <li>
              <a
                href={c.repositorio}
                target="_blank"
                rel="noopener noreferrer"
                className="group -ml-2 inline-flex min-h-11 items-center gap-1 px-2 transition-colors duration-300 ease-fluid hover:text-ink"
              >
                <span className="link-draw">{ui.rodape.codigoDoSite}</span>
                <ArrowUpRightIcon size={12} weight="regular" aria-hidden="true" />
                <span className="sr-only">({ui.abreEmNovaAba})</span>
              </a>
            </li>
          )}
          <li>
            <a
              href="#topo"
              className="group -ml-2 inline-flex min-h-11 items-center px-2 transition-colors duration-300 ease-fluid hover:text-ink"
            >
              <span className="link-draw">{ui.rodape.voltarAoTopo}</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
