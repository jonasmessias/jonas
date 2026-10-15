import { Secao } from '@/components/ui/secao'
import { getUi } from '@/content/ui'
import { getSobre } from '@/lib/dossie'
import type { Locale } from '@/lib/locale'
import { mesAno } from '@/lib/periodo'

type Props = { locale: Locale }

/** Uma das três listas curtas: rótulo em mono à esquerda, linhas à direita, fio entre elas. */
function Lista({ titulo, linhas }: { titulo: string; linhas: { chave: string; principal: string; detalhe?: string }[] }) {
  if (linhas.length === 0) return null
  return (
    <div className="grid gap-2 border-t border-rule pt-4 md:grid-cols-12 md:gap-6">
      <dt className="font-mono text-micro text-ink-2 md:col-span-3 md:pt-1">{titulo}</dt>
      <dd className="md:col-span-9">
        <ul className="flex flex-col gap-2">
          {linhas.map((l) => (
            <li key={l.chave} className="text-sm text-ink">
              <span>{l.principal}</span>
              {l.detalhe && <span className="text-ink-2"> · {l.detalhe}</span>}
            </li>
          ))}
        </ul>
      </dd>
    </div>
  )
}

/**
 * Sobre: os parágrafos do corpo de sobre.md (texto puro, sem markdown) e
 * três listas de fato — formação, certificações, idiomas. Tudo do dossiê;
 * a data das certificações vira "mês ano" por lib/periodo.
 */
export function Sobre({ locale }: Props) {
  const sobre = getSobre(locale)
  const ui = getUi(locale)

  return (
    <Secao id="sobre" titulo={ui.nav.sobre} colunas>
      <div className="flex flex-col gap-5">
        {sobre.paragrafos.map((p) => (
          <p key={p} className="max-w-[65ch] text-body text-ink">
            {p}
          </p>
        ))}
      </div>

      <dl className="mt-12 flex flex-col gap-6">
        <Lista
          titulo={ui.sobre.formacao}
          linhas={[
            {
              chave: sobre.formacao.curso,
              principal: sobre.formacao.curso,
              detalhe: `${sobre.formacao.instituicao} · ${sobre.formacao.conclusao_texto}`,
            },
          ]}
        />
        <Lista
          titulo={ui.sobre.certificacoes}
          linhas={sobre.certificacoes.map((c) => ({
            chave: c.nome,
            principal: c.nome,
            detalhe: `${c.emissor} · ${mesAno(ui.meses, c.data)}`,
          }))}
        />
        <Lista
          titulo={ui.sobre.idiomas}
          linhas={sobre.idiomas.map((i) => ({ chave: i.idioma, principal: i.idioma, detalhe: i.nivel }))}
        />
      </dl>
    </Secao>
  )
}
