import { cn } from '@/utils/cn'
import { config } from '@/utils/config'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Indie_Flower, Poppins } from 'next/font/google'
import './globals.css'

const indieFlower = Indie_Flower({
  variable: '--font-indie-flower',
  subsets: ['latin'],
  weight: '400',
})

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Jonas Messias | Frontend Developer',
  description: config.siteDescription,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          indieFlower.className,
          poppins.variable,
          'antialiased overflow-x-hidden bg-background',
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
