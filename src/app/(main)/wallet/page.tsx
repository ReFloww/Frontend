'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet as WalletIcon } from 'lucide-react';

export default function WalletPage() {
  return (
    <div className="space-y-6">
      {/* Connect Button in Top Right */}
      <div className="flex justify-end">
        <ConnectButton />
      </div>

      {/* Wallet Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <WalletIcon className="h-5 w-5" />
              Wallet Balance
            </CardTitle>
            <CardDescription>Your total wallet balance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$0.00</p>
            <p className="text-sm text-muted-foreground mt-1">0 ETH</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available to Lend</CardTitle>
            <CardDescription>Funds ready for lending</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$0.00</p>
            <p className="text-sm text-muted-foreground mt-1">0 USDC</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Loans</CardTitle>
            <CardDescription>Total value in active loans</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$0.00</p>
            <p className="text-sm text-muted-foreground mt-1">0 active positions</p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest wallet activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <WalletIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No transactions yet</p>
            <p className="text-sm mt-1">Connect your wallet to get started</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
