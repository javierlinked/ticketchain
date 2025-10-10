'use client'

import React, { PropsWithChildren } from 'react'
import { Web3Provider } from '@/context/web3'
import { NotificationProvider } from '@/context/notifications'
import { TokenProvider } from '@/context/token-context'

interface AppProvidersProps extends PropsWithChildren {
  cookies?: string | null
}

export function AppProviders({ children, cookies }: AppProvidersProps) {
  return (
    <Web3Provider cookies={cookies || null}>
      <NotificationProvider>
        <TokenProvider>
          {children}
        </TokenProvider>
      </NotificationProvider>
    </Web3Provider>
  )
}