'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useTokenP2P } from '@/hooks/useTokenP2P';
import BuyTab from './_components/buytab';
import SellTab from './_components/selltab';

interface TradeCardProps {
    maxAmount?: number;
    onAmountChange?: (amount: string) => void;
    symbol?: string;
    /** The unique P2P token contract address for this specific product */
    tokenP2PAddress: `0x${string}`;
    /** Default tab to show ('buy' or 'sell') */
    defaultTab?: 'buy' | 'sell';
}

export default function TradeCard({
    // maxAmount = 1000000,
    onAmountChange,
    symbol = 'TOKEN',
    tokenP2PAddress,
    defaultTab = 'buy',
}: TradeCardProps) {
    const [buyAmount, setBuyAmount] = useState('');
    const [buyReceiveAmount, setBuyReceiveAmount] = useState('');
    const [sellAmount, setSellAmount] = useState('');
    const [sellReceiveAmount, setSellReceiveAmount] = useState('');
    const [step, setStep] = useState<'input' | 'approve' | 'confirm'>('input');
    const [actionType, setActionType] = useState<'mint' | 'burn'>('mint');
    const [isApproving, setIsApproving] = useState(false);

    // Use the TokenP2P hook with the SPECIFIC product's P2P token contract address
    // Each product has its own unique contract, so balances and interactions are product-specific
    const {
        usdtBalance,
        p2pBalance,
        tokenPrice,
        maxSupply,
        totalSupply,
        isConnected,
        isPending,
        isSuccess,
        hash,
        needsApproval,
        approveUSDT,
        buyTokens,
        sellTokens,
    } = useTokenP2P({ tokenP2PAddress });

    // Calculate available supply (how many tokens can still be minted)
    const availableSupply = parseFloat(maxSupply) - parseFloat(totalSupply);

    // Mock exchange rate and fees
    const platformFee = 0.5; // 0.5% platform fee
    const slippage = 0.1; // 0.1% slippage tolerance

    // Auto-proceed to buying after approval succeeds
    useEffect(() => {
        if (isSuccess && isApproving) {
            setIsApproving(false);
            setStep('confirm');
            // Automatically proceed to buying tokens
            buyTokens(buyAmount);
        }
    }, [isSuccess, isApproving, buyAmount, buyTokens]);

    // Reset form after mint/burn transaction succeeds
    useEffect(() => {
        if (isSuccess && !isApproving && step === 'confirm') {
            setStep('input');
            setBuyAmount('');
            setSellAmount('');
            setBuyReceiveAmount('');
            setSellReceiveAmount('');
        }
    }, [isSuccess, isApproving, step]);

    const handleBuyAmountChange = (value: string) => {
        setBuyAmount(value);

        if (onAmountChange) {
            onAmountChange(value);
        }

        // Calculate tokens to receive based on token price
        // Tokens = USDT amount / token price
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue > 0 && tokenPrice > 0) {
            const tokensToReceive = numValue / tokenPrice;
            setBuyReceiveAmount(tokensToReceive.toFixed(2));
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
        if (needsApproval(buyAmount)) {
            setIsApproving(true);
            setStep('approve');
            approveUSDT(buyAmount);
        } else {
            // Already approved, proceed directly to buying
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
        if (isNaN(numValue)) return '0';
        return (numValue * platformFee / 100).toFixed(2);
    };

    // Check if amount is Exceeding Balance
    const isBuyAmountExceedingBalance = () => {
        if (!buyAmount || !isConnected) return false;
        return parseFloat(buyAmount) > parseFloat(usdtBalance);
    };

    // Check if tokens to buy exceeds available supply
    const isBuyAmountExceedingSupply = () => {
        if (!buyReceiveAmount || !isConnected) return false;
        return parseFloat(buyReceiveAmount) > availableSupply;
    };

    const isSellAmountExceedingBalance = () => {
        if (!sellAmount || !isConnected) return false;
        return parseFloat(sellAmount) > parseFloat(p2pBalance);
    };

    // Clear inputs when switching tabs
    const handleTabChange = (value: string) => {
        if (value === 'buy') {
            // Clear sell inputs when switching to buy tab
            setSellAmount('');
            setSellReceiveAmount('');
        } else if (value === 'sell') {
            // Clear buy inputs when switching to sell tab
            setBuyAmount('');
            setBuyReceiveAmount('');
        }
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
                <Tabs defaultValue={defaultTab} className="w-full" onValueChange={handleTabChange}>
                    <TabsList className="grid w-full grid-cols-2 ">
                        <TabsTrigger value="buy" className="cursor-pointer ">Invest</TabsTrigger>
                        <TabsTrigger value="sell" className="cursor-pointer">Redeem</TabsTrigger>
                    </TabsList>

                    <BuyTab
                        buyAmount={buyAmount}
                        buyReceiveAmount={buyReceiveAmount}
                        usdtBalance={usdtBalance}
                        isConnected={isConnected}
                        isPending={isPending}
                        isSuccess={isSuccess}
                        step={step}
                        symbol={symbol}
                        platformFee={platformFee}
                        availableSupply={availableSupply}
                        isBuyAmountExceedingBalance={isBuyAmountExceedingBalance}
                        isBuyAmountExceedingSupply={isBuyAmountExceedingSupply}
                        handleBuyAmountChange={handleBuyAmountChange}
                        calculateFee={calculateFee}
                        handleInvest={handleInvest}
                    />

                    <SellTab
                        sellAmount={sellAmount}
                        sellReceiveAmount={sellReceiveAmount}
                        p2pBalance={p2pBalance}
                        isConnected={isConnected}
                        isPending={isPending}
                        isSuccess={isSuccess}
                        symbol={symbol}
                        platformFee={platformFee}
                        isSellAmountExceedingBalance={isSellAmountExceedingBalance}
                        handleSellAmountChange={handleSellAmountChange}
                        calculateFee={calculateFee}
                        handleWithdraw={handleWithdraw}
                    />
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
