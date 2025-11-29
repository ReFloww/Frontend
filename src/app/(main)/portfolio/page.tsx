'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sprout, Fish, TreePine, TrendingUp, TrendingDown } from 'lucide-react';

// Mock portfolio data
const portfolioAssets = [
  {
    id: '1',
    asset: 'Green Valley Farms',
    sector: 'Agriculture',
    value: 12500,
    return: 8.5,
    status: 'active',
    icon: Sprout,
  },
  {
    id: '2',
    asset: 'Ocean Harvest Co.',
    sector: 'Fisheries',
    value: 18000,
    return: 12.3,
    status: 'active',
    icon: Fish,
  },
  {
    id: '3',
    asset: 'Timber Works Ltd',
    sector: 'Forestry',
    value: 15500,
    return: 9.7,
    status: 'active',
    icon: TreePine,
  },
  {
    id: '4',
    asset: 'Coastal Fisheries Inc.',
    sector: 'Fisheries',
    value: 9800,
    return: 7.2,
    status: 'active',
    icon: Fish,
  },
  {
    id: '5',
    asset: 'Highland Timber Co.',
    sector: 'Forestry',
    value: 11200,
    return: 10.8,
    status: 'active',
    icon: TreePine,
  },
  {
    id: '6',
    asset: 'Sunrise Agriculture',
    sector: 'Agriculture',
    value: 8500,
    return: 6.9,
    status: 'active',
    icon: Sprout,
  },
  {
    id: '7',
    asset: 'Pacific Seafood Ltd',
    sector: 'Fisheries',
    value: 14200,
    return: 11.4,
    status: 'active',
    icon: Fish,
  },
  {
    id: '8',
    asset: 'Valley Crops Farm',
    sector: 'Agriculture',
    value: 10800,
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
  const totalValue = portfolioAssets.reduce((sum, asset) => sum + asset.value, 0);
  const averageReturn = portfolioAssets.reduce((sum, asset) => sum + asset.return, 0) / portfolioAssets.length;

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
                  <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Value</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-muted-foreground">Return</th>
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}