import { getSiteUrl } from '@/lib/site'
import type { MetadataRoute } from 'next'

/**
 * Sitemap do dossiê: /pt e /en, e nada mais. A rota /es se aposentou (D3)
 * e responde 308 no middleware — rota aposentada não entra em sitemap.
 * URLs absolutas a partir de lib/site.ts, que lê a URL do conteúdo.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()

  const languages = {
    pt: `${base}/pt`,
    en: `${base}/en`,
    'x-default': `${base}/pt`,
  }

  return [
    { url: `${base}/pt`, alternates: { languages } },
    { url: `${base}/en`, alternates: { languages } },
  ]
}
