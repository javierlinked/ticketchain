import React from 'react'
import { useWeb3Context } from '../context/'

async function useAccountName() {
  const { address, web3Provider } = useWeb3Context()
  if (web3Provider && address) {
    const name = await web3Provider?.lookupAddress(address)
    return name || address
  }
}

export async function Web3Address() {
  const name = await useAccountName()


  return (
    <div className="flex items-center justify-center">
      <div className="border-grey md: w-full rounded-xl border sm:max-w-xl md:max-w-2xl">
        <div className="flex flex-row justify-between py-2 px-6">
          <span className="md:text-md text-left text-sm font-light lg:text-lg">
            Address
          </span>
          <span className="md:text-md truncate pl-4 text-right text-sm  font-light lg:text-lg">
            {name}
          </span>
        </div>
      </div>
    </div>
  )
}
