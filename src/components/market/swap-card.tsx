'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Info, TrendingUp, Percent, Coins } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface SwapCardProps {
    maxAmount?: number;
    onAmountChange?: (amount: string) => void;
}

export default function SwapCard({ maxAmount = 1000000, onAmountChange }: SwapCardProps) {
    const [buyAmount, setBuyAmount] = useState('');
    const [buyReceiveAmount, setBuyReceiveAmount] = useState('');
    const [sellAmount, setSellAmount] = useState('');
    const [sellReceiveAmount, setSellReceiveAmount] = useState('');

    // Mock exchange rate and fees
    const exchangeRate = 1.0; // 1 RSF = 1 TOKEN for lending
    const platformFee = 0.5; // 0.5% platform fee
    const slippage = 0.1; // 0.1% slippage tolerance

    const handleBuyAmountChange = (value: string) => {
        setBuyAmount(value);
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
            const receivedAmount = numValue * exchangeRate;
            const feeAmount = receivedAmount * (platformFee / 100);
            const finalAmount = receivedAmount - feeAmount;
            setBuyReceiveAmount(finalAmount.toFixed(2));

            // Notify parent component of amount change
            if (onAmountChange) {
                onAmountChange(value);
            }
        } else {
            setBuyReceiveAmount('');
            if (onAmountChange) {
                onAmountChange('');
            }
        }
    };

    const handleSellAmountChange = (value: string) => {
        setSellAmount(value);
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
            const receivedAmount = numValue / exchangeRate;
            const feeAmount = receivedAmount * (platformFee / 100);
            const finalAmount = receivedAmount - feeAmount;
            setSellReceiveAmount(finalAmount.toFixed(2));
        } else {
            setSellReceiveAmount('');
        }
    };

    const calculateFee = (amount: string) => {
        const numValue = parseFloat(amount);
        if (isNaN(numValue)) return 0;
        return (numValue * exchangeRate * platformFee / 100).toFixed(2);
    };

    const calculateMinimumReceived = (amount: string) => {
        const numValue = parseFloat(amount);
        if (isNaN(numValue)) return 0;
        const received = numValue * exchangeRate;
        const fee = received * (platformFee / 100);
        const afterFee = received - fee;
        const withSlippage = afterFee * (1 - slippage / 100);
        return withSlippage.toFixed(2);
    };

    return (
        <Card className="border-2">
            <CardHeader>
                <CardTitle>Invest in Loan</CardTitle>
                <CardDescription>
                    Convert RSF to loan tokens and start earning interest
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="buy" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="buy">Invest</TabsTrigger>
                        <TabsTrigger value="sell">Redeem</TabsTrigger>
                    </TabsList>

                    {/* Buy Tab */}
                    <TabsContent value="buy" className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <label className="text-muted-foreground">Amount</label>
                                <span className="text-xs text-muted-foreground">Max: {maxAmount.toLocaleString()} RSF</span>
                            </div>
                            <div className="relative">
                                <Input
                                    type="number"
                                    placeholder="Input amount"
                                    value={buyAmount}
                                    onChange={(e) => handleBuyAmountChange(e.target.value)}
                                    className="pr-16 h-14 text-lg"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                            <span className="text-xs font-bold">R</span>
                                        </div>
                                        <span className="font-semibold text-sm">RSF</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Transaction Details */}
                        {buyAmount && parseFloat(buyAmount) > 0 && (
                            <>
                                <Separator />
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Percent className="h-3.5 w-3.5" />
                                            <span>Exchange Rate</span>
                                        </div>
                                        <span className="font-medium">1 RSF = {exchangeRate} LOAN</span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Coins className="h-3.5 w-3.5" />
                                            <span>Platform Fee ({platformFee}%)</span>
                                        </div>
                                        <span className="font-medium">{calculateFee(buyAmount)} RSF</span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <TrendingUp className="h-3.5 w-3.5" />
                                            <span>Minimum Received</span>
                                        </div>
                                        <span className="font-medium">{calculateMinimumReceived(buyAmount)} LOAN</span>
                                    </div>

                                    <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        <span className="text-xs text-blue-900 dark:text-blue-100">
                                            Slippage tolerance: {slippage}%
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}

                        <Button className="w-full h-12 text-base bg-[#225B3A] hover:bg-[#1C4A30]" size="lg">
                            Invest
                        </Button>
                    </TabsContent>

                    {/* Sell Tab */}
                    <TabsContent value="sell" className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <label className="text-muted-foreground">Amount</label>
                                <span className="text-xs text-muted-foreground">Balance: 500 LOAN</span>
                            </div>
                            <div className="relative">
                                <Input
                                    type="number"
                                    placeholder="Input amount"
                                    value={sellAmount}
                                    onChange={(e) => handleSellAmountChange(e.target.value)}
                                    className="pr-16 h-14 text-lg"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                                            <span className="text-xs font-bold">L</span>
                                        </div>
                                        <span className="font-semibold text-sm">LOAN</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Transaction Details */}
                        {sellAmount && parseFloat(sellAmount) > 0 && (
                            <>
                                <Separator />
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Percent className="h-3.5 w-3.5" />
                                            <span>Exchange Rate</span>
                                        </div>
                                        <span className="font-medium">1 LOAN = {(1 / exchangeRate).toFixed(2)} RSF</span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Coins className="h-3.5 w-3.5" />
                                            <span>Platform Fee ({platformFee}%)</span>
                                        </div>
                                        <span className="font-medium">{(parseFloat(sellAmount || '0') / exchangeRate * platformFee / 100).toFixed(2)} RSF</span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <TrendingUp className="h-3.5 w-3.5" />
                                            <span>Minimum Received</span>
                                        </div>
                                        <span className="font-medium">{sellReceiveAmount ? (parseFloat(sellReceiveAmount) * (1 - slippage / 100)).toFixed(2) : '0.00'} RSF</span>
                                    </div>

                                    <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                                        <Info className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                        <span className="text-xs text-amber-900 dark:text-amber-100">
                                            Early redemption may affect returns
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}

                        <Button className="w-full h-12 text-base" size="lg" variant="outline">
                            Redeem Loan Tokens
                        </Button>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}