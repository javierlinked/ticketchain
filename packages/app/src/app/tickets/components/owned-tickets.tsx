import React from 'react'
import { OwnedTicket } from '@/types/tickets'
import { SpinnerIcon, TicketIcon, TrashIcon, TransferIcon } from '@/components/icons'

interface OwnedTicketsProps {
  tickets: OwnedTicket[]
  isLoading?: boolean
}

export const OwnedTickets = React.memo(function OwnedTickets({ tickets, isLoading }: OwnedTicketsProps) {
  if (isLoading) {
    return (
      <div className='card-glass rounded-xl border border-slate-700/50 p-8 text-center md:col-span-3'>
        <div className='flex justify-center'>
          <SpinnerIcon className='h-8 w-8 text-indigo-500' aria-hidden />
        </div>
        <p className='mt-4 text-slate-400'>Loading your tickets...</p>
      </div>
    )
  }

  if (!tickets.length) {
    return (
      <div className='card-glass rounded-xl border border-slate-700/50 md:col-span-3'>
        <div className='p-6 border-b border-slate-700/50'>
          <h2 className='text-xl font-semibold flex items-center'>
            <TicketIcon className='h-5 w-5 mr-2 text-indigo-400' aria-hidden />
            Your Tickets
          </h2>
        </div>
        <div className='p-12 text-center'>
          <TicketIcon className='h-12 w-12 mx-auto mb-4 text-slate-500' aria-hidden />
          <h3 className='text-lg font-medium text-slate-300 mb-1'>No tickets yet</h3>
          <p className='text-slate-500 mb-6'>Purchase tickets to see them here</p>
          <a
            href='/tickets'
            className='inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors'>
            Browse Available Tickets
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className='card-glass rounded-xl border border-slate-700/50 md:col-span-3'>
      <div className='p-6 border-b border-slate-700/50'>
        <h2 className='text-xl font-semibold flex items-center'>
          <TicketIcon className='h-5 w-5 mr-2 text-indigo-400' aria-hidden />
          Your Tickets
        </h2>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-slate-700/50'>
              <th className='px-6 py-4 text-left text-sm font-semibold text-slate-300'>Event</th>
              <th className='px-6 py-4 text-left text-sm font-semibold text-slate-300'>Quantity</th>
              <th className='px-6 py-4 text-center text-sm font-semibold text-slate-300'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id.toString()}
                className='border-b border-slate-700/30 last:border-0 hover:bg-slate-800/30 transition-colors'>
                <td className='px-6 py-4'>
                  <div className='flex flex-col'>
                    <span className='font-medium text-slate-200'>{ticket.name}</span>
                    <span className='text-sm text-slate-500'>ID: {ticket.id.toString()}</span>
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900/30 text-indigo-300'>
                    {ticket.quantity.toString()}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <div className='flex justify-end space-x-2'>
                    <button className='btn-secondary'>
                      <TrashIcon className='h-4 w-4 mr-1 text-rose-500' aria-hidden />
                      Burn
                    </button>
                    <button className='btn-secondary'>
                      <TransferIcon className='h-4 w-4 mr-1 text-indigo-400' aria-hidden />
                      Transfer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})
