'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Wallet, ArrowLeftRight, PlusCircle, TrendingUp } from 'lucide-react';

interface PortfolioAsset {
  productId: string;
  productName: string;
  symbol: string;
  categoryId: string;
  icon: React.ComponentType<{ className?: string }>;
  balance: number;
  value?: number;
  returnPercent?: number;
}

interface PortfolioTableProps {
  activeAssets: PortfolioAsset[];
  isLoading: boolean;
  isConnected: boolean;
  onInvest: (productId: string) => void;
  onSwap: (productId: string, symbol: string) => void;
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
                  <th className="text-center py-3 px-4 font-semibold text-sm text-muted-foreground">Balance</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm text-muted-foreground">Value</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm text-muted-foreground">Return</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeAssets.map((asset) => {
                  const AssetIcon = asset.icon;
                  // Mock data for value and return if not provided
                  const value = asset.value || asset.balance * 100;
                  const returnPercent = asset.returnPercent || (Math.random() * 15 + 2);

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
                          <span className="font-medium text-[#0A6A74]">{asset.productName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getSectorColor(asset.categoryId)}>
                          {asset.categoryId}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-semibold">
                          {asset.balance.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} Tokens
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-semibold">
                          {value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} USDT
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="font-semibold text-green-600">
                            +{returnPercent.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSwap(asset.productId, asset.symbol);
                            }}
                            className="h-8 px-3 text-xs border-[#0A6A74] text-[#0A6A74] hover:bg-[#0A6A74] hover:text-white cursor-pointer"
                          >
                            <ArrowLeftRight className="h-3 w-3 mr-1" />
                            Swap
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSell(asset.productId);
                            }}
                            className="h-8 px-3 text-xs border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white cursor-pointer"
                          >
                            <Wallet className="h-3 w-3 mr-1" />
                            Redeem
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              onInvest(asset.productId);
                            }}
                            className="h-8 px-3 text-xs border-[#225B3A] text-[#225B3A] hover:bg-[#225B3A] hover:text-white cursor-pointer"
                          >
                            <PlusCircle className="h-3 w-3 mr-1" />
                            Invest
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
