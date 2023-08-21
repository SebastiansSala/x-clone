import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Providers from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "X-Clone",
  description: "X-Clone",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} dark`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
