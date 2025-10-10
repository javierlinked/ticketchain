import { LoadingSpinner } from '@/components/loading-spinner'

/**
 * Loading UI for the tickets page
 * Shown during initial page load or navigation
 */
export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-8">
                <div className="h-8 w-64 bg-slate-700/50 rounded animate-pulse mb-4" />
                <div className="h-4 w-96 bg-slate-700/30 rounded animate-pulse" />
            </div>

            <LoadingSpinner
                size="lg"
                fullScreen={false}
                text="Loading ticket information..."
            />
        </div>
    )
}
