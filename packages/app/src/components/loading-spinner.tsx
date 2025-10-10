import React from 'react'

/**
 * Size variants for the loading spinner
 */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Props for the LoadingSpinner component
 */
interface LoadingSpinnerProps {
    /**
     * Size of the spinner
     * @default 'md'
     */
    size?: SpinnerSize
    /**
     * Optional text to display below the spinner
     */
    text?: string
    /**
     * Whether to center the spinner in a full-screen container
     * @default false
     */
    fullScreen?: boolean
    /**
     * Color of the spinner (Tailwind text color class)
     * @default 'text-indigo-500'
     */
    color?: string
    /**
     * Additional CSS classes
     */
    className?: string
}

/**
 * LoadingSpinner Component
 * 
 * A reusable loading spinner with multiple size variants and optional text.
 * Uses DaisyUI's loading component for consistent styling.
 * 
 * @example
 * ```tsx
 * // Basic spinner
 * <LoadingSpinner />
 * 
 * // Large spinner with text
 * <LoadingSpinner size='lg' text='Loading tickets...' />
 * 
 * // Full-screen centered spinner
 * <LoadingSpinner fullScreen text='Loading...' />
 * 
 * // Small spinner in a button
 * <button>
 *   <LoadingSpinner size='sm' className='mr-2' />
 *   Processing...
 * </button>
 * ```
 */
export function LoadingSpinner({
    size = 'md',
    text,
    fullScreen = false,
    color = 'text-indigo-500',
    className = '',
}: LoadingSpinnerProps) {
    const spinner = (
        <div className={`loading loading-spinner loading-${size} ${color} ${className}`}></div>
    )

    if (fullScreen) {
        return (
            <div className='flex flex-col justify-center items-center min-h-[300px]'>
                {spinner}
                {text && <p className='mt-4 text-slate-400'>{text}</p>}
            </div>
        )
    }

    if (text) {
        return (
            <div className='flex flex-col items-center'>
                {spinner}
                <p className='mt-4 text-slate-400'>{text}</p>
            </div>
        )
    }

    return spinner
}

/**
 * Inline spinner for use within buttons or inline text
 */
export function InlineSpinner({
    size = 'sm',
    color = 'text-current',
    className = '',
}: Omit<LoadingSpinnerProps, 'text' | 'fullScreen'>) {
    return <span className={`loading loading-spinner loading-${size} ${color} ${className}`}></span>
}
