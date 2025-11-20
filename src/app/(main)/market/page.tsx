'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useState } from 'react';

// Mock data for market assets
const allAssets = [
  { name: 'Real Estate Token', category: 'Real Estate', totalLiquidity: '12.5M', apy: '8.5%', riskScore: 'Low', borrowers: 142 },
  { name: 'Invoice Financing', category: 'Trade Finance', totalLiquidity: '8.2M', apy: '12.3%', riskScore: 'Medium', borrowers: 89 },
  { name: 'Equipment Lease', category: 'Equipment', totalLiquidity: '15.7M', apy: '7.2%', riskScore: 'Low', borrowers: 203 },
  { name: 'Supply Chain Finance', category: 'Trade Finance', totalLiquidity: '6.3M', apy: '10.8%', riskScore: 'Medium', borrowers: 67 },
  { name: 'Art Collateral', category: 'Luxury Assets', totalLiquidity: '3.1M', apy: '15.6%', riskScore: 'High', borrowers: 28 },
  { name: 'Vehicle Fleet', category: 'Equipment', totalLiquidity: '9.4M', apy: '9.1%', riskScore: 'Low', borrowers: 156 },
];

export default function MarketPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssets = allAssets.filter(asset =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Market Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Market Size</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$55.2M</div>
            <p className="text-xs text-muted-foreground">
              +15.3% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Borrowers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">685</div>
            <p className="text-xs text-muted-foreground">
              Across all markets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Market APY</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10.6%</div>
            <p className="text-xs text-muted-foreground">
              Weighted average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Browse Markets</CardTitle>
          <CardDescription>
            Explore all available lending markets and opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search markets by name or category..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Markets</TabsTrigger>
              <TabsTrigger value="high-apy">High APY</TabsTrigger>
              <TabsTrigger value="low-risk">Low Risk</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Market</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Total Liquidity</TableHead>
                    <TableHead>APY</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Borrowers</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets.map((asset) => (
                    <TableRow key={asset.name}>
                      <TableCell className="font-medium">{asset.name}</TableCell>
                      <TableCell className="text-muted-foreground">{asset.category}</TableCell>
                      <TableCell>${asset.totalLiquidity}</TableCell>
                      <TableCell className="font-semibold text-green-600 dark:text-green-400">
                        {asset.apy}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            asset.riskScore === 'Low'
                              ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                              : asset.riskScore === 'Medium'
                              ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                              : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                          }`}
                        >
                          {asset.riskScore}
                        </span>
                      </TableCell>
                      <TableCell>{asset.borrowers}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="high-apy" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Market</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Total Liquidity</TableHead>
                    <TableHead>APY</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Borrowers</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets
                    .filter(asset => parseFloat(asset.apy) >= 10)
                    .sort((a, b) => parseFloat(b.apy) - parseFloat(a.apy))
                    .map((asset) => (
                      <TableRow key={asset.name}>
                        <TableCell className="font-medium">{asset.name}</TableCell>
                        <TableCell className="text-muted-foreground">{asset.category}</TableCell>
                        <TableCell>${asset.totalLiquidity}</TableCell>
                        <TableCell className="font-semibold text-green-600 dark:text-green-400">
                          {asset.apy}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              asset.riskScore === 'Low'
                                ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                : asset.riskScore === 'Medium'
                                ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                                : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                            }`}
                          >
                            {asset.riskScore}
                          </span>
                        </TableCell>
                        <TableCell>{asset.borrowers}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="low-risk" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Market</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Total Liquidity</TableHead>
                    <TableHead>APY</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Borrowers</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets
                    .filter(asset => asset.riskScore === 'Low')
                    .map((asset) => (
                      <TableRow key={asset.name}>
                        <TableCell className="font-medium">{asset.name}</TableCell>
                        <TableCell className="text-muted-foreground">{asset.category}</TableCell>
                        <TableCell>${asset.totalLiquidity}</TableCell>
                        <TableCell className="font-semibold text-green-600 dark:text-green-400">
                          {asset.apy}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                            {asset.riskScore}
                          </span>
                        </TableCell>
                        <TableCell>{asset.borrowers}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
