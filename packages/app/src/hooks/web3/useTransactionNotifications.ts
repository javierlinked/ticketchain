import { useEffect, useRef } from 'react'
import { useNotifications } from '@/context/notifications'
import { useAccount } from 'wagmi'

/**
 * Options for transaction notifications
 */
interface TransactionNotificationOptions {
  /** Message to show on successful transaction */
  successMessage: string
  /** Optional custom error message prefix (default: "Transaction failed") */
  errorMessagePrefix?: string
  /** Whether to include block explorer link in success notification */
  includeExplorerLink?: boolean
}

/**
 * Custom hook to handle transaction notifications consistently
 * Prevents duplicate notifications and provides block explorer links
 * 
 * @param txHash - The transaction hash
 * @param isSuccess - Whether the transaction succeeded
 * @param error - Transaction error if any
 * @param options - Notification options
 * 
 * @example
 * ```tsx
 * const { data: txHash, writeContract } = useWriteContract()
 * const { isSuccess, error } = useWaitForTransactionReceipt({ hash: txHash })
 * 
 * useTransactionNotifications(txHash, isSuccess, error, {
 *   successMessage: 'Ticket purchased successfully!',
 *   includeExplorerLink: true
 * })
 * ```
 */
export function useTransactionNotifications(
  txHash: `0x${string}` | undefined,
  isSuccess: boolean,
  error: Error | null,
  options: TransactionNotificationOptions
) {
  const { addNotification } = useNotifications()
  const { chain } = useAccount()
  
  // Track which transaction hash we've notified about
  const notifiedTxHashRef = useRef<`0x${string}` | undefined>(undefined)
  const notifiedErrorRef = useRef(false)

  // Reset notification flags when transaction hash changes
  useEffect(() => {
    if (txHash !== notifiedTxHashRef.current) {
      notifiedTxHashRef.current = undefined
      notifiedErrorRef.current = false
    }
  }, [txHash])

  // Handle success notification
  useEffect(() => {
    if (isSuccess && txHash && notifiedTxHashRef.current !== txHash) {
      const explorerUrl = chain?.blockExplorers?.default.url
      const shouldIncludeLink = options.includeExplorerLink && explorerUrl

      addNotification(options.successMessage, {
        type: 'success',
        href: shouldIncludeLink ? `${explorerUrl}/tx/${txHash}` : undefined,
      })

      notifiedTxHashRef.current = txHash
      notifiedErrorRef.current = false
    }
  }, [isSuccess, txHash, addNotification, options.successMessage, options.includeExplorerLink, chain])

  // Handle error notification
  useEffect(() => {
    if (error && !notifiedErrorRef.current) {
      const errorPrefix = options.errorMessagePrefix || 'Transaction failed'
      const errorMessage = error.message || 'Unknown error'
      
      addNotification(`${errorPrefix}: ${errorMessage}`, {
        type: 'error',
      })

      notifiedErrorRef.current = true
    }
  }, [error, addNotification, options.errorMessagePrefix])
}
