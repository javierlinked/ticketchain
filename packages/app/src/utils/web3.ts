import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { ETH_CHAINS } from './network'

/**
 * WalletConnect Project ID from environment variables
 * Required for Reown AppKit wallet connection functionality
 */
export const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ''
if (!WALLETCONNECT_PROJECT_ID) {
  console.warn('You need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable')
}

/**
 * Wagmi adapter instance configured for WalletConnect integration
 * 
 * Provides multi-chain support with SSR compatibility for Next.js.
 * Used by Reown AppKit for wallet connection and Web3 interactions.
 * 
 * @see {@link ETH_CHAINS} for supported networks
 */
export const WALLETCONNECT_ADAPTER = new WagmiAdapter({
  projectId: WALLETCONNECT_PROJECT_ID,
  networks: ETH_CHAINS,
  ssr: true,
})
