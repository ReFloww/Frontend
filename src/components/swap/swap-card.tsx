'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowDownUp, DollarSign, Loader2 } from 'lucide-react';
import { PRODUCT_MARKET } from '@/lib/constants/product-market';
import { useSwapBalance } from '@/hooks/useSwapBalances';
import { useSwapRouter } from '@/hooks/useSwapRouter';
import TokenSelectorButton from './token-selector-button';
import TokenSelectionDialog from './token-selection-dialog';
import { toast } from 'sonner';
import { parseUnits, formatUnits } from 'viem';

const USDT_ADDRESS = '0xe01c5464816a544d4d0d6a336032578bd4629F10' as `0x${string}`;

// Map product colors by sector
const getSectorColor = (sector: string) => {
  switch (sector) {
    case 'Agriculture':
      return '#16A34A';
    case 'Fisheries':
      return '#0EA5E9';
    case 'Forestry':
      return '#8B5CF6';
    default:
      return '#0A6A74';
  }
};

// Create available tokens from PRODUCT_MARKET + USDT
const availableTokens = [
  // USDT token
  {
    id: 'usdt',
    ticker: 'USDT',
    name: 'Tether USD',
    sector: 'Stablecoin',
    icon: DollarSign,
    color: '#26A17B',
  },
  // Map all products from PRODUCT_MARKET
  ...PRODUCT_MARKET.map((product) => ({
    id: product.id,
    ticker: product.symbol,
    name: product.productName,
    sector: product.categoryId,
    icon: product.icon,
    color: getSectorColor(product.categoryId),
  })),
];

export default function SwapCard() {

  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [sellToken, setSellToken] = useState(availableTokens[0]); // Default USDT
  const [buyToken, setBuyToken] = useState(availableTokens[1]); // Default GVF
  const [isSelectingSell, setIsSelectingSell] = useState(false);
  const [isSelectingBuy, setIsSelectingBuy] = useState(false);

  // Get token addresses for balance reading and swap operations
  const sellTokenAddress = (sellToken.id === 'usdt'
    ? USDT_ADDRESS
    : PRODUCT_MARKET.find(p => p.id === sellToken.id)?.tokenP2PAddress) as `0x${string}`;

  const buyTokenAddress = (buyToken.id === 'usdt'
    ? USDT_ADDRESS
    : PRODUCT_MARKET.find(p => p.id === buyToken.id)?.tokenP2PAddress) as `0x${string}`;

  // Read balances for selected tokens
  const { balance: sellBalance, isConnected, refetch: refetchSellBalance } = useSwapBalance({
    tokenAddress: sellToken.id === 'usdt' ? undefined : sellTokenAddress,
    isUSDT: sellToken.id === 'usdt',
  });

  const { balance: buyBalance, refetch: refetchBuyBalance } = useSwapBalance({
    tokenAddress: buyToken.id === 'usdt' ? undefined : buyTokenAddress,
    isUSDT: buyToken.id === 'usdt',
  });

  // Use SwapRouter hook
  const {

    allowance,
    isApproving,
    isSwapping,
    approveToken,
    executeSwap,
    refetchAllowance,
  } = useSwapRouter({
    fromTokenAddress: sellTokenAddress,
    toTokenAddress: buyTokenAddress,
    onSuccess: () => {
      toast.success('Swap successful! 🎉');
      setSellAmount('');
      setBuyAmount('');
      // Refetch balances after successful swap
      setTimeout(() => {
        refetchSellBalance();
        refetchBuyBalance();
      }, 1000);
    },
  });


  const handleTokenSelect = (token: { id: string; ticker: string; name: string; sector: string; icon: any; color: string }, isSell: boolean) => {
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

  const handleSwap = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet');
      return;
    }

    if (!sellAmount || parseFloat(sellAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (parseFloat(sellAmount) > sellBalance) {
      toast.error('Insufficient balance');
      return;
    }

    try {
      const amountInWei = parseUnits(sellAmount, 6);

      // Check if approval is needed
      if (allowance < amountInWei) {
        toast.info(`Requesting approval for ${sellToken.ticker}...`);
        await approveToken(sellAmount);
        return; // User needs to click swap again after approval
      }

      // Execute swap
      toast.info(`Swapping ${sellAmount} ${sellToken.ticker} for ${buyToken.ticker}...`);
      await executeSwap(sellAmount);
    } catch (error: any) {
      console.error('Swap error:', error);
      const errorMessage = error?.message || 'Transaction failed';

      // Check for common errors
      if (errorMessage.includes('user rejected')) {
        toast.error('Transaction rejected by user');
      } else if (errorMessage.includes('insufficient funds')) {
        toast.error('Insufficient funds for gas');
      } else {
        toast.error(errorMessage);
      }
    }
  };

  // Auto-calculate buy amount (1:1 ratio since all tokens are backed by USDT)
  useEffect(() => {
    if (sellAmount && parseFloat(sellAmount) > 0) {
      setBuyAmount(sellAmount);
    } else {
      setBuyAmount('');
    }
  }, [sellAmount]);

  // Determine button state and text
  const getButtonState = () => {
    if (!isConnected) {
      return { disabled: true, text: 'Connect Wallet' };
    }

    if (!sellAmount || parseFloat(sellAmount) <= 0) {
      return { disabled: true, text: 'Enter Amount' };
    }

    if (parseFloat(sellAmount) > sellBalance) {
      return { disabled: true, text: 'Insufficient Balance' };
    }

    if (isApproving) {
      return { disabled: true, text: 'Approving...', showLoader: true };
    }

    if (isSwapping) {
      return { disabled: true, text: 'Swapping...', showLoader: true };
    }

    const amountInWei = parseUnits(sellAmount, 6);
    if (allowance < amountInWei) {
      return { disabled: false, text: `Approve ${sellToken.ticker}` };
    }

    return { disabled: false, text: 'Swap' };
  };

  const buttonState = getButtonState();

  return (
    <>
      <Card className="p-1 rounded-[24px] bg-background/50 border-2">
        <CardContent className="p-8">
          <div className='flex flex-col relative gap-2'>
            {/* Sell Section */}
            <div className="p-5 py-6 rounded-[20px] border-2 bg-background relative z-0">
              <div className="flex justify-between items-center mb-3">
                <div className='flex flex-col items-start flex-1'>
                  <span className='text-sm text-muted-foreground mb-2'>Swap amount :</span>
                  <div className="relative w-full">
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
                    {isConnected && sellBalance > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setSellAmount(sellBalance.toString())}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 text-xs font-semibold text-primary hover:text-primary hover:bg-primary/10"
                      >
                        MAX
                      </Button>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground mt-2">
                    {isConnected
                      ? `Balance: ${sellBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${sellToken.ticker}`
                      : 'Connect wallet to see balance'}
                  </span>
                </div>
                <TokenSelectorButton
                  token={sellToken}
                  onClick={() => setIsSelectingSell(true)}
                />
              </div>
            </div>

            {/* Swap Button - Centered */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <Button
                onClick={swapTokens}
                variant="outline"
                size="icon"
                className="bg-background rounded-xl p-3 h-12 w-12 border-2 border-muted hover:border-[#225B3A] hover:bg-muted/50 transition-all duration-200 shadow-lg hover:shadow-xl group cursor-pointer"
              >
                <ArrowDownUp className="h-5 w-5 text-[#225B3A] group-hover:scale-110 group-hover:rotate-180 transition-all duration-300 " />
              </Button>
            </div>

            {/* Buy Section */}
            <div className="p-5 py-6 rounded-[20px] border-2 bg-background relative z-0">
              <div className="flex justify-between items-center mb-3">
                <div className='flex flex-col items-start flex-1'>
                  <span className='text-sm text-muted-foreground mb-2'>Get ammount :</span>

                  <Input
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={buyAmount}
                    disabled
                    className="pr-16 h-14 text-lg text-green-500 cursor-not-allowed select-none"
                  />

                  <span className="text-sm text-muted-foreground mt-2">
                    {isConnected
                      ? `Balance: ${buyBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${buyToken.ticker}`
                      : 'Connect wallet to see balance'}
                  </span>
                </div>

                <TokenSelectorButton
                  token={buyToken}
                  onClick={() => setIsSelectingBuy(true)}
                />
              </div>
            </div>

          </div>

          {/* Swap Action Button */}
          <Button
            className="w-full h-14 text-lg font-semibold bg-[#225B3A] hover:bg-[#1C4A30] mt-6 rounded-xl transition-all cursor-pointer hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSwap}
            disabled={buttonState.disabled}
          >
            {buttonState.showLoader && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {buttonState.text}
          </Button>
        </CardContent>
      </Card>

      {/* Token Selection Modal for Sell */}
      {/* Token Selection Modal for Sell */}
      <TokenSelectionDialog
        open={isSelectingSell}
        onOpenChange={setIsSelectingSell}
        title="Select a token to sell"
        description="Choose from available tokens"
        tokens={availableTokens.filter(token => token.id !== buyToken.id)}
        selectedToken={sellToken}
        onSelect={(token) => handleTokenSelect(token, true)}
      />

      {/* Token Selection Modal for Buy */}
      <TokenSelectionDialog
        open={isSelectingBuy}
        onOpenChange={setIsSelectingBuy}
        title="Select a token to buy"
        description="Choose from available tokens"
        tokens={availableTokens.filter(token => token.id !== sellToken.id)}
        selectedToken={buyToken}
        onSelect={(token) => handleTokenSelect(token, false)}
      />
    </>
  );
}
