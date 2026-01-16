import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { ticketContractAbi } from '@/abis'
import { useCallback } from 'react'
import { useTransactionNotifications } from '@/hooks/web3/useTransactionNotifications'

/**
 * Hook to handle ticket purchase transactions
 * 
 * Manages the full lifecycle of buying tickets including transaction submission,
 * waiting for confirmation, and showing success/error notifications with explorer links.
 * Automatically calculates total price based on quantity and ticket price.
 * 
 * @param contractAddress - The ERC1155 ticket contract address
 * 
 * @returns Object containing:
 *  - buyTicket: Function to initiate a ticket purchase
 *  - isLoading: Boolean indicating if transaction is pending
 *  - isSuccess: Boolean indicating if transaction succeeded
 * 
 * @remarks
 * - Automatically shows notifications via useTransactionNotifications
 * - Includes block explorer links in success notifications
 * - Calculates total ETH value (price * quantity) automatically
 * - Passes empty bytes for ERC1155 data parameter
 * 
 * @example
 * ```tsx
 * const { buyTicket, isLoading, isSuccess } = useBuyTicket(contractAddress)
 * 
 * const handlePurchase = () => {
 *   buyTicket(ticketId, 2, pricePerTicket) // Buy 2 tickets
 * }
 * ```
 */
export function useBuyTicket(contractAddress: `0x${string}`) {
  const { data: buyTransactionHash, writeContract } = useWriteContract()
  const { isLoading, error, isSuccess } = useWaitForTransactionReceipt({ hash: buyTransactionHash })

  // Use centralized notification handling
  useTransactionNotifications(buyTransactionHash, isSuccess, error, {
    successMessage: 'Successfully purchased ticket!',
    errorMessagePrefix: 'Failed to purchase ticket',
    includeExplorerLink: true,
  })

  const buyTicket = useCallback(
    (ticketId: bigint, quantity: number, price: bigint) => {
      const totalPrice = price * BigInt(quantity)
      const emptyBytes = '0x'

      writeContract({
        address: contractAddress,
        abi: ticketContractAbi,
        functionName: 'buy',
        args: [ticketId, BigInt(quantity), emptyBytes as `0x${string}`],
        value: totalPrice,
      })
    },
    [contractAddress, writeContract]
  )

  return { buyTicket, isLoading, isSuccess }
}
