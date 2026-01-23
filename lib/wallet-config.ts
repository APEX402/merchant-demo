/**
 * Wallet Connection Configuration using Reown AppKit
 *
 * This file sets up the wallet connection infrastructure for the merchant demo
 * using Reown AppKit (formerly Web3Modal) with Wagmi adapter.
 */

import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { bscTestnet, type AppKitNetwork } from '@reown/appkit/networks'

// Get projectId from environment
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '60afa7e692e94972d30babecedbd7c1f'

// Metadata about the application
const metadata = {
  name: 'APEX Airways',
  description: 'Book flights with crypto payments',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://apex-airways.example.com',
  icons: ['/favicon.ico']
}

// Define supported networks - BNB Testnet only for this demo
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [bscTestnet]

// Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true // Enable SSR for Next.js
})

// Create and configure AppKit modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  defaultNetwork: bscTestnet,
  features: {
    analytics: false,
    email: false,
    socials: false
  },
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#FACC15', // Yellow accent
    '--w3m-border-radius-master': '16px'
  }
})
