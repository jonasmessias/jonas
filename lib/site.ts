import { getConteudo } from '@/content'

/** O endereço do site no ar, do conteúdo (campo `site`). Usado na metadata, no sitemap e no robots. */
export function getSiteUrl(): string {
  return getConteudo('pt').site.replace(/\/$/, '')
}
