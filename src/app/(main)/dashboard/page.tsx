'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Wallet, ArrowRight, Sprout, Fish, TreePine, Loader2, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { fetchMarketList, MarketItem } from '@/lib/api';
import { TokenizedProduct } from '@/types/product-market';
import { usePortfolioBalances } from '@/hooks/usePortfolioBalances';
import { Skeleton } from '@/components/ui/skeleton';

// Icon mapping based on category
const getCategoryIcon = (category: string | null | undefined) => {
  if (!category) return Sprout;
  switch (category.toLowerCase()) {
    case 'agriculture':
      return Sprout;
    case 'fisheries':
      return Fish;
    case 'forestry':
      return TreePine;
    default:
      return Sprout;
  }
};

// Convert API response to TokenizedProduct format
const mapApiToProduct = (item: MarketItem): TokenizedProduct => ({
  id: item.id,
  productName: item.name,
  symbol: item.symbol,
  categoryId: item.categoryId as 'Agriculture' | 'Fisheries' | 'Forestry',
  description: item.description,
  loanInterest: parseFloat(item.loanInterest),
  loanAmount: parseFloat(item.loanAmount),
  loanTenor: item.loanTenor,
  creditRate: item.creditRate as 'A' | 'B' | 'C',
  contractId: item.contractAddress,
  tokenP2PAddress: item.contractAddress as `0x${string}`,
  holderCount: parseInt(item.holderCount) || 0,
  status: item.status,
  icon: getCategoryIcon(item.categoryId),
});

const getCreditRatingColor = (rating: string) => {
  switch (rating) {
    case 'A':
      return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400';
    case 'B':
      return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'C':
      return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400';
    default:
      return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

export default function DashboardPage() {
  const router = useRouter();

  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const [products, setProducts] = useState<TokenizedProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch market data on component mount
  useEffect(() => {
    const loadMarketData = async () => {
      try {
        setLoadingProducts(true);
        const data = await fetchMarketList();
        const mappedProducts = data.map(mapApiToProduct);
        setProducts(mappedProducts);
      } catch (err) {
        console.error('Error loading market data:', err);
      } finally {
        setLoadingProducts(false);
      }
    };

    loadMarketData();
  }, []);

  // Get actual wallet balances for all P2P tokens and USDT
  const { activeAssets, totalValue, usdtBalance, isLoading: isLoadingBalances } = usePortfolioBalances(products);

  // Calculate asset distribution based on actual balances grouped by sector
  const p2pDistribution = ['Agriculture', 'Fisheries', 'Forestry'].map((sector) => {
    const sectorAssets = activeAssets.filter(asset => asset.categoryId === sector);
    const sectorValue = sectorAssets.reduce((sum, asset) => sum + asset.balance, 0);
    const sectorColor = sector === 'Agriculture' ? '#16A34A' : sector === 'Fisheries' ? '#0EA5E9' : '#8B5CF6';
    const sectorIcon = sector === 'Agriculture' ? Sprout : sector === 'Fisheries' ? Fish : TreePine;

    return {
      sector,
      count: sectorAssets.length,
      value: sectorValue,
      color: sectorColor,
      icon: sectorIcon,
      products: sectorAssets.map(asset => ({
        name: asset.productName,
        value: `$${asset.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      }))
    };
  }).filter(sector => sector.count > 0); // Only show sectors with assets

  // Asset distribution only contains P2P tokens (no USDT)
  const assetDistribution = p2pDistribution;

  const totalAssets = assetDistribution.reduce((sum, item) => sum + item.count, 0);
  const totalDistributionValue = assetDistribution.reduce((sum, item) => sum + item.value, 0);

  // Calculate percentages and angles for donut chart
  const assetChartData = assetDistribution.map((asset, index) => {
    const percentage = totalDistributionValue > 0 ? (asset.value / totalDistributionValue) * 100 : 0;
    const startAngle = assetDistribution
      .slice(0, index)
      .reduce((sum, a) => sum + (totalDistributionValue > 0 ? (a.value / totalDistributionValue) * 360 : 0), 0);
    const angle = totalDistributionValue > 0 ? (asset.value / totalDistributionValue) * 360 : 0;

    return { ...asset, percentage, startAngle, angle };
  });

  // Get featured market products (first 3)
  const featuredProducts = products.slice(0, 3);

  // Combined loading state
  const isLoading = loadingProducts || isLoadingBalances;

  // Mock chart data for performance
  const performanceData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 72 },
    { month: 'Mar', value: 68 },
    { month: 'Apr', value: 80 },
    { month: 'May', value: 85 },
    { month: 'Jun', value: 90 },
  ];

  const maxValue = Math.max(...performanceData.map(d => d.value));

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
    <div className="space-y-8">

      {/* <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div> */}

      {/* First Row: Portfolio Value and Performance */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Portfolio Asset Distribution Card */}
        <Card
          className="border-2 cursor-pointer hover:shadow-lg transition-all"
          onClick={() => router.push('/portfolio')}
        >
          <CardHeader>
            <CardDescription>Portfolio Distribution</CardDescription>
            <CardTitle className="text-2xl text-[#0A6A74]">Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center gap-8">
                <Skeleton className="w-48 h-48 rounded-full" />
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              </div>
            ) : assetDistribution.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground">No assets found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Start investing to see your portfolio distribution
                </p>
                <Button
                  className="mt-4 bg-[#225B3A] hover:bg-[#1C4A30]"
                  onClick={() => router.push('/market')}
                >
                  Browse Market
                </Button>
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
                          <div className="text-3xl font-bold text-[#0A6A74]">{totalAssets}</div>
                          <div className="text-xs text-muted-foreground">Assets</div>
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
                          {asset.count} {asset.count === 1 ? 'asset' : 'assets'}
                        </span>
                      </div>
                    </div>
                  );
                })}

                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Total Value:</span>
                      <span className="font-semibold text-[#0A6A74]">
                        ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Card with Chart */}
        <Card className="border-2 bg-[#F1F7F3]">  {/* soft green background */}
          <CardHeader>
            <CardDescription className="text-[#475569]">Performance Overview</CardDescription>
            <CardTitle className="text-2xl text-[#0F172A]">Portfolio Growth</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">

              {/* Line Chart */}
              <div className="h-48 relative">

                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-[#475569]">
                  <span>${maxValue}</span>
                  <span>${Math.round(maxValue * 0.5)}</span>
                  <span>$0</span>
                </div>

                {/* Chart area */}
                <div className="ml-12 h-full relative">

                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    <div className="border-t border-[#BBF7D0]" />
                    <div className="border-t border-[#BBF7D0]" />
                    <div className="border-t border-[#BBF7D0]" />
                  </div>

                  {/* SVG Line Chart */}
                  <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                    {/* Gradient area fill */}
                    <defs>
                      <linearGradient id="chartGreen" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#047857" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#047857" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Area Fill */}
                    <path
                      d={`M 0 ${100 - (performanceData[0].value / maxValue) * 100}
                  L 60 ${100 - (performanceData[1].value / maxValue) * 100}
                  L 120 ${100 - (performanceData[2].value / maxValue) * 100}
                  L 180 ${100 - (performanceData[3].value / maxValue) * 100}
                  L 240 ${100 - (performanceData[4].value / maxValue) * 100}
                  L 300 ${100 - (performanceData[5].value / maxValue) * 100}
                  L 300 100 L 0 100 Z`}
                      fill="url(#chartGreen)"
                    />

                    {/* Main Line */}
                    <polyline
                      points={performanceData
                        .map((d, i) => `${i * 60},${100 - (d.value / maxValue) * 100}`)
                        .join(" ")}
                      fill="none"
                      stroke="#047857"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Points */}
                    {performanceData.map((data, index) => (
                      <circle
                        key={index}
                        cx={index * 60}
                        cy={100 - (data.value / maxValue) * 100}
                        r="3"
                        fill="#047857"
                        className="hover:r-5 transition-all"
                      />
                    ))}
                  </svg>

                  {/* X-axis labels */}
                  <div className="flex justify-between mt-2">
                    {performanceData.map((data, index) => (
                      <span key={index} className="text-xs text-[#475569]">
                        {data.month}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ROI Section */}
              <div className="pt-4 border-t border-[#BBF7D0]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#475569]">Average ROI</span>
                  <span className="font-semibold text-[#16A34A]">10.2% p.a.</span>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>

      </div>

      {/* Second Row: Market Opportunities */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between ">
            <div>
              <CardTitle>Market Opportunities</CardTitle>
              <CardDescription>Featured investment opportunities</CardDescription>
            </div>
            <Button
              variant="ghost"
              onClick={() => router.push('/market')}
              className="gap-2"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loadingProducts ? (
            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-10 w-10 mb-2" />
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-20" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {featuredProducts.map((product) => {
                const ProductIcon = product.icon;
                return (
                  <Card
                    key={product.id}
                    className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                    onClick={() => router.push(`/market/${product.id}`)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <ProductIcon className="h-5 w-5 text-primary" />
                        </div>
                        <Badge className={getCreditRatingColor(product.creditRate)}>
                          {product.creditRate}
                        </Badge>
                      </div>
                      <CardTitle className="text-base text-[#0A6A74]">{product.productName}</CardTitle>
                      <CardDescription className="text-xs">{product.categoryId}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Amount</span>
                        <span className="font-semibold text-xs">${product.loanAmount.toLocaleString()} USDT</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Rate</span>
                        <span className="font-semibold text-green-600 dark:text-green-400 text-xs">
                          {product.loanInterest.toFixed(2)}% p.a.
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tenor</span>
                        <span className="font-medium text-xs">{product.loanTenor} months</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}