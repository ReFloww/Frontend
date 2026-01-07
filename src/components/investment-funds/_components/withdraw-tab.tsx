import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Info, TrendingUp, Loader2, CheckCircle2 } from 'lucide-react';

interface WithdrawTabProps {
    withdrawAmount: string;
    userDeposit: string;
    isConnected: boolean;
    isPending: boolean;
    isSuccess: boolean;
    managerName: string;
    sharePrice: string;
    isWithdrawAmountExceedingBalance: () => boolean;
    handleWithdrawAmountChange: (value: string) => void;
    calculateShares: (amount: string) => { shares: string; formattedShares: string };
    handleWithdraw: () => void;
}

export default function WithdrawTab({
    withdrawAmount,
    userDeposit,
    isConnected,
    isPending,
    isSuccess,
    managerName,
    sharePrice,
    isWithdrawAmountExceedingBalance,
    handleWithdrawAmountChange,
    calculateShares,
    handleWithdraw,
}: WithdrawTabProps) {
    const sharesData = withdrawAmount ? calculateShares(withdrawAmount) : null;

    return (
        <TabsContent value="withdraw" className="space-y-4 mt-4">
            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <label className="text-muted-foreground">Withdraw Amount</label>
                    <span className="text-xs text-muted-foreground">
                        {isConnected ? `Deposit Balance: $${userDeposit}` : 'Connect wallet to see balance'}
                    </span>
                </div>
                <div className="relative">
                    <Input
                        type="number"
                        placeholder="Input amount"
                        value={withdrawAmount}
                        onChange={(e) => handleWithdrawAmountChange(e.target.value)}
                        className={`pr-20 h-14 text-lg ${isWithdrawAmountExceedingBalance() ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    />
                    {isConnected && parseFloat(userDeposit) > 0 && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleWithdrawAmountChange(userDeposit)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 text-xs font-semibold text-primary hover:text-primary hover:bg-primary/10"
                        >
                            MAX
                        </Button>
                    )}
                </div>
                {isWithdrawAmountExceedingBalance() && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                        Insufficient deposit balance
                    </p>
                )}
            </div>

            {sharesData && parseFloat(withdrawAmount) > 0 && (
                <>
                    <div className="flex items-center justify-between text-sm py-3 border-t">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <TrendingUp className="h-3.5 w-3.5" />
                            <span>Shares</span>
                        </div>
                        <span className="font-medium font-mono text-lg">{sharesData.formattedShares}</span>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                        <Info className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-xs text-amber-900 dark:text-amber-100">
                            Your shares in {managerName} will be burned and you'll receive USDT
                        </span>
                    </div>
                </>
            )}

            <Button
                className="w-full h-12 text-base cursor-pointer hover:bg-red-600 hover:border-red-600 hover:text-white hover:brightness-90"
                size="lg"
                variant="outline"
                onClick={handleWithdraw}
                disabled={!isConnected || !withdrawAmount || parseFloat(withdrawAmount) <= 0 || isPending || isWithdrawAmountExceedingBalance()}
            >
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Withdrawing...
                    </>
                ) : isSuccess ? (
                    <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Withdrawn
                    </>
                ) : !isConnected ? (
                    'Connect Wallet'
                ) : (
                    'Withdraw USDT'
                )}
            </Button>
        </TabsContent>
    );
}
