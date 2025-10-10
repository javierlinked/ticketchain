'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useChainId } from 'wagmi'
import { useContractConfig } from '@/services/contract/contractConfig'

/**
 * Hook to check if the connected wallet owns the smart contract
 * 
 * Compares the connected wallet address with the contract's owner address.
 * Uses centralized contract configuration for multi-chain support.
 * 
 * @returns Object containing:
 *  - isContractOwner: Boolean indicating if connected address is contract owner
 *  - isLoading: Boolean indicating if ownership check is in progress
 *  - contractAddress: The current contract address for the connected chain
 *  - chainId: The current chain ID
 * 
 * @remarks
 * - Implements Dependency Inversion Principle (depends on useContractConfig abstraction)
 * - Automatically updates when wallet or chain changes
 * - Case-insensitive address comparison
 * - Returns false if wallet not connected
 * 
 * @example
 * ```tsx
 * const { isContractOwner, isLoading } = useContractOwnership()
 * 
 * if (isLoading) return <LoadingSpinner />
 * 
 * return (
 *   <div>
 *     {isContractOwner ? (
 *       <CreateTicketForm />
 *     ) : (
 *       <BrowseTickets />
 *     )}
 *   </div>
 * )
 * ```
 */
export function useContractOwnership() {
  const { address } = useAccount()
  const chainId = useChainId()
  const [isContractOwner, setIsContractOwner] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { address: contractAddress, abi } = useContractConfig({ id: chainId })

  const { data: contractOwner } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'owner',
  })

  useEffect(() => {
    if (address && contractOwner) {
      setIsContractOwner(address.toLowerCase() === contractOwner.toLowerCase())
    } else {
      setIsContractOwner(false)
    }
    setIsLoading(false)
  }, [address, contractOwner])

  return {
    isContractOwner,
    isLoading,
    contractAddress,
    chainId,
  }
}
