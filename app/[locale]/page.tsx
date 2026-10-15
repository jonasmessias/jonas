import { Bastidores } from '@/components/secoes/bastidores'
import { Capa } from '@/components/secoes/capa'
import { Contato } from '@/components/secoes/contato'
import { Experiencia } from '@/components/secoes/experiencia'
import { Projetos } from '@/components/secoes/projetos'
import { Sobre } from '@/components/secoes/sobre'
import { Stack } from '@/components/secoes/stack'
import { isLocale } from '@/lib/locale'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string }>
}

/**
 * A página: sete seções, uma por componente RSC em components/secoes/, na
 * ordem de leitura. Todo fato vem de lib/dossie; os rótulos, de content/ui.
 * `#topo` é o <body> (layout); `#conteudo` é o alvo do skip link.
 */
export default async function Home({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <main id="conteudo" className="pt-header">
      <Capa locale={locale} />
      <Sobre locale={locale} />
      <Experiencia locale={locale} />
      <Stack locale={locale} />
      <Projetos locale={locale} />
      <Bastidores locale={locale} />
      <Contato locale={locale} />
    </main>
  )
}
