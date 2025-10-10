'use client'

import React, { createContext, PropsWithChildren, useContext } from 'react'
import { useAccount } from 'wagmi'
import { useContractOwnership } from '@/hooks/web3/useContractOwnership'

/**
 * Simplified Token Context
 * Provides only the essential contract ownership information
 */
interface TokenContextType {
  isContractOwner: boolean
  isLoading: boolean
}

const TokenContext = createContext<TokenContextType | undefined>(undefined)

export function TokenProvider({ children }: PropsWithChildren) {
  // Get contract ownership information
  const { isContractOwner, isLoading } = useContractOwnership()

  return (
    <TokenContext.Provider
      value={{
        isContractOwner,
        isLoading,
      }}>
      {children}
    </TokenContext.Provider>
  )
}

export function useToken() {
  const context = useContext(TokenContext)
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider')
  }
  return context
}
