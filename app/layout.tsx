import { cn } from '@/utils/cn'
import { getLocale } from 'next-intl/server'
import { ReactNode } from 'react'
import { archivo, martianMono } from './fonts'
import './globals.css'

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <body className={cn(archivo.variable, martianMono.variable, 'antialiased')}>
        {children}
      </body>
    </html>
  )
}
