import { PainelFoco } from '@/components/ui/painel-foco'
import { Secao } from '@/components/ui/secao'
import { getUi, type Ui } from '@/content/ui'
import { getBastidores, getPerfil } from '@/lib/dossie'
import type { Locale } from '@/lib/locale'
import { cn } from '@/utils/cn'
import { ArrowUpRightIcon, CalendarBlankIcon } from '@phosphor-icons/react/ssr'
import type { CSSProperties } from 'react'

type Props = { locale: Locale }

/**
 * O pacote percorre o trilho de 12% a 72% do ciclo (ver .fluxo-pacote em
 * globals.css); o nó i acende no instante em que ele passa:
 * 12% + 60% · i / (n − 1). Só o atraso é calculado aqui; a animação é CSS.
 */
const CICLO_S = 4
const chegada = (i: number, n: number) => CICLO_S * (0.12 + (0.6 * i) / (n - 1))

/** A prova de um passo: o caminho no repositório público, como link para o arquivo; sem prova, a bancada privada. */
function Prova({ caminho, repo, ui }: { caminho: string | null; repo?: string; ui: Ui }) {
  if (!caminho) {
    return <p className="mt-2 font-mono text-micro text-ink-2">{ui.bastidores.bancadaLocal}</p>
  }
  if (!repo) {
    return (
      <p className="mt-2 font-mono text-micro text-ink-2 wrap-anywhere" translate="no">
        {caminho}
      </p>
    )
  }
  return (
    <a
      href={`${repo}/blob/master/${caminho}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-1 inline-flex min-h-11 items-start gap-1 py-2 font-mono text-micro text-accent transition-colors duration-300 ease-fluid hover:text-hot"
    >
      <span className="link-draw wrap-anywhere" translate="no">
        {caminho}
      </span>
      <ArrowUpRightIcon size={12} weight="regular" aria-hidden="true" className="mt-0.5 shrink-0" />
      <span className="sr-only">
        ({ui.bastidores.prova}, {ui.abreEmNovaAba})
      </span>
    </a>
  )
}

/**
 * "Como este site chega até você": os passos de content/bastidores.md num
 * trilho horizontal (≥ lg) com um pacote que percorre o caminho e acende
 * cada nó ao passar — vertical abaixo de lg. Cada passo traz a prova
 * clicável: o arquivo no repositório público. É isto que diferencia o site:
 * o site é, ele mesmo, o projeto. Movimento só em transform/opacity, luz em
 * --color-signal, desligado em reduced motion (CSS).
 */
export function Bastidores({ locale }: Props) {
  const b = getBastidores(locale)
  const perfil = getPerfil(locale)
  const ui = getUi(locale)
  const repo = perfil.repositorio_do_site?.url
  const n = b.passos.length
  const ultimo = n - 1

  return (
    <Secao id="bastidores" titulo={b.titulo}>
      <p className="max-w-[65ch] text-body text-ink-2">{b.resumo}</p>

      <div className="fluxo relative mt-12" style={{ '--n': n } as CSSProperties}>
        <div aria-hidden="true" className="fluxo-trilho hidden lg:block" />
        <div aria-hidden="true" className="fluxo-pista hidden lg:block">
          <div className="fluxo-pacote">
            <span />
          </div>
        </div>

        <ol className="lg:grid lg:grid-cols-[repeat(var(--n),minmax(0,1fr))] lg:gap-4">
          {b.passos.map((passo, i) => (
            <li key={passo.rotulo} className="relative pb-8 pl-8 last:pb-0 lg:pb-0 lg:pl-0">
              {i < ultimo && <span aria-hidden="true" className="fluxo-ligacao lg:hidden" />}
              <span
                aria-hidden="true"
                className={cn('fluxo-no', i === ultimo ? 'bg-ink' : 'border border-rule bg-ground')}
              >
                <span className="fluxo-no-luz hidden lg:block" style={{ animationDelay: `${chegada(i, n)}s` }} />
              </span>
              <p className="font-mono text-sm text-ink">{passo.rotulo}</p>
              <p className="mt-1 max-w-[40ch] text-xs leading-snug text-ink-2 lg:max-w-none">{passo.detalhe}</p>
              <Prova caminho={passo.prova} repo={repo} ui={ui} />
            </li>
          ))}
        </ol>
      </div>

      <PainelFoco className="mt-12 flex max-w-[65ch] gap-3 p-4 md:p-5">
        <CalendarBlankIcon size={18} weight="light" aria-hidden="true" className="mt-0.5 shrink-0 text-ink-2" />
        <div className="min-w-0">
          <p className="text-sm leading-relaxed text-ink-2">{b.semanal.texto}</p>
          <Prova caminho={b.semanal.prova} repo={repo} ui={ui} />
        </div>
      </PainelFoco>
    </Secao>
  )
}
