import './polyfills';
import './global.css';
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

import App from './App';

const { chains, provider } = configureChains(
  [chain.goerli, chain.localhost],
  [
    infuraProvider({ priority: 0, apiKey: import.meta.env.VITE_INFURA_KEY }),
    publicProvider({ priority: 1 }),
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
