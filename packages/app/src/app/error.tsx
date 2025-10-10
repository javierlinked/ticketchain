'use client'

import { useEffect } from 'react'
import { ErrorIcon } from '@/components/icons'
import Link from 'next/link'

/**
 * Error boundary for route-level errors
 * 
 * This component catches errors that occur during rendering, in event handlers,
 * or in async code within the route it wraps.
 */
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log error to error reporting service (e.g., Sentry)
        if (process.env.NODE_ENV === 'development') {
            console.error('Route error:', error)
        }
    }, [error])

    return (
        <div className='min-h-screen flex items-center justify-center px-4'>
            <div className='max-w-md w-full text-center'>
                <div className='card-glass rounded-xl border border-slate-700/50 p-8'>
                    <ErrorIcon className='h-16 w-16 mx-auto mb-6 text-rose-400' aria-hidden />

                    <h1 className='text-3xl font-bold mb-4'>Something went wrong!</h1>

                    <p className='text-slate-400 mb-6'>
                        An unexpected error occurred while loading this page. Please try again.
                    </p>

                    {process.env.NODE_ENV === 'development' && error.message && (
                        <div className='mb-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 text-left'>
                            <p className='text-sm font-mono text-rose-300 break-words'>
                                {error.message}
                            </p>
                        </div>
                    )}

                    <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                        <button
                            onClick={reset}
                            className='btn-primary px-6 py-3'>
                            Try Again
                        </button>

                        <Link href='/' className='btn-secondary px-6 py-3'>
                            Go Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
