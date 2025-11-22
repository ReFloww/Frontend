'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Wallet, ArrowRight, Sprout, Fish, TreePine } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {/* First Row: Portfolio Value and Performance */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Portfolio Value Card */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardDescription>Total Portfolio Value</CardDescription>
                <CardTitle className="text-4xl mt-2">$245,000 RSF</CardTitle>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <TrendingUp className="h-4 w-4" />
                <span className="font-semibold">+12.5%</span>
              </div>
              <span className="text-muted-foreground">from last month</span>
            </div>

            <div className="pt-4 border-t space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Active Investments</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Earnings</span>
                <span className="font-semibold text-green-600 dark:text-green-400">$12,450 RSF</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Expected Monthly Return</span>
                <span className="font-semibold">$2,100 RSF</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Card with Chart */}
        <Card className="border-2">
          <CardHeader>
            <CardDescription>Performance Overview</CardDescription>
            <CardTitle className="text-2xl">Portfolio Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Line Chart with ups and downs */}
              <div className="h-48 relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
                  <span>${maxValue}</span>
                  <span>${Math.round(maxValue * 0.5)}</span>
                  <span>$0</span>
                </div>

                {/* Chart area */}
                <div className="ml-12 h-full relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    <div className="border-t border-muted"></div>
                    <div className="border-t border-muted"></div>
                    <div className="border-t border-muted"></div>
                  </div>

                  {/* SVG Line Chart */}
                  <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                    {/* Area under the line */}
                    <defs>
                      <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Area fill */}
                    <path
                      d={`M 0 ${100 - (performanceData[0].value / maxValue) * 100}
                          L 60 ${100 - (performanceData[1].value / maxValue) * 100}
                          L 120 ${100 - (performanceData[2].value / maxValue) * 100}
                          L 180 ${100 - (performanceData[3].value / maxValue) * 100}
                          L 240 ${100 - (performanceData[4].value / maxValue) * 100}
                          L 300 ${100 - (performanceData[5].value / maxValue) * 100}
                          L 300 100 L 0 100 Z`}
                      fill="url(#chartGradient)"
                    />

                    {/* Line */}
                    <polyline
                      points={performanceData.map((data, index) =>
                        `${(index * 60)},${100 - (data.value / maxValue) * 100}`
                      ).join(' ')}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Data points */}
                    {performanceData.map((data, index) => (
                      <circle
                        key={index}
                        cx={index * 60}
                        cy={100 - (data.value / maxValue) * 100}
                        r="3"
                        fill="hsl(var(--primary))"
                        className="hover:r-5 transition-all"
                      />
                    ))}
                  </svg>

                  {/* X-axis labels */}
                  <div className="flex justify-between mt-2">
                    {performanceData.map((data, index) => (
                      <span key={index} className="text-xs text-muted-foreground">
                        {data.month}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Average ROI</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">10.2% p.a.</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
                    <CardTitle className="text-base">{product.businessName}</CardTitle>
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