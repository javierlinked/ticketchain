'use client'

import { useEffect } from 'react'
import { ErrorIcon } from '@/components/icons'

/**
 * Global Error Handler
 * 
 * This component handles errors that occur outside of Next.js error boundaries,
 * such as errors in the root layout or during initial page load.
 * 
 * Note: This must be a minimal client component because it wraps the entire application.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log error to error reporting service
        if (process.env.NODE_ENV === 'development') {
            console.error('Global error:', error)
        }
    }, [error])

    return (
        <html lang='en'>
            <body style={{
                margin: 0,
                padding: 0,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                color: '#e2e8f0',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    maxWidth: '500px',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <ErrorIcon
                        className='h-16 w-16 mx-auto mb-6 text-rose-400'
                        aria-hidden
                    />

                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        Application Error
                    </h1>

                    <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
                        A critical error occurred. Please refresh the page to try again.
                    </p>

                    {process.env.NODE_ENV === 'development' && error.message && (
                        <div style={{
                            marginBottom: '2rem',
                            padding: '1rem',
                            background: 'rgba(15, 23, 42, 0.5)',
                            borderRadius: '8px',
                            border: '1px solid rgba(51, 65, 85, 0.5)',
                            textAlign: 'left',
                            fontSize: '0.875rem',
                            fontFamily: 'monospace',
                            color: '#fca5a5',
                            wordBreak: 'break-word'
                        }}>
                            {error.message}
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button
                            onClick={reset}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: '#6366f1',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: '500'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = '#4f46e5'}
                            onMouseOut={(e) => e.currentTarget.style.background = '#6366f1'}>
                            Try Again
                        </button>

                        <button
                            onClick={() => window.location.href = '/'}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'transparent',
                                color: '#e2e8f0',
                                border: '1px solid #475569',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: '500'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(71, 85, 105, 0.2)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                            Go Home
                        </button>
                    </div>
                </div>
            </body>
        </html>
    )
}
