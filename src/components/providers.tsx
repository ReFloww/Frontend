'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from '@/lib/wagmi';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={{
          blurs: {
            modalOverlay: 'small',
          },
          colors: {
            accentColor: '#14B8A6',
            accentColorForeground: 'white',
            actionButtonBorder: 'rgba(20, 184, 166, 0.2)',
            actionButtonBorderMobile: 'rgba(20, 184, 166, 0.2)',
            actionButtonSecondaryBackground: 'rgba(20, 184, 166, 0.1)',
            closeButton: '#94A3B8',
            closeButtonBackground: 'rgba(20, 184, 166, 0.1)',
            connectButtonBackground: '#0F766E',
            connectButtonBackgroundError: '#DC2626',
            connectButtonInnerBackground: 'linear-gradient(0deg, rgba(20, 184, 166, 0.15), rgba(20, 184, 166, 0.05))',
            connectButtonText: '#F0FDFA',
            connectButtonTextError: '#FEE2E2',
            connectionIndicator: '#10B981',
            downloadBottomCardBackground: 'linear-gradient(126deg, rgba(20, 184, 166, 0.1) 9.49%, rgba(15, 118, 110, 0.1) 71.04%), #134E4A',
            downloadTopCardBackground: 'linear-gradient(126deg, rgba(20, 184, 166, 0.15) 9.49%, rgba(15, 118, 110, 0.1) 71.04%), #115E59',
            error: '#EF4444',
            generalBorder: 'rgba(20, 184, 166, 0.15)',
            generalBorderDim: 'rgba(20, 184, 166, 0.08)',
            menuItemBackground: 'rgba(20, 184, 166, 0.08)',
            modalBackdrop: 'rgba(0, 0, 0, 0.5)',
            modalBackground: '#134E4A',
            modalBorder: 'rgba(20, 184, 166, 0.2)',
            modalText: '#F0FDFA',
            modalTextDim: '#99F6E4',
            modalTextSecondary: '#5EEAD4',
            profileAction: 'rgba(20, 184, 166, 0.1)',
            profileActionHover: 'rgba(20, 184, 166, 0.15)',
            profileForeground: 'rgba(20, 184, 166, 0.1)',
            selectedOptionBorder: 'rgba(20, 184, 166, 0.3)',
            standby: '#FBBF24',
          },
          fonts: {
            body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          },
          radii: {
            actionButton: '12px',
            connectButton: '12px',
            menuButton: '12px',
            modal: '16px',
            modalMobile: '16px',
          },
          shadows: {
            connectButton: '0px 4px 12px rgba(20, 184, 166, 0.15)',
            dialog: '0px 8px 32px rgba(0, 0, 0, 0.32)',
            profileDetailsAction: '0px 2px 6px rgba(20, 184, 166, 0.1)',
            selectedOption: '0px 2px 6px rgba(20, 184, 166, 0.2)',
            selectedWallet: '0px 2px 6px rgba(20, 184, 166, 0.15)',
            walletLogo: '0px 2px 16px rgba(20, 184, 166, 0.1)',
          },
        }}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
