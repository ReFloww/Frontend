'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, TrendingUp, Sprout, Fish, TreePine } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock data for borrower loan requests
const borrowerLoans = [
  {
    id: '1',
    businessName: 'Green Valley Farms',
    sector: 'Agriculture',
    purpose: 'Purchase of fertilizers and seeds',
    loanAmount: 50000,
    fundedAmount: 32000,
    interestRate: 10,
    tenor: 10,
    creditRating: 'A',
    icon: Sprout,
  },
  {
    id: '2',
    businessName: 'Ocean Harvest Co.',
    sector: 'Fisheries',
    purpose: 'Upgrade fishing equipment',
    loanAmount: 75000,
    fundedAmount: 15000,
    interestRate: 10.2,
    tenor: 18,
    creditRating: 'B',
    icon: Fish,
  },
  {
    id: '3',
    businessName: 'Timber Works Ltd',
    sector: 'Forestry',
    purpose: 'Expansion of logging operations',
    loanAmount: 120000,
    fundedAmount: 90000,
    interestRate: 9.8,
    tenor: 24,
    creditRating: 'A',
    icon: TreePine,
  },
  {
    id: '4',
    businessName: 'Sunrise Agriculture',
    sector: 'Agriculture',
    purpose: 'Purchase of raw materials',
    loanAmount: 35000,
    fundedAmount: 5000,
    interestRate: 7.5,
    tenor: 6,
    creditRating: 'A',
    icon: Sprout,
  },
  {
    id: '5',
    businessName: 'Coastal Fisheries Inc',
    sector: 'Fisheries',
    purpose: 'Purchase of processing equipment',
    loanAmount: 90000,
    fundedAmount: 45000,
    interestRate: 11.5,
    tenor: 15,
    creditRating: 'B',
    icon: Fish,
  },
  {
    id: '6',
    businessName: 'Forest Products Co',
    sector: 'Forestry',
    purpose: 'Purchase of raw materials',
    loanAmount: 65000,
    fundedAmount: 60000,
    interestRate: 12.8,
    tenor: 12,
    creditRating: 'C',
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


      {/* Loan Requests */}
      <div>
        <h2 className="mb-1 text-2xl font-semibold text-[#0A6A74]">Available Opportunities</h2>
        <Tabs defaultValue="all" className="w-full">
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {borrowerLoans.map((loan) => (
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
                    <CardTitle className="text-lg text-[#0A6A74]">{loan.businessName}</CardTitle>
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

                    {/* Funding Progress */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Funding Progress</span>
                        <span className="font-semibold text-[#0A6A74]">
                          {((loan.fundedAmount / loan.loanAmount) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                        <div
                          className="h-full bg-gradient-to-r from-[#0A6A74] to-[#16A34A] transition-all duration-500"
                          style={{ width: `${(loan.fundedAmount / loan.loanAmount) * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>${loan.fundedAmount.toLocaleString()} funded</span>
                        <span>${(loan.loanAmount - loan.fundedAmount).toLocaleString()} left</span>
                      </div>
                    </div>

                    <Button className="w-full hover:scale-105 transition-transform cursor-pointer bg-[#225B3A] text-white hover:bg-[#1C4A30]" size="lg">
                      View Details
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
