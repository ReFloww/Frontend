'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, ArrowUpNarrowWide } from 'lucide-react';
import { Product } from '@/lib/constants/product-market';

interface ProductAnalyticsProps {
    product: Product;
}

export default function ProductAnalytics({ product }: ProductAnalyticsProps) {
    return (
        <Card className="border-2">
            <CardHeader>
                <CardTitle>Product Analytics</CardTitle>
                <CardDescription>View detailed information about this product</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="overview" className="w-full">
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
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Total Investment</p>
                                        <p className="text-3xl font-bold">
                                            ${(product.loanAmount * 0.65).toLocaleString()}
                                            <span className="text-lg text-muted-foreground font-normal">
                                                {' '}/ ${product.loanAmount.toLocaleString()}
                                            </span>
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {((product.loanAmount * 0.65 / product.loanAmount) * 100).toFixed(1)}% of fundraising goal
                                        </p>
                                    </div>

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
                                                const y = 300 - (value * 13); // Scale: 0% at y=300, 20% at y=40
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
                                                // Y values between 8-12%: [9.5, 11, 10.5, 9, 11.5, 10, 9.5, 11, 10.5, 12, 10, 9]
                                                const yieldValues = [9.5, 11, 10.5, 9, 11.5, 10, 9.5, 11, 10.5, 12, 10, 9];
                                                const points = yieldValues.map((value, index) => {
                                                    const x = 80 + (index * 60);
                                                    const y = 300 - (value * 13); // Scale: each 1% = 13 pixels
                                                    return `${x},${y}`;
                                                });

                                                const pathData = `M ${points.join(' L ')}`;

                                                // Create area path (same as line but closed at bottom)
                                                const areaData = `M 80,300 L ${points.join(' L ')} L 740,300 Z`;

                                                return (
                                                    <>
                                                        {/* Area with gradient */}
                                                        <path
                                                            d={areaData}
                                                            fill="url(#yieldGradient)"
                                                        />

                                                        {/* Line */}
                                                        <path
                                                            d={pathData}
                                                            fill="none"
                                                            stroke="rgba(10, 106, 116, 0.8)"
                                                            strokeWidth="3"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />

                                                        {/* Data points */}
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
                        <div className="flex items-center justify-center py-12 text-muted-foreground">
                            Repayment records will be displayed here
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
