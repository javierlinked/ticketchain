import { Button } from '@mui/material'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'
import { OwnerView } from './components/OwnerView'

export default function App() {
  return (
    <>
      <div>
        <h1>TicketChain</h1>
      </div>
      <div>
        <ConnectButton accountStatus={'full'} />
        <Button>asd</Button>
      </div>
      <div>{/* <OwnerView /> */}</div>
    </>
  )
}
