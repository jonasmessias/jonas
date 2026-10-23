import { Cursor } from '@/components/motion/cursor'
import { Nav } from '@/components/site/nav'
import { Rodape } from '@/components/site/rodape'
import { getUi } from '@/content/ui'
import { getConteudo } from '@/content'
import { htmlLang, isLocale, locales, ogLocale, type Locale } from '@/lib/locale'
import { getSiteUrl } from '@/lib/site'
import { corDeFundo, scriptDeTema } from '@/lib/tema'
import { cn } from '@/utils/cn'
import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import { archivo, martianMono } from '../fonts'
import '../globals.css'

/**
 * Layout raiz, por idioma. É a raiz (não há app/layout.tsx) porque o
 * `<html lang>` depende do parâmetro da rota — no export estático não há
 * middleware para descobrir o idioma.
 *
 * O texto (nome, cargo, frase, contatos, formação) vem de content/<idioma>.ts.
 */

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

/** A barra do navegador segue o sistema sem JS; com JS o script de tema a ajusta à escolha. */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: corDeFundo.light },
    { media: '(prefers-color-scheme: dark)', color: corDeFundo.dark },
  ],
}

/** O que a metadata e o JSON-LD usam, do conteúdo do idioma. */
function getFatos(locale: Locale) {
  const c = getConteudo(locale)
  return {
    nome: c.nome,
    titulo: c.cargo,
    posicionamento: c.frase,
    local: c.local,
    email: c.contato.email,
    linkedin: c.contato.linkedin.url,
    github: c.contato.github.url,
    instituicao: c.formacao.instituicao,
  }
}

async function localeDe(params: Props['params']): Promise<Locale> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return locale
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const locale = await localeDe(params)
  const { nome, titulo, posicionamento } = getFatos(locale)
  // Nome e cargo na aba, no Google e no preview de link (23/10/2026): o domínio sozinho na aba não
  // dizia o que ele faz, e o travessão sai (preferência dele).
  const title = `${nome} · ${titulo}`
  const tituloDaAba = title

  return {
    metadataBase: new URL(getSiteUrl()),
    title: tituloDaAba,
    description: posicionamento,
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}/`])),
        'x-default': '/pt/',
      },
    },
    openGraph: {
      type: 'website',
      url: `/${locale}/`,
      siteName: nome,
      title,
      description: posicionamento,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [{ url: '/avatar.jpg', width: 460, height: 460, alt: nome }],
    },
    twitter: {
      card: 'summary',
      title,
      description: posicionamento,
      images: ['/avatar.jpg'],
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = await localeDe(params)
  const { nome, titulo, local, email, linkedin, github, instituicao } = getFatos(locale)
  const ui = getUi(locale)

  // JSON-LD Person — só campos do frontmatter. Sem knowsAbout (vetor de
  // volta dos termos proibidos), sem award, sem senioridade.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: nome,
    jobTitle: titulo,
    url: getSiteUrl(),
    image: `${getSiteUrl()}/avatar.jpg`,
    email,
    address: { '@type': 'PostalAddress', addressLocality: local },
    alumniOf: { '@type': 'CollegeOrUniversity', name: instituicao },
    sameAs: [linkedin, github],
  }

  return (
    // suppressHydrationWarning: o script de tema escreve data-theme e a
    // classe `js` no <html> antes de o React hidratar — é mismatch esperado.
    <html
      lang={htmlLang[locale]}
      className={cn(archivo.variable, martianMono.variable, 'antialiased')}
      suppressHydrationWarning
    >
      {/* #topo é o próprio documento: "Voltar ao topo" e o nome no header
          levam ao alto da página, não a uma seção. */}
      <body id="topo">
        {/* Primeiro filho do <body>, síncrono: tema e html.js antes do primeiro paint. */}
        <script dangerouslySetInnerHTML={{ __html: scriptDeTema }} />
        <a href="#conteudo" className="skip-link">
          {ui.pularParaConteudo}
        </a>
        <Nav nome={nome} locale={locale} ui={ui} />
        {children}
        <Rodape locale={locale} />
        {/* O anel só existe com ponteiro fino e sem reduced motion; o componente decide no cliente. */}
        <Cursor />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            // JSON.stringify, nunca string montada à mão; o replace escapa `<`.
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  )
}
