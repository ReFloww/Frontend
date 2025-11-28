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
// Mock data (same as in product page)
const borrowerLoans = [
    {
        id: '1',
        businessName: 'Green Valley Farms',
        sector: 'Agriculture',
        purpose: 'Purchase of fertilizers and seeds',
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
        purpose: 'Upgrade fishing equipment',
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
        purpose: 'Expansion of logging operations',
        loanAmount: 120000,
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

interface LoanCalculation {
    monthlyPrincipal: number;
    monthlyInterest: number;
    monthlyPayment: number;
    totalRepayment: number;
}

export default function LoanDetailPage() {
    const router = useRouter();
    const params = useParams();
    const loanId = params.id as string;

    const loan = borrowerLoans.find((l) => l.id === loanId);
    const [lendingAmount, setLendingAmount] = useState<string>('');
    const [calculation, setCalculation] = useState<LoanCalculation | null>(null);

    const calculateLoan = (amount: number) => {
        if (!loan || amount <= 0 || amount > loan.loanAmount) {
            setCalculation(null);
            return;
        }

        const principal = amount;
        const monthlyInterestRate = loan.interestRate / 100 / 12;
        const numberOfPayments = loan.tenor;

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
        setLendingAmount(value);
        const amount = parseFloat(value);
        if (!isNaN(amount)) {
            calculateLoan(amount);
        } else {
            setCalculation(null);
        }
    };

    if (!loan) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <h3 className="mb-2 text-lg font-semibold">Loan Not Found</h3>
                        <p className="mb-6 text-center text-sm text-muted-foreground">
                            The requested loan could not be found
                        </p>
                        <Button onClick={() => router.push('/market')}>
                            Back to Loans
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const LoanIcon = loan.icon;

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <Button
                variant="ghost"
                onClick={() => router.push('/market')}
                className="mb-4 hover:scale-105 transition-transform cursor-pointer"
            >
                <ArrowLeft className="mr-2 h-4 w-4 " />
                Back to Loans
            </Button>

            {/* Loan Header */}
            <Card className="border-2">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                                <LoanIcon className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl">{loan.businessName}</CardTitle>
                                <CardDescription className="text-base">{loan.sector}</CardDescription>
                            </div>
                        </div>
                        <Badge className={getCreditRatingColor(loan.creditRating)}>
                            Credit Rating: {loan.creditRating}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Purpose</p>
                                <p className="text-base font-medium">{loan.purpose}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Loan Amount Requested</p>
                                <p className="text-2xl font-bold">${loan.loanAmount.toLocaleString()} RSF</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Interest Rate</p>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {loan.interestRate}% p.a.
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Loan Tenor</p>
                                <p className="text-base font-medium">{loan.tenor} months</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Two Cards Side by Side */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Left Card: Investment Input */}
                <SwapCard
                    maxAmount={loan.loanAmount}
                    onAmountChange={handleAmountChange}
                />

                {/* Right Card: Expected Returns */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle>Expected Returns</CardTitle>
                        <CardDescription>
                            {calculation ? 'Based on your investment amount' : 'Enter an investment amount to see expected returns'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {calculation ? (
                            <div className="space-y-4">
                                <div className="p-4 rounded-lg bg-muted/50">
                                    <p className="text-sm text-muted-foreground">Monthly Payment</p>
                                    <p className="text-xl font-bold mt-1">
                                        ${calculation.monthlyPayment.toFixed(2)} RSF
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg bg-muted/50">
                                    <p className="text-sm text-muted-foreground">Monthly Interest Earned</p>
                                    <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">
                                        ${calculation.monthlyInterest.toFixed(2)} RSF
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg bg-muted/50">
                                    <p className="text-sm text-muted-foreground">Total Repayment</p>
                                    <p className="text-xl font-bold mt-1">
                                        ${calculation.totalRepayment.toFixed(2)} RSF
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                                    <p className="text-sm font-medium text-green-900 dark:text-green-100">
                                        Total Profit
                                    </p>
                                    <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">
                                        ${(calculation.totalRepayment - parseFloat(lendingAmount)).toFixed(2)} RSF
                                    </p>
                                    <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                                        Over {loan.tenor} months
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
