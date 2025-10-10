import React from 'react'
import { InfoIcon, ErrorIcon, CheckIcon, WarningIcon } from './icons'

/**
 * Alert variant types
 */
export type AlertVariant = 'info' | 'success' | 'error' | 'warning'

/**
 * Props for the AlertBox component
 */
interface AlertBoxProps {
    /**
     * Visual variant of the alert
     * @default 'info'
     */
    variant?: AlertVariant
    /**
     * Content to display in the alert
     */
    children: React.ReactNode
    /**
     * Optional custom icon (if not provided, uses variant's default icon)
     */
    icon?: React.ReactNode
    /**
     * Additional CSS classes
     */
    className?: string
    /**
     * Whether to show an icon
     * @default true
     */
    showIcon?: boolean
}

/**
 * AlertBox Component
 * 
 * A reusable alert/notification box with consistent styling and variants.
 * 
 * @example
 * ```tsx
 * <AlertBox variant="info">
 *   You are the contract owner. You can create new tickets.
 * </AlertBox>
 * 
 * <AlertBox variant="error">
 *   {error}
 * </AlertBox>
 * 
 * <AlertBox variant="success" showIcon={false}>
 *   Transaction completed successfully!
 * </AlertBox>
 * ```
 */
export function AlertBox({
    variant = 'info',
    children,
    icon,
    className = '',
    showIcon = true,
}: AlertBoxProps) {
    // Variant styles mapping
    const variantStyles: Record<AlertVariant, string> = {
        info: 'bg-indigo-900/20 border-indigo-800/50',
        success: 'bg-emerald-900/20 border-emerald-800/50',
        error: 'bg-rose-900/20 border-rose-800/50',
        warning: 'bg-amber-900/20 border-amber-800/50',
    }

    // Variant icon colors mapping
    const iconColorStyles: Record<AlertVariant, string> = {
        info: 'text-indigo-400',
        success: 'text-emerald-400',
        error: 'text-rose-400',
        warning: 'text-amber-400',
    }

    // Default icons for each variant
    const defaultIcons: Record<AlertVariant, React.ReactNode> = {
        info: <InfoIcon className={`shrink-0 w-5 h-5 ${iconColorStyles.info} mt-0.5`} aria-hidden />,
        success: <CheckIcon className={`shrink-0 w-5 h-5 ${iconColorStyles.success} mt-0.5`} aria-hidden />,
        error: <ErrorIcon className={`shrink-0 w-5 h-5 ${iconColorStyles.error} mt-0.5`} aria-hidden />,
        warning: <WarningIcon className={`shrink-0 w-5 h-5 ${iconColorStyles.warning} mt-0.5`} aria-hidden />,
    }

    // Select icon to display
    const displayIcon = icon ?? defaultIcons[variant]

    return (
        <div className={`alert rounded-lg border p-5 ${variantStyles[variant]} ${className}`}>
            <div className='flex items-start'>
                {showIcon && displayIcon}
                <div className={showIcon ? 'ml-3' : ''}>
                    <span className='text-slate-200'>{children}</span>
                </div>
            </div>
        </div>
    )
}
