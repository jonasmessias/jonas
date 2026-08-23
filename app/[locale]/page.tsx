import { Capa } from '@/components/site/capa'
import { Capacidades } from '@/components/site/capacidades'
import { Fecho } from '@/components/site/fecho'
import { Percurso } from '@/components/site/percurso'
import { TrabalhoOsm } from '@/components/site/trabalho-osm'
import { TrabalhoTrilho } from '@/components/site/trabalho-trilho'

type Props = {
  params: Promise<{ locale: string }>
}

// A página da direção CORTE: a capa (F1–F3); "Selected work" — a seção 01
// (oSeuMáximo, F4a) e o trilho horizontal dos três repositórios públicos
// (peças 02–04, F4b); o percurso das quatro experiências (F5a); as
// capacidades em quatro palavras enormes (F5b); e o fecho — disponibilidade,
// canais e rodapé (F5c), a resolução: depois dele não vem mais nada — sempre
// dentro deste <main>. Com a F5b depois do percurso, o 'bottom top' do
// trigger dele deixa de ser inalcançável (era a última seção; o p real
// parava em 0,537).
export default async function Home({ params }: Props) {
  const { locale } = await params

  return (
    <>
      {/* O skip-link do app/[locale]/layout.tsx pousa aqui. */}
      <main id="main-content">
        <Capa locale={locale} />
        <TrabalhoOsm locale={locale} />
        <TrabalhoTrilho locale={locale} />
        <Percurso locale={locale} />
        <Capacidades locale={locale} />
        <Fecho locale={locale} />
      </main>
    </>
  )
}
