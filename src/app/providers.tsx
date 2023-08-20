"use client"

import { NextUIProvider } from "@nextui-org/system"
import { QueryClientProvider, QueryClient } from "react-query"
export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>{children}</NextUIProvider>
    </QueryClientProvider>
  )
}
