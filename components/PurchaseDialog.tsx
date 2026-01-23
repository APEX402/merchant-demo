'use client'

/**
 * PurchaseDialog Component
 *
 * Modal dialog for purchasing flight tickets with USDT.
 * Shows flight summary, price, and handles the payment transaction.
 */

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { X, Plane, Check, Loader2, ExternalLink, AlertCircle } from 'lucide-react'
import {
  USDT_CONTRACT_ADDRESS,
  MERCHANT_WALLET,
  FLIGHT_PRICE_USDT,
  FLIGHT_PRICE_RAW,
  ERC20_ABI
} from '@/lib/contracts/payment'

interface PurchaseDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function PurchaseDialog({ isOpen, onClose }: PurchaseDialogProps) {
  const { address, isConnected } = useAccount()
  const { open: openWalletModal } = useAppKit()
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    writeContract,
    data: hash,
    isPending: isWritePending,
    error: writeError,
    reset: resetWrite
  } = useWriteContract()

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError
  } = useWaitForTransactionReceipt({
    hash,
  })

  // Show success state when transaction is confirmed
  useEffect(() => {
    if (isConfirmed) {
      setShowSuccess(true)
    }
  }, [isConfirmed])

  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setShowSuccess(false)
      resetWrite()
    }
  }, [isOpen, resetWrite])

  const handlePurchase = () => {
    if (!isConnected) {
      openWalletModal()
      return
    }

    writeContract({
      address: USDT_CONTRACT_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'transfer',
      args: [MERCHANT_WALLET as `0x${string}`, FLIGHT_PRICE_RAW]
    })
  }

  if (!isOpen) return null

  const isLoading = isWritePending || isConfirming
  const error = writeError || confirmError

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="apex-section-black px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Complete Purchase</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {showSuccess ? (
            // Success State
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Payment Successful!
              </h3>
              <p className="text-muted-foreground mb-4">
                Your flight has been booked successfully.
              </p>
              {hash && (
                <a
                  href={`https://testnet.bscscan.com/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  View on BSCScan
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={onClose}
                className="mt-6 w-full bg-primary hover:bg-primary/90 text-black font-medium rounded-full px-6 py-3"
              >
                Done
              </button>
            </div>
          ) : (
            // Purchase Form
            <>
              {/* Flight Summary */}
              <div className="bg-muted rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Plane className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">LHR → DXB</div>
                    <div className="text-sm text-muted-foreground">Sat, 29 Nov 2025</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Departure</div>
                    <div className="font-medium">09:40 London</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Arrival</div>
                    <div className="font-medium">20:10 Dubai</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Flight</div>
                    <div className="font-medium">AX004</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Class</div>
                    <div className="font-medium">Economy</div>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-b border-muted py-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Price</span>
                  <span className="text-2xl font-bold text-foreground">
                    {FLIGHT_PRICE_USDT} USDT
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Payment on BNB Testnet
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-700">
                    {error.message?.includes('User rejected')
                      ? 'Transaction was rejected'
                      : error.message?.includes('insufficient')
                        ? 'Insufficient USDT balance'
                        : 'Transaction failed. Please try again.'}
                  </div>
                </div>
              )}

              {/* Purchase Button */}
              {isConnected ? (
                <button
                  onClick={handlePurchase}
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-black font-medium rounded-full px-6 py-3 flex items-center justify-center gap-2 transition-colors"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {isWritePending ? 'Confirm in Wallet...' : 'Processing...'}
                    </>
                  ) : (
                    <>Pay {FLIGHT_PRICE_USDT} USDT</>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => openWalletModal()}
                  className="w-full bg-primary hover:bg-primary/90 text-black font-medium rounded-full px-6 py-3"
                >
                  Connect Wallet to Pay
                </button>
              )}

              {/* Wallet Info */}
              {isConnected && address && (
                <div className="mt-3 text-center text-xs text-muted-foreground">
                  Paying from {address.slice(0, 6)}...{address.slice(-4)}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
