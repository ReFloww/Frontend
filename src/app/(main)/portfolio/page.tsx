'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sprout, Fish, TreePine, TrendingUp, TrendingDown, ArrowLeftRight, Wallet, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SwapDialog from '@/components/swap/swap-dialog';

// Mock portfolio data
const portfolioAssets = [
  {
    id: '1',
    asset: 'Green Valley Farms',
    ticker: 'GVF',
    sector: 'Agriculture',
    value: 12500,
    balance: 125,
    return: 8.5,
    status: 'active',
    icon: Sprout,
  },
  {
    id: '2',
    asset: 'Ocean Harvest Co.',
    ticker: 'OHC',
    sector: 'Fisheries',
    value: 18000,
    balance: 180,
    return: 12.3,
    status: 'active',
    icon: Fish,
  },
  {
    id: '3',
    asset: 'Timber Works Ltd',
    ticker: 'TWL',
    sector: 'Forestry',
    value: 15500,
    balance: 155,
    return: 9.7,
    status: 'active',
    icon: TreePine,
  },
  {
    id: '4',
    asset: 'Coastal Fisheries Inc.',
    ticker: 'CFI',
    sector: 'Fisheries',
    value: 9800,
    balance: 98,
    return: 7.2,
    status: 'active',
    icon: Fish,
  },
  {
    id: '5',
    asset: 'Highland Timber Co.',
    ticker: 'HTC',
    sector: 'Forestry',
    value: 11200,
    balance: 112,
    return: 10.8,
    status: 'active',
    icon: TreePine,
  },
  {
    id: '6',
    asset: 'Sunrise Agriculture',
    ticker: 'SUN',
    sector: 'Agriculture',
    value: 8500,
    balance: 85,
    return: 6.9,
    status: 'active',
    icon: Sprout,
  },
  {
    id: '7',
    asset: 'Pacific Seafood Ltd',
    ticker: 'PSL',
    sector: 'Fisheries',
    value: 14200,
    balance: 142,
    return: 11.4,
    status: 'active',
    icon: Fish,
  },
  {
    id: '8',
    asset: 'Valley Crops Farm',
    ticker: 'VCF',
    sector: 'Agriculture',
    value: 10800,
    balance: 108,
    return: 9.2,
    status: 'active',
    icon: Sprout,
  },
];

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
  const [swapDialogOpen, setSwapDialogOpen] = useState(false);
  const [selectedSwapToken, setSelectedSwapToken] = useState<string>('');

  const totalValue = portfolioAssets.reduce((sum, asset) => sum + asset.value, 0);
  const averageReturn = portfolioAssets.reduce((sum, asset) => sum + asset.return, 0) / portfolioAssets.length;

  const handleSwapClick = (ticker: string) => {
    setSelectedSwapToken(ticker);
    setSwapDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#225B3A]">My Portfolio</h1>
        <p className="text-muted-foreground mt-1">Track and manage your investments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardDescription>Total Portfolio Value</CardDescription>
            <CardTitle className="text-3xl text-[#0A6A74]">${totalValue.toLocaleString()} RSF</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardDescription>Total Assets</CardDescription>
            <CardTitle className="text-3xl text-[#0A6A74]">{portfolioAssets.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardDescription>Average Return</CardDescription>
            <CardTitle className="text-3xl text-green-600">{averageReturn.toFixed(2)}%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Portfolio Table */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Assets Overview</CardTitle>
          <CardDescription>Detailed view of all your investments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Asset</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Sector</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Balance</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Value</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Return</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolioAssets.map((asset) => {
                  const AssetIcon = asset.icon;
                  return (
                    <tr
                      key={asset.id}
                      className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <AssetIcon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium text-[#0A6A74]">{asset.asset}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getSectorColor(asset.sector)}>
                          {asset.sector}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-semibold">{asset.balance.toLocaleString()} Tokens</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-semibold">${asset.value.toLocaleString()} RSF</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {asset.return > 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <span className={`font-semibold ${asset.return > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {asset.return > 0 ? '+' : ''}{asset.return.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-3 text-xs border-[#0A6A74] text-[#0A6A74] hover:bg-[#0A6A74] hover:text-white"
                            onClick={() => handleSwapClick(asset.ticker)}
                          >
                            <ArrowLeftRight className="h-3 w-3 mr-1" />
                            Swap
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-3 text-xs border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                            onClick={() => router.push(`/market/${asset.id}?tab=redeem`)}
                          >
                            <Wallet className="h-3 w-3 mr-1" />
                            Redeem
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-3 text-xs border-[#225B3A] text-[#225B3A] hover:bg-[#225B3A] hover:text-white"
                            onClick={() => router.push(`/market/${asset.id}?tab=invest`)}
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
        </CardContent>
      </Card>

      {/* Swap Dialog */}
      <SwapDialog
        open={swapDialogOpen}
        onOpenChange={setSwapDialogOpen}
        defaultSellToken={selectedSwapToken}
      />
    </div>
  );
}