import { useBalance } from 'wagmi'
import { formatBalance } from '@/utils/format'
import { useState, useEffect } from 'react'
import { InlineSpinner } from './loading-spinner'

interface WalletInfoProps {
  address: `0x${string}` | undefined
  isRefreshing?: boolean
  onRefresh?: () => void
  showFullAddress?: boolean
}

export const WalletInfo = ({ address, isRefreshing = false, onRefresh, showFullAddress = false }: WalletInfoProps) => {
  const [isCopied, setIsCopied] = useState(false)
  const [isBalanceLoading, setIsBalanceLoading] = useState(true)

  const {
    data: ethBalance,
    isError: isBalanceError,
    isLoading: wagmiBalanceLoading,
    refetch: refetchBalance,
  } = useBalance({
    address,
  })

  // Update loading state based on wagmi loading state
  useEffect(() => {
    if (!wagmiBalanceLoading) {
      setIsBalanceLoading(false)
    }
  }, [wagmiBalanceLoading])

  // Reset copy status after 2 seconds
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isCopied) {
      timeout = setTimeout(() => setIsCopied(false), 2000)
    }
    return () => clearTimeout(timeout)
  }, [isCopied])

  // Function to copy address to clipboard
  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setIsCopied(true)
    }
  }

  // Format address for display
  const formatAddress = (addr: string) => {
    if (showFullAddress) return addr
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  if (!address) return null

  return (
    <div className='card-glass rounded-lg border border-slate-700/50 p-5 mb-6'>
      <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-4'>
        <div>
          <div className='flex items-center gap-3'>
            <p className='font-medium'>Account: {formatAddress(address)}</p>
            <button
              onClick={copyAddress}
              className='text-xs bg-slate-700/50 hover:bg-slate-700 rounded-md px-2.5 py-1.5 transition-colors'
              title='Copy address'>
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className='mt-3'>
            {isBalanceLoading || wagmiBalanceLoading ? (
              <div className='flex items-center gap-2'>
                <p className='text-slate-400'>ETH Balance: </p>
                <InlineSpinner size='xs' />
              </div>
            ) : isBalanceError ? (
              <div className='flex flex-col gap-2'>
                <p className='text-sm text-rose-400'>Unable to load balance. Please check your network connection.</p>
                <button
                  onClick={() => {
                    setIsBalanceLoading(true)
                    refetchBalance().finally(() => setIsBalanceLoading(false))
                  }}
                  className='text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1 w-fit'
                  disabled={isBalanceLoading}>
                  {isBalanceLoading ? (
                    <>
                      <InlineSpinner size='xs' />
                      Retrying...
                    </>
                  ) : (
                    'Retry'
                  )}
                </button>
              </div>
            ) : (
              <p className='text-slate-400'>ETH Balance: <span className='text-slate-200'>{ethBalance ? formatBalance(ethBalance.value) : '0'}</span></p>
            )}
          </div>
        </div>

        {onRefresh && (
          <button
            onClick={() => {
              onRefresh()
              refetchBalance()
            }}
            className='btn-secondary px-4 py-2'
            disabled={isRefreshing}>
            {isRefreshing ? (
              <div className='flex items-center'>
                <InlineSpinner size='sm' className='mr-2' />
                Refreshing...
              </div>
            ) : (
              'Refresh'
            )}
          </button>
        )}
      </div>
    </div>
  )
}
