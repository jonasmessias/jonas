import type { NextConfig } from 'next'
import path from 'path'

/**
 * Export estático: `next build` escreve HTML pronto em out/ — nada roda no
 * servidor. Com export, middleware é erro e redirects/headers daqui são
 * ignorados: o `/` por idioma, o `/es` aposentado e os cabeçalhos moram em
 * vercel.json.
 */
const nextConfig: NextConfig = {
  output: 'export',
  // /pt → /pt/ e out/pt/index.html: o mesmo layout que qualquer servidor
  // estático (Vercel hoje, nginx na fase da VM) entrega sem regra extra.
  trailingSlash: true,
  images: { unoptimized: true },
  // Fixa a raiz no projeto, para um lockfile perdido no home não ser
  // inferido como raiz do workspace.
  outputFileTracingRoot: path.join(__dirname),
  turbopack: {
    root: path.join(__dirname),
  },
}

export default nextConfig
