import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Info, TrendingUp, Coins, Loader2, CheckCircle2 } from 'lucide-react';

interface BuyTabProps {
    buyAmount: string;
    buyReceiveAmount: string;
    usdtBalance: string;
    isConnected: boolean;
    isPending: boolean;
    isSuccess: boolean;
    step: 'input' | 'approve' | 'confirm';
    symbol: string;
    platformFee: number;
    availableSupply: number;
    isBuyAmountExceedingBalance: () => boolean;
    isBuyAmountExceedingSupply: () => boolean;
    handleBuyAmountChange: (value: string) => void;
    calculateFee: (amount: string) => string;
    handleInvest: () => void;
}

export default function BuyTab({
    buyAmount,
    buyReceiveAmount,
    usdtBalance,
    isConnected,
    isPending,
    isSuccess,
    step,
    symbol,
    platformFee,
    availableSupply,
    isBuyAmountExceedingBalance,
    isBuyAmountExceedingSupply,
    handleBuyAmountChange,
    calculateFee,
    handleInvest,
}: BuyTabProps) {
    return (
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
                        className={`pr-20 h-14 text-lg ${isBuyAmountExceedingBalance() ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    />
                    {isConnected && parseFloat(usdtBalance) > 0 && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleBuyAmountChange(usdtBalance)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 text-xs font-semibold text-primary hover:text-primary hover:bg-primary/10"
                        >
                            MAX
                        </Button>
                    )}
                </div>
                {isBuyAmountExceedingBalance() && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                        Insufficient USDT balance
                    </p>
                )}
                {isBuyAmountExceedingSupply() && !isBuyAmountExceedingBalance() && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                        Exceeds available supply ({availableSupply.toLocaleString(undefined, { maximumFractionDigits: 2 })} tokens remaining)
                    </p>
                )}
            </div>

            {/* Transaction Details */}
            {buyAmount && parseFloat(buyAmount) > 0 && (
                <>
                    <Separator />
                    <div className="space-y-3">
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
                disabled={!isConnected || !buyAmount || parseFloat(buyAmount) <= 0 || isPending || isBuyAmountExceedingBalance() || isBuyAmountExceedingSupply()}
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
    );
}
