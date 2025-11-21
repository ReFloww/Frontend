// wagmi.config.ts or config.ts

import { cookieStorage, createStorage } from 'wagmi';
import { sepolia, baseSepolia } from 'wagmi/chains';
import { http, createConfig } from 'wagmi';
import { defineChain } from 'viem';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

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

// 2. Get projectId from environment
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID';

// 3. Define chains
export const chains = [mantleSepolia, baseSepolia, sepolia] as const;

// 4. Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks: chains,
});

// 5. Export the config
export const config = wagmiAdapter.wagmiConfig;
