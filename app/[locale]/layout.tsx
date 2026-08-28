import { locales, type Locale } from '@/i18n/config'
import { getMarkdownFile } from '@/lib/markdown'
import { getSiteUrl } from '@/lib/site'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

/**
 * Layout por locale — metadata, JSON-LD e o esqueleto do documento.
 *
 * Todo fato aqui (nome, cargo, posicionamento, contatos, formação) vem de
 * content/dossie/{perfil,sobre}.<locale>.md — nunca de constante no código.
 * Campos com prefixo `_` são registro de auditoria e NUNCA são lidos nem
 * publicados.
 *
 * Sem o provider de client do next-intl, de propósito: as nove peças do
 * dossiê são RSC (nenhum `'use client'` no repo) e a única consumidora de
 * tradução (site-header.tsx) usa getTranslations, que é servidor e lê de
 * i18n/request.ts. O provider só serializava as messages inteiras no HTML
 * de toda página — payload sem consumidor. Se um componente-cliente
 * traduzido nascer, reintroduza o provider com escopo
 * (`messages={{ dossie: messages.dossie }}`), não com as messages inteiras.
 */

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

/** Locale do dossiê → locale do Open Graph. */
const OG_LOCALES: Record<Locale, string> = {
  pt: 'pt_BR',
  en: 'en_US',
}

/**
 * Fatos que a metadata e o JSON-LD consomem, lidos do frontmatter do
 * dossiê. Campo ausente derruba o build — mesmo padrão do site-header.
 */
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

  if (
    !nome ||
    !titulo ||
    !posicionamento ||
    !local ||
    !email ||
    !linkedin ||
    !github ||
    !instituicao
  ) {
    // Inviolável nº 2: fato não registrado não se escreve à mão.
    // Falhar o build é o comportamento certo; inventar fallback, não.
    throw new Error(
      `dossie/{perfil,sobre}.${locale}.md: campo de metadata ausente no frontmatter`,
    )
  }

  return { nome, titulo, posicionamento, local, email, linkedin, github, instituicao }
}

export async function generateMetadata({
  params,
}: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const l = locale as Locale
  const { nome, titulo, posicionamento } = getFatos(l)
  const title = `${nome} — ${titulo}`

  // A description é o posicionamento ÍNTEGRO do dossiê: o buscador trunca a
  // exibição; cortar aqui seria inventar texto que não passou pelo GATE 1.
  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description: posicionamento,
    alternates: {
      canonical: `/${l}`,
      languages: {
        pt: '/pt',
        en: '/en',
        'x-default': '/pt',
      },
    },
    openGraph: {
      type: 'website',
      url: `/${l}`,
      siteName: nome,
      title,
      description: posicionamento,
      locale: OG_LOCALES[l],
      alternateLocale: locales.filter((x) => x !== l).map((x) => OG_LOCALES[x]),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: posicionamento,
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const { nome, titulo, local, email, linkedin, github, instituicao } =
    getFatos(locale as Locale)

  // JSON-LD Person — só campos do frontmatter. Sem knowsAbout (vetor de
  // volta dos termos proibidos), sem award, sem senioridade.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: nome,
    jobTitle: titulo,
    url: getSiteUrl(),
    email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: local,
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: instituicao,
    },
    sameAs: [linkedin, github],
  }

  const skipLinkLabel =
    {
      pt: 'Pular para o conteúdo principal',
      en: 'Skip to main content',
    }[locale] ?? 'Skip to main content'

  return (
    <>
      <a href="#main-content" className="skip-link">
        {skipLinkLabel}
      </a>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // JSON.stringify, nunca string montada à mão; o replace escapa `<`
          // no JSON serializado (padrão da doc do Next contra XSS).
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </>
  )
}
