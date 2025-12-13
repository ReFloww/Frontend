'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Info, TrendingUp, Percent, Coins } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface SwapCardProps {
    maxAmount?: number;
    onAmountChange?: (amount: string) => void;
    symbol?: string;
    defaultTab?: 'invest' | 'redeem';
}

export default function SwapCard({
    maxAmount = 1000000,
    onAmountChange,
    symbol = 'TOKEN',
    defaultTab = 'invest'
}: SwapCardProps) {
    const [activeTab, setActiveTab] = useState(defaultTab === 'redeem' ? 'sell' : 'buy');
    const [buyAmount, setBuyAmount] = useState('');
    const [buyReceiveAmount, setBuyReceiveAmount] = useState('');
    const [sellAmount, setSellAmount] = useState('');
    const [sellReceiveAmount, setSellReceiveAmount] = useState('');

    // Update active tab when defaultTab prop changes
    useEffect(() => {
        setActiveTab(defaultTab === 'redeem' ? 'sell' : 'buy');
    }, [defaultTab]);

    // Mock exchange rate and fees
    const platformFee = 0.5; // 0.5% platform fee
    const slippage = 0.1; // 0.1% slippage tolerance

    const handleBuyAmountChange = (value: string) => {
        setBuyAmount(value);
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
            const feeAmount = numValue * (platformFee / 100);
            const finalAmount = numValue - feeAmount;
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
            const feeAmount = numValue * (platformFee / 100);
            const finalAmount = numValue - feeAmount;
            setSellReceiveAmount(finalAmount.toFixed(2));
        } else {
            setSellReceiveAmount('');
        }
    };

    const calculateFee = (amount: string) => {
        const numValue = parseFloat(amount);
        if (isNaN(numValue)) return 0;
        return (numValue * platformFee / 100).toFixed(2);
    };

    const calculateMinimumReceived = (amount: string) => {
        const numValue = parseFloat(amount);
        if (isNaN(numValue)) return 0;
        const fee = numValue * (platformFee / 100);
        const afterFee = numValue - fee;
        const withSlippage = afterFee * (1 - slippage / 100);
        return withSlippage.toFixed(2);
    };

    return (
        <Card className="border-2">
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <CardTitle>Invest in {symbol}</CardTitle>
                    <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 font-mono font-bold">
                        ${symbol}
                    </Badge>
                </div>
                <CardDescription>
                    Invest in this product and start earning interest
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 ">
                        <TabsTrigger value="buy" className="cursor-pointer ">Invest</TabsTrigger>
                        <TabsTrigger value="sell" className="cursor-pointer">Redeem</TabsTrigger>
                    </TabsList>

                    {/* Buy Tab */}
                    <TabsContent value="buy" className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <label className="text-muted-foreground">Investment Amount</label>
                                <span className="text-xs text-muted-foreground">Max: ${maxAmount.toLocaleString()}</span>
                            </div>
                            <div className="relative">
                                <Input
                                    type="number"
                                    placeholder="Input amount"
                                    value={buyAmount}
                                    onChange={(e) => handleBuyAmountChange(e.target.value)}
                                    className="pr-16 h-14 text-lg"
                                />
                                {/* loan icon */}
                                {/* <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                            <span className="text-xs font-bold">R</span>
                                        </div>
                                        <span className="font-semibold text-sm">RSF</span>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        {/* Transaction Details */}
                        {buyAmount && parseFloat(buyAmount) > 0 && (
                            <>
                                <Separator />
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Coins className="h-3.5 w-3.5" />
                                            <span>Platform Fee ({platformFee}%)</span>
                                        </div>
                                        <span className="font-medium">${calculateFee(buyAmount)}</span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <TrendingUp className="h-3.5 w-3.5" />
                                            <span>Net Investment</span>
                                        </div>
                                        <span className="font-medium font-mono">${buyReceiveAmount}</span>
                                    </div>

                                    <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        <span className="text-xs text-blue-900 dark:text-blue-100">
                                            Start earning interest immediately after investment
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}

                        <Button className="w-full h-12 text-base bg-[#225B3A] hover:bg-[#1C4A30] cursor-pointer" size="lg">
                            Invest Now
                        </Button>
                    </TabsContent>

                    {/* Sell Tab */}
                    <TabsContent value="sell" className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <label className="text-muted-foreground">Redeem Amount</label>
                                <span className="text-xs text-muted-foreground">Invested: $500</span>
                            </div>
                            <div className="relative">
                                <Input
                                    type="number"
                                    placeholder="Input amount"
                                    value={sellAmount}
                                    onChange={(e) => handleSellAmountChange(e.target.value)}
                                    className="pr-16 h-14 text-lg"
                                />
                            </div>
                        </div>

                        {/* Transaction Details */}
                        {sellAmount && parseFloat(sellAmount) > 0 && (
                            <>
                                <Separator />
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Coins className="h-3.5 w-3.5" />
                                            <span>Platform Fee ({platformFee}%)</span>
                                        </div>
                                        <span className="font-medium">${calculateFee(sellAmount)}</span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <TrendingUp className="h-3.5 w-3.5" />
                                            <span>You'll Receive</span>
                                        </div>
                                        <span className="font-medium font-mono">${sellReceiveAmount}</span>
                                    </div>

                                    <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                                        <Info className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                        <span className="text-xs text-amber-900 dark:text-amber-100">
                                            Early redemption may affect your returns
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}

                        <Button
                            className="w-full h-12 text-base cursor-pointer hover:bg-orange-500 hover:border-orange-500 hover:text-white hover:brightness-90"
                            size="lg"
                            variant="outline"
                        >
                            Redeem Funds
                        </Button>

                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}