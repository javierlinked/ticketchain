import React from 'react'

/**
 * Common props for all icon components
 */
interface IconProps {
    className?: string
    'aria-hidden'?: boolean
}

/**
 * Ticket icon - Used for ticket-related sections
 */
export const TicketIcon = ({ className = 'h-5 w-5', ...props }: IconProps) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        {...props}>
        <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z'
        />
    </svg>
)

/**
 * Spinner/Loading icon - Used for loading states
 */
export const SpinnerIcon = ({ className = 'h-5 w-5', ...props }: IconProps) => (
    <svg
        className={`animate-spin ${className}`}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        {...props}>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
        <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
    </svg>
)

/**
 * Info/Information circle icon - Used for info messages
 */
export const InfoIcon = ({ className = 'h-5 w-5', ...props }: IconProps) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        {...props}>
        <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        />
    </svg>
)

/**
 * Sad face/Empty state icon - Used for empty states
 */
export const SadFaceIcon = ({ className = 'h-12 w-12', ...props }: IconProps) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        {...props}>
        <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        />
    </svg>
)

/**
 * Shopping cart/Buy icon - Used for purchase actions
 */
export const ShoppingCartIcon = ({ className = 'h-4 w-4', ...props }: IconProps) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        {...props}>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
    </svg>
)

/**
 * Trash/Delete icon - Used for delete actions
 */
export const TrashIcon = ({ className = 'h-4 w-4', ...props }: IconProps) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        {...props}>
        <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
        />
    </svg>
)

/**
 * Transfer/Exchange icon - Used for transfer actions
 */
export const TransferIcon = ({ className = 'h-4 w-4', ...props }: IconProps) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        {...props}>
        <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
        />
    </svg>
)

/**
 * Error/Alert circle icon - Used for error states
 */
export const ErrorIcon = ({ className = 'h-5 w-5', ...props }: IconProps) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        {...props}>
        <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
        />
    </svg>
)

/**
 * Check/Success icon - Used for success states
 */
export const CheckIcon = ({ className = 'h-5 w-5', ...props }: IconProps) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        {...props}>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
    </svg>
)

/**
 * Warning/Exclamation icon - Used for warning states
 */
export const WarningIcon = ({ className = 'h-5 w-5', ...props }: IconProps) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        {...props}>
        <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
        />
    </svg>
)
