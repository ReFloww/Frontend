'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/lib/constants/product-market';

interface ProductInformationProps {
    product: Product;
}

export default function ProductInformation({ product }: ProductInformationProps) {
    return (
        <Card className="border-2">
            <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>Detailed information about {product.productName}</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="details" className="w-full">
                    <TabsList>
                        <TabsTrigger value="details" className="cursor-pointer">Details</TabsTrigger>
                        <TabsTrigger value="financials" className="cursor-pointer">Financials</TabsTrigger>
                        <TabsTrigger value="documents" className="cursor-pointer">Documents</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="mt-6">
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                            <p className="text-base leading-relaxed text-muted-foreground">
                                {product.productName} is a tokenized real-world asset investment opportunity in the {product.categoryId.toLowerCase()} sector.
                                This product offers investors the chance to participate in a ${product.loanAmount.toLocaleString()} loan facility with an attractive {product.loanInterest.toFixed(2)}% annual interest rate over a {product.loanTenor}-month tenor.
                                The underlying business has been assigned a credit rating of {product.creditRate}, reflecting its creditworthiness and risk profile.
                                Investors can purchase ${product.symbol} tokens to gain fractional ownership and earn proportional returns from the loan repayments.
                                This investment provides exposure to the {product.categoryId.toLowerCase()} industry while maintaining liquidity through tokenization on the Mantle Network blockchain.
                            </p>
                        </div>
                    </TabsContent>

                    <TabsContent value="financials" className="mt-6">
                        <div className="flex items-center justify-center py-12 text-muted-foreground">
                            Financial details will be displayed here
                        </div>
                    </TabsContent>

                    <TabsContent value="documents" className="mt-6">
                        <div className="flex items-center justify-center py-12 text-muted-foreground">
                            Related documents will be displayed here
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
