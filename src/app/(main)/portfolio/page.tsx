'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wallet, Landmark, Users, ChevronRight } from 'lucide-react';
import { usePortfolioBalances } from '@/hooks/usePortfolioBalances';
import { useUserManagerInvestments } from '@/hooks/useAutoManage';
import { managerMetadata, defaultManagerMetadata, getRiskColor } from '@/lib/constants/manager-metadata';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import PortfolioTable from '@/components/portfolio/portofoliotable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { fetchMarketList, MarketItem } from '@/lib/api';
import { TokenizedProduct } from '@/types/product-market';
import { Sprout, Fish, TreePine } from 'lucide-react';

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

export default function PortfolioPage() {
  const router = useRouter();
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
  const { activeAssets, totalValue, usdtBalance, isLoading, isConnected } = usePortfolioBalances(products);

  // Get user's manager investments
  const { investments: managerInvestments, totalInvested: totalManagerInvested, isLoading: isLoadingManager } = useUserManagerInvestments();

  // Calculate total portfolio value as USDT + Total Invested (P2P + Manager)
  const totalPortfolioValue = usdtBalance + totalValue + totalManagerInvested;

  const handleInvest = (productId: string) => {
    // Navigate to market detail page with invest/buy tab active
    router.push(`/market/${productId}?tab=buy`);
  };

  const handleSwap = (productId: string, symbol: string) => {
    // Navigate to swap page with the token
    router.push(`/swap?sellToken=${productId}`);
  };

  const handleSell = (productId: string) => {
    // Navigate to market detail page with redeem/sell tab active
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
            {isLoading || loadingProducts ? (
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
            {isLoading || loadingProducts ? (
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
            {isLoading || loadingProducts ? (
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
            {isLoading || loadingProducts ? (
              <Skeleton className="h-10 w-16" />
            ) : (
              <CardTitle className="text-3xl text-[#0A6A74]">{activeAssets.length}</CardTitle>
            )}
          </CardHeader>
        </Card>
      </div>

      {/* Portfolio Tabs */}
      <Tabs defaultValue="p2p-lending" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="p2p-lending" className="flex items-center gap-2">
            <Landmark className="h-4 w-4" />
            P2P Lending
          </TabsTrigger>
          <TabsTrigger value="manager-investment" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Manager Investment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="p2p-lending" className="mt-6">
          <PortfolioTable
            activeAssets={activeAssets}
            isLoading={isLoading || loadingProducts}
            isConnected={isConnected}
            onInvest={handleInvest}
            onSwap={handleSwap}
            onSell={handleSell}
          />
        </TabsContent>

        <TabsContent value="manager-investment" className="mt-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Manager Investment</CardTitle>
              <CardDescription>
                {isConnected
                  ? 'View your investments managed by investment managers'
                  : 'Connect your wallet to view your managed investments'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingManager ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-6 w-20" />
                    </div>
                  ))}
                </div>
              ) : !isConnected ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">
                    Connect your wallet to view investments
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your managed investments will appear here once connected
                  </p>
                </div>
              ) : managerInvestments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">
                    No managed investments found
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Invest with professional managers to diversify your portfolio
                  </p>
                  <Button
                    className="mt-4 bg-[#225B3A] hover:bg-[#1C4A30]"
                    onClick={() => router.push('/auto-manage')}
                  >
                    Browse Managers
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Total Manager Investment Summary */}
                  <div className="p-4 rounded-lg bg-[#225B3A]/5 border border-[#225B3A]/20">
                    <p className="text-sm text-muted-foreground">Total Manager Investments</p>
                    <p className="text-2xl font-bold text-[#225B3A]">
                      ${totalManagerInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>

                  {/* Manager Investment List */}
                  <div className="space-y-3">
                    {managerInvestments.map((investment) => {
                      const addressLower = investment.managerAddress.toLowerCase();
                      const metadata = managerMetadata[addressLower] || defaultManagerMetadata;
                      const displayName = metadata.displayName || investment.managerName;

                      return (
                        <div
                          key={investment.managerAddress}
                          className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => router.push(`/auto-manage/${investment.managerAddress}`)}
                        >
                          {/* Manager Avatar */}
                          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-muted">
                            <Image
                              src={metadata.avatar}
                              alt={displayName}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                              unoptimized
                            />
                          </div>

                          {/* Manager Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{displayName}</p>
                              <Badge
                                variant="outline"
                                className={`${getRiskColor(metadata.riskLevel)} text-xs`}
                              >
                                {metadata.riskLevel}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Share: {investment.sharePercentage.toFixed(2)}%
                            </p>
                          </div>

                          {/* Investment Amount */}
                          <div className="text-right">
                            <p className="font-semibold text-[#0A6A74]">
                              ${investment.depositAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className="text-xs text-muted-foreground">Deposited</p>
                          </div>

                          {/* Arrow */}
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Browse More Button */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push('/auto-manage')}
                  >
                    Browse More Managers
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
