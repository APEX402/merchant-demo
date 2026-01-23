'use client'

/**
 * WalletProvider Component
 *
 * Wraps the application with Wagmi and React Query providers
 * to enable wallet connection functionality throughout the app.
 */

import { WagmiProvider, type State } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiAdapter } from '@/lib/wallet-config'
import { ReactNode, useState } from 'react'

interface WalletProviderProps {
  children: ReactNode
  initialState?: State
}

export function WalletProvider({ children, initialState }: WalletProviderProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
