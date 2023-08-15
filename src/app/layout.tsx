import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Providers from "@/lib/Providers"
import { ClerkProvider } from "@clerk/nextjs"

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
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-[#1d9bf0] text-white rounded-full py-2 hover:bg-blue-500",
          formButtonSecondary: "bg-[#1d9bf0] text-white rounded-full",
          formFieldInput: "bg-[#2f3336] text-white",
          socialButtons: "",
          socialButtonsBlockButton: "bg-[#2f3336] text-white",
          headerSubtitle: "text-white",
          headerTitle: "text-white",
        },
        variables: {
          colorBackground: "black",
          colorPrimary: "white",
          colorText: "white",
        },
      }}
    >
      <html lang='en'>
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
