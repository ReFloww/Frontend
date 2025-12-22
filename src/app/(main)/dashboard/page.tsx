'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sprout, Fish, TreePine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePortfolioBalances } from '@/hooks/usePortfolioBalances';
import { DistributionCard } from '@/components/dashboard/_components/distribution-card';
import { PerformanceCard } from '@/components/dashboard/_components/performance-card';

// Mock data for market products
const marketProducts = [
  {
    id: '1',
    businessName: 'Green Valley Farms',
    sector: 'Agriculture',
    loanAmount: 50000,
    interestRate: 10,
    tenor: 10,
    creditRating: 'A',
    icon: Sprout,
  },
  {
    id: '2',
    businessName: 'Ocean Harvest Co.',
    sector: 'Fisheries',
    loanAmount: 75000,
    interestRate: 10.2,
    tenor: 18,
    creditRating: 'B',
    icon: Fish,
  },
  {
    id: '3',
    businessName: 'Timber Works Ltd',
    sector: 'Forestry',
    loanAmount: 120000,
    interestRate: 9.8,
    tenor: 24,
    creditRating: 'A',
    icon: TreePine,
  },
];

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
  const { activeAssets, usdtBalance, isLoading, isConnected } = usePortfolioBalances();

  return (
    <div className="space-y-8">
      {/* First Row: Portfolio Value and Performance */}
      <div className="grid gap-6 md:grid-cols-2">
        <DistributionCard
          activeAssets={activeAssets}
          usdtBalance={usdtBalance}
          isLoading={isLoading}
          isConnected={isConnected}
        />

        <PerformanceCard />
      </div>

      {/* Second Row: Market Opportunities */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
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
          <div className="grid gap-4 md:grid-cols-3">
            {marketProducts.map((product) => {
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
                      <Badge className={getCreditRatingColor(product.creditRating)}>
                        {product.creditRating}
                      </Badge>
                    </div>
                    <CardTitle className="text-base text-[#0A6A74]">{product.businessName}</CardTitle>
                    <CardDescription className="text-xs">{product.sector}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="font-semibold text-xs">${product.loanAmount.toLocaleString()} RSF</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rate</span>
                      <span className="font-semibold text-green-600 dark:text-green-400 text-xs">
                        {product.interestRate}% p.a.
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tenor</span>
                      <span className="font-medium text-xs">{product.tenor} months</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
