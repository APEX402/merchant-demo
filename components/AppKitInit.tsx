'use client'

/**
 * AppKit Initializer Component
 *
 * This component initializes the Reown AppKit on the client side.
 * It must be a client component since AppKit uses browser APIs.
 */

// Import wallet config to initialize AppKit
import '@/lib/wallet-config'

export function AppKitInit() {
  // This component doesn't render anything
  // It just ensures the wallet-config module is loaded on the client
  return null
}
