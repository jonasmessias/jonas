import { Botao } from '@/components/ui/botao'
import { IconeTech } from '@/components/ui/icone-tech'
import { PainelFoco } from '@/components/ui/painel-foco'
import { Revelar } from '@/components/ui/revelar'
import { Secao } from '@/components/ui/secao'
import { getUi } from '@/content/ui'
import { getEngenharia, getPerfil } from '@/lib/dossie'
import { isLocale } from '@/lib/locale'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string }>
}

// Placeholder da transição para a direção estática (docs/direcao-estatica.md
// na bancada): a direção cinematográfica saiu; as seções novas entram uma
// por commit.
export default async function Home({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const perfil = getPerfil(locale)
  const ui = getUi(locale)

  // DEMO-E1: sai na E2 — um bloco só para olhar a casca (painel, botões,
  // reveal, ícones). Todo texto vem do dossiê ou de content/ui.ts.
  const engenharia = getEngenharia(locale)
  const grupoDemo = engenharia.grupos.find((g) => g.id === 'frontend') ?? engenharia.grupos[0]

  return (
    <main id="conteudo" className="pt-header">
      <div className="mx-auto max-w-5xl px-4 pt-24 pb-8 md:px-8 md:pt-32">
        <h1 className="text-display" translate="no">
          {perfil.nome.texto}
        </h1>
        <p className="mt-3 font-mono text-base text-accent md:text-lg">{perfil.titulo.texto}</p>
      </div>

      {/* DEMO-E1: sai na E2 */}
      <Secao id="projetos" titulo={ui.nav.projetos} colunas>
        <Revelar>
          <PainelFoco className="p-6">
            <p className="max-w-[65ch] text-body text-ink-2">{perfil.posicionamento.texto}</p>
            <p className="mt-4 font-mono text-micro text-ink-2">{perfil.local.texto}</p>
          </PainelFoco>
        </Revelar>
        <Revelar atraso={0.1} className="mt-6 flex flex-wrap gap-3">
          <Botao href="#projetos">{ui.nav.projetos}</Botao>
          <Botao href={perfil.contato.github.url} variante="fantasma" externo rotuloNovaAba={ui.abreEmNovaAba}>
            {perfil.contato.github.texto}
          </Botao>
        </Revelar>
      </Secao>

      {/* DEMO-E1: sai na E2 */}
      <Secao id="stack" titulo={ui.nav.stack} colunas>
        <Revelar as="div" className="flex flex-col gap-3 md:flex-row md:gap-6">
          <h3 className="shrink-0 font-mono text-micro text-ink-2 md:w-32 md:pt-0.5">{grupoDemo.titulo}</h3>
          <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label={grupoDemo.titulo}>
            {grupoDemo.itens.map((item) => (
              <li key={item} className="group flex items-center gap-2 text-sm text-ink">
                <IconeTech rotulo={item} className="text-ink-2 transition-colors duration-300 ease-fluid group-hover:text-accent" />
                <span translate="no">{item}</span>
              </li>
            ))}
          </ul>
        </Revelar>
      </Secao>
    </main>
  )
}
