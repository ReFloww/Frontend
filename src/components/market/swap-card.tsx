'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Info, TrendingUp, Percent, Coins, Loader2, CheckCircle2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useTokenP2P } from '@/hooks/useTokenP2P';

interface SwapCardProps {
    maxAmount?: number;
    onAmountChange?: (amount: string) => void;
    symbol?: string;
    tokenP2PAddress: `0x${string}`;
}

export default function SwapCard({
    maxAmount = 1000000,
    onAmountChange,
    symbol = 'TOKEN',
    tokenP2PAddress,
}: SwapCardProps) {
    const [buyAmount, setBuyAmount] = useState('');
    const [buyReceiveAmount, setBuyReceiveAmount] = useState('');
    const [sellAmount, setSellAmount] = useState('');
    const [sellReceiveAmount, setSellReceiveAmount] = useState('');
    const [step, setStep] = useState<'input' | 'approve' | 'confirm'>('input');
    const [actionType, setActionType] = useState<'mint' | 'burn'>('mint');

    // Use the TokenP2P hook
    const {
        usdtBalance,
        p2pBalance,
        isConnected,
        isPending,
        isSuccess,
        hash,
        needsApproval,
        approveUSDT,
        buyTokens,
        sellTokens,
    } = useTokenP2P({ tokenP2PAddress });

    // Mock exchange rate and fees
    const platformFee = 0.5; // 0.5% platform fee
    const slippage = 0.1; // 0.1% slippage tolerance

    // Reset step when transaction is successful
    useEffect(() => {
        if (isSuccess) {
            setStep('input');
            setBuyAmount('');
            setSellAmount('');
            setBuyReceiveAmount('');
            setSellReceiveAmount('');
        }
    }, [isSuccess]);

    const handleBuyAmountChange = (value: string) => {
        setBuyAmount(value);

        if (onAmountChange) {
            onAmountChange(value);
        }

        // Calculate receive amount (1:1 ratio minus platform fee)
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue > 0) {
            const fee = numValue * (platformFee / 100);
            const receiveAmount = numValue - fee;
            setBuyReceiveAmount(receiveAmount.toFixed(2));
        } else {
            setBuyReceiveAmount('');
        }
    };

    const handleSellAmountChange = (value: string) => {
        setSellAmount(value);

        // Calculate receive amount (1:1 ratio minus platform fee)
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue > 0) {
            const fee = numValue * (platformFee / 100);
            const receiveAmount = numValue - fee;
            setSellReceiveAmount(receiveAmount.toFixed(2));
        } else {
            setSellReceiveAmount('');
        }
    };

    const handleInvest = () => {
        if (!buyAmount || parseFloat(buyAmount) <= 0) return;

        setActionType('mint');

        // Check if we need approval first
        if (step === 'input' && needsApproval(buyAmount)) {
            setStep('approve');
            approveUSDT(buyAmount);
        } else {
            // Either already approved or approval just completed
            setStep('confirm');
            buyTokens(buyAmount);
        }
    };

    const handleWithdraw = () => {
        if (!sellAmount || parseFloat(sellAmount) <= 0) return;

        setActionType('burn');
        setStep('confirm');
        sellTokens(sellAmount);
    };

    const calculateFee = (amount: string) => {
        const numValue = parseFloat(amount);
        if (isNaN(numValue)) return 0;
        return (numValue * platformFee / 100).toFixed(2);
    };

    // const calculateMinimumReceived = (amount: string) => {
    //     const numValue = parseFloat(amount);
    //     if (isNaN(numValue)) return 0;
    //     const fee = numValue * (platformFee / 100);
    //     const afterFee = numValue - fee;
    //     const withSlippage = afterFee * (1 - slippage / 100);
    //     return withSlippage.toFixed(2);
    // };

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
                <Tabs defaultValue="buy" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 ">
                        <TabsTrigger value="buy" className="cursor-pointer ">Invest</TabsTrigger>
                        <TabsTrigger value="sell" className="cursor-pointer">Withdraw</TabsTrigger>
                    </TabsList>

                    {/* Buy Tab */}
                    <TabsContent value="buy" className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <label className="text-muted-foreground">Investment Amount</label>
                                <span className="text-xs text-muted-foreground">
                                    {isConnected ? `USDT Balance: $${usdtBalance}` : 'Connect wallet to see balance'}
                                </span>
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
                                            <span>Tokens to Buy</span>
                                        </div>
                                        <span className="font-medium font-mono">{buyReceiveAmount} {symbol}</span>
                                    </div>

                                    <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        <span className="text-xs text-blue-900 dark:text-blue-100">
                                            You'll receive  {symbol} tokens backed by your USDT
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}

                        <Button
                            className="w-full h-12 text-base bg-[#225B3A] hover:bg-[#1C4A30] cursor-pointer"
                            size="lg"
                            onClick={handleInvest}
                            disabled={!isConnected || !buyAmount || parseFloat(buyAmount) <= 0 || isPending}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {step === 'approve' ? 'Approving USDT...' : 'Minting Tokens...'}
                                </>
                            ) : isSuccess ? (
                                <>
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Tokens Minted!
                                </>
                            ) : !isConnected ? (
                                'Connect Wallet'
                            ) : (
                                'Buy Tokens'
                            )}
                        </Button>

                    </TabsContent>

                    {/* Sell Tab */}
                    <TabsContent value="sell" className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <label className="text-muted-foreground">Tokens to Sell</label>
                                <span className="text-xs text-muted-foreground">
                                    {isConnected ? `${symbol} Balance: ${p2pBalance}` : 'Connect wallet to see balance'}
                                </span>
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
                                            <span>USDT You'll Receive</span>
                                        </div>
                                        <span className="font-medium font-mono">${sellReceiveAmount}</span>
                                    </div>

                                    <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                                        <Info className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                        <span className="text-xs text-amber-900 dark:text-amber-100">
                                            Your {symbol} tokens will be burned and you'll receive USDT
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}

                        <Button
                            className="w-full h-12 text-base cursor-pointer hover:bg-red-600 hover:border-red-600 hover:text-white hover:brightness-90"
                            size="lg"
                            variant="outline"
                            onClick={handleWithdraw}
                            disabled={!isConnected || !sellAmount || parseFloat(sellAmount) <= 0 || isPending}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sell Tokens...
                                </>
                            ) : isSuccess ? (
                                <>
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Tokens Sell!
                                </>
                            ) : !isConnected ? (
                                'Connect Wallet'
                            ) : (
                                'SELL '
                            )}
                        </Button>

                    </TabsContent>
                </Tabs>

                {/* Transaction Status */}
                {(isPending || isSuccess) && hash && (
                    <div className="mt-4 p-4 rounded-lg bg-muted/50 border">
                        <div className="flex items-start gap-3">
                            {isPending ? (
                                <Loader2 className="h-5 w-5 animate-spin text-primary mt-0.5" />
                            ) : (
                                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                            )}
                            <div className="flex-1">
                                <p className="font-medium text-sm">
                                    {isPending
                                        ? step === 'approve'
                                            ? 'Approving USDT...'
                                            : actionType === 'mint'
                                                ? 'Minting Tokens...'
                                                : 'Burning Tokens...'
                                        : step === 'approve'
                                            ? 'USDT Approved! Click Invest again to mint.'
                                            : actionType === 'mint'
                                                ? 'Tokens Minted Successfully!'
                                                : 'Tokens Burned Successfully!'}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1 break-all">
                                    Tx: {hash.slice(0, 10)}...{hash.slice(-8)}
                                </p>
                                <a
                                    href={`https://sepolia.mantlescan.xyz/tx/${hash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-primary hover:underline mt-1 inline-block"
                                >
                                    View on Explorer →
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}