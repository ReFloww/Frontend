'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, ArrowUpNarrowWide, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { Product } from '@/lib/constants/product-market';
import { fetchProductRepayments, ProductRepaymentItem } from '@/lib/api';

interface ProductAnalyticsProps {
    product: Product;
    totalSupply?: string;
    maxSupply?: string;
    tokenPrice?: number;
}

export default function ProductAnalytics({ product, totalSupply = '0', maxSupply = '0', tokenPrice = 1 }: ProductAnalyticsProps) {
    const [repayments, setRepayments] = useState<ProductRepaymentItem[]>([]);
    const [loadingRepayments, setLoadingRepayments] = useState(false);
    const [repaymentError, setRepaymentError] = useState<string | null>(null);

    // Fetch repayment records when switching to repayment tab
    const handleTabChange = (value: string) => {
        if (value === 'repayment' && repayments.length === 0 && !loadingRepayments) {
            loadRepayments();
        }
    };

    const loadRepayments = async () => {
        try {
            setLoadingRepayments(true);
            setRepaymentError(null);
            const data = await fetchProductRepayments(product.id);
            setRepayments(data);
        } catch (err) {
            console.error('Error loading repayments:', err);
            setRepaymentError('Failed to load repayment records');
        } finally {
            setLoadingRepayments(false);
        }
    };

    // Format timestamp to date
    const formatDate = (timestamp: string) => {
        const date = new Date(parseInt(timestamp) * 1000);
        return date.toLocaleDateString();
    };

    // Format amount (convert from raw format with 6 decimals)
    const formatAmount = (amount: string) => {
        const num = BigInt(amount);
        const divisor = BigInt(10 ** 6);
        const result = Number(num) / Number(divisor);
        return result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // Shorten transaction hash
    const shortenHash = (hash: string) => {
        if (!hash) return '';
        return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
    };

    return (
        <Card className="border-2">
            <CardHeader>
                <CardTitle>Product Analytics</CardTitle>
                <CardDescription>View detailed information about this product</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="overview" className="w-full" onValueChange={handleTabChange}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="overview" className="cursor-pointer">Overview</TabsTrigger>
                        <TabsTrigger value="repayment" className="cursor-pointer">Repayment Record</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                        {/* Nested tabs for Investment and Net Yield */}
                        <Tabs defaultValue="investment" className="w-full">
                            <TabsList>
                                <TabsTrigger value="investment" className="cursor-pointer">
                                    <TrendingUp className="h-4 w-4 mr-2" />
                                    Investment
                                </TabsTrigger>
                                <TabsTrigger value="nav" className="cursor-pointer">
                                    <ArrowUpNarrowWide className="h-4 w-4 mr-2" />
                                    Net Yield
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="investment" className="mt-4">
                                <div className="space-y-6">
                                    {/* Investment Stats */}
                                    {(() => {
                                        // Calculate real investment from totalSupply * tokenPrice
                                        const totalInvested = parseFloat(totalSupply) * tokenPrice;
                                        const maxInvestment = parseFloat(maxSupply) * tokenPrice;
                                        const investmentPercentage = maxInvestment > 0 ? (totalInvested / maxInvestment) * 100 : 0;
                                        
                                        return (
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">Total Investment</p>
                                                <p className="text-3xl font-bold">
                                                    ${totalInvested.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                                    <span className="text-lg text-muted-foreground font-normal">
                                                        {' '}/ ${maxInvestment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                                    </span>
                                                </p>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {investmentPercentage.toFixed(1)}% of fundraising goal
                                                </p>
                                            </div>
                                        );
                                    })()}

                                    {/* Investment Chart */}
                                    <div className="relative w-full h-64">
                                        <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                                            <defs>
                                                <linearGradient id="investmentGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                                                    <stop offset="0%" stopColor="rgba(10, 106, 116, 0.1)" />
                                                    <stop offset="50%" stopColor="rgba(10, 106, 116, 0.3)" />
                                                    <stop offset="100%" stopColor="rgba(10, 106, 116, 0.05)" />
                                                </linearGradient>
                                            </defs>

                                            {/* Area chart path */}
                                            <path
                                                d="M 0 200 L 0 180 Q 50 160, 100 140 T 200 110 T 300 90 T 400 100 L 400 200 Z"
                                                fill="url(#investmentGradient)"
                                            />

                                            {/* Line on top of area */}
                                            <path
                                                d="M 0 180 Q 50 160, 100 140 T 200 110 T 300 90 T 400 100"
                                                fill="none"
                                                stroke="rgba(10, 106, 116, 0.6)"
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="nav" className="mt-4">
                                <div className="space-y-6">
                                    {/* Title */}
                                    <h3 className="text-center text-lg font-semibold">Monthly Annualized Net Yields</h3>

                                    {/* Net Yield Chart */}
                                    <div className="relative w-full h-64">
                                        <svg className="w-full h-full" viewBox="0 0 800 350">
                                            <defs>
                                                <linearGradient id="yieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" stopColor="rgba(10, 106, 116, 0.4)" />
                                                    <stop offset="100%" stopColor="rgba(10, 106, 116, 0.05)" />
                                                </linearGradient>
                                            </defs>

                                            {/* Horizontal grid lines for Y-axis */}
                                            {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20].map((value) => {
                                                const y = 300 - (value * 13);
                                                return (
                                                    <line
                                                        key={`h-grid-${value}`}
                                                        x1="50"
                                                        y1={y}
                                                        x2="800"
                                                        y2={y}
                                                        stroke="rgba(200, 200, 200, 0.3)"
                                                        strokeWidth="1"
                                                    />
                                                );
                                            })}

                                            {/* Vertical grid lines for X-axis */}
                                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => {
                                                const x = 80 + (index * 60);
                                                return (
                                                    <line
                                                        key={`v-grid-${month}`}
                                                        x1={x}
                                                        y1="40"
                                                        x2={x}
                                                        y2="300"
                                                        stroke="rgba(200, 200, 200, 0.3)"
                                                        strokeWidth="1"
                                                    />
                                                );
                                            })}

                                            {/* Y-axis labels (0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20) */}
                                            {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20].map((value) => {
                                                const y = 300 - (value * 13);
                                                return (
                                                    <text
                                                        key={value}
                                                        x="30"
                                                        y={y + 5}
                                                        fontSize="12"
                                                        fill="currentColor"
                                                        className="text-muted-foreground"
                                                        textAnchor="end"
                                                    >
                                                        {value}%
                                                    </text>
                                                );
                                            })}

                                            {/* X-axis labels (Jan-Dec) */}
                                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => {
                                                const x = 80 + (index * 60);
                                                return (
                                                    <text
                                                        key={month}
                                                        x={x}
                                                        y="330"
                                                        fontSize="12"
                                                        fill="currentColor"
                                                        className="text-muted-foreground"
                                                        textAnchor="middle"
                                                    >
                                                        {month}
                                                    </text>
                                                );
                                            })}

                                            {/* Dotted horizontal line at 10% */}
                                            <line
                                                x1="50"
                                                y1="170"
                                                x2="800"
                                                y2="170"
                                                stroke="rgba(100, 100, 100, 0.4)"
                                                strokeWidth="1.5"
                                                strokeDasharray="5,5"
                                            />

                                            {/* Mock data points (fluctuating between 8-12%) */}
                                            {(() => {
                                                const yieldValues = [9.5, 11, 10.5, 9, 11.5, 10, 9.5, 11, 10.5, 12, 10, 9];
                                                const points = yieldValues.map((value, index) => {
                                                    const x = 80 + (index * 60);
                                                    const y = 300 - (value * 13);
                                                    return `${x},${y}`;
                                                });

                                                const pathData = `M ${points.join(' L ')}`;
                                                const areaData = `M 80,300 L ${points.join(' L ')} L 740,300 Z`;

                                                return (
                                                    <>
                                                        <path d={areaData} fill="url(#yieldGradient)" />
                                                        <path
                                                            d={pathData}
                                                            fill="none"
                                                            stroke="rgba(10, 106, 116, 0.8)"
                                                            strokeWidth="3"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        {points.map((point, index) => {
                                                            const [x, y] = point.split(',').map(Number);
                                                            return (
                                                                <circle
                                                                    key={index}
                                                                    cx={x}
                                                                    cy={y}
                                                                    r="4"
                                                                    fill="rgba(10, 106, 116, 1)"
                                                                    stroke="white"
                                                                    strokeWidth="2"
                                                                />
                                                            );
                                                        })}
                                                    </>
                                                );
                                            })()}
                                        </svg>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </TabsContent>

                    <TabsContent value="repayment" className="mt-6">
                        {loadingRepayments ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <span className="ml-2 text-muted-foreground">Loading repayment records...</span>
                            </div>
                        ) : repaymentError ? (
                            <div className="flex flex-col items-center justify-center py-12 text-destructive">
                                <AlertCircle className="h-8 w-8 mb-2" />
                                <p>{repaymentError}</p>
                            </div>
                        ) : repayments.length === 0 ? (
                            <div className="flex items-center justify-center py-12 text-muted-foreground">
                                No repayment records found for this product
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Repayment #</TableHead>
                                        <TableHead>Principal</TableHead>
                                        <TableHead>Interest</TableHead>
                                        <TableHead>Transaction Hash</TableHead>
                                        <TableHead>Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {repayments.map((rep, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                                                    #{rep.repaymentNumber}
                                                </span>
                                            </TableCell>
                                            <TableCell>{formatAmount(rep.principal)} USDC</TableCell>
                                            <TableCell>{formatAmount(rep.interestPaid)} USDC</TableCell>
                                            <TableCell>
                                                <a
                                                    href={`https://sepolia.mantlescan.xyz/tx/${rep.transactionHash}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-primary hover:underline font-mono text-xs"
                                                >
                                                    {shortenHash(rep.transactionHash)}
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
                </Tabs>
            </CardContent>
        </Card>
    );
}
