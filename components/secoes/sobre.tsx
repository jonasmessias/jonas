import { Secao } from '@/components/ui/secao'
import { getConteudo } from '@/content'
import { getUi } from '@/content/ui'
import type { Locale } from '@/lib/locale'

type Props = { locale: Locale }

function Lista({ titulo, linhas }: { titulo: string; linhas: { principal: string; detalhe?: string }[] }) {
  return (
    <div className="grid gap-2 border-t border-rule pt-4 md:grid-cols-12 md:gap-6">
      <dt className="font-mono text-micro text-ink-2 md:col-span-3 md:pt-1">{titulo}</dt>
      <dd className="md:col-span-9">
        <ul className="flex flex-col gap-2">
          {linhas.map((l) => (
            <li key={l.principal} className="text-sm text-ink">
              <span>{l.principal}</span>
              {l.detalhe && <span className="text-ink-2"> · {l.detalhe}</span>}
            </li>
          ))}
        </ul>
      </dd>
    </div>
  )
}

/** Sobre: os parágrafos e duas listas curtas (formação e idiomas). */
export function Sobre({ locale }: Props) {
  const c = getConteudo(locale)
  const ui = getUi(locale)

  return (
    <Secao id="sobre" titulo={ui.nav.sobre} colunas>
      <div className="flex flex-col gap-5">
        {c.sobre.map((p) => (
          <p key={p} className="max-w-[65ch] text-body text-ink">
            {p}
          </p>
        ))}
      </div>

      <dl className="mt-12 flex flex-col gap-6">
        <Lista
          titulo={ui.sobre.formacao}
          linhas={[{ principal: c.formacao.curso, detalhe: `${c.formacao.instituicao} · ${c.formacao.quando}` }]}
        />
        <Lista titulo={ui.sobre.idiomas} linhas={c.idiomas.map((i) => ({ principal: i.idioma, detalhe: i.nivel }))} />
      </dl>
    </Secao>
  )
}
