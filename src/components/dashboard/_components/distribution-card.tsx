'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Wallet, Sprout, Fish, TreePine } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Asset {
  productName: string;
  categoryId: string;
  balance: number;
}

interface DistributionCardProps {
  activeAssets: Asset[];
  usdtBalance: number;
  isLoading: boolean;
  isConnected: boolean;
}

export function DistributionCard({
  activeAssets,
  usdtBalance,
  isLoading,
  isConnected
}: DistributionCardProps) {
  const router = useRouter();
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  // Calculate total portfolio value
  const totalValue = activeAssets.reduce((sum, asset) => sum + asset.balance, 0);
  const totalPortfolioValue = totalValue + usdtBalance;

  // Group active assets by category and calculate distribution
  const assetDistribution = (() => {
    const categoryMap = new Map<string, {
      sector: string;
      count: number;
      value: number;
      color: string;
      icon: any;
      products: { name: string; value: string; }[];
    }>();

    // Define category properties
    const categoryProps = {
      'Agriculture': { color: '#16A34A', icon: Sprout },
      'Fisheries': { color: '#0EA5E9', icon: Fish },
      'Forestry': { color: '#8B5CF6', icon: TreePine },
    };

    // Group assets by category
    activeAssets.forEach(asset => {
      const category = asset.categoryId;
      const existing = categoryMap.get(category);

      if (existing) {
        existing.count += 1;
        existing.value += asset.balance;
        existing.products.push({
          name: asset.productName,
          value: `${asset.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT`
        });
      } else {
        categoryMap.set(category, {
          sector: category,
          count: 1,
          value: asset.balance,
          color: categoryProps[category as keyof typeof categoryProps]?.color || '#6B7280',
          icon: categoryProps[category as keyof typeof categoryProps]?.icon || Wallet,
          products: [{
            name: asset.productName,
            value: `${asset.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT`
          }]
        });
      }
    });

    // Add USDT balance as a separate category if it exists
    if (usdtBalance > 0) {
      categoryMap.set('USDT', {
        sector: 'USDT',
        count: 1,
        value: usdtBalance,
        color: '#6B7280',
        icon: Wallet,
        products: [{
          name: 'USDT Balance',
          value: `${usdtBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT`
        }]
      });
    }

    return Array.from(categoryMap.values());
  })();

  // Calculate percentages and angles for donut chart
  const assetChartData = assetDistribution.map((asset, index) => {
    const percentage = (asset.value / totalPortfolioValue) * 100;
    const startAngle = assetDistribution
      .slice(0, index)
      .reduce((sum, a) => sum + (a.value / totalPortfolioValue) * 360, 0);
    const angle = (asset.value / totalPortfolioValue) * 360;

    return { ...asset, percentage, startAngle, angle };
  });

  // Helper function to create SVG path for donut segment
  const createDonutSegment = (startAngle: number, angle: number, radius: number, innerRadius: number) => {
    const start = (startAngle - 90) * (Math.PI / 180);
    const end = (startAngle + angle - 90) * (Math.PI / 180);

    const x1 = 50 + radius * Math.cos(start);
    const y1 = 50 + radius * Math.sin(start);
    const x2 = 50 + radius * Math.cos(end);
    const y2 = 50 + radius * Math.sin(end);

    const x3 = 50 + innerRadius * Math.cos(end);
    const y3 = 50 + innerRadius * Math.sin(end);
    const x4 = 50 + innerRadius * Math.cos(start);
    const y4 = 50 + innerRadius * Math.sin(start);

    const largeArc = angle > 180 ? 1 : 0;

    return `
      M ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
      Z
    `;
  };

  return (
    <Card
      className="border-2 cursor-pointer hover:shadow-lg transition-all"
      onClick={() => router.push('/portfolio')}
    >
      <CardHeader>
        <CardDescription>Portfolio Distribution</CardDescription>
        <CardTitle className="text-2xl text-[#0A6A74]">Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Wallet className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm font-medium">Wallet Not Connected</p>
              <p className="text-xs text-muted-foreground mt-1">Connect your wallet to view your portfolio</p>
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex items-center gap-8">
            <Skeleton className="w-48 h-48 rounded-full" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        ) : totalPortfolioValue === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Wallet className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm font-medium">No Active Assets</p>
              <p className="text-xs text-muted-foreground mt-1">Start investing to see your portfolio distribution</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-8">
            {/* Donut Chart */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  {assetChartData.map((asset, index) => (
                    <path
                      key={index}
                      d={createDonutSegment(asset.startAngle, asset.angle, 45, 28)}
                      fill={asset.color}
                      className="transition-all cursor-pointer"
                      style={{
                        opacity: hoveredSector === null || hoveredSector === asset.sector ? 1 : 0.4,
                        transform: hoveredSector === asset.sector ? 'scale(1.05)' : 'scale(1)',
                        transformOrigin: 'center',
                      }}
                      onMouseEnter={() => setHoveredSector(asset.sector)}
                      onMouseLeave={() => setHoveredSector(null)}
                    />
                  ))}
                </svg>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  {hoveredSector ? (
                    <>
                      <div className="text-2xl font-bold text-[#0A6A74]">
                        {assetChartData.find(a => a.sector === hoveredSector)?.percentage.toFixed(0)}%
                      </div>
                      <div className="text-xs text-muted-foreground">{hoveredSector}</div>
                    </>
                  ) : (
                    <>
                      <div className="text-2xl font-bold text-[#0A6A74]">
                        ${totalPortfolioValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-xs text-muted-foreground">Total Value</div>
                    </>
                  )}
                </div>

                {/* Hover Tooltip */}
                {hoveredSector && (
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 translate-x-full z-10">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-3 min-w-[180px]">
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: assetChartData.find(a => a.sector === hoveredSector)?.color }}
                        />
                        <span className="font-semibold text-sm">{hoveredSector}</span>
                      </div>
                      <div className="space-y-1.5">
                        {assetChartData
                          .find(a => a.sector === hoveredSector)
                          ?.products.map((product, idx) => (
                            <div key={idx} className="flex justify-between text-xs">
                              <span className="text-muted-foreground truncate mr-2">{product.name}</span>
                              <span className="font-medium">{product.value}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="flex-1 space-y-4">
              {assetChartData.map((asset, index) => {
                const AssetIcon = asset.icon;
                const isUSDT = asset.sector === 'USDT';
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: asset.color }}
                      />
                      <div className="flex items-center gap-2">
                        <AssetIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{asset.sector}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {asset.percentage.toFixed(1)}%
                      </span>
                      <span className="text-sm font-semibold min-w-[3rem] text-right">
                        {isUSDT ? (
                          <span className="text-gray-600 dark:text-gray-400">Balance</span>
                        ) : (
                          `${asset.count} ${asset.count === 1 ? 'asset' : 'assets'}`
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Portfolio Value</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
