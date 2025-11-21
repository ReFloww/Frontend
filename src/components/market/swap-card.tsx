'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowDownUp, Info } from 'lucide-react';

export default function SwapCard() {
  const [buyAmount, setBuyAmount] = useState('');
  const [buyReceiveAmount, setBuyReceiveAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [sellReceiveAmount, setSellReceiveAmount] = useState('');

  // Mock exchange rate
  const exchangeRate = 1.5;

  const handleBuyAmountChange = (value: string) => {
    setBuyAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setBuyReceiveAmount((numValue * exchangeRate).toFixed(2));
    } else {
      setBuyReceiveAmount('');
    }
  };

  const handleSellAmountChange = (value: string) => {
    setSellAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setSellReceiveAmount((numValue / exchangeRate).toFixed(2));
    } else {
      setSellReceiveAmount('');
    }
  };

  return (
    <Card className="max-w-md mx-auto border-2">
      <CardHeader>
        <CardTitle className="text-2xl text-center">SWAP</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>

          {/* Buy Tab */}
          <TabsContent value="buy" className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="text-muted-foreground">You pay</label>
                <span className="text-xs text-muted-foreground">Balance: 1,000 RSF</span>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.0"
                  value={buyAmount}
                  onChange={(e) => handleBuyAmountChange(e.target.value)}
                  className="pr-16 h-14 text-lg"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-bold">R</span>
                    </div>
                    <span className="font-semibold text-sm">RSF</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center -my-2">
              <div className="bg-muted rounded-full p-2 border-4 border-background">
                <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="text-muted-foreground">You receive</label>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.0"
                  value={buyReceiveAmount}
                  readOnly
                  className="pr-16 h-14 text-lg bg-muted/50"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-xs font-bold">T</span>
                    </div>
                    <span className="font-semibold text-sm">TOKEN</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Rate: 1 RSF = {exchangeRate} TOKEN
              </span>
            </div>

            <Button className="w-full h-12 text-base" size="lg">
              Buy with RSF
            </Button>
          </TabsContent>

          {/* Sell Tab */}
          <TabsContent value="sell" className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="text-muted-foreground">You pay</label>
                <span className="text-xs text-muted-foreground">Balance: 500 TOKEN</span>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.0"
                  value={sellAmount}
                  onChange={(e) => handleSellAmountChange(e.target.value)}
                  className="pr-16 h-14 text-lg"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-xs font-bold">T</span>
                    </div>
                    <span className="font-semibold text-sm">TOKEN</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center -my-2">
              <div className="bg-muted rounded-full p-2 border-4 border-background">
                <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="text-muted-foreground">You receive</label>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.0"
                  value={sellReceiveAmount}
                  readOnly
                  className="pr-16 h-14 text-lg bg-muted/50"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-bold">R</span>
                    </div>
                    <span className="font-semibold text-sm">RSF</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Rate: 1 TOKEN = {(1 / exchangeRate).toFixed(3)} RSF
              </span>
            </div>

            <Button className="w-full h-12 text-base" size="lg">
              Sell for RSF
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
