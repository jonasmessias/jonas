import { Secao } from '@/components/ui/secao'
import { getConteudo } from '@/content'
import type { Locale } from '@/lib/locale'
import { cn } from '@/utils/cn'
import type { CSSProperties } from 'react'

type Props = { locale: Locale }

/** O pacote percorre o trilho de 12% a 72% do ciclo; o passo i acende quando ele passa. */
const CICLO_S = 4
const chegada = (i: number, n: number) => CICLO_S * (0.12 + (0.6 * i) / (n - 1))

/** "Como este site chega até você": os passos de content/<idioma>.ts → caminho. */
export function Caminho({ locale }: Props) {
  const { caminho } = getConteudo(locale)
  const n = caminho.passos.length
  const ultimo = n - 1

  return (
    <Secao id="caminho" titulo={caminho.titulo}>
      <div className="fluxo relative" style={{ '--n': n } as CSSProperties}>
        <div aria-hidden="true" className="fluxo-trilho hidden lg:block" />
        <div aria-hidden="true" className="fluxo-pista hidden lg:block">
          <div className="fluxo-pacote">
            <span />
          </div>
        </div>

        <ol className="lg:grid lg:grid-cols-[repeat(var(--n),minmax(0,1fr))] lg:gap-4">
          {caminho.passos.map((passo, i) => (
            <li key={passo.nome} className="relative pb-8 pl-8 last:pb-0 lg:pb-0 lg:pl-0">
              {i < ultimo && <span aria-hidden="true" className="fluxo-ligacao lg:hidden" />}
              <span aria-hidden="true" className={cn('fluxo-no', i === ultimo ? 'bg-ink' : 'border border-rule bg-ground')}>
                <span className="fluxo-no-luz hidden lg:block" style={{ animationDelay: `${chegada(i, n)}s` }} />
              </span>
              <p className="font-mono text-sm text-ink">{passo.nome}</p>
              <p className="mt-1 max-w-[40ch] text-xs leading-snug text-ink-2 lg:max-w-none">{passo.detalhe}</p>
            </li>
          ))}
        </ol>
      </div>
    </Secao>
  )
}
