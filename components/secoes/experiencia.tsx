import { Etiquetas } from '@/components/ui/etiqueta'
import { Revelar } from '@/components/ui/revelar'
import { Secao } from '@/components/ui/secao'
import { getConteudo } from '@/content'
import { getUi, type Ui } from '@/content/ui'
import type { Locale } from '@/lib/locale'
import { mesAno } from '@/lib/periodo'
import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr'

type Props = { locale: Locale }

/** "abr 2022 a mar 2023" ou "desde abr 2026". */
function Periodo({ inicio, fim, ui }: { inicio: string; fim: string | null; ui: Ui }) {
  const de = <time dateTime={inicio}>{mesAno(ui.meses, inicio)}</time>
  if (!fim) {
    return (
      <>
        {ui.experiencia.desde} {de}
        <span className="sr-only"> ({ui.experiencia.atual})</span>
      </>
    )
  }
  return (
    <>
      {de} {ui.experiencia.a} <time dateTime={fim}>{mesAno(ui.meses, fim)}</time>
    </>
  )
}

const link =
  'group inline-flex min-h-11 items-center gap-1 font-mono text-micro text-accent transition-colors duration-300 ease-fluid hover:text-hot'

/** Experiência: período e lugar à esquerda; cargo, empresa, uma frase, stack e links à direita. */
export function Experiencia({ locale }: Props) {
  const c = getConteudo(locale)
  const ui = getUi(locale)

  return (
    <Secao id="experiencia" titulo={ui.nav.experiencia}>
      <ol className="flex flex-col">
        {c.experiencias.map((e, i) => (
          <Revelar
            key={`${e.empresa}-${e.inicio}`}
            as="li"
            atraso={i * 0.05}
            className="grid gap-4 border-t border-rule py-8 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-8"
          >
            <div className="font-mono text-micro text-ink-2 md:col-span-3">
              <p>
                <Periodo inicio={e.inicio} fim={e.fim} ui={ui} />
              </p>
              <p className="mt-1">{e.onde}</p>
            </div>

            <article className="min-w-0 md:col-span-9">
              <h3 className="text-lg font-medium leading-snug text-ink md:text-xl">{e.cargo}</h3>
              <p className="mt-1 text-body text-ink-2" translate="no">
                {e.empresa}
              </p>
              <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-ink">{e.resumo}</p>
              <Etiquetas itens={e.stack} className="mt-5" />
              {e.links && (
                <ul className="mt-3 flex flex-wrap items-center gap-x-6">
                  {e.links.map((l) => (
                    <li key={l.url}>
                      <a href={l.url} target="_blank" rel="noopener noreferrer" className={link}>
                        <span className="link-draw wrap-anywhere">{l.texto}</span>
                        <ArrowUpRightIcon size={12} weight="regular" aria-hidden="true" />
                        <span className="sr-only"> ({ui.abreEmNovaAba})</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </Revelar>
        ))}
      </ol>
    </Secao>
  )
}
