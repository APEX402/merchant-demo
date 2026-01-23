'use client'

/**
 * WalletButton Component
 *
 * A wallet connection button that shows "Connect Wallet" when disconnected
 * and the truncated wallet address when connected.
 */

import { useAppKit } from '@reown/appkit/react'
import { useAccount } from 'wagmi'
import { Wallet } from 'lucide-react'

export function WalletButton() {
  const { open } = useAppKit()
  const { address, isConnected } = useAccount()

  const handleClick = () => {
    open()
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-sm hover:bg-white/20 transition-colors"
    >
      <Wallet className="w-4 h-4" />
      {isConnected && address ? (
        <span>{formatAddress(address)}</span>
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>
  )
}
