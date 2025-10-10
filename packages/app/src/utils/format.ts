import { formatEther } from 'viem'

/**
 * Truncates a string by showing only the beginning and end with ellipsis in the middle
 * 
 * Useful for displaying long addresses, transaction hashes, or other identifiers
 * in a compact format while keeping recognizable portions visible.
 * 
 * @param text - The string to truncate
 * @param length - Number of characters to show from each end (default: 5)
 * @returns The truncated string with '...' in the middle, or original if short enough
 * 
 * @example
 * ```tsx
 * TruncateMiddle('0x1234567890abcdef', 4) // '0x12...cdef'
 * TruncateMiddle('short', 5) // 'short'
 * ```
 */
export function TruncateMiddle(text: string, length: number = 5) {
  if (text?.length > length * 2 + 1) {
    return `${text.substring(0, length)}...${text.substring(text.length - length, text.length)}`
  }

  return text
}

/**
 * Formats a bigint wei balance to a human-readable ether string
 * 
 * Converts wei (smallest ETH unit) to ether and formats with specified decimal places.
 * 
 * @param balance - The balance in wei as a bigint
 * @param toFixed - Number of decimal places to display (default: 4)
 * @returns String representation of the balance in ETH
 * 
 * @example
 * ```tsx
 * formatBalance(1000000000000000000n) // '1.0000' (1 ETH)
 * formatBalance(1500000000000000000n, 2) // '1.50' (1.5 ETH)
 * ```
 */
export function formatBalance(balance: bigint, toFixed?: number) {
  return parseFloat(formatEther(balance, 'wei')).toFixed(toFixed ?? 4)
}

