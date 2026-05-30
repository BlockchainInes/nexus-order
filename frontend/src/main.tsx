import React from 'react';
import ReactDOM from 'react-dom/client'; // WICHTIG: Dieser Import hat gefehlt
import App from './App.tsx';
import './index.css';

// Styles
import '@rainbow-me/rainbowkit/styles.css';

// Wagmi & RainbowKit Imports
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia, arbitrum } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// 1. Konfiguration
const config = getDefaultConfig({
  appName: 'Nexus Order',
  projectId: 'bb2656570902dc8898f14d12c81146e1',
  chains: [mainnet, sepolia, arbitrum],
  ssr: false, // Auf false gesetzt, um Kompatibilitätsprobleme zu vermeiden
});

const queryClient = new QueryClient();

// 2. Rendering
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);