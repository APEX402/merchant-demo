/**
 * Payment Contract Configuration
 *
 * Contains USDT contract address and merchant wallet for BNB Testnet payments
 */

// USDT contract address on BNB Testnet
export const USDT_CONTRACT_ADDRESS = '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd' as const

// Merchant wallet address
export const MERCHANT_WALLET = process.env.NEXT_PUBLIC_MERCHANT_WALLET || '0xe797D731fDd787F11Ffa207A48465dFA86321B54'

// Flight price in USDT (no decimals - will be multiplied by 10^18)
export const FLIGHT_PRICE_USDT = 5

// USDT has 18 decimals on BNB Testnet
export const USDT_DECIMALS = 18

// Flight price with decimals
export const FLIGHT_PRICE_RAW = BigInt(FLIGHT_PRICE_USDT) * BigInt(10 ** USDT_DECIMALS)

// Minimal ERC-20 ABI for transfer
export const ERC20_ABI = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'allowance',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  }
] as const
