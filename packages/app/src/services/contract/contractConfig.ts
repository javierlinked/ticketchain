import { sepolia } from 'viem/chains'
import { ticketContractAddress, ticketContractAbi } from '@/abis'
import type { Chain } from 'viem'

/**
 * Contract configuration object returned by config functions
 */
export interface ContractConfig {
  /** The contract address on the specified chain */
  address: `0x${string}`
  /** The contract ABI for type-safe interactions */
  abi: typeof ticketContractAbi
  /** The resolved chain ID (may differ from requested if fallback used) */
  chainId: number
}

/**
 * Resolves contract configuration for a specific blockchain network
 * 
 * Implements Single Responsibility Principle - only handles contract address resolution.
 * Provides automatic fallback to Sepolia testnet when contract is not deployed on
 * the requested chain, preventing app crashes during development.
 * 
 * @param chain - The blockchain network to get contract config for (optional)
 * @returns ContractConfig object with address, ABI, and resolved chain ID
 * @throws Error only if contract is missing on requested chain AND Sepolia fallback
 * 
 * @remarks
 * - Falls back to Sepolia in development if contract not found on requested chain
 * - Shows warning in development console when fallback occurs
 * - Throws error only if no contract address available at all
 * - Chain parameter can be Viem Chain object or minimal {id: number} object
 * 
 * @example
 * ```tsx
 * // Get config for connected chain
 * const config = getContractConfig(chain)
 * 
 * // Use with wagmi
 * const { data } = useReadContract({
 *   address: config.address,
 *   abi: config.abi,
 *   functionName: 'owner'
 * })
 * ```
 */
export function getContractConfig(chain?: Chain | { id: number }): ContractConfig {
  const preferredChainId = chain?.id ?? sepolia.id
  let resolvedChainId = preferredChainId
  let address = ticketContractAddress[preferredChainId as keyof typeof ticketContractAddress]

  if (!address) {
    // Fallback to Sepolia for dev/demo
    const fallback = ticketContractAddress[sepolia.id as keyof typeof ticketContractAddress]
    if (!fallback) {
      // If even fallback is missing, keep previous behavior
      throw new Error(`Contract not deployed on chain ${preferredChainId}`)
    }
    if (process.env.NODE_ENV !== 'production') {
       
      console.warn(
        `Contract not found for chain ${preferredChainId}. Falling back to Sepolia (${sepolia.id}).`
      )
    }
    address = fallback
    resolvedChainId = sepolia.id
  }

  return {
    address,
    abi: ticketContractAbi,
    chainId: resolvedChainId,
  }
}

/**
 * React hook wrapper for getContractConfig
 * 
 * Provides contract configuration in React components with automatic
 * updates when chain changes.
 * 
 * @param chain - The blockchain network to get contract config for (optional)
 * @returns ContractConfig object with address, ABI, and resolved chain ID
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { chain } = useAccount()
 *   const { address, abi } = useContractConfig(chain)
 *   
 *   return <div>Contract: {address}</div>
 * }
 * ```
 */
export function useContractConfig(chain?: Chain | { id: number }) {
  return getContractConfig(chain)
}
