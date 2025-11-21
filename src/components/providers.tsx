'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { ReactNode } from 'react';
import { createAppKit } from '@reown/appkit/react';
import { projectId, wagmiAdapter, chains } from '@/lib/wagmi';

const queryClient = new QueryClient();

// Set up metadata
const metadata = {
  name: 'RWA P2P Lending',
  description: 'Real World Asset Peer-to-Peer Lending Platform',
  url: 'https://reflow.app',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
};

// Create the AppKit modal
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: chains,
  metadata,
  themeMode: 'dark',
  features: {
    analytics: true,
  }
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
