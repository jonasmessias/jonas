import { Fada } from '@/components/motion/fada'
import { Secao } from '@/components/ui/secao'
import { getConteudo } from '@/content'
import type { Locale } from '@/lib/locale'
import type { CSSProperties } from 'react'

type Props = { locale: Locale }

/**
 * "Como este site chega até você": os passos de content/<idioma>.ts → caminho,
 * como estações numa escada (md+) ou num fio vertical (abaixo). A fada
 * (components/motion/fada.tsx) percorre as estações e acende cada uma ao
 * passar; o desenho dos fios e nós mora em globals.css (.fluxo-*). O número
 * de passos é livre: a grade nasce de --n e cada passo sabe seu --i.
 */
export function Caminho({ locale }: Props) {
  const { caminho } = getConteudo(locale)
  const n = caminho.passos.length
  const ultimo = n - 1

  return (
    <Secao id="caminho" titulo={caminho.titulo}>
      <Fada className="fluxo" style={{ '--n': n } as CSSProperties}>
        <ol className="fluxo-passos">
          {caminho.passos.map((passo, i) => (
            <li key={passo.nome} className="fluxo-passo" style={{ '--i': i } as CSSProperties}>
              {i < ultimo && (
                <>
                  <span aria-hidden="true" className="fluxo-fio fluxo-fio-h" />
                  <span aria-hidden="true" className="fluxo-fio fluxo-fio-v" />
                </>
              )}
              <span aria-hidden="true" data-no="" className="fluxo-no">
                <span className="fluxo-no-luz" />
              </span>
              <p className="relative z-[1] w-fit bg-ground pr-2 font-mono text-sm text-ink">{passo.nome}</p>
              <p className="mt-1 max-w-[40ch] text-xs leading-snug text-ink-2">{passo.detalhe}</p>
            </li>
          ))}
        </ol>
      </Fada>
    </Secao>
  )
}
