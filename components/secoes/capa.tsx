import { Objeto } from '@/components/motion/objeto'
import { Botao } from '@/components/ui/botao'
import { getConteudo } from '@/content'
import { getUi } from '@/content/ui'
import type { Locale } from '@/lib/locale'

type Props = { locale: Locale }

/**
 * O topo: foto, nome, cargo, uma frase, cidade e os botões (projetos, GitHub e, quando há `cv` no
 * conteúdo, o currículo: pedido dele em 23/10/2026, para não depender de rolar até o Contato). Sem animação de
 * entrada (é a primeira coisa que aparece). A escala é de título, não de
 * cartaz: em 1280×800 o topo inteiro cabe com o começo de "Sobre".
 *
 * Em md+ a capa é a grade de 12 colunas das seções: o texto ocupa as oito
 * da esquerda e o octaedro (components/motion/objeto.tsx) as quatro da
 * direita, inteiras — a mesma coluna onde, nas seções seguintes, começa
 * o conteúdo. Cada um na sua coluna: o nome nunca fica atrás do objeto,
 * e o objeto não é enfeite de canto, é a outra metade da composição.
 * Abaixo de md o objeto não existe (a grade também não).
 */
export function Capa({ locale }: Props) {
  const c = getConteudo(locale)
  const ui = getUi(locale)

  return (
    <section id="capa" className="pt-12 pb-14 md:pt-16 md:pb-16">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="min-w-0 md:col-span-8">
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
              {c.cv && (
                <Botao href={c.cv} variante="fantasma" externo rotuloNovaAba={ui.abreEmNovaAba}>
                  {ui.capa.curriculo}
                </Botao>
              )}
            </div>
          </div>

          {/* A caixa é quadrada e tem a largura das quatro colunas (aspect-square);
              o canvas mede a caixa, então o tamanho nunca pula. */}
          <Objeto className="hidden md:col-span-4 md:block md:aspect-square md:w-full md:self-start" />
        </div>
      </div>
    </section>
  )
}
