'use client'

import React from 'react'
import { useBlockNumber, useAccount } from 'wagmi'
import { GetNetworkColor } from '@/utils/network'
import { LinkComponent } from './link-component'

export function NetworkStatus() {
  const block = useBlockNumber({ watch: true })
  const { chain } = useAccount()

  // Define a fallback block explorer URL generator
  const explorerUrl = chain?.blockExplorers?.default.url
    ? `${chain.blockExplorers.default.url}/block/${block.data?.toString()}`
    : undefined

  const networkName = chain?.name ?? 'Ethereum'
  const color = GetNetworkColor(networkName, 'bgVariant')

  return (
    <div className='flex items-center gap-3 whitespace-nowrap'>
      <div className={`badge-info ${color}`}>{networkName}</div>
      {explorerUrl ? (
        <LinkComponent href={explorerUrl} className='hover:text-slate-300 transition-colors'>
          <p className='text-sm'># {block.data?.toString()}</p>
        </LinkComponent>
      ) : (
        <p className='text-sm'># {block.data?.toString()}</p>
      )}
    </div>
  )
}
