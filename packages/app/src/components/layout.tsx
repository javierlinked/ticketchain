import React, { PropsWithChildren } from 'react'
import { Header } from './header'
import { Footer } from './footer'

export function Layout(props: PropsWithChildren) {
  return (
    <div className='min-h-screen flex flex-col overflow-hidden bg-app bg-grid'>
      <Header />
      <main className='flex-1 w-full overflow-y-auto'>
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
          {props.children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
