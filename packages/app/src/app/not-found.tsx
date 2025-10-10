import Link from 'next/link'
import { WarningIcon } from '@/components/icons'

/**
 * 404 Not Found page
 * 
 * Displayed when a user tries to access a route that doesn't exist.
 */
export default function NotFound() {
    return (
        <div className='min-h-screen flex items-center justify-center px-4'>
            <div className='max-w-md w-full text-center'>
                <div className='card-glass rounded-xl border border-slate-700/50 p-8'>
                    <div className='mb-6'>
                        <h1 className='text-8xl font-bold text-indigo-400 mb-2'>404</h1>
                        <WarningIcon className='h-16 w-16 mx-auto text-amber-400' aria-hidden />
                    </div>

                    <h2 className='text-2xl font-bold mb-4'>Page Not Found</h2>

                    <p className='text-slate-400 mb-8'>
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>

                    <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                        <Link href='/tickets' className='btn-primary px-6 py-3'>
                            Browse Tickets
                        </Link>

                        <Link href='/' className='btn-secondary px-6 py-3'>
                            Go Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const metadata = {
    title: '404 - Page Not Found | TicketChain',
    description: 'The page you are looking for could not be found.',
}
