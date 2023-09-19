'use client'

import { NextUIProvider } from '@nextui-org/system'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Provider } from 'react-redux'

import { store } from '@/app/store'

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>{children}</NextUIProvider>
      </QueryClientProvider>
    </Provider>
  )
}
