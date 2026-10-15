import { getMarkdownFile } from '@/lib/markdown'

type Props = {
  params: Promise<{ locale: string }>
}

// Placeholder da transição para a direção estática (docs/direcao-estatica.md
// na bancada): a direção cinematográfica saiu; as seções novas entram uma
// por commit.
export default async function Home({ params }: Props) {
  const { locale } = await params
  const nome: string | undefined = getMarkdownFile('dossie', 'perfil', locale)?.data?.nome?.texto
  if (!nome) throw new Error(`dossie/perfil.${locale}.md: campo "nome.texto" ausente`)

  return (
    <main id="conteudo" className="stage py-s-7">
      <h1 className="text-display">{nome}</h1>
    </main>
  )
}
