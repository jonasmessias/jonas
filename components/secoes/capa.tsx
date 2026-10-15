import { Objeto } from '@/components/motion/objeto'
import { Botao } from '@/components/ui/botao'
import { getConteudo } from '@/content'
import { getUi } from '@/content/ui'
import type { Locale } from '@/lib/locale'

type Props = { locale: Locale }

/** O topo: foto, nome, cargo, uma frase, cidade, dois botões. Sem animação de entrada (é a primeira coisa que aparece). */
export function Capa({ locale }: Props) {
  const c = getConteudo(locale)
  const ui = getUi(locale)

  return (
    <section id="capa" className="pt-14 pb-16 md:pt-24 md:pb-24">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="flex items-start gap-5 md:gap-8">
          {/* eslint-disable-next-line @next/next/no-img-element -- export estático, sem otimizador */}
          <img
            src="/avatar.jpg"
            alt={`${ui.capa.fotoDe} ${c.nome}`}
            width={128}
            height={128}
            fetchPriority="high"
            decoding="sync"
            className="size-20 shrink-0 border border-rule md:size-32"
          />
          <div className="min-w-0 pt-1 md:pt-2">
            <h1 className="text-display wrap-anywhere" translate="no">
              {c.nome}
            </h1>
            <p className="mt-3 font-mono text-sm text-accent md:text-base">{c.cargo}</p>
          </div>
          {/* O objeto fica no fluxo, à direita, do mesmo tamanho da foto: o nome
              encolhe (min-w-0) e quebra antes de ficar atrás dele. */}
          <Objeto className="ml-auto hidden size-32 shrink-0 md:block" />
        </div>

        <div className="mt-8 md:mt-10">
          <p className="max-w-[65ch] text-lead text-ink">{c.frase}</p>
          <p className="mt-5 font-mono text-micro text-ink-2">{c.local}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Botao href="#projetos">{ui.capa.verProjetos}</Botao>
          <Botao href={c.contato.github.url} variante="fantasma" externo rotuloNovaAba={ui.abreEmNovaAba}>
            {ui.capa.github}
          </Botao>
        </div>
      </div>
    </section>
  )
}
