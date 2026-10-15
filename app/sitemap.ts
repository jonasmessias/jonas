import { htmlLang, locales } from '@/lib/locale'
import { getSiteUrl } from '@/lib/site'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

/**
 * Uma entrada por idioma, cada uma listando as outras como alternativa
 * (hreflang). Com barra final: é a URL canônica do export (trailingSlash).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const languages = {
    ...Object.fromEntries(locales.map((l) => [htmlLang[l], `${base}/${l}/`])),
    'x-default': `${base}/pt/`,
  }
  return locales.map((l) => ({ url: `${base}/${l}/`, alternates: { languages } }))
}
