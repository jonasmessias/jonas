import { Objeto } from '@/components/motion/objeto'
import { Botao } from '@/components/ui/botao'
import { getConteudo } from '@/content'
import { getUi } from '@/content/ui'
import type { Locale } from '@/lib/locale'

type Props = { locale: Locale }

/**
 * O topo: foto, nome, cargo, uma frase, cidade, dois botões. Sem animação de
 * entrada (é a primeira coisa que aparece). A escala é de título, não de
 * cartaz: em 1280×800 o topo inteiro cabe com o começo de "Sobre".
 */
export function Capa({ locale }: Props) {
  const c = getConteudo(locale)
  const ui = getUi(locale)

  return (
    <section id="capa" className="pt-12 pb-14 md:pt-16 md:pb-16">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="flex items-start gap-5 md:gap-7">
          {/* A moldura: o fio deslocado e o quadrado âmbar moram em globals.css (.moldura). */}
          <span className="moldura size-20 shrink-0 border border-rule md:size-24">
            {/* eslint-disable-next-line @next/next/no-img-element -- export estático, sem otimizador */}
            <img src="/avatar.jpg" alt={`${ui.capa.fotoDe} ${c.nome}`} width={96} height={96} fetchPriority="high" decoding="sync" />
          </span>
          <div className="min-w-0 pt-1">
            <h1 className="text-display wrap-anywhere" translate="no">
              {c.nome}
            </h1>
            <p className="mt-2 font-mono text-sm text-accent">{c.cargo}</p>
          </div>
          {/* O objeto fica no fluxo, à direita, do mesmo tamanho da foto: o nome
              encolhe (min-w-0) e quebra antes de ficar atrás dele. */}
          <Objeto forma="icosaedro" className="ml-auto hidden size-24 shrink-0 md:block" />
        </div>

        <div className="mt-6 md:mt-8">
          <p className="max-w-[60ch] text-lead text-ink">{c.frase}</p>
          <p className="mt-4 font-mono text-micro text-ink-2">{c.local}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Botao href="#projetos">{ui.capa.verProjetos}</Botao>
          <Botao href={c.contato.github.url} variante="fantasma" externo rotuloNovaAba={ui.abreEmNovaAba}>
            {ui.capa.github}
          </Botao>
        </div>
      </div>
    </section>
  )
}
