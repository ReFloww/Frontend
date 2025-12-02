import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Info, TrendingUp, Coins, Loader2, CheckCircle2 } from 'lucide-react';

interface SellTabProps {
    sellAmount: string;
    sellReceiveAmount: string;
    p2pBalance: string;
    isConnected: boolean;
    isPending: boolean;
    isSuccess: boolean;
    symbol: string;
    platformFee: number;
    isSellAmountExceedingBalance: () => boolean;
    handleSellAmountChange: (value: string) => void;
    calculateFee: (amount: string) => string;
    handleWithdraw: () => void;
}

export default function SellTab({
    sellAmount,
    sellReceiveAmount,
    p2pBalance,
    isConnected,
    isPending,
    isSuccess,
    symbol,
    platformFee,
    isSellAmountExceedingBalance,
    handleSellAmountChange,
    calculateFee,
    handleWithdraw,
}: SellTabProps) {
    return (
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
                        className={`pr-20 h-14 text-lg ${isSellAmountExceedingBalance() ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    />
                    {isConnected && parseFloat(p2pBalance) > 0 && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSellAmountChange(p2pBalance)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 text-xs font-semibold text-primary hover:text-primary hover:bg-primary/10"
                        >
                            MAX
                        </Button>
                    )}
                </div>
                {isSellAmountExceedingBalance() && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                        Insufficient {symbol} balance
                    </p>
                )}
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
                disabled={!isConnected || !sellAmount || parseFloat(sellAmount) <= 0 || isPending || isSellAmountExceedingBalance()}
            >
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sell Tokens...
                    </>
                ) : isSuccess ? (
                    <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Tokens Sell
                    </>
                ) : !isConnected ? (
                    'Connect Wallet'
                ) : (
                    'SELL '
                )}
            </Button>
        </TabsContent>
    );
}
