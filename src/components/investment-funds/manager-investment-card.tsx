'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useManagerInvestment } from '@/hooks/useAutoManage';
import DepositTab from './_components/deposit-tab';
import WithdrawTab from './_components/withdraw-tab';

interface ManagerInvestmentCardProps {
    managerAddress: `0x${string}`;
    managerName: string;
    sharePrice: string;
    defaultTab?: 'deposit' | 'withdraw';
}

export default function ManagerInvestmentCard({
    managerAddress,
    managerName,
    sharePrice,
    defaultTab = 'deposit',
}: ManagerInvestmentCardProps) {
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [step, setStep] = useState<'input' | 'approve' | 'confirm'>('input');
    const [isApproving, setIsApproving] = useState(false);

    const {
        usdtBalance,
        userDeposit,
        userShares,
        sharePrice: contractSharePrice,
        liquidFund,
        totalShares,
        isConnected,
        isWritePending,
        isConfirmed,
        hash,
        usdtAllowance,
        approveUsdt,
        deposit,
        withdraw,
    } = useManagerInvestment(managerAddress);

    useEffect(() => {
        if (isConfirmed && isApproving) {
            setIsApproving(false);
            setStep('confirm');
            deposit(depositAmount);
        }
    }, [isConfirmed, isApproving, depositAmount, deposit]);

    useEffect(() => {
        if (isConfirmed && !isApproving && step === 'confirm') {
            setStep('input');
            setDepositAmount('');
            setWithdrawAmount('');
        }
    }, [isConfirmed, isApproving, step]);

    const handleDepositAmountChange = (value: string) => {
        setDepositAmount(value);
    };

    const handleWithdrawAmountChange = (value: string) => {
        setWithdrawAmount(value);
    };

    const handleDeposit = () => {
        if (!depositAmount || parseFloat(depositAmount) <= 0) return;

        if (usdtAllowance < parseFloat(depositAmount)) {
            setIsApproving(true);
            setStep('approve');
            approveUsdt(depositAmount);
        } else {
            setStep('confirm');
            deposit(depositAmount);
        }
    };

    const handleWithdraw = () => {
        if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
        setStep('confirm');
        // withdrawAmount is in shares, pass directly to withdraw
        withdraw(withdrawAmount);
    };

    const calculateShares = (amount: string) => {
        const numValue = parseFloat(amount);
        if (isNaN(numValue)) return { shares: '0', formattedShares: '0' };

        const sharePriceRaw = parseFloat(sharePrice);
        const sharePriceNormalized = sharePriceRaw / 1000000;
        const shares = numValue / sharePriceNormalized;

        return {
            shares: shares.toString(),
            formattedShares: shares.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
            }),
        };
    };

    const isDepositAmountExceedingBalance = () => {
        if (!depositAmount || !isConnected) return false;
        return parseFloat(depositAmount) > parseFloat(usdtBalance.toString());
    };

    // Calculate max withdrawable shares based on liquid fund
    // Max shares = min(userShares, shares that can be covered by liquid fund)
    const getMaxWithdrawableShares = () => {
        if (totalShares === 0 || contractSharePrice === 0) return userShares;
        // Calculate how many shares can be withdrawn based on liquid fund
        // liquidFund is in USDT, sharePrice is USDT per share
        const sharesFromLiquid = liquidFund / contractSharePrice;
        return Math.min(userShares, sharesFromLiquid);
    };

    const maxWithdrawableShares = getMaxWithdrawableShares();

    const isWithdrawAmountExceedingBalance = () => {
        if (!withdrawAmount || !isConnected) return false;
        // Compare against max withdrawable (min of userShares and what liquid fund allows)
        return parseFloat(withdrawAmount) > maxWithdrawableShares;
    };

    const handleTabChange = (value: string) => {
        if (value === 'deposit') {
            setWithdrawAmount('');
        } else if (value === 'withdraw') {
            setDepositAmount('');
        }
    };

    const isPending = isWritePending;

    return (
        <Card className="border-2">
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <CardTitle>Invest in {managerName}</CardTitle>
                    <Badge className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 font-mono font-bold">
                        Manager
                    </Badge>
                </div>
                <CardDescription>
                    Let {managerName} manage your USDT investments
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue={defaultTab} className="w-full" onValueChange={handleTabChange}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="deposit" className="cursor-pointer">Invest</TabsTrigger>
                        <TabsTrigger value="withdraw" className="cursor-pointer">Withdraw</TabsTrigger>
                    </TabsList>

                    <DepositTab
                        depositAmount={depositAmount}
                        usdtBalance={usdtBalance.toString()}
                        isConnected={isConnected}
                        isPending={isPending}
                        isSuccess={isConfirmed}
                        step={step}
                        managerName={managerName}
                        sharePrice={sharePrice}
                        isDepositAmountExceedingBalance={isDepositAmountExceedingBalance}
                        handleDepositAmountChange={handleDepositAmountChange}
                        calculateShares={calculateShares}
                        handleDeposit={handleDeposit}
                    />

                    <WithdrawTab
                        withdrawAmount={withdrawAmount}
                        userShares={userShares.toString()}
                        userShareValue={userDeposit.toString()}
                        maxWithdrawableShares={maxWithdrawableShares.toString()}
                        liquidFund={liquidFund.toString()}
                        isConnected={isConnected}
                        isPending={isPending}
                        isSuccess={isConfirmed}
                        managerName={managerName}
                        sharePrice={sharePrice}
                        isWithdrawAmountExceedingBalance={isWithdrawAmountExceedingBalance}
                        handleWithdrawAmountChange={handleWithdrawAmountChange}
                        calculateShares={calculateShares}
                        handleWithdraw={handleWithdraw}
                    />
                </Tabs>

                {(isPending || isConfirmed) && hash && (
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
                                            : 'Processing Transaction...'
                                        : 'Transaction Completed!'}
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
