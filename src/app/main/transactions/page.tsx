'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const assets = [
  { id: '1', name: 'Real Estate Token', symbol: 'RET' },
  { id: '2', name: 'Invoice Financing', symbol: 'INV' },
  { id: '3', name: 'Equipment Lease', symbol: 'EQL' },
];

export default function TransactionsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Tabs defaultValue="supply" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="supply">Supply</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>

        <TabsContent value="supply">
          <Card>
            <CardHeader>
              <CardTitle>Supply Liquidity</CardTitle>
              <CardDescription>
                Provide liquidity to earn interest on your assets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="asset">Select Asset</Label>
                <Select>
                  <SelectTrigger id="asset">
                    <SelectValue placeholder="Choose an asset" />
                  </SelectTrigger>
                  <SelectContent>
                    {assets.map((asset) => (
                      <SelectItem key={asset.id} value={asset.id}>
                        {asset.name} ({asset.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                />
                <p className="text-sm text-muted-foreground">
                  Balance: 0.00 ETH
                </p>
              </div>

              <div className="rounded-lg bg-muted p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Expected APY</span>
                  <span className="font-medium">8.5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Network</span>
                  <span className="font-medium">Ethereum Sepolia</span>
                </div>
              </div>

              <Button className="w-full" size="lg">
                Connect Wallet to Supply
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw">
          <Card>
            <CardHeader>
              <CardTitle>Withdraw Liquidity</CardTitle>
              <CardDescription>
                Withdraw your supplied liquidity and earned interest
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="withdraw-asset">Select Asset</Label>
                <Select>
                  <SelectTrigger id="withdraw-asset">
                    <SelectValue placeholder="Choose an asset" />
                  </SelectTrigger>
                  <SelectContent>
                    {assets.map((asset) => (
                      <SelectItem key={asset.id} value={asset.id}>
                        {asset.name} ({asset.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="withdraw-amount">Amount</Label>
                <Input
                  id="withdraw-amount"
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                />
                <p className="text-sm text-muted-foreground">
                  Supplied: 0.00 ETH
                </p>
              </div>

              <div className="rounded-lg bg-muted p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Supplied</span>
                  <span className="font-medium">0.00 ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Interest Earned</span>
                  <span className="font-medium text-green-600">+0.00 ETH</span>
                </div>
              </div>

              <Button className="w-full" size="lg" variant="outline">
                Connect Wallet to Withdraw
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
