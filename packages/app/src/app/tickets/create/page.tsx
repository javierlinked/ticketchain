'use client'
import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useNotifications } from '@/context/notifications'
import { parseEther } from 'viem'
import { useContractConfig } from '@/services/contract/contractConfig'
import { useTransactionNotifications } from '@/hooks/web3/useTransactionNotifications'
import { InlineSpinner } from '@/components/loading-spinner'

export default function CreateTicket() {
  const [ticketName, setTicketName] = useState('')
  const [ticketPrice, setTicketPrice] = useState('0.01')
  const [ticketSupply, setTicketSupply] = useState('100')
  const [maxSellPerPerson, setMaxSellPerPerson] = useState('5')
  const [infoUrl, setInfoUrl] = useState('')

  const { address, chain } = useAccount()
  const { addNotification } = useNotifications()

  const { address: contractAddress, abi } = useContractConfig(chain)

  const { data, writeContract } = useWriteContract()

  const {
    isLoading,
    error: txError,
    isSuccess: txSuccess,
  } = useWaitForTransactionReceipt({
    hash: data,
  })

  // Use centralized notification handling
  useTransactionNotifications(data, txSuccess, txError, {
    successMessage: 'Ticket created successfully!',
    errorMessagePrefix: 'Failed to create ticket',
    includeExplorerLink: true,
  })

  const handleCreateTicket = () => {
    if (!address) {
      addNotification('Please connect your wallet first', { type: 'warning' })
      return
    }

    const emptyBytes = '0x'

    writeContract({
      address: contractAddress,
      abi,
      functionName: 'create',
      args: [ticketName, parseEther(ticketPrice), BigInt(ticketSupply), BigInt(maxSellPerPerson), infoUrl, emptyBytes as `0x${string}`],
    })
  }

  return (
    <div className='card-glass rounded-xl border border-slate-700/50 p-6'>
      <div className='mb-6'>
        <h2 className='text-xl font-bold'>Create New Ticket</h2>
        <p className='text-slate-400 mt-1'>Set up a new event ticket for sale</p>
      </div>

      <div className='space-y-5'>
        <div>
          <label className='label-text'>Event Name</label>
          <input
            type='text'
            value={ticketName}
            onChange={(e) => setTicketName(e.target.value)}
            placeholder='Enter event name'
            className='input-field'
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div>
            <label className='label-text'>Ticket Price (ETH)</label>
            <input
              type='number'
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              placeholder='0.01'
              className='input-field'
              step='0.01'
              min='0'
            />
          </div>

          <div>
            <label className='label-text'>Total Supply</label>
            <input
              type='number'
              value={ticketSupply}
              onChange={(e) => setTicketSupply(e.target.value)}
              placeholder='100'
              className='input-field'
              min='1'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div>
            <label className='label-text'>Max Tickets Per Person</label>
            <input
              type='number'
              value={maxSellPerPerson}
              onChange={(e) => setMaxSellPerPerson(e.target.value)}
              placeholder='5'
              className='input-field'
              min='1'
            />
          </div>

          <div>
            <label className='label-text'>Event Info URL</label>
            <input
              type='text'
              value={infoUrl}
              onChange={(e) => setInfoUrl(e.target.value)}
              placeholder='https://example.com/event-info'
              className='input-field'
            />
          </div>
        </div>

        <button
          className='btn-primary w-full py-3 mt-4'
          onClick={handleCreateTicket}
          disabled={isLoading || !ticketName || !address}>
          {isLoading ? (
            <div className='flex items-center justify-center'>
              <InlineSpinner className='mr-2' />
              Creating Ticket...
            </div>
          ) : (
            'Create Ticket'
          )}
        </button>
      </div>
    </div>
  )
}
