import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Info, TrendingUp, Loader2, CheckCircle2 } from 'lucide-react';

interface DepositTabProps {
    depositAmount: string;
    usdtBalance: string;
    isConnected: boolean;
    isPending: boolean;
    isSuccess: boolean;
    step: 'input' | 'approve' | 'confirm';
    managerName: string;
    sharePrice: string;
    isDepositAmountExceedingBalance: () => boolean;
    handleDepositAmountChange: (value: string) => void;
    calculateShares: (amount: string) => { shares: string; formattedShares: string };
    handleDeposit: () => void;
}

export default function DepositTab({
    depositAmount,
    usdtBalance,
    isConnected,
    isPending,
    isSuccess,
    step,
    managerName,
    sharePrice,
    isDepositAmountExceedingBalance,
    handleDepositAmountChange,
    calculateShares,
    handleDeposit,
}: DepositTabProps) {
    const sharesData = depositAmount ? calculateShares(depositAmount) : null;

    return (
        <TabsContent value="deposit" className="space-y-4 mt-4">
            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <label className="text-muted-foreground">Deposit Amount</label>
                    <span className="text-xs text-muted-foreground">
                        {isConnected ? `USDT Balance: $${usdtBalance}` : 'Connect wallet to see balance'}
                    </span>
                </div>
                <div className="relative">
                    <Input
                        type="number"
                        placeholder="Input amount"
                        value={depositAmount}
                        onChange={(e) => handleDepositAmountChange(e.target.value)}
                        className={`pr-20 h-14 text-lg ${isDepositAmountExceedingBalance() ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    />
                    {isConnected && parseFloat(usdtBalance) > 0 && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDepositAmountChange(usdtBalance)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 text-xs font-semibold text-primary hover:text-primary hover:bg-primary/10"
                        >
                            MAX
                        </Button>
                    )}
                </div>
                {isDepositAmountExceedingBalance() && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                        Insufficient USDT balance
                    </p>
                )}
            </div>

            {sharesData && parseFloat(depositAmount) > 0 && (
                <>
                    <div className="flex items-center justify-between text-sm py-3 border-t">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <TrendingUp className="h-3.5 w-3.5" />
                            <span>Shares</span>
                        </div>
                        <span className="font-medium font-mono text-lg">{sharesData.formattedShares}</span>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-xs text-blue-900 dark:text-blue-100">
                            Your USDT will be managed by {managerName} and converted to shares
                        </span>
                    </div>
                </>
            )}

            <Button
                className="w-full h-12 text-base bg-[#225B3A] hover:bg-[#1C4A30] cursor-pointer"
                size="lg"
                onClick={handleDeposit}
                disabled={!isConnected || !depositAmount || parseFloat(depositAmount) <= 0 || isPending || isDepositAmountExceedingBalance()}
            >
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {step === 'approve' ? 'Approving USDT...' : 'Depositing...'}
                    </>
                ) : isSuccess ? (
                    <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Deposited!
                    </>
                ) : !isConnected ? (
                    'Connect Wallet'
                ) : (
                    'Deposit USDT'
                )}
            </Button>
        </TabsContent>
    );
}
