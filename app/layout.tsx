import { cn } from '@/utils/cn'
import { ReactNode } from 'react'
import { ibmPlexSans, jetbrainsMono } from './fonts'
import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body
        className={cn(
          ibmPlexSans.variable,
          jetbrainsMono.variable,
          ibmPlexSans.className,
          'antialiased overflow-x-hidden bg-background text-foreground',
        )}
      >
        {children}
      </body>
    </html>
  )
}
