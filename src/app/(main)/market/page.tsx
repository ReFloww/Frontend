'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { getCreditRatingColor } from '@/lib/constants/product-market';
import { fetchMarketList, MarketItem } from '@/lib/api';
import { Sprout, Fish, TreePine, Loader2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { TokenizedProduct } from '@/types/product-market';

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

export default function MarketPage() {
  const router = useRouter();
  const [products, setProducts] = useState<TokenizedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCardClick = (loanId: string) => {
    router.push(`/market/${loanId}`);
  };

  // Fetch market data on component mount
  useEffect(() => {
    const loadMarketData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMarketList();
        const mappedProducts = data.map(mapApiToProduct);
        setProducts(mappedProducts);
      } catch (err) {
        console.error('Error loading market data:', err);
        setError('Failed to load market data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadMarketData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading market data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <AlertCircle className="h-8 w-8 mx-auto text-destructive" />
          <p className="text-destructive font-medium">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">


      {/* Product Market - Tokenized Loans */}
      <div>
        <h2 className="mb-1 text-2xl font-semibold text-[#0A6A74]">Tokenized Product Market</h2>
        <p className="text-sm text-muted-foreground mb-4">Trade tokenized loan products with unique ticker symbols</p>
        <Tabs defaultValue="all" className="w-full">
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleCardClick(product.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-3 items-start">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                          <product.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xl font-bold text-green-600 dark:text-green-400 font-mono">
                            ${product.symbol}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                            {product.productName}
                          </span>
                        </div>
                      </div>
                      <Badge className={getCreditRatingColor(product.creditRate)}>
                        Rating: {product.creditRate}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Category</span>
                        <span className="font-semibold text-foreground">{product.categoryId}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Loan Amount</span>
                        <span className="font-semibold text-foreground">
                          ${product.loanAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Interest Rate</span>
                        <span className="font-semibold">
                          <span className="text-green-600 dark:text-green-400">{product.loanInterest.toFixed(2)}%</span>
                          <span className="text-foreground"> p.a.</span>
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tenor</span>
                        <span className="font-semibold text-foreground">{product.loanTenor} months</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Contract ID</span>
                        <a
                          href={`https://sepolia.basescan.org/address/${product.contractId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-xs font-mono text-foreground hover:underline hover:text-primary z-10 flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {product.contractId.slice(0, 5)}...{product.contractId.slice(-3)}
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Unique Investors</span>
                        <span className="font-semibold text-foreground">
                          {product.holderCount} {product.holderCount === 1 ? 'investor' : 'investors'}
                        </span>
                      </div>
                    </div>

                    <Button className="w-full hover:scale-105 transition-transform cursor-pointer bg-green-600 text-white hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700" size="lg">
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
