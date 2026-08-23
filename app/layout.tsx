import { MotionProvider } from '@/components/motion/motion-provider'
import { cn } from '@/utils/cn'
import { getLocale } from 'next-intl/server'
import { ReactNode } from 'react'
import { archivo, martianMono } from './fonts'
import './globals.css'

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale()

  // {children} continua sendo RSC — passar children de servidor para um
  // componente de cliente NÃO os transforma em cliente. É o padrão que
  // sustenta a arquitetura inteira: a marcação e o texto ficam no HTML do
  // servidor, o MotionProvider só anima.
  return (
    <html lang={locale}>
      <body className={cn(archivo.variable, martianMono.variable, 'antialiased')}>
        {/* O gate A-8 (ver globals.css): html.js ANTES do primeiro paint,
            síncrono e minúsculo — primeiro filho do body porque o App Router
            não aceita <head> manual, e um script parser-blocking aqui roda
            antes de qualquer conteúdo pintar. Quem pediu menos movimento
            NUNCA recebe a classe; a remoção de segurança (motor que não
            pousa) é do CapaPalco. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js')",
          }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
