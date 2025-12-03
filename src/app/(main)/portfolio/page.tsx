'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import { usePortfolioBalances } from '@/hooks/usePortfolioBalances';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import PortfolioTable from '@/components/portfolio/portofoliotable';

export default function PortfolioPage() {
  const router = useRouter();

  // Get actual wallet balances for all P2P tokens and USDT
  const { activeAssets, totalValue, usdtBalance, isLoading, isConnected } = usePortfolioBalances();

  // Calculate total portfolio value as USDT + Total Invested
  const totalPortfolioValue = usdtBalance + totalValue;

  const handleInvest = (productId: string) => {
    // Navigate to market detail page with buy tab active
    router.push(`/market/${productId}?tab=buy`);
  };

  const handleSwap = (productId: string) => {
    // Navigate to swap page
    router.push('/swap');
  };

  const handleSell = (productId: string) => {
    // Navigate to market detail page with sell tab active
    router.push(`/market/${productId}?tab=sell`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#225B3A]">My Portfolio</h1>
        <p className="text-muted-foreground mt-1">Track and manage your investments</p>
      </div>

      {/* Wallet Connection Notice */}
      {!isConnected && (
        <Card className="border-2 border-amber-200 bg-amber-50 dark:bg-amber-900/20">
          <CardContent className="flex items-center gap-3 pt-6">
            <Wallet className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <p className="text-sm text-amber-900 dark:text-amber-100">
              Connect your wallet to view your portfolio
            </p>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">

        {/* Portofolio Value */}
        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardDescription>Total Portfolio Value</CardDescription>
            {isLoading ? (
              <Skeleton className="h-10 w-32" />
            ) : (
              <div>
                <CardTitle className="text-3xl text-[#0A6A74]">
                  {totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
                </CardTitle>
              </div>
            )}
          </CardHeader>
        </Card>

        {/* USDT Balance */}
        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardDescription>USDT Balance</CardDescription>
            {isLoading ? (
              <Skeleton className="h-10 w-32" />
            ) : (
              <div>
                <CardTitle className="text-3xl text-[#0A6A74]">
                  {usdtBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
                </CardTitle>
              </div>
            )}
          </CardHeader>
        </Card>

        {/* Total Invested */}
        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardDescription>Total Invested</CardDescription>
            {isLoading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <div>
                <CardTitle className="text-3xl text-[#0A6A74]">
                  {totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
                </CardTitle>
              </div>
            )}
          </CardHeader>
        </Card>

        {/* Active Assets */}
        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardDescription>Active Assets</CardDescription>
            {isLoading ? (
              <Skeleton className="h-10 w-16" />
            ) : (
              <CardTitle className="text-3xl text-[#0A6A74]">{activeAssets.length}</CardTitle>
            )}
          </CardHeader>
        </Card>
      </div>

      {/* Portfolio Table */}
      <PortfolioTable
        activeAssets={activeAssets}
        isLoading={isLoading}
        isConnected={isConnected}
        onInvest={handleInvest}
        onSwap={handleSwap}
        onSell={handleSell}
      />
    </div>
  );
}