import { Botao } from '@/components/ui/botao'
import { getUi } from '@/content/ui'
import { getPerfil } from '@/lib/dossie'
import type { Locale } from '@/lib/locale'

type Props = { locale: Locale }

/**
 * A capa: foto, nome, cargo, uma frase, cidade, dois botões. Curta de
 * propósito — o que diferencia o site vem depois (bastidores e cards).
 *
 * Nada aqui usa Revelar: o hero está acima da dobra, e reveal ali faz o
 * nome (o maior texto da página, candidato a LCP) nascer invisível até a
 * hidratação. A foto tem fetchPriority alta. Nunca `tempo_de_carreira` aqui: anos de carreira
 * não são frase de venda neste site (regra do cockpit).
 */
export function Capa({ locale }: Props) {
  const perfil = getPerfil(locale)
  const ui = getUi(locale)

  return (
    <section id="capa" className="pt-14 pb-16 md:pt-24 md:pb-24">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="flex items-start gap-5 md:gap-8">
          {/* eslint-disable-next-line @next/next/no-img-element -- export estático, sem otimizador; o arquivo já tem o tamanho certo */}
          <img
            src="/avatar.jpg"
            alt={`${ui.capa.fotoDe} ${perfil.nome.texto}`}
            width={128}
            height={128}
            fetchPriority="high"
            decoding="sync"
            className="size-20 shrink-0 border border-rule md:size-32"
          />
          <div className="min-w-0 pt-1 md:pt-2">
            <h1 className="text-display wrap-anywhere" translate="no">
              {perfil.nome.texto}
            </h1>
            <p className="mt-3 font-mono text-sm text-accent md:text-base">{perfil.titulo.texto}</p>
          </div>
        </div>

        <div className="mt-8 md:mt-10">
          <p className="max-w-[65ch] text-lead text-ink">{perfil.posicionamento.texto}</p>
          <p className="mt-5 font-mono text-micro text-ink-2">{perfil.local.texto}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Botao href="#projetos">{ui.capa.verProjetos}</Botao>
          <Botao href={perfil.contato.github.url} variante="fantasma" externo rotuloNovaAba={ui.abreEmNovaAba}>
            {ui.capa.github}
          </Botao>
        </div>
      </div>
    </section>
  )
}
