import React from 'react'
import { LinkComponent } from './link-component'
import { SITE_EMOJI, SITE_NAME } from '@/utils/site'
import { Connect } from './connect'

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full header-blur'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
        <LinkComponent href='/' className='flex items-center gap-3 group'>
          <span className='text-2xl' aria-hidden>{SITE_EMOJI}</span>
          <span className='text-lg sm:text-xl font-semibold text-gradient tracking-tight group-hover:opacity-90 transition-opacity'>
            {SITE_NAME}
          </span>
        </LinkComponent>
        <div className='flex items-center gap-4'>
          <Connect />
        </div>
      </div>
    </header>
  )
}
