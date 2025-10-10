import { useEffect, useState, useCallback } from 'react'
import { readContract } from '@/services/contract/contractService'
import { ticketContractAbi } from '@/abis'
import { OwnedTicket, TicketDetails } from '@/types/tickets'
import { Chain } from 'viem'

/**
 * Hook to fetch and manage tickets owned by a specific wallet address
 * 
 * Queries the ERC1155 contract for balances of all provided ticket IDs
 * and retrieves full ticket details for owned tickets (balance > 0).
 * Handles errors gracefully and supports manual refresh.
 * 
 * @param contractAddress - The ERC1155 ticket contract address
 * @param address - The wallet address to check ownership for
 * @param ticketIds - Array of ticket IDs to check balances for
 * @param chain - The blockchain network to query (required for multi-chain support)
 * @param refreshKey - Optional key that triggers refetch when changed (for manual refresh)
 * 
 * @returns Object containing:
 *  - ownedTickets: Array of owned tickets with ID, name, and quantity
 *  - loading: Boolean indicating if data is being fetched
 *  - error: Error message string if fetch failed, null otherwise
 *  - refetch: Function to manually trigger a refetch
 * 
 * @example
 * ```tsx
 * const { ownedTickets, loading, error, refetch } = useOwnedTickets(
 *   contractAddress,
 *   userAddress,
 *   [1n, 2n, 3n],
 *   sepolia,
 *   refreshKey
 * )
 * ```
 */
export function useOwnedTickets(
  contractAddress: `0x${string}`,
  address: `0x${string}` | undefined,
  ticketIds: bigint[],
  chain: Chain | undefined,
  refreshKey?: number
) {
  const [ownedTickets, setOwnedTickets] = useState<OwnedTicket[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOwned = useCallback(async () => {
    if (!address || !chain) return
    
    setLoading(true)
    setError(null)
    try {
      const owned: OwnedTicket[] = []

      for (const id of ticketIds) {
        try {
          const balance = await readContract<bigint>(
            {
              address: contractAddress,
              abi: ticketContractAbi,
              functionName: 'balanceOf',
              args: [address, id],
            },
            chain
          )

          if (balance > BigInt(0)) {
            const ticketDetails = await readContract<TicketDetails>(
              {
                address: contractAddress,
                abi: ticketContractAbi,
                functionName: 'tickets',
                args: [id],
              },
              chain
            )

            // The contract returns an array of values (tuple)
            // Based on the TicketDetails type, the order is [id, name, price, maxSellPerPerson, infoUrl]
            // The second element (index 1) is the name
            const name = ticketDetails[1]

            owned.push({
              id,
              name: name || `Ticket #${id.toString()}`,
              quantity: balance,
            })
          }
        } catch (ticketError) {
          if (process.env.NODE_ENV === 'development') {
            console.error(`Error processing ticket ${id}:`, ticketError)
          }
        }
      }

      setOwnedTickets(owned)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching owned tickets:', err)
      }
      setError('Failed to load owned tickets')
    } finally {
      setLoading(false)
    }
  }, [contractAddress, address, ticketIds, chain])

  useEffect(() => {
    if (contractAddress && address && ticketIds.length > 0 && chain) fetchOwned()
  }, [contractAddress, address, ticketIds, chain, fetchOwned, refreshKey])

  const refetch = useCallback(() => {
    if (contractAddress && address && ticketIds.length > 0 && chain) {
      return fetchOwned()
    }
    return Promise.resolve()
  }, [contractAddress, address, ticketIds, chain, fetchOwned])

  return {
    ownedTickets,
    loading,
    error,
    refetch,
  }
}
