import React from 'react'

interface ConnectProps {
  label?: string
  balance?: 'show' | 'hide'
  size?: 'sm' | 'md' | 'lg'
}

export function Connect({ label = 'Connect', balance = 'hide', size = 'md' }: ConnectProps) {
  return (
    <div>
      <w3m-button label={label} balance={balance} size={size} />
    </div>
  )
}
