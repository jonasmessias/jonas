import { Etiquetas } from '@/components/ui/etiqueta'
import { Revelar } from '@/components/ui/revelar'
import { Secao } from '@/components/ui/secao'
import { getUi, type Ui } from '@/content/ui'
import { getExperiencias, type Experiencia as Entrada } from '@/lib/dossie'
import type { Locale } from '@/lib/locale'
import { mesAno } from '@/lib/periodo'
import { ArrowRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react/ssr'

type Props = { locale: Locale }

/** Quantos bullets cada peso mostra — apresentação, não fato. Os primeiros da lista, na ordem do arquivo. */
const BULLETS_POR_PESO: Record<Entrada['peso'], number> = { dominante: 4, medio: 3, baixo: 2 }

/** "mês AAAA a mês AAAA" ou "desde mês AAAA" — sem travessão, que o dono não usa em texto público. */
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

/**
 * Experiência: uma entrada por arquivo, na `ordem` do dossiê. Período à
 * esquerda (≥ md), o resto à direita; bullets por peso; stack como
 * etiquetas; a prova (produto no ar) como link; o case linka o card do
 * projeto. Períodos que se sobrepõem ficam como estão no dossiê.
 */
export function Experiencia({ locale }: Props) {
  const experiencias = getExperiencias(locale)
  const ui = getUi(locale)

  return (
    <Secao id="experiencia" titulo={ui.nav.experiencia}>
      <ol className="flex flex-col">
        {experiencias.map((e, i) => (
          <Revelar key={e.id} as="li" atraso={i * 0.05} className="grid gap-4 border-t border-rule py-8 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-8">
            <div className="font-mono text-micro text-ink-2 md:col-span-3">
              <p>
                <Periodo inicio={e.inicio} fim={e.fim} ui={ui} />
              </p>
              <p className="mt-1">
                {e.vinculo} · {e.local}
                {e.modalidade && <> · {e.modalidade}</>}
              </p>
            </div>

            <article className="min-w-0 md:col-span-9">
              <h3 className="text-lg font-medium leading-snug text-ink md:text-xl">{e.cargo}</h3>
              <p className="mt-1 text-body text-ink-2" translate="no">
                {e.organizacao}
              </p>
              {e.nota_de_bloco && <p className="mt-3 font-mono text-micro text-ink-2">{e.nota_de_bloco.texto}</p>}

              <ul className="mt-5 flex max-w-[65ch] flex-col gap-2.5 pl-4 text-sm leading-relaxed text-ink marker:text-ink-2 list-disc">
                {e.bullets.slice(0, BULLETS_POR_PESO[e.peso]).map((b) => (
                  <li key={b.polo}>{b.texto}</li>
                ))}
              </ul>

              <Etiquetas itens={e.stack.itens} className="mt-6" />

              {(e.prova || e.case) && (
                <ul className="mt-4 flex flex-wrap items-center gap-x-6">
                  {e.prova?.urls.map((u) => (
                    <li key={u}>
                      <a href={u} target="_blank" rel="noopener noreferrer" className={link}>
                        <span className="link-draw wrap-anywhere">{new URL(u).hostname}</span>
                        <ArrowUpRightIcon size={12} weight="regular" aria-hidden="true" />
                        <span className="sr-only">
                          ({ui.experiencia.noAr}, {ui.abreEmNovaAba})
                        </span>
                      </a>
                    </li>
                  ))}
                  {e.case && (
                    <li>
                      <a href="#projeto-osm" className={link}>
                        <span className="link-draw">{ui.experiencia.verCase}</span>
                        <ArrowRightIcon size={12} weight="regular" aria-hidden="true" />
                      </a>
                    </li>
                  )}
                </ul>
              )}
            </article>
          </Revelar>
        ))}
      </ol>
    </Secao>
  )
}
