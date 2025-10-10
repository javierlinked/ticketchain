import { useState, useCallback, useEffect } from 'react'
import { useReadContract } from 'wagmi'
import { ticketContractAbi } from '@/abis'
import { readContract } from '@/services/contract/contractService'
import { Chain } from 'viem'

/**
 * Hook to fetch all ticket IDs from the smart contract
 * 
 * Retrieves the total count of ticket IDs and fetches each ID individually.
 * Implements safety limit (max 100 IDs) to prevent excessive API calls.
 * Only fetches data for non-owner users (owners see creation UI instead).
 * 
 * @param contractAddress - The ERC1155 ticket contract address (undefined if not connected)
 * @param isContractOwner - Whether the connected user is the contract owner
 * @param chain - The blockchain network to query (required for multi-chain support)
 * 
 * @returns Object containing:
 *  - ticketIds: Array of bigint ticket IDs from the contract
 *  - loading: Boolean indicating if data is being fetched
 *  - error: Error message string if fetch failed, null otherwise
 *  - refetch: Function to manually trigger a refetch
 * 
 * @remarks
 * - Returns empty array for contract owners (they use creation UI)
 * - Limits fetching to first 100 ticket IDs for performance
 * - Skips individual IDs that fail to fetch (continues with next)
 * 
 * @example
 * ```tsx
 * const { ticketIds, loading, error, refetch } = useTicketIds(
 *   contractAddress,
 *   false,
 *   sepolia
 * )
 * ```
 */
export function useTicketIds(
  contractAddress: `0x${string}` | undefined,
  isContractOwner: boolean,
  chain: Chain | undefined
) {
  const [ticketIds, setTicketIds] = useState<bigint[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data: ticketIdsLength } = useReadContract({
    address: contractAddress,
    abi: ticketContractAbi,
    functionName: 'tokenIdsLength',
  })

  const fetchTicketIds = useCallback(async () => {
    if (!ticketIdsLength || !contractAddress || isContractOwner || !chain) {
      setTicketIds([])
      return
    }
    setLoading(true)
    setError(null)
    try {
      const ids: bigint[] = []
      const safeLength = Math.min(Number(ticketIdsLength), 100)
      for (let i = 0; i < safeLength; i++) {
        try {
          const id = await readContract<bigint>(
            {
              address: contractAddress,
              abi: ticketContractAbi,
              functionName: 'tokenIds',
              args: [BigInt(i)],
            },
            chain
          )
          if (id) ids.push(id)
        } catch (_) {
          // Continue to next ID
        }
      }
      setTicketIds(ids)
    } catch (_err) {
      setError('Failed to load ticket IDs')
    } finally {
      setLoading(false)
    }
  }, [contractAddress, ticketIdsLength, isContractOwner, chain])

  useEffect(() => {
    fetchTicketIds()
  }, [fetchTicketIds])

  return { ticketIds, loading, error, refetch: fetchTicketIds }
}
