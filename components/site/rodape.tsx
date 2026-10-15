import { getUi } from '@/content/ui'
import { getPerfil } from '@/lib/dossie'
import type { Locale } from '@/lib/locale'
import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr'

type Props = { locale: Locale }

/**
 * O rodapé: ano, nome e local do dossiê; o código do site quando o perfil
 * registrar o repositório (campo opcional, B-1 à parte); voltar ao topo.
 * O padding fica no link (área de toque); o sublinhado, no texto.
 */
export function Rodape({ locale }: Props) {
  const perfil = getPerfil(locale)
  const ui = getUi(locale)
  const ano = new Date().getFullYear()

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 font-mono text-micro text-ink-2 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="py-3">
          © {ano} · <span translate="no">{perfil.nome.texto}</span> · {perfil.local.texto}
        </p>
        <ul className="flex flex-wrap items-center gap-x-6">
          {perfil.repositorio_do_site && (
            <li>
              <a
                href={perfil.repositorio_do_site.url}
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
