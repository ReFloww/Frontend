'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { usePortfolioBalances } from '@/hooks/usePortfolioBalances';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

const getSectorColor = (sector: string) => {
  switch (sector) {
    case 'Agriculture':
      return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400';
    case 'Fisheries':
      return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
    case 'Forestry':
      return 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
    default:
      return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

export default function PortfolioPage() {
  const router = useRouter();

  // Get actual wallet balances for all P2P tokens
  const { activeAssets, totalValue, isLoading, isConnected } = usePortfolioBalances();

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
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardDescription>Total Portfolio Value</CardDescription>
            {isLoading ? (
              <Skeleton className="h-10 w-32" />
            ) : (
              <div>
                <CardTitle className="text-3xl text-[#0A6A74]">
                  {totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
                </CardTitle>
              </div>
            )}
          </CardHeader>
        </Card>
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
      </div>

      {/* Portfolio Table */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Assets Overview</CardTitle>
          <CardDescription>
            {isConnected
              ? 'Detailed view of all your investments'
              : 'Connect your wallet to view your assets'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : activeAssets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                {isConnected ? 'No assets found' : 'Connect your wallet to view assets'}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {isConnected
                  ? 'Start investing in tokenized products to build your portfolio'
                  : 'Your portfolio will appear here once connected'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Asset</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Sector</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Balance</th>
                    <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeAssets.map((asset) => {
                    const AssetIcon = asset.icon;

                    return (
                      <tr
                        key={asset.productId}
                        className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <AssetIcon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-[#0A6A74]">{asset.productName}</p>
                              <p className="text-xs text-muted-foreground font-mono">${asset.symbol}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getSectorColor(asset.categoryId)}>
                            {asset.categoryId}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div>
                            <p className="font-semibold">
                              {asset.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {asset.symbol}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ≈ {asset.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2 ">
                            <Button
                              size="sm"
                              onClick={() => handleSwap(asset.productId)}
                              className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                            >
                              Swap
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleSell(asset.productId)}
                              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                            >
                              Sell
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}