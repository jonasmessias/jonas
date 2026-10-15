import { getPerfil } from '@/lib/dossie'

/**
 * URL canônica do site — o único ponto do código que a conhece, e ele a
 * LÊ do conteúdo (content/dossie/perfil.pt.md → site.url, validado pelo
 * esquema), não a escreve. Consumida pela metadata, sitemap e robots.
 */
export function getSiteUrl(): string {
  return getPerfil('pt').site.url.replace(/\/$/, '')
}
