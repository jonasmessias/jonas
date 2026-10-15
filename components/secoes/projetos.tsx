import { Chip, Etiquetas } from '@/components/ui/etiqueta'
import { PainelFoco } from '@/components/ui/painel-foco'
import { Revelar } from '@/components/ui/revelar'
import { Secao } from '@/components/ui/secao'
import { getConteudo, type Projeto } from '@/content'
import { getUi, type Ui } from '@/content/ui'
import type { Locale } from '@/lib/locale'
import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr'

type Props = { locale: Locale }

const link =
  'group inline-flex min-h-11 items-center gap-1 font-mono text-micro text-accent transition-colors duration-300 ease-fluid hover:text-hot'

function LinkExterno({ href, children, ui }: { href: string; children: string; ui: Ui }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
      <span className="link-draw wrap-anywhere">{children}</span>
      <ArrowUpRightIcon size={12} weight="regular" aria-hidden="true" />
      <span className="sr-only"> ({ui.abreEmNovaAba})</span>
    </a>
  )
}

/** Os links de um projeto: "Ver código" quando há repositório, depois os links que o projeto declarar. */
function Links({ p, ui }: { p: Projeto; ui: Ui }) {
  if (!p.repo && !p.links?.length) return null
  return (
    <ul className="mt-3 flex flex-wrap items-center gap-x-6">
      {p.repo && (
        <li>
          <LinkExterno href={p.repo} ui={ui}>
            {ui.projetos.verCodigo}
          </LinkExterno>
        </li>
      )}
      {p.links?.map((l) => (
        <li key={l.url}>
          <LinkExterno href={l.url} ui={ui}>
            {l.texto}
          </LinkExterno>
        </li>
      ))}
    </ul>
  )
}

/** Projetos: os destaques em cards; os demais numa lista dividida por fios; no fim, o GitHub. */
export function Projetos({ locale }: Props) {
  const c = getConteudo(locale)
  const ui = getUi(locale)
  const destaques = c.projetos.filter((p) => p.destaque)
  const lista = c.projetos.filter((p) => !p.destaque)

  return (
    <Secao id="projetos" titulo={ui.nav.projetos}>
      {destaques.length > 0 && (
        <ul className="grid gap-4 md:grid-cols-2">
          {destaques.map((p, i) => (
            <Revelar key={p.nome} as="li" atraso={i * 0.1} className="flex">
              <PainelFoco as="article" className="flex w-full flex-col p-5 md:p-7">
                {p.status && (
                  <div>
                    <Chip>{p.status}</Chip>
                  </div>
                )}
                <h3 className="mt-4 text-lg font-medium leading-snug text-ink md:text-xl wrap-anywhere" translate="no">
                  {p.nome}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink">{p.resumo}</p>
                <div className="mt-auto pt-6">
                  <Etiquetas itens={p.stack} />
                  <Links p={p} ui={ui} />
                </div>
              </PainelFoco>
            </Revelar>
          ))}
        </ul>
      )}

      <ul className="mt-12 flex flex-col">
        {lista.map((p) => (
          <li key={p.nome} className="grid gap-3 border-t border-rule py-6 md:grid-cols-12 md:gap-8">
            <div className="flex flex-wrap items-center gap-3 self-start md:col-span-4 md:flex-col md:items-start">
              <h3 className="font-mono text-sm font-medium text-ink wrap-anywhere" translate="no">
                {p.nome}
              </h3>
              {p.status && <Chip>{p.status}</Chip>}
            </div>
            <div className="min-w-0 md:col-span-8">
              <p className="max-w-[65ch] text-sm leading-relaxed text-ink">{p.resumo}</p>
              <Etiquetas itens={p.stack} className="mt-4" />
              <Links p={p} ui={ui} />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-rule pt-4">
        <LinkExterno href={c.contato.github.url} ui={ui}>
          {ui.projetos.maisNoGithub}
        </LinkExterno>
      </div>
    </Secao>
  )
}
