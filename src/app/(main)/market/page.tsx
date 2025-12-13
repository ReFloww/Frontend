'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { PRODUCT_MARKET, getCreditRatingColor } from '@/lib/constants/product-market';

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
              {PRODUCT_MARKET.map((product) => (
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
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
