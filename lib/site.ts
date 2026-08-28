import { getMarkdownFile } from '@/lib/markdown'

/**
 * URL canônica do site — o único ponto do código que a conhece, e ele a
 * LÊ do conteúdo (content/dossie/perfil.pt.md → site.url), não a escreve.
 * Os dois locales carregam o mesmo valor; o pt é a fonte por convenção.
 *
 * Consumida por: generateMetadata (metadataBase), app/sitemap.ts e
 * app/robots.ts.
 */
export function getSiteUrl(): string {
  const perfil = getMarkdownFile('dossie', 'perfil', 'pt')
  const url: string | undefined = perfil?.data?.site?.url

  if (!url) {
    // Inviolável nº 2: fato não registrado não se escreve à mão.
    // Falhar o build é o comportamento certo; inventar fallback, não.
    throw new Error('dossie/perfil.pt.md: site.url ausente')
  }

  return url
}
