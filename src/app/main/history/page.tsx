'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for transaction history
const historyData = [
  {
    id: '1',
    type: 'Supply',
    asset: 'Real Estate Token',
    amount: '100.00 USDC',
    hash: '0x1234...5678',
    date: '2025-01-15',
    explorerUrl: 'https://sepolia.etherscan.io/tx/0x1234',
  },
  {
    id: '2',
    type: 'Withdraw',
    asset: 'Invoice Financing',
    amount: '50.00 USDC',
    hash: '0xabcd...efgh',
    date: '2025-01-14',
    explorerUrl: 'https://sepolia.etherscan.io/tx/0xabcd',
  },
  {
    id: '3',
    type: 'Supply',
    asset: 'Equipment Lease',
    amount: '250.00 USDC',
    hash: '0x9876...5432',
    date: '2025-01-13',
    explorerUrl: 'https://sepolia.etherscan.io/tx/0x9876',
  },
];

export default function HistoryPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            View all your lending and withdrawal transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {historyData.length === 0 ? (
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
                  <TableHead>Asset</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Transaction Hash</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyData.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          tx.type === 'Supply'
                            ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                        }`}
                      >
                        {tx.type}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">{tx.asset}</TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell>
                      <a
                        href={tx.explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        {tx.hash}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(tx.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
