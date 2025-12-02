'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  Wallet,
  Sprout,
  Fish,
  TreePine,
  Shield,
  Target,
  BarChart3,
  Info,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';

// Manager detailed data
const managersData = [
  {
    id: '1',
    name: 'John Doe',
    avatar: '/images/john-doe.png',
    riskLevel: 'High Risk',
    maxProfit: '20%',
    experience: '2 years',
    totalAUM: 1200000,
    totalInvestors: 156,
    monthlyReturn: 1.8,
    winRate: 78,
    maxDrawdown: 12,
    managementFee: 2,
    performanceFee: 20,
    minInvestment: 100,
    bio: 'John is an experienced portfolio manager specializing in high-growth agricultural and fisheries investments. With a background in commodity trading, he focuses on maximizing returns through strategic asset allocation.',
    strategy: 'Aggressive growth strategy focusing on high-yield opportunities in emerging agricultural markets. Actively rebalances portfolio based on market conditions.',
    products: [
      { id: '1', name: 'Green Valley Farms', category: 'Agriculture', icon: Sprout, allocation: 40 },
      { id: '2', name: 'Ocean Harvest Co.', category: 'Fisheries', icon: Fish, allocation: 35 },
      { id: '4', name: 'Sunrise Agriculture', category: 'Agriculture', icon: Sprout, allocation: 25 },
    ],
    performanceData: [
      { month: 'Jul', value: 100 },
      { month: 'Aug', value: 108 },
      { month: 'Sep', value: 105 },
      { month: 'Oct', value: 118 },
      { month: 'Nov', value: 125 },
      { month: 'Dec', value: 132 },
    ],
    change24h: 2.4,
  },
  {
    id: '2',
    name: 'Sarah Smith',
    avatar: '/images/sarah-smith.png',
    riskLevel: 'Medium Risk',
    maxProfit: '10%',
    experience: '3 years',
    totalAUM: 850000,
    totalInvestors: 98,
    monthlyReturn: 0.9,
    winRate: 82,
    maxDrawdown: 6,
    managementFee: 1.5,
    performanceFee: 15,
    minInvestment: 50,
    bio: 'Sarah brings 3 years of experience in sustainable investment management. She specializes in balanced portfolios combining forestry and agriculture for steady, reliable returns.',
    strategy: 'Balanced approach with focus on sustainable, long-term growth. Diversifies across sectors to minimize risk while maintaining competitive returns.',
    products: [
      { id: '3', name: 'Timber Works Ltd', category: 'Forestry', icon: TreePine, allocation: 55 },
      { id: '1', name: 'Valley Crops Farm', category: 'Agriculture', icon: Sprout, allocation: 45 },
    ],
    performanceData: [
      { month: 'Jul', value: 100 },
      { month: 'Aug', value: 102 },
      { month: 'Sep', value: 105 },
      { month: 'Oct', value: 107 },
      { month: 'Nov', value: 109 },
      { month: 'Dec', value: 112 },
    ],
    change24h: 0.8,
  },
  {
    id: '3',
    name: 'Michael Chen',
    avatar: '/images/michael-chen.png',
    riskLevel: 'Low Risk',
    maxProfit: '5%',
    experience: '5 years',
    totalAUM: 2500000,
    totalInvestors: 312,
    monthlyReturn: 0.45,
    winRate: 92,
    maxDrawdown: 3,
    managementFee: 1,
    performanceFee: 10,
    minInvestment: 25,
    bio: 'Michael is a veteran portfolio manager with 5 years of experience. Known for his conservative approach, he prioritizes capital preservation while delivering consistent returns.',
    strategy: 'Conservative strategy focused on capital preservation. Invests primarily in established, low-volatility assets with proven track records.',
    products: [
      { id: '3', name: 'Highland Timber Co.', category: 'Forestry', icon: TreePine, allocation: 40 },
      { id: '1', name: 'Green Valley Farms', category: 'Agriculture', icon: Sprout, allocation: 35 },
      { id: '6', name: 'Forest Products Co', category: 'Forestry', icon: TreePine, allocation: 25 },
    ],
    performanceData: [
      { month: 'Jul', value: 100 },
      { month: 'Aug', value: 101 },
      { month: 'Sep', value: 102 },
      { month: 'Oct', value: 103 },
      { month: 'Nov', value: 104 },
      { month: 'Dec', value: 105 },
    ],
    change24h: 0.3,
  },
  {
    id: '4',
    name: 'Emily Johnson',
    avatar: '/images/emily-johnson.png',
    riskLevel: 'Medium Risk',
    maxProfit: '12%',
    experience: '4 years',
    totalAUM: 1800000,
    totalInvestors: 203,
    monthlyReturn: 1.1,
    winRate: 80,
    maxDrawdown: 8,
    managementFee: 1.5,
    performanceFee: 18,
    minInvestment: 75,
    bio: 'Emily specializes in marine and forestry investments with 4 years of experience. Her data-driven approach combines market analysis with sustainable investment principles.',
    strategy: 'Data-driven medium risk strategy. Focuses on fisheries and forestry sectors with proven market demand and growth potential.',
    products: [
      { id: '5', name: 'Coastal Fisheries Inc', category: 'Fisheries', icon: Fish, allocation: 40 },
      { id: '2', name: 'Pacific Seafood Ltd', category: 'Fisheries', icon: Fish, allocation: 35 },
      { id: '3', name: 'Timber Works Ltd', category: 'Forestry', icon: TreePine, allocation: 25 },
    ],
    performanceData: [
      { month: 'Jul', value: 100 },
      { month: 'Aug', value: 104 },
      { month: 'Sep', value: 106 },
      { month: 'Oct', value: 110 },
      { month: 'Nov', value: 114 },
      { month: 'Dec', value: 118 },
    ],
    change24h: 1.2,
  },
  {
    id: '5',
    name: 'David Wilson',
    avatar: '/images/david-wilson.png',
    riskLevel: 'High Risk',
    maxProfit: '25%',
    experience: '3 years',
    totalAUM: 680000,
    totalInvestors: 67,
    monthlyReturn: 2.2,
    winRate: 72,
    maxDrawdown: 18,
    managementFee: 2.5,
    performanceFee: 25,
    minInvestment: 150,
    bio: 'David is a high-risk, high-reward strategist with expertise in volatile markets. He seeks maximum returns through concentrated positions in high-potential opportunities.',
    strategy: 'Aggressive high-risk strategy targeting maximum returns. Concentrates investments in high-growth potential assets with active trading approach.',
    products: [
      { id: '2', name: 'Ocean Harvest Co.', category: 'Fisheries', icon: Fish, allocation: 60 },
      { id: '4', name: 'Sunrise Agriculture', category: 'Agriculture', icon: Sprout, allocation: 40 },
    ],
    performanceData: [
      { month: 'Jul', value: 100 },
      { month: 'Aug', value: 112 },
      { month: 'Sep', value: 105 },
      { month: 'Oct', value: 125 },
      { month: 'Nov', value: 138 },
      { month: 'Dec', value: 145 },
    ],
    change24h: 3.5,
  },
];

const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'High Risk':
      return 'border-red-400 text-red-500 bg-red-50 dark:bg-red-900/20';
    case 'Medium Risk':
      return 'border-orange-400 text-orange-500 bg-orange-50 dark:bg-orange-900/20';
    case 'Low Risk':
      return 'border-green-400 text-green-500 bg-green-50 dark:bg-green-900/20';
    default:
      return 'border-gray-400 text-gray-500 bg-gray-50';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Agriculture':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'Fisheries':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    case 'Forestry':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function ManagerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const managerId = params.id as string;

  const manager = managersData.find((m) => m.id === managerId);

  const [investAmount, setInvestAmount] = useState('');

  if (!manager) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <h3 className="mb-2 text-lg font-semibold">Manager Not Found</h3>
            <p className="mb-6 text-center text-sm text-muted-foreground">
              The requested manager could not be found
            </p>
            <Button onClick={() => router.push('/auto-manage')}>
              Back to Auto Manage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const maxValue = Math.max(...manager.performanceData.map((d) => d.value));
  const minValue = Math.min(...manager.performanceData.map((d) => d.value));
  const valueRange = maxValue - minValue;

  const estimatedReturn = investAmount
    ? (parseFloat(investAmount) * manager.monthlyReturn / 100).toFixed(2)
    : '0.00';

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.push('/auto-manage')}
        className="hover:scale-105 transition-transform cursor-pointer"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Auto Manage
      </Button>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={manager.avatar}
                    alt={manager.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-[#225B3A]">{manager.name}</h1>
                    <Badge
                      variant="outline"
                      className={`${getRiskColor(manager.riskLevel)} font-medium`}
                    >
                      {manager.riskLevel}
                    </Badge>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-[#0A6A74]">
                      ${manager.totalAUM.toLocaleString()}
                    </span>
                    <div className={`flex items-center gap-1 ${manager.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {manager.change24h >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="font-semibold">
                        {manager.change24h >= 0 ? '+' : ''}{manager.change24h}% (24h)
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2">
                    Assets Under Management
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Chart */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Performance</CardTitle>
                  <CardDescription>Portfolio growth over time</CardDescription>
                </div>
                <div className="flex gap-2">
                  {['1W', '1M', '1Y', 'ALL'].map((period) => (
                    <Button
                      key={period}
                      variant={period === '1M' ? 'default' : 'outline'}
                      size="sm"
                      className={period === '1M' ? 'bg-[#225B3A] hover:bg-[#1C4A30]' : ''}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground w-12">
                  <span>{maxValue}%</span>
                  <span>{Math.round((maxValue + minValue) / 2)}%</span>
                  <span>{minValue}%</span>
                </div>

                {/* Chart area */}
                <div className="ml-14 h-full relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    <div className="border-t border-muted" />
                    <div className="border-t border-muted" />
                    <div className="border-t border-muted" />
                  </div>

                  {/* SVG Line Chart */}
                  <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#225B3A" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#225B3A" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Area Fill */}
                    <path
                      d={`M 0 ${100 - ((manager.performanceData[0].value - minValue) / valueRange) * 100}
                          ${manager.performanceData.map((d, i) =>
                            `L ${i * 60} ${100 - ((d.value - minValue) / valueRange) * 100}`
                          ).join(' ')}
                          L 300 100 L 0 100 Z`}
                      fill="url(#chartGradient)"
                    />

                    {/* Line */}
                    <polyline
                      points={manager.performanceData
                        .map((d, i) => `${i * 60},${100 - ((d.value - minValue) / valueRange) * 100}`)
                        .join(' ')}
                      fill="none"
                      stroke="#225B3A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Points */}
                    {manager.performanceData.map((d, i) => (
                      <circle
                        key={i}
                        cx={i * 60}
                        cy={100 - ((d.value - minValue) / valueRange) * 100}
                        r="4"
                        fill="#225B3A"
                      />
                    ))}
                  </svg>

                  {/* X-axis labels */}
                  <div className="flex justify-between mt-2">
                    {manager.performanceData.map((d, i) => (
                      <span key={i} className="text-xs text-muted-foreground">
                        {d.month}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{manager.bio}</p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-semibold">{manager.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Investors</p>
                  <p className="font-semibold">{manager.totalInvestors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Monthly Return</p>
                  <p className="text-xl font-bold text-green-600">+{manager.monthlyReturn}%</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Win Rate</p>
                  <p className="text-xl font-bold text-[#0A6A74]">{manager.winRate}%</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Max Drawdown</p>
                  <p className="text-xl font-bold text-orange-500">-{manager.maxDrawdown}%</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Max Profit</p>
                  <p className="text-xl font-bold text-green-600">{manager.maxProfit}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Strategy */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-[#0A6A74]" />
                Investment Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{manager.strategy}</p>
            </CardContent>
          </Card>

          {/* Products Managed */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Products Managed</CardTitle>
              <CardDescription>Current portfolio allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {manager.products.map((product, index) => {
                  const ProductIcon = product.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => router.push(`/market/${product.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getCategoryColor(product.category)}`}>
                          <ProductIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">{product.allocation}%</p>
                          <p className="text-sm text-muted-foreground">Allocation</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Action Card */}
        <div className="lg:sticky lg:top-6 lg:self-start space-y-6">
          {/* Invest Card */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Invest with {manager.name.split(' ')[0]}</CardTitle>
              <CardDescription>Start auto-managing your portfolio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Investment Amount */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Investment Amount (USDT)</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(e.target.value)}
                  className="h-12 text-lg"
                />
                <p className="text-xs text-muted-foreground">
                  Minimum investment: ${manager.minInvestment} USDT
                </p>
              </div>

              {/* Summary */}
              <div className="space-y-3 p-4 rounded-lg bg-muted/50">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Monthly Return</span>
                  <span className="font-semibold text-green-600">+${estimatedReturn}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Management Fee</span>
                  <span className="font-semibold">{manager.managementFee}% p.a.</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Performance Fee</span>
                  <span className="font-semibold">{manager.performanceFee}%</span>
                </div>
              </div>

              {/* Action Button */}
              <Button className="w-full h-12 text-base font-semibold bg-[#225B3A] hover:bg-[#1C4A30]">
                Start Auto Manage
              </Button>
            </CardContent>
          </Card>

          {/* How it Works */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Info className="h-4 w-4" />
                How it works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                When you invest with a manager, your funds are automatically allocated
                according to their strategy. The manager handles all trading decisions,
                rebalancing, and optimization to maximize your returns.
              </p>
              <Button variant="link" className="p-0 h-auto mt-2 text-[#0A6A74]">
                Learn more <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </CardContent>
          </Card>

          {/* Need Help */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Have questions about auto-management or this manager's strategy?
              </p>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
