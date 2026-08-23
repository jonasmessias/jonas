import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, locales } from './i18n/config'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
})

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // D3: o espanhol se aposentou. /es respondia 200 em produção e pode estar
  // indexada — um 404 destruiria a rota; o 308 a aposenta apontando para /pt.
  // Tem que vir ANTES do next-intl: o matcher amplo abaixo entrega /es ao
  // middleware primeiro, e o next-intl trataria /es como pathname comum,
  // reescrevendo para /pt/es. Um redirects() em next.config.ts nunca rodaria.
  if (pathname === '/es' || pathname.startsWith('/es/')) {
    const url = request.nextUrl.clone()
    url.pathname = `/pt${pathname.slice('/es'.length)}`
    return NextResponse.redirect(url, 308)
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/', '/(pt|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
}
