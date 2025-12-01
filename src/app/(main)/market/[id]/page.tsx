'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Building2, Sprout, Fish, TreePine, Calculator } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import SwapCard from '@/components/market/swap-card';
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

interface LoanCalculation {
    monthlyPrincipal: number;
    monthlyInterest: number;
    monthlyPayment: number;
    totalRepayment: number;
}

export default function ProductDetailPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params.id as string;

    const product = productMarket.find((p) => p.id === productId);
    const [investmentAmount, setInvestmentAmount] = useState<string>('');
    const [calculation, setCalculation] = useState<LoanCalculation | null>(null);

    const calculateReturns = (amount: number) => {
        if (!product || amount <= 0) {
            setCalculation(null);
            return;
        }

        const principal = amount;
        const monthlyInterestRate = product.loanInterest / 100 / 12;
        const numberOfPayments = product.loanTenor;

        // Calculate monthly payment using amortization formula
        const monthlyPayment =
            (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

        const totalRepayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalRepayment - principal;
        const monthlyInterest = totalInterest / numberOfPayments;
        const monthlyPrincipal = principal / numberOfPayments;

        setCalculation({
            monthlyPrincipal,
            monthlyInterest,
            monthlyPayment,
            totalRepayment,
        });
    };

    const handleAmountChange = (value: string) => {
        setInvestmentAmount(value);
        const amount = parseFloat(value);
        if (!isNaN(amount)) {
            calculateReturns(amount);
        } else {
            setCalculation(null);
        }
    };

    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <h3 className="mb-2 text-lg font-semibold">Product Not Found</h3>
                        <p className="mb-6 text-center text-sm text-muted-foreground">
                            The requested tokenized product could not be found
                        </p>
                        <Button onClick={() => router.push('/market')}>
                            Back to Market
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const ProductIcon = product.icon;

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <Button
                variant="ghost"
                onClick={() => router.push('/market')}
                className="mb-4 hover:scale-105 transition-transform cursor-pointer"
            >
                <ArrowLeft className="mr-2 h-4 w-4 " />
                Back to Market
            </Button>

            {/* Product Header with Symbol */}
            <Card className="border-2">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                                <ProductIcon className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <CardTitle className="text-2xl text-[#0A6A74]">{product.productName}</CardTitle>
                                    <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 font-mono font-bold text-lg px-3 py-1">
                                        ${product.symbol}
                                    </Badge>
                                </div>
                                <CardDescription className="text-base">{product.categoryId}</CardDescription>
                            </div>
                        </div>
                        <Badge className={getCreditRatingColor(product.creditRate)}>
                            Credit Rating: {product.creditRate}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Description</p>
                                <p className="text-base font-medium">{product.description}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Loan Amount</p>
                                <p className="text-2xl font-bold">${product.loanAmount.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Contract ID</p>
                                <p className="text-sm font-mono text-gray-500">{product.contractId}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Interest Rate</p>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {product.loanInterest.toFixed(2)}% p.a.
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Loan Tenor</p>
                                <p className="text-base font-medium">{product.loanTenor} months</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Category</p>
                                <p className="text-base font-medium">{product.categoryId}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Two Cards Side by Side */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Left Card: Investment Input */}
                <SwapCard
                    maxAmount={product.loanAmount}
                    onAmountChange={handleAmountChange}
                    symbol={product.symbol}
                />

                {/* Right Card: Expected Returns */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle>Expected Returns from {product.symbol}</CardTitle>
                        <CardDescription>
                            {calculation ? 'Based on your investment amount' : 'Enter amount to see expected returns'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {calculation ? (
                            <div className="space-y-4">
                                <div className="p-4 rounded-lg bg-muted/50">
                                    <p className="text-sm text-muted-foreground">Monthly Payment</p>
                                    <p className="text-xl font-bold mt-1">
                                        ${calculation.monthlyPayment.toFixed(2)}
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg bg-muted/50">
                                    <p className="text-sm text-muted-foreground">Monthly Interest Earned</p>
                                    <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">
                                        ${calculation.monthlyInterest.toFixed(2)}
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg bg-muted/50">
                                    <p className="text-sm text-muted-foreground">Total Repayment</p>
                                    <p className="text-xl font-bold mt-1">
                                        ${calculation.totalRepayment.toFixed(2)}
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                                    <p className="text-sm font-medium text-green-900 dark:text-green-100">
                                        Total Profit
                                    </p>
                                    <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">
                                        ${(calculation.totalRepayment - parseFloat(investmentAmount)).toFixed(2)}
                                    </p>
                                    <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                                        Over {product.loanTenor} months
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
                                <p className="text-sm text-muted-foreground">
                                    No calculations yet
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>


            </div>
        </div>
    );
}
