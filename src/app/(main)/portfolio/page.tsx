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
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

// Mock data for portfolio positions
const portfolioPositions = [
  { asset: 'Real Estate Token', supplied: '5,000', earned: '425', apy: '8.5%', trend: 'up' },
  { asset: 'Invoice Financing', supplied: '3,200', earned: '394', apy: '12.3%', trend: 'up' },
  { asset: 'Equipment Lease', supplied: '8,500', earned: '612', apy: '7.2%', trend: 'down' },
];

export default function PortfolioPage() {
  return (
    <div className="space-y-8">
      {/* Portfolio Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Supplied</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$16,700.00</div>
            <p className="text-xs text-muted-foreground">
              Across 3 positions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">$1,431.00</div>
            <p className="text-xs text-muted-foreground">
              All-time earnings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average APY</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9.3%</div>
            <p className="text-xs text-muted-foreground">
              Weighted average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Positions Table */}
      <Card>
        <CardHeader>
          <CardTitle>My Positions</CardTitle>
          <CardDescription>
            View and manage your active lending positions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Supplied</TableHead>
                <TableHead>Earned</TableHead>
                <TableHead>APY</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolioPositions.map((position) => (
                <TableRow key={position.asset}>
                  <TableCell className="font-medium">{position.asset}</TableCell>
                  <TableCell>${position.supplied}</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">
                    +${position.earned}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {position.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                      )}
                      <span className="font-semibold">{position.apy}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">Manage</Button>
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
