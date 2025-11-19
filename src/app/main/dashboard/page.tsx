'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DollarSign, TrendingUp, Wallet } from 'lucide-react';

// Mock data for market overview
const marketAssets = [
  { name: 'Real Estate Token', riskScore: 'Low', apy: '8.5%' },
  { name: 'Invoice Financing', riskScore: 'Medium', apy: '12.3%' },
  { name: 'Equipment Lease', riskScore: 'Low', apy: '7.2%' },
  { name: 'Supply Chain Finance', riskScore: 'Medium', apy: '10.8%' },
  { name: 'Art Collateral', riskScore: 'High', apy: '15.6%' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value Locked</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231,890</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current APY</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10.2%</div>
            <p className="text-xs text-muted-foreground">
              Average across all assets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Total Supply</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              Connect wallet to view
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Market Overview Table */}
      <Card>
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
          <CardDescription>
            Available lending opportunities across all networks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>APY</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marketAssets.map((asset) => (
                <TableRow key={asset.name}>
                  <TableCell className="font-medium">{asset.name}</TableCell>
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
                  <TableCell className="font-semibold text-green-600 dark:text-green-400">
                    {asset.apy}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm">Supply</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
