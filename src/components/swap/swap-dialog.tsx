'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArrowLeftRight, ArrowDownUp, ChevronDown, Sprout, Fish, TreePine, LucideIcon } from 'lucide-react';

interface Token {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  icon: LucideIcon;
  color: string;
}

// Available tokens for swapping
const availableTokens: Token[] = [
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

interface SwapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultSellToken?: string; // ticker of the token to sell
}

export default function SwapDialog({ open, onOpenChange, defaultSellToken }: SwapDialogProps) {
  const defaultSell = availableTokens.find(t => t.ticker === defaultSellToken) || availableTokens[0];
  const defaultBuy = defaultSell.ticker === 'RSF' ? availableTokens[0] : availableTokens[3];

  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [sellToken, setSellToken] = useState<Token>(defaultSell);
  const [buyToken, setBuyToken] = useState<Token>(defaultBuy);
  const [isSelectingSell, setIsSelectingSell] = useState(false);
  const [isSelectingBuy, setIsSelectingBuy] = useState(false);

  const handleTokenSelect = (token: Token, isSell: boolean) => {
    if (isSell) {
      setSellToken(token);
      setIsSelectingSell(false);
    } else {
      setBuyToken(token);
      setIsSelectingBuy(false);
    }
  };

  const swapTokens = () => {
    const tempToken = sellToken;
    setSellToken(buyToken);
    setBuyToken(tempToken);

    const tempAmount = sellAmount;
    setSellAmount(buyAmount);
    setBuyAmount(tempAmount);
  };

  const handleSwap = () => {
    console.log('Swapping', sellAmount, sellToken.ticker, 'for', buyToken.ticker);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open && !isSelectingSell && !isSelectingBuy} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#225B3A]">Swap Tokens</DialogTitle>
            <DialogDescription>
              Exchange tokens seamlessly
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col relative gap-2">
            {/* Sell Section */}
            <div className="p-4 rounded-xl border-2 bg-muted/30">
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-start flex-1">
                  <span className="text-sm text-muted-foreground mb-2">Sell</span>
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
                    className="h-12 text-lg border-0 bg-transparent p-0 focus-visible:ring-0"
                  />
                  <span className="text-xs text-muted-foreground mt-1">
                    Balance: 1,000 {sellToken.ticker}
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsSelectingSell(true)}
                  className="flex items-center gap-2 h-10 px-3 shrink-0 ml-3 rounded-lg hover:bg-muted/50 transition-all"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${sellToken.color}20` }}
                  >
                    <sellToken.icon className="h-3.5 w-3.5" style={{ color: sellToken.color }} />
                  </div>
                  <span className="font-semibold text-sm">{sellToken.ticker}</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Swap Button - Centered */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <button
                onClick={swapTokens}
                className="bg-background rounded-lg p-2 border-2 border-muted hover:border-[#225B3A] hover:bg-muted/50 transition-all duration-200 shadow-md hover:shadow-lg group cursor-pointer"
              >
                <ArrowDownUp className="h-4 w-4 text-[#225B3A] group-hover:scale-110 group-hover:rotate-180 transition-all duration-300" />
              </button>
            </div>

            {/* Buy Section */}
            <div className="p-4 rounded-xl border-2 bg-muted/30">
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-start flex-1">
                  <span className="text-sm text-muted-foreground mb-2">Buy</span>
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
                    className="h-12 text-lg border-0 bg-transparent p-0 focus-visible:ring-0"
                  />
                  <span className="text-xs text-muted-foreground mt-1">
                    Balance: 0 {buyToken.ticker}
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsSelectingBuy(true)}
                  className="flex items-center gap-2 h-10 px-3 shrink-0 ml-3 rounded-lg hover:bg-muted/50 transition-all"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${buyToken.color}20` }}
                  >
                    <buyToken.icon className="h-3.5 w-3.5" style={{ color: buyToken.color }} />
                  </div>
                  <span className="font-semibold text-sm">{buyToken.ticker}</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Swap Action Button */}
          <Button
            className="w-full h-12 text-base font-semibold bg-[#225B3A] hover:bg-[#1C4A30] mt-2 rounded-xl transition-all"
            onClick={handleSwap}
          >
            Swap
          </Button>
        </DialogContent>
      </Dialog>

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
    </>
  );
}
