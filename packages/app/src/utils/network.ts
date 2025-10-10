import { mainnet, arbitrum, base, polygon, optimism } from '@reown/appkit/networks'
import { sepolia } from '@reown/appkit/networks'

/**
 * Supported Ethereum chains for the application
 * 
 * Includes mainnet and major L2 networks plus Sepolia testnet.
 * Used for wallet connection and multi-chain support.
 */
export const ETH_CHAINS = [mainnet, arbitrum, base, polygon, optimism, sepolia]

/**
 * Color mappings for different blockchain networks
 * 
 * Provides consistent visual identity for each network across the UI.
 * Each network has a color name and Tailwind background variant class.
 */
export const NETWORK_COLORS = {
  ethereum: {
    color: 'indigo',
    bgVariant: 'bg-indigo-600',
  },
  arbitrum: {
    color: 'sky',
    bgVariant: 'bg-sky-600',
  },
  base: {
    color: 'blue',
    bgVariant: 'bg-blue-600',
  },
  linea: {
    color: 'slate',
    bgVariant: 'bg-slate-600',
  },
  polygon: {
    color: 'purple',
    bgVariant: 'bg-purple-600',
  },
  optimism: {
    color: 'red',
    bgVariant: 'bg-red-600',
  },
  scroll: {
    color: 'amber',
    bgVariant: 'bg-amber-600',
  },
  other: {
    color: 'gray',
    bgVariant: 'bg-gray-600',
  },
}

/**
 * Get the visual color identity for a blockchain network
 * 
 * Maps network names (including aliases like 'homestead', 'matic') to consistent
 * color schemes for UI display. Case-insensitive and handles common name variations.
 * 
 * @param chain - The chain name (e.g., 'ethereum', 'mainnet', 'arbitrum')
 * @param type - Whether to return color name or Tailwind background class
 * @returns The color string or background variant class for the network
 * 
 * @example
 * ```tsx
 * GetNetworkColor('ethereum', 'color') // 'indigo'
 * GetNetworkColor('Arbitrum', 'bgVariant') // 'bg-sky-600'
 * GetNetworkColor('unknown') // 'gray' (fallback)
 * ```
 */
export function GetNetworkColor(chain?: string, type: 'color' | 'bgVariant' = 'color') {
  chain = chain?.toLocaleLowerCase()
  if (chain === 'ethereum' || chain === 'mainnet' || chain === 'homestead') return NETWORK_COLORS.ethereum[type]
  if (chain?.includes('arbitrum')) return NETWORK_COLORS.arbitrum[type]
  if (chain?.includes('base')) return NETWORK_COLORS.base[type]
  if (chain?.includes('linea')) return NETWORK_COLORS.linea[type]
  if (chain?.includes('polygon') || chain?.includes('matic')) return NETWORK_COLORS.polygon[type]
  if (chain?.includes('optimism') || chain?.startsWith('op')) return NETWORK_COLORS.optimism[type]
  if (chain?.includes('scroll')) return NETWORK_COLORS.scroll[type]

  return NETWORK_COLORS.other[type]
}
