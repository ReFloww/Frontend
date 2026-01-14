'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ExternalLink, History as HistoryIcon, CircleDollarSign, Loader2, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchTransactionHistory, fetchRepaymentHistory, TransactionHistoryItem, RepaymentHistoryItem } from '@/lib/api';

export default function HistoryPage() {
  const { address: userAddress, isConnected } = useAccount();

  const [transactionData, setTransactionData] = useState<TransactionHistoryItem[]>([]);
  const [repaymentData, setRepaymentData] = useState<RepaymentHistoryItem[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [loadingRepayments, setLoadingRepayments] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isConnected || !userAddress) {
      setLoadingTransactions(false);
      setLoadingRepayments(false);
      return;
    }

    // Fetch transaction history
    const loadTransactions = async () => {
      try {
        setLoadingTransactions(true);
        const data = await fetchTransactionHistory(userAddress);
        setTransactionData(data);
      } catch (err) {
        console.error('Error loading transactions:', err);
        setError('Failed to load transaction history');
      } finally {
        setLoadingTransactions(false);
      }
    };

    // Fetch repayment history
    const loadRepayments = async () => {
      try {
        setLoadingRepayments(true);
        const data = await fetchRepaymentHistory(userAddress);
        setRepaymentData(data);
      } catch (err) {
        console.error('Error loading repayments:', err);
        setError('Failed to load repayment history');
      } finally {
        setLoadingRepayments(false);
      }
    };

    loadTransactions();
    loadRepayments();
  }, [userAddress, isConnected]);

  // Helper function to format timestamp
  const formatDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleDateString();
  };

  // Helper function to format amount (convert from raw format with 6 decimals to readable format)
  const formatAmount = (amount: string) => {
    const num = BigInt(amount);
    const divisor = BigInt(10 ** 6); // USDT/USDC uses 6 decimals
    const result = Number(num) / Number(divisor);
    return result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Helper function to shorten address
  const shortenAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-12">
            <div className="text-center space-y-4">
              <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold">Wallet Not Connected</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Please connect your wallet to view transaction history
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <Tabs defaultValue="transaction" className="w-full">
          <CardHeader>
            <CardTitle>History</CardTitle>
            <CardDescription>
              View all your lending and Repayment transactions
            </CardDescription>

            {/* Custom Tabs List similar to Portfolio Analytics */}
            <TabsList className="flex w-full justify-start gap-8 bg-transparent p-0 rounded-none h-auto mt-4">
              <TabsTrigger
                value="transaction"
                className="relative flex-none rounded-none bg-transparent px-0 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none hover:text-foreground data-[state=active]:text-[#0A6A74] data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#0A6A74]"
              >
                <div className="flex items-center gap-2">
                  <HistoryIcon className="h-4 w-4" />
                  <span>Transaction History</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="repayment"
                className="relative flex-none rounded-none bg-transparent px-0 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none hover:text-foreground data-[state=active]:text-[#0A6A74] data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-[#0A6A74]"
              >
                <div className="flex items-center gap-2">
                  <CircleDollarSign className="h-4 w-4" />
                  <span>Repayment History</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="transaction" className="mt-0 border-0 p-0">
              {loadingTransactions ? (
                <div className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                  <p className="text-sm text-muted-foreground mt-2">Loading transactions...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12 text-destructive">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                  <p>{error}</p>
                </div>
              ) : transactionData.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No transaction history yet</p>
                  <p className="text-sm mt-2">
                    Your lending transactions will appear here
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Transaction Hash</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionData.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${tx.type === 'Supply' || tx.type === 'Mint'
                              ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                              }`}
                          >
                            {tx.type}
                          </span>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{shortenAddress(tx.from)}</TableCell>
                        <TableCell className="font-mono text-xs">{shortenAddress(tx.to)}</TableCell>
                        <TableCell>
                          {tx.amountIn !== '0' ? formatAmount(tx.amountIn) : formatAmount(tx.amountOut)} USDC
                        </TableCell>
                        <TableCell>
                          <a
                            href={`https://sepolia.mantlescan.xyz/tx/${tx.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:underline font-mono text-xs"
                          >
                            {shortenAddress(tx.transactionHash)}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(tx.timestamp)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
            <TabsContent value="repayment" className="mt-0 border-0 p-0">
              {loadingRepayments ? (
                <div className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                  <p className="text-sm text-muted-foreground mt-2">Loading repayments...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12 text-destructive">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                  <p>{error}</p>
                </div>
              ) : repaymentData.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No repayment history yet</p>
                  <p className="text-sm mt-2">
                    Your repayment transactions will appear here
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Repayment #</TableHead>
                      <TableHead>Principal</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead>Total Distributed</TableHead>
                      <TableHead>Transaction Hash</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {repaymentData.map((rep) => (
                      <TableRow key={rep.id}>
                        <TableCell>
                          <a
                            href={`https://sepolia.mantlescan.xyz/address/${rep.contractAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:underline font-mono text-xs"
                          >
                            {shortenAddress(rep.contractAddress)}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                            #{rep.repaymentNumber}
                          </span>
                        </TableCell>
                        <TableCell>{formatAmount(rep.principalPaid)} USDC</TableCell>
                        <TableCell>{formatAmount(rep.interestPaid)} USDC</TableCell>
                        <TableCell className="font-semibold">{formatAmount(rep.totalDistributed)} USDC</TableCell>
                        <TableCell>
                          <a
                            href={`https://sepolia.mantlescan.xyz/tx/${rep.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:underline font-mono text-xs"
                          >
                            {shortenAddress(rep.transactionHash)}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(rep.timestamp)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
