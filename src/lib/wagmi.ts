// wagmi.config.ts or config.ts

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, baseSepolia } from 'wagmi/chains';
import { http } from 'wagmi';
import { defineChain } from 'viem';

// 1. Custom Mantle Sepolia Chain
export const mantleSepolia = defineChain({
  id: 5003,
  name: 'Mantle Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'MNT',
    symbol: 'MNT',
  },
  rpcUrls: {
    default: { http: ['https://rpc.sepolia.mantle.xyz'] },
    public: { http: ['https://rpc.sepolia.mantle.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Mantle Sepolia Explorer', url: 'https://sepolia.mantlescan.xyz' },
  },
  testnet: true,
});

// 2. Transports per chain (recommended)
const transports = {
  [mantleSepolia.id]: http('https://rpc.sepolia.mantle.xyz'),
  [baseSepolia.id]: http('https://sepolia.base.org'),
  [sepolia.id]: http('https://rpc.sepolia.org'),
};

// 3. RainbowKit + Wagmi Config
export const config = getDefaultConfig({
  appName: 'RWA P2P Lending',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID',

  // all chains you want
  chains: [mantleSepolia, baseSepolia, sepolia],

  // custom transports (recommended for stability)
  transports,

  ssr: true,
});
