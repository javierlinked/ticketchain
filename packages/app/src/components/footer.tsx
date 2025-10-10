import React from 'react'
import { SITE_NAME } from '@/utils/site'
import { NetworkStatus } from './network-status'

export function Footer() {
  return (
    <footer className='w-full border-t border-slate-700/50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center text-sm text-slate-400'>
        <div className='flex flex-col sm:flex-row items-center gap-4'>
          <span>
            © {new Date().getFullYear()} {SITE_NAME}
          </span>
        </div>
        <NetworkStatus />
      </div>
    </footer>
  )
}
