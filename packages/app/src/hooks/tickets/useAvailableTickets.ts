import { useEffect, useState, useCallback } from 'react'
import { readContract } from '@/services/contract/contractService'
import { ticketContractAbi } from '@/abis'
import { Ticket, TicketDetails } from '@/types/tickets'
import { Chain } from 'viem'

/**
 * Hook to fetch and manage available tickets from the smart contract
 * 
 * Retrieves ticket details for all provided ticket IDs including name, price,
 * max sell limit, and info URL. Automatically refetches when dependencies change.
 * 
 * @param contractAddress - The ERC1155 ticket contract address
 * @param ticketIds - Array of ticket IDs to fetch details for
 * @param chain - The blockchain network to query (required for multi-chain support)
 * @param refreshKey - Optional key that triggers refetch when changed (for manual refresh)
 * 
 * @returns Object containing:
 *  - tickets: Array of available tickets with their details
 *  - loading: Boolean indicating if data is being fetched
 *  - error: Error message string if fetch failed, null otherwise
 *  - refetch: Function to manually trigger a refetch
 * 
 * @example
 * ```tsx
 * const { tickets, loading, error, refetch } = useAvailableTickets(
 *   contractAddress,
 *   [1n, 2n, 3n],
 *   sepolia,
 *   refreshKey
 * )
 * ```
 */
export function useAvailableTickets(
  contractAddress: `0x${string}`,
  ticketIds: bigint[],
  chain: Chain | undefined,
  refreshKey?: number
) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTickets = useCallback(async () => {
    if (!chain) return
    
    setLoading(true)
    setError(null)
    try {
      const fetchedTickets: Ticket[] = []
      for (const id of ticketIds) {
        const details = await readContract<TicketDetails>(
          {
            address: contractAddress,
            abi: ticketContractAbi,
            functionName: 'tickets',
            args: [id],
          },
          chain
        )
        if (details) {
          fetchedTickets.push({
            id,
            name: details[1] || 'Unknown Ticket',
            price: details[2] || BigInt(0),
            available: BigInt(0), // Update if your contract supports supply
            maxSellPerPerson: details[3] || BigInt(1),
            infoUrl: details[4] || '',
          })
        }
      }
      setTickets(fetchedTickets)
    } catch (_err) {
      setError('Failed to load tickets')
    } finally {
      setLoading(false)
    }
  }, [contractAddress, ticketIds, chain])

  useEffect(() => {
    if (contractAddress && ticketIds.length > 0 && chain) fetchTickets()
  }, [contractAddress, ticketIds, chain, fetchTickets, refreshKey])

  return { tickets, loading, error, refetch: fetchTickets }
}
