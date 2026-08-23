import { getSiteUrl } from '@/lib/site'
import type { MetadataRoute } from 'next'

/** Indexação liberada para tudo; o sitemap em URL absoluta. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  }
}
