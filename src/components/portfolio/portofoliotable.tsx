'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Wallet } from 'lucide-react';

interface PortfolioAsset {
  productId: string;
  productName: string;
  symbol: string;
  categoryId: string;
  icon: React.ComponentType<{ className?: string }>;
  balance: number;
}

interface PortfolioTableProps {
  activeAssets: PortfolioAsset[];
  isLoading: boolean;
  isConnected: boolean;
  onInvest: (productId: string) => void;
  onSwap: (productId: string) => void;
  onSell: (productId: string) => void;
}

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

export default function PortfolioTable({
  activeAssets,
  isLoading,
  isConnected,
  onInvest,
  onSwap,
  onSell,
}: PortfolioTableProps) {
  return (
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
                            H {asset.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2 ">
                          <Button
                            size="sm"
                            onClick={() => onInvest(asset.productId)}
                            className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                          >
                            Invest
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => onSwap(asset.productId)}
                            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                          >
                            Swap
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => onSell(asset.productId)}
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
  );
}
