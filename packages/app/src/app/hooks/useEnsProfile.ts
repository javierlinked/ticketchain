import { useCallback } from 'react'
import { normalize } from 'viem/ens'
import { useEnsAddress, useEnsAvatar, useEnsText } from 'wagmi'

/**
 * Hook to fetch ENS (Ethereum Name Service) profile information
 * 
 * Retrieves ENS address, avatar, and custom text records for a given ENS name.
 * Automatically normalizes the ENS name to handle internationalized characters.
 * 
 * @param params - Configuration object
 * @param params.ensName - The ENS name to look up (e.g., 'vitalik.eth')
 * @param params.key - Optional text record key to fetch (default: 'text')
 * 
 * @returns Object containing:
 *  - ensAddress: The Ethereum address associated with the ENS name
 *  - ensAvatar: The avatar URL set in the ENS record
 *  - ensTextData: Custom text data from the specified key
 * 
 * @remarks
 * - Always queries mainnet (chainId: 1) for ENS data
 * - Normalizes ENS names for proper Unicode handling
 * - Returns undefined for each field if lookup fails
 * - Common text record keys: 'description', 'url', 'twitter', 'github'
 * 
 * @example
 * ```tsx
 * const { ensAddress, ensAvatar, ensTextData } = useEnsProfile({
 *   ensName: 'vitalik.eth',
 *   key: 'description'
 * })
 * 
 * return (
 *   <div>
 *     <img src={ensAvatar} alt={ensName} />
 *     <p>Address: {ensAddress}</p>
 *     <p>Bio: {ensTextData}</p>
 *   </div>
 * )
 * ```
 */
const useEnsProfile = ({ ensName, key }: { ensName: string; key?: string }) => {
  const normalizedName = useCallback(() => {
    try {
      return normalize(ensName)
    } finally {
      return ''
    }
  }, [ensName])

  const name = normalizedName()

  const { data: ensAddress } = useEnsAddress({ name, chainId: 1 })
  const { data: ensAvatar } = useEnsAvatar({ name, chainId: 1 })
  const { data: ensTextData } = useEnsText({ name, chainId: 1, key: key ?? 'text' })

  return { ensAddress, ensAvatar, ensTextData }
}

export default useEnsProfile
