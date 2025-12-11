'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  Wallet,
  Sprout,
  Fish,
  TreePine,
  Shield,
  Target,
  BarChart3,
  Info,
  ExternalLink,
  ChevronRight,
  Loader2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useManagerInvestment } from '@/hooks/useAutoManage';
import { managerMetadata, defaultManagerMetadata, formatAUM, getRiskColor, getCategoryColor } from '@/lib/constants/manager-metadata';
import { useAccount } from 'wagmi';

export default function ManagerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const managerId = params.id as `0x${string}`;
  const { isConnected } = useAccount();

  // Use the hook to get manager data and actions
  const {
    name,
    owner,
    totalDeposits,
    userDeposit,
    usdtBalance,
    usdtAllowance,
    approveUsdt,
    deposit,
    withdraw,
    isWritePending,
    isConfirming,
    isConfirmed,
    writeError,
    refetch,
  } = useManagerInvestment(managerId);

  const [investAmount, setInvestAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [activeTab, setActiveTab] = useState('deposit');

  // Get off-chain metadata for this manager
  const addressLower = managerId?.toLowerCase() || '';
  const metadata = managerMetadata[addressLower] || defaultManagerMetadata;

  // Use displayName if available, fallback to on-chain name
  const displayName = metadata.displayName || name || 'Loading...';

  // Refetch data when transaction is confirmed
  useEffect(() => {
    if (isConfirmed) {
      refetch();
      setInvestAmount('');
      setWithdrawAmount('');
    }
  }, [isConfirmed, refetch]);

  // Check if we need approval
  const needsApproval = investAmount && parseFloat(investAmount) > usdtAllowance;

  // Handle deposit action
  const handleDeposit = async () => {
    if (!investAmount) return;

    if (needsApproval) {
      await approveUsdt(investAmount);
    } else {
      await deposit(investAmount);
    }
  };

  // Handle withdraw action
  const handleWithdraw = async () => {
    if (!withdrawAmount) return;
    await withdraw(withdrawAmount);
  };

  const isLoading = isWritePending || isConfirming;

  // Calculate estimated returns (mock data - would need actual historical data)
  const monthlyReturn = 1.8; // Mock monthly return percentage
  const estimatedReturn = investAmount
    ? (parseFloat(investAmount) * monthlyReturn / 100).toFixed(2)
    : '0.00';

  if (!managerId || !managerId.startsWith('0x')) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="mb-2 text-lg font-semibold">Invalid Manager Address</h3>
            <p className="mb-6 text-center text-sm text-muted-foreground">
              The manager address provided is not valid
            </p>
            <Button onClick={() => router.push('/auto-manage')}>
              Back to Auto Manage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.push('/auto-manage')}
        className="hover:scale-105 transition-transform cursor-pointer"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Auto Manage
      </Button>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={metadata.avatar}
                    alt={displayName}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-[#225B3A]">{displayName}</h1>
                    <Badge
                      variant="outline"
                      className={`${getRiskColor(metadata.riskLevel)} font-medium`}
                    >
                      {metadata.riskLevel}
                    </Badge>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-[#0A6A74]">
                      {formatAUM(totalDeposits)}
                    </span>
                    <span className="text-sm text-muted-foreground">Total AUM</span>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2 font-mono">
                    {managerId.slice(0, 6)}...{managerId.slice(-4)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Investment */}
          {isConnected && userDeposit > 0 && (
            <Card className="border-2 border-[#225B3A]/30 bg-[#225B3A]/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-[#225B3A]" />
                  Your Investment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Deposited Amount</p>
                    <p className="text-2xl font-bold text-[#225B3A]">
                      ${userDeposit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Your Share</p>
                    <p className="text-2xl font-bold text-[#0A6A74]">
                      {totalDeposits > 0 ? ((userDeposit / totalDeposits) * 100).toFixed(2) : '0.00'}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* About Section */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                This manager handles automated investment strategies for your portfolio.
                Your deposited funds will be allocated across various RWA products according to the manager's strategy.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-semibold">{metadata.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Max Profit Target</p>
                  <p className="font-semibold">{metadata.maxProfit}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Strategy */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-[#0A6A74]" />
                Investment Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The manager actively manages your portfolio by investing in tokenized real-world assets (RWAs)
                such as agricultural products, fisheries, and forestry. Returns are generated from the underlying
                asset performance and market appreciation.
              </p>
            </CardContent>
          </Card>

          {/* Products Managed */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Products Managed</CardTitle>
              <CardDescription>Current portfolio allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {metadata.products.map((product, index) => {
                  const ProductIcon = product.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getCategoryColor(product.category)}`}>
                          <ProductIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Action Card */}
        <div className="lg:sticky lg:top-6 lg:self-start space-y-6">
          {/* Invest/Withdraw Card */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Manage Investment</CardTitle>
              <CardDescription>Deposit or withdraw funds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isConnected ? (
                <div className="text-center py-6">
                  <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Connect your wallet to invest
                  </p>
                </div>
              ) : (
                <>
                  {/* Wallet Balance */}
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Your USDT Balance</p>
                    <p className="text-lg font-semibold">
                      ${usdtBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>

                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="deposit">Deposit</TabsTrigger>
                      <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                    </TabsList>

                    <TabsContent value="deposit" className="space-y-4 mt-4">
                      {/* Deposit Amount */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Deposit Amount (USDT)</label>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={investAmount}
                          onChange={(e) => setInvestAmount(e.target.value)}
                          className="h-12 text-lg"
                          disabled={isLoading}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Available: ${usdtBalance.toFixed(2)}</span>
                          <button
                            type="button"
                            className="text-[#0A6A74] hover:underline"
                            onClick={() => setInvestAmount(usdtBalance.toString())}
                          >
                            Max
                          </button>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="space-y-3 p-4 rounded-lg bg-muted/50">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Estimated Monthly Return</span>
                          <span className="font-semibold text-green-600">+${estimatedReturn}</span>
                        </div>
                        {needsApproval && (
                          <div className="flex items-center gap-2 text-sm text-orange-600">
                            <AlertCircle className="h-4 w-4" />
                            <span>Approval required for this amount</span>
                          </div>
                        )}
                      </div>

                      {/* Deposit Button */}
                      <Button
                        className="w-full h-12 text-base font-semibold bg-[#225B3A] hover:bg-[#1C4A30]"
                        onClick={handleDeposit}
                        disabled={isLoading || !investAmount || parseFloat(investAmount) <= 0 || parseFloat(investAmount) > usdtBalance}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isConfirming ? 'Confirming...' : 'Processing...'}
                          </>
                        ) : needsApproval ? (
                          'Approve USDT'
                        ) : (
                          'Deposit'
                        )}
                      </Button>
                    </TabsContent>

                    <TabsContent value="withdraw" className="space-y-4 mt-4">
                      {/* Withdraw Amount */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Withdraw Amount (USDT)</label>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          className="h-12 text-lg"
                          disabled={isLoading}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Deposited: ${userDeposit.toFixed(2)}</span>
                          <button
                            type="button"
                            className="text-[#0A6A74] hover:underline"
                            onClick={() => setWithdrawAmount(userDeposit.toString())}
                          >
                            Max
                          </button>
                        </div>
                      </div>

                      {/* Withdraw Button */}
                      <Button
                        className="w-full h-12 text-base font-semibold"
                        variant="outline"
                        onClick={handleWithdraw}
                        disabled={isLoading || !withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > userDeposit}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isConfirming ? 'Confirming...' : 'Processing...'}
                          </>
                        ) : (
                          'Withdraw'
                        )}
                      </Button>
                    </TabsContent>
                  </Tabs>

                  {/* Transaction Status */}
                  {writeError && (
                    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                      <p className="font-medium">Transaction Failed</p>
                      <p className="text-xs mt-1">{writeError.message}</p>
                    </div>
                  )}

                  {isConfirmed && (
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Transaction confirmed!</span>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* How it Works */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Info className="h-4 w-4" />
                How it works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                When you deposit funds, the manager allocates your USDT across various
                RWA investments. Returns are generated from the underlying assets and
                you can withdraw your funds at any time.
              </p>
              <Button variant="link" className="p-0 h-auto mt-2 text-[#0A6A74]">
                Learn more <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </CardContent>
          </Card>

          {/* Contract Info */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Contract Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Manager Contract</p>
                <p className="text-sm font-mono">
                  {managerId.slice(0, 10)}...{managerId.slice(-8)}
                </p>
              </div>
              {owner && (
                <div>
                  <p className="text-xs text-muted-foreground">Owner</p>
                  <p className="text-sm font-mono">
                    {owner.slice(0, 10)}...{owner.slice(-8)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
