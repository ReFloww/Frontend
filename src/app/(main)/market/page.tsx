'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, TrendingUp, Sprout, Fish, TreePine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TokenizedProduct } from '@/types/product-market';

// Mock data for tokenized product market
const productMarket: TokenizedProduct[] = [
  {
    id: '1',
    productName: 'Green Valley Farms',
    symbol: 'GVF',
    categoryId: 'Agriculture',
    description: 'Purchase of fertilizers and seeds',
    loanInterest: 10.00,
    loanAmount: 50000.00,
    loanTenor: 10,
    creditRate: 'A',
    contractId: 'contract-uuid-1',
    icon: Sprout,
  },
  {
    id: '2',
    productName: 'Ocean Harvest Co.',
    symbol: 'OHF',
    categoryId: 'Fisheries',
    description: 'Upgrade fishing equipment',
    loanInterest: 10.20,
    loanAmount: 75000.00,
    loanTenor: 18,
    creditRate: 'B',
    contractId: 'contract-uuid-2',
    icon: Fish,
  },
  {
    id: '3',
    productName: 'Timber Works Ltd',
    symbol: 'TWL',
    categoryId: 'Forestry',
    description: 'Expansion of logging operations',
    loanInterest: 9.80,
    loanAmount: 120000.00,
    loanTenor: 24,
    creditRate: 'A',
    contractId: 'contract-uuid-3',
    icon: TreePine,
  },
  {
    id: '4',
    productName: 'Sunrise Agriculture',
    symbol: 'SUN',
    categoryId: 'Agriculture',
    description: 'Purchase of raw materials',
    loanInterest: 7.50,
    loanAmount: 35000.00,
    loanTenor: 6,
    creditRate: 'A',
    contractId: 'contract-uuid-4',
    icon: Sprout,
  },
  {
    id: '5',
    productName: 'Coastal Fisheries Inc',
    symbol: 'CFI',
    categoryId: 'Fisheries',
    description: 'Purchase of processing equipment',
    loanInterest: 11.50,
    loanAmount: 90000.00,
    loanTenor: 15,
    creditRate: 'B',
    contractId: 'contract-uuid-5',
    icon: Fish,
  },
  {
    id: '6',
    productName: 'Forest Products Co',
    symbol: 'FPC',
    categoryId: 'Forestry',
    description: 'Purchase of raw materials',
    loanInterest: 12.80,
    loanAmount: 65000.00,
    loanTenor: 12,
    creditRate: 'C',
    contractId: 'contract-uuid-6',
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

export default function MarketPage() {
  const router = useRouter();

  const handleCardClick = (loanId: string) => {
    router.push(`/market/${loanId}`);
  };

  return (
    <div className="space-y-8">


      {/* Product Market - Tokenized Loans */}
      <div>
        <h2 className="mb-1 text-2xl font-semibold text-[#0A6A74]">Tokenized Product Market</h2>
        <p className="text-sm text-muted-foreground mb-4">Trade tokenized loan products with unique ticker symbols</p>
        <Tabs defaultValue="all" className="w-full">
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {productMarket.map((product) => (
                <Card
                  key={product.id}
                  className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleCardClick(product.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <product.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 font-mono font-bold">
                          {product.symbol}
                        </Badge>
                        <Badge className={getCreditRatingColor(product.creditRate)}>
                          Rating: {product.creditRate}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg text-[#0A6A74]">{product.productName}</CardTitle>
                    <CardDescription>{product.categoryId}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Description</span>
                        <span className="font-medium text-right text-xs">{product.description}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Loan Amount</span>
                        <span className="font-semibold">
                          ${product.loanAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Interest Rate</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {product.loanInterest.toFixed(2)}% p.a.
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tenor</span>
                        <span className="font-medium">{product.loanTenor} months</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Contract ID</span>
                        <span className="font-medium text-xs font-mono text-gray-500">{product.contractId}</span>
                      </div>
                    </div>

                    <Button className="w-full hover:scale-105 transition-transform cursor-pointer bg-[#225B3A] text-white hover:bg-[#1C4A30]" size="lg">
                      Trade {product.symbol}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* <TabsContent value="agriculture" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {borrowerLoans
                .filter((loan) => loan.sector === 'Agriculture')
                .map((loan) => (
                  <Card
                    key={loan.id}
                    className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleCardClick(loan.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <loan.icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge className={getCreditRatingColor(loan.creditRating)}>
                          Rating: {loan.creditRating}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{loan.businessName}</CardTitle>
                      <CardDescription>{loan.sector}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Purpose</span>
                          <span className="font-medium text-right text-xs">{loan.purpose}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Loan Amount</span>
                          <span className="font-semibold">
                            ${loan.loanAmount.toLocaleString()} RSF
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Interest Rate</span>
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            {loan.interestRate}% p.a.
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tenor</span>
                          <span className="font-medium">{loan.tenor} months</span>
                        </div>
                      </div>

                      <Button className="w-full" size="lg">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="fisheries" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {borrowerLoans
                .filter((loan) => loan.sector === 'Fisheries')
                .map((loan) => (
                  <Card
                    key={loan.id}
                    className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleCardClick(loan.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <loan.icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge className={getCreditRatingColor(loan.creditRating)}>
                          Rating: {loan.creditRating}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{loan.businessName}</CardTitle>
                      <CardDescription>{loan.sector}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Purpose</span>
                          <span className="font-medium text-right text-xs">{loan.purpose}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Loan Amount</span>
                          <span className="font-semibold">
                            ${loan.loanAmount.toLocaleString()} RSF
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Interest Rate</span>
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            {loan.interestRate}% p.a.
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tenor</span>
                          <span className="font-medium">{loan.tenor} months</span>
                        </div>
                      </div>

                      <Button className="w-full" size="lg">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="forestry" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {borrowerLoans
                .filter((loan) => loan.sector === 'Forestry')
                .map((loan) => (
                  <Card
                    key={loan.id}
                    className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleCardClick(loan.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <loan.icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge className={getCreditRatingColor(loan.creditRating)}>
                          Rating: {loan.creditRating}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{loan.businessName}</CardTitle>
                      <CardDescription>{loan.sector}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Purpose</span>
                          <span className="font-medium text-right text-xs">{loan.purpose}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Loan Amount</span>
                          <span className="font-semibold">
                            ${loan.loanAmount.toLocaleString()} RSF
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Interest Rate</span>
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            {loan.interestRate}% p.a.
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tenor</span>
                          <span className="font-medium">{loan.tenor} months</span>
                        </div>
                      </div>

                      <Button className="w-full" size="lg">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}
