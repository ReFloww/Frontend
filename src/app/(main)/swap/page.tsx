'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArrowLeftRight, ArrowDownUp, ChevronDown, Sprout, Fish, TreePine } from 'lucide-react';

// Mock token data from market products
const availableTokens = [
  {
    id: '1',
    ticker: 'GVF',
    name: 'Green Valley Farms',
    sector: 'Agriculture',
    icon: Sprout,
    color: '#16A34A',
  },
  {
    id: '2',
    ticker: 'OHC',
    name: 'Ocean Harvest Co.',
    sector: 'Fisheries',
    icon: Fish,
    color: '#0EA5E9',
  },
  {
    id: '3',
    ticker: 'TWL',
    name: 'Timber Works Ltd',
    sector: 'Forestry',
    icon: TreePine,
    color: '#8B5CF6',
  },
  {
    id: '4',
    ticker: 'RSF',
    name: 'ReFlow Stable',
    sector: 'Stablecoin',
    icon: ArrowLeftRight,
    color: '#0A6A74',
  },
];

export default function SwapPage() {
  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [sellToken, setSellToken] = useState(availableTokens[3]); // Default RSF
  const [buyToken, setBuyToken] = useState(availableTokens[0]); // Default GVF
  const [isSelectingSell, setIsSelectingSell] = useState(false);
  const [isSelectingBuy, setIsSelectingBuy] = useState(false);

  const handleTokenSelect = (token: typeof availableTokens[0], isSell: boolean) => {
    if (isSell) {
      setSellToken(token);
      setIsSelectingSell(false);
    } else {
      setBuyToken(token);
      setIsSelectingBuy(false);
    }
  };

  const swapTokens = () => {
    // Swap the tokens
    const tempToken = sellToken;
    setSellToken(buyToken);
    setBuyToken(tempToken);

    // Swap the amounts
    const tempAmount = sellAmount;
    setSellAmount(buyAmount);
    setBuyAmount(tempAmount);
  };

  const handleSwap = () => {
    // Swap logic will go here
    console.log('Swapping', sellAmount, sellToken.ticker, 'for', buyToken.ticker);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#225B3A]">Swap</h1>
        <p className="text-muted-foreground mt-1">Exchange tokens seamlessly</p>
      </div>

      {/* Swap Interface */}
      <div className="max-w-xl mx-auto">
        <Card className="p-1 rounded-[24px] bg-background/50 border-2">
          <CardContent className="p-8">
            <div className='flex flex-col relative gap-2'>
              {/* Sell Section */}
              <div className="p-5 py-6 rounded-[20px] border-2 bg-background">
                <div className="flex justify-between items-center mb-3">
                  <div className='flex flex-col items-start flex-1'>
                    <span className='text-sm text-muted-foreground mb-2'>Sell</span>
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      value={sellAmount}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*\.?\d*$/.test(value)) {
                          setSellAmount(value);
                        }
                      }}
                      className="pr-16 h-14 text-lg"
                    />
                    <span className="text-sm text-muted-foreground mt-2">
                      Balance: 1,000 {sellToken.ticker}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsSelectingSell(true)}
                    className="flex items-center gap-2 h-12 px-4 shrink-0 ml-3 rounded-xl hover:bg-muted/50 transition-all"
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${sellToken.color}20` }}
                    >
                      <sellToken.icon className="h-4 w-4" style={{ color: sellToken.color }} />
                    </div>
                    <span className="font-semibold">{sellToken.ticker}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Swap Button - Centered */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <button
                  onClick={swapTokens}
                  className="bg-background rounded-xl p-3 border-2 border-muted hover:border-[#225B3A] hover:bg-muted/50 transition-all duration-200 shadow-lg hover:shadow-xl group cursor-pointer"
                >
                  <ArrowDownUp className="h-6 w-6 text-[#225B3A] group-hover:scale-110 group-hover:rotate-180 transition-all duration-300" />
                </button>
              </div>

              {/* Buy Section */}
              <div className="p-5 py-6 rounded-[20px] border-2 bg-background">
                <div className="flex justify-between items-center mb-3">
                  <div className='flex flex-col items-start flex-1'>
                    <span className='text-sm text-muted-foreground mb-2'>Buy</span>
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      value={buyAmount}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*\.?\d*$/.test(value)) {
                          setBuyAmount(value);
                        }
                      }}
                      className="pr-16 h-14 text-lg"
                    />
                    <span className="text-sm text-muted-foreground mt-2">
                      Balance: 0 {buyToken.ticker}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsSelectingBuy(true)}
                    className="flex items-center gap-2 h-12 px-4 shrink-0 ml-3 rounded-xl hover:bg-muted/50 transition-all"
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${buyToken.color}20` }}
                    >
                      <buyToken.icon className="h-4 w-4" style={{ color: buyToken.color }} />
                    </div>
                    <span className="font-semibold">{buyToken.ticker}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Swap Action Button */}
            <Button
              className="w-full h-14 text-lg font-semibold bg-[#225B3A] hover:bg-[#1C4A30] mt-6 rounded-xl transition-all"
              onClick={handleSwap}
            >
              Swap
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Token Selection Modal for Sell */}
      <Dialog open={isSelectingSell} onOpenChange={setIsSelectingSell}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select a token to sell</DialogTitle>
            <DialogDescription>
              Choose from available tokens
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {availableTokens.map((token) => (
              <button
                key={token.id}
                onClick={() => handleTokenSelect(token, true)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors border"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${token.color}20` }}
                >
                  <token.icon className="h-6 w-6" style={{ color: token.color }} />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold">{token.ticker}</div>
                  <div className="text-sm text-muted-foreground">{token.name}</div>
                </div>
                {sellToken.id === token.id && (
                  <div className="w-2 h-2 rounded-full bg-[#225B3A]" />
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Token Selection Modal for Buy */}
      <Dialog open={isSelectingBuy} onOpenChange={setIsSelectingBuy}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select a token to buy</DialogTitle>
            <DialogDescription>
              Choose from available tokens
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {availableTokens.map((token) => (
              <button
                key={token.id}
                onClick={() => handleTokenSelect(token, false)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors border"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${token.color}20` }}
                >
                  <token.icon className="h-6 w-6" style={{ color: token.color }} />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold">{token.ticker}</div>
                  <div className="text-sm text-muted-foreground">{token.name}</div>
                </div>
                {buyToken.id === token.id && (
                  <div className="w-2 h-2 rounded-full bg-[#225B3A]" />
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}