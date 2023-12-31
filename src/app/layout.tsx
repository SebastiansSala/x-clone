import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import Providers from './providers'

import './globals.css'
import InitialDataProvider from '@/contexts/initial-data-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'X-Clone',
  description: 'X-Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark overflow-y-scroll`}>
        <Providers>
          <InitialDataProvider>{children}</InitialDataProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
