import { getUi } from '@/content/ui'
import { getMarkdownFile } from '@/lib/markdown'
import { htmlLang, isLocale, locales, ogLocale, type Locale } from '@/lib/locale'
import { getSiteUrl } from '@/lib/site'
import { cn } from '@/utils/cn'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import { archivo, martianMono } from '../fonts'
import '../globals.css'

/**
 * Layout raiz, por idioma. É a raiz (não há app/layout.tsx) porque o
 * `<html lang>` depende do parâmetro da rota — no export estático não há
 * middleware para descobrir o idioma.
 *
 * Todo fato aqui (nome, cargo, posicionamento, contatos, formação) vem de
 * content/dossie/{perfil,sobre}.<locale>.md. Campo ausente derruba o build.
 */

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

function getFatos(locale: Locale) {
  const perfil = getMarkdownFile('dossie', 'perfil', locale)
  const sobre = getMarkdownFile('dossie', 'sobre', locale)

  const nome: string | undefined = perfil?.data?.nome?.texto
  const titulo: string | undefined = perfil?.data?.titulo?.texto
  const posicionamento: string | undefined = perfil?.data?.posicionamento?.texto
  const local: string | undefined = perfil?.data?.local?.texto
  const email: string | undefined = perfil?.data?.contato?.email?.texto
  const linkedin: string | undefined = perfil?.data?.contato?.linkedin?.url
  const github: string | undefined = perfil?.data?.contato?.github?.url
  const instituicao: string | undefined = sobre?.data?.formacao?.instituicao

  if (!nome || !titulo || !posicionamento || !local || !email || !linkedin || !github || !instituicao) {
    throw new Error(`dossie/{perfil,sobre}.${locale}.md: campo de metadata ausente no frontmatter`)
  }

  return { nome, titulo, posicionamento, local, email, linkedin, github, instituicao }
}

async function localeDe(params: Props['params']): Promise<Locale> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return locale
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const locale = await localeDe(params)
  const { nome, titulo, posicionamento } = getFatos(locale)
  const title = `${nome} — ${titulo}`

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
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
    <html lang={htmlLang[locale]} className={cn(archivo.variable, martianMono.variable, 'antialiased')}>
      <body>
        <a href="#conteudo" className="skip-link">
          {ui.pularParaConteudo}
        </a>
        {children}
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
