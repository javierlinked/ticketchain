import './polyfills';
import './global.css';
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

import App from './App';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism],
  [
    // //    jsonRpcProvider({ url: 'https://testnet.aurora.dev', chainId: 1313161555, name: 'auroratestnet'}),
    //   jsonRpcProvider({priority: 0, rpc()
    //     // rpc: 1313161555 ,
    //   }),

    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
