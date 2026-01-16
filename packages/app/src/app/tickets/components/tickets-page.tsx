'use client'
import React, { useMemo, useState, useEffect } from 'react'
import { useToken } from '@/context/token-context'
import { useAccount } from 'wagmi'
import { useContractConfig } from '@/services/contract/contractConfig'
import CreateTicket from '@/app/tickets/create/page'
import { useAvailableTickets } from '@/hooks/tickets/useAvailableTickets'
import { useBuyTicket } from '@/hooks/tickets/useBuyTicket'
import { useOwnedTickets } from '@/hooks/tickets/useOwnedTickets'
import { useTicketIds } from '@/hooks/tickets/useTicketIds'
import { ErrorBoundary } from '../../../components/error-boundary'
import { NetworkGuard } from '../../../components/network-guard'
import { WalletInfo } from '../../../components/wallet-info'
import { AvailableTickets } from '@/app/tickets/components/available-tickets'
import { OwnedTickets } from '@/app/tickets/components/owned-tickets'
import { AlertBox } from '@/components/alert-box'
import { LoadingSpinner } from '@/components/loading-spinner'

export function Tickets({
  tickets,
  ownedTickets,
  buyQuantity,
  setBuyQuantity,
  onBuyTicket,
  isBuyLoading,
  isConnected,
}: {
  tickets: Array<{
    id: bigint
    name: string
    price: bigint
    available: bigint
    maxSellPerPerson: bigint
    infoUrl: string
  }>
  ownedTickets: Array<{
    id: bigint
    name: string
    quantity: bigint
  }>
  buyQuantity: Record<string, number>
  setBuyQuantity: React.Dispatch<React.SetStateAction<Record<string, number>>>
  onBuyTicket: (ticketId: bigint, price: bigint) => void
  isBuyLoading: boolean
  isConnected: boolean
}) {
  return (
    <div className='space-y-8'>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
        <AvailableTickets
          tickets={tickets}
          buyQuantity={buyQuantity}
          setBuyQuantity={setBuyQuantity}
          onBuyTicket={onBuyTicket}
          isBuyLoading={isBuyLoading}
          isConnected={isConnected}
        />
        <OwnedTickets tickets={ownedTickets} isLoading={false} />
      </div>
    </div>
  )
}

export default function TicketsPage() {
  const { isContractOwner: isTokenContractOwner, isLoading: isTokenLoading } = useToken()
  const { address, chain } = useAccount()

  return (
    <ErrorBoundary>
      <NetworkGuard>
        <TicketsContent
          isTokenContractOwner={isTokenContractOwner}
          isTokenLoading={isTokenLoading}
          address={address}
          chain={chain}
        />
      </NetworkGuard>
    </ErrorBoundary>
  )
}

/**
 * Renders the main content for ticket management, handling both contract owner and regular user views.
 *
 * @param isTokenContractOwner - Indicates if the connected user is the token contract owner.
 * @param isTokenLoading - Loading state for token-related operations.
 * @param address - The connected wallet address.
 * @param chain - The current blockchain network chain object.
 *
 * @remarks
 * - If the user is the contract owner, displays ticket creation UI.
 * - If the user is not the contract owner, displays available tickets for purchase and owned tickets.
 * - Handles loading and error states for ticket data.
 * - Refreshes ticket data after a successful purchase.
 *
 * @returns The ticket management UI, including ticket creation (for owners), available tickets, and owned tickets.
 */
function TicketsContent({
  isTokenContractOwner,
  isTokenLoading,
  address,
  chain,
}: {
  isTokenContractOwner: boolean
  isTokenLoading: boolean
  address: `0x${string}` | undefined
  chain: ReturnType<typeof useAccount>['chain']
}) {
  const [buyQuantity, setBuyQuantity] = useState<Record<string, number>>({})
  const [refreshKey, setRefreshKey] = useState(0)

  // Use centralized contract configuration
  const { address: contractAddress } = useContractConfig(chain ? { id: chain.id } : undefined)

  const isContractOwner = isTokenContractOwner

  const { ticketIds, loading: ticketIdsLoading, error: ticketIdsError } = useTicketIds(contractAddress, isContractOwner, chain)
  const {
    tickets: availableTickets,
    loading: availableLoading,
    error: availableError,
  } = useAvailableTickets(contractAddress, ticketIds, chain, refreshKey)
  const {
    ownedTickets,
    loading: ownedLoading,
    error: ownedError,
  } = useOwnedTickets(contractAddress, address, ticketIds, chain, refreshKey)
  const { buyTicket, isLoading: isBuyLoading, isSuccess } = useBuyTicket(contractAddress)

  const isLoading = isTokenLoading || ticketIdsLoading || availableLoading || ownedLoading
  const error = ticketIdsError || availableError || ownedError

  const handleBuyTicket = (ticketId: bigint, price: bigint) => {
    const quantity = buyQuantity[ticketId.toString()] || 1
    buyTicket(ticketId, quantity, price)
  }

  useEffect(() => {
    if (isSuccess) {
      setRefreshKey((prevKey) => prevKey + 1)
    }
  }, [isSuccess])

  if (isLoading && !availableTickets.length && !ownedTickets.length) {
    return <LoadingSpinner size='lg' fullScreen />
  }

  return (
    <div className='max-w-7xl mx-auto px-4'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold'>Ticket Management</h1>
        <p className='text-slate-400 mt-2'>
          {isContractOwner
            ? 'Create and manage event tickets'
            : 'Browse available tickets and manage your collection'}
        </p>
      </div>

      {isContractOwner ? (
        <div className='space-y-6'>
          <AlertBox variant='info'>
            You are the contract owner. You can create new tickets.
          </AlertBox>
          <WalletInfo address={address} isRefreshing={isLoading} onRefresh={() => { }} />
          <CreateTicket />
        </div>
      ) : (
        <div className='space-y-6'>
          <AlertBox variant='info'>
            You can purchase available tickets from events.
          </AlertBox>
          <WalletInfo address={address} isRefreshing={isLoading} onRefresh={() => { }} />

          {error && (
            <AlertBox variant='error'>
              {error}
            </AlertBox>
          )}

          <div className='grid grid-cols-1 md:grid-cols-7 gap-6 mb-6'>
            <AvailableTickets
              tickets={availableTickets}
              buyQuantity={buyQuantity}
              setBuyQuantity={setBuyQuantity}
              onBuyTicket={handleBuyTicket}
              isBuyLoading={isBuyLoading}
              isConnected={!!address}
            />

            <OwnedTickets tickets={ownedTickets} isLoading={isLoading} />
          </div>
        </div>
      )}
    </div>
  )
}
