import React from 'react'
import { formatBalance } from '@/utils/format'
import { Ticket } from '@/types/tickets'
import {
  TicketIcon,
  SadFaceIcon,
  InfoIcon,
  SpinnerIcon,
  ShoppingCartIcon,
} from '@/components/icons'

interface AvailableTicketsProps {
  tickets: Ticket[]
  buyQuantity: Record<string, number>
  setBuyQuantity: (value: Record<string, number>) => void
  onBuyTicket: (ticketId: bigint, price: bigint) => void
  isBuyLoading: boolean
  isConnected: boolean
}

export const AvailableTickets = React.memo(function AvailableTickets({
  tickets,
  buyQuantity,
  setBuyQuantity,
  onBuyTicket,
  isBuyLoading,
  isConnected,
}: AvailableTicketsProps) {
  return (
    <div className='card-glass rounded-xl border border-slate-700/50 md:col-span-4'>
      <div className='p-6 border-b border-slate-700/50'>
        <h2 className='text-xl font-semibold flex items-center'>
          <TicketIcon className='h-5 w-5 mr-2 text-indigo-400' aria-hidden />
          Available Tickets
        </h2>
      </div>

      {tickets.length === 0 ? (
        <div className='p-12 text-center'>
          <SadFaceIcon className='h-12 w-12 mx-auto mb-4 text-slate-500' aria-hidden />
          <h3 className='text-lg font-medium text-slate-300 mb-1'>No tickets available</h3>
          <p className='text-slate-500'>Check back later for new events</p>
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-slate-700/50'>
                <th className='px-6 py-4 text-left text-sm font-semibold text-slate-300'>Event</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-slate-300'>Price</th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-slate-300'>
                  Max/Person
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-slate-300'>
                  Quantity
                </th>
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
                      {ticket.infoUrl && (
                        <a
                          href={ticket.infoUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='mt-1 text-sm text-indigo-400 hover:text-indigo-300 inline-flex items-center'>
                          <InfoIcon className='h-4 w-4 mr-1' aria-hidden />
                          Event details
                        </a>
                      )}
                    </div>
                  </td>
                  <td className='px-6 py-4 font-mono text-slate-200'>
                    {formatBalance(ticket.price)} ETH
                  </td>
                  <td className='px-6 py-4 text-slate-300'>{ticket.maxSellPerPerson.toString()}</td>
                  <td className='px-6 py-4'>
                    <input
                      type='number'
                      min='1'
                      max={ticket.maxSellPerPerson.toString()}
                      value={buyQuantity[ticket.id.toString()] || 1}
                      onChange={(e) =>
                        setBuyQuantity({
                          ...buyQuantity,
                          [ticket.id.toString()]: Math.max(
                            1,
                            Math.min(Number(ticket.maxSellPerPerson), parseInt(e.target.value) || 1)
                          ),
                        })
                      }
                      className='w-16 px-2 py-1.5 text-sm bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-200'
                    />
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center justify-end'>
                      <button
                        className='btn-primary'
                        onClick={() => onBuyTicket(ticket.id, ticket.price)}
                        disabled={isBuyLoading || !isConnected}>
                        {isBuyLoading ? (
                          <div className='flex items-center'>
                            <SpinnerIcon className='h-4 w-4 mr-1' aria-hidden />
                            <span>Processing</span>
                          </div>
                        ) : (
                          <div className='flex items-center'>
                            <ShoppingCartIcon className='h-4 w-4 mr-1' aria-hidden />
                            <span>Buy</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
})
