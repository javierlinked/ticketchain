'use client'

import { useState, useEffect } from 'react'
import { useWaitForTransactionReceipt } from 'wagmi'
import { useNotifications } from '@/context/notifications'

/**
 * Hook to manage blockchain transaction state and notifications
 * 
 * Tracks transaction status (loading, success, error) and automatically shows
 * notifications with block explorer links. Provides state reset functionality.
 * 
 * @param txData - The transaction hash to monitor
 * @param chain - Optional chain object containing block explorer URL
 * 
 * @returns Object containing:
 *  - isTransactionLoading: Boolean indicating if transaction is pending
 *  - isTransactionSuccess: Boolean indicating if transaction succeeded
 *  - transactionError: Error object if transaction failed, null otherwise
 *  - transactionHash: The confirmed transaction hash
 *  - resetTransactionState: Function to reset all transaction state
 *  - setIsTransactionLoading: Setter for loading state
 *  - setTransactionError: Setter for error state
 * 
 * @remarks
 * - Automatically shows success notification with explorer link
 * - Automatically shows error notification with error message
 * - Use resetTransactionState() after handling transaction result
 * 
 * @example
 * ```tsx
 * const { data: txHash } = useWriteContract()
 * const { isTransactionLoading, isTransactionSuccess, transactionError, resetTransactionState } = 
 *   useTransactionState(txHash, chain)
 * 
 * useEffect(() => {
 *   if (isTransactionSuccess) {
 *     console.log('Transaction confirmed!')
 *     resetTransactionState()
 *   }
 * }, [isTransactionSuccess])
 * ```
 */
export function useTransactionState(
  txData: `0x${string}` | undefined,
  chain?: { blockExplorers?: { default: { url: string } } }
) {
  const [isTransactionLoading, setIsTransactionLoading] = useState(false)
  const [isTransactionSuccess, setIsTransactionSuccess] = useState(false)
  const [transactionError, setTransactionError] = useState<Error | null>(null)
  const [transactionHash, setTransactionHash] = useState<`0x${string}` | undefined>()
  const { Add } = useNotifications()

  const { isLoading: txLoading, error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt({ hash: txData })

  useEffect(() => {
    setIsTransactionLoading(txLoading)
    if (txSuccess) {
      setIsTransactionSuccess(true)
      setTransactionHash(txData)
      Add(`Transaction successful`, {
        type: 'success',
        href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${txData}` : undefined,
      })
    } else if (txError) {
      setTransactionError(txError)
      Add(`Transaction failed: ${txError.cause}`, {
        type: 'error',
      })
    }
  }, [txSuccess, txError, txLoading, txData, Add, chain])

  const resetTransactionState = () => {
    setIsTransactionLoading(false)
    setTransactionError(null)
    setIsTransactionSuccess(false)
  }

  return {
    isTransactionLoading,
    isTransactionSuccess,
    transactionError,
    transactionHash,
    resetTransactionState,
    setIsTransactionLoading,
    setTransactionError,
  }
}
