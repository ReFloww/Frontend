'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowDownUp, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { TokenizedProduct } from '@/types/product-market';
import { useSwapBalance } from '@/hooks/useSwapBalances';
import { useSwapRouter } from '@/hooks/useSwapRouter';
import TokenSelectorButton from '@/components/swap/_components/token-selector-button';
import TokenSelectionDialog from '@/components/swap/_components/token-selection-dialog';
import { toast } from 'sonner';
import { parseUnits, formatUnits } from 'viem';

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

interface SwapCardProps {
  products: TokenizedProduct[];
  initialSellTokenId?: string | null;
}

export default function SwapCard({ products, initialSellTokenId }: SwapCardProps) {
  // Create available tokens from products prop
  const availableTokens = products.map((product) => ({
    id: product.id,
    ticker: product.symbol,
    name: product.productName,
    sector: product.categoryId,
    icon: product.icon,
    color: getSectorColor(product.categoryId),
  }));

  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [sellToken, setSellToken] = useState<typeof availableTokens[0] | null>(null);
  const [buyToken, setBuyToken] = useState<typeof availableTokens[0] | null>(null);
  const [isSelectingSell, setIsSelectingSell] = useState(false);
  const [isSelectingBuy, setIsSelectingBuy] = useState(false);
  const [step, setStep] = useState<'input' | 'swapping'>('input');

  // Get token addresses for balance reading and swap operations
  const sellTokenAddress = sellToken
    ? products.find(p => p.id === sellToken.id)?.tokenP2PAddress as `0x${string}`
    : undefined;

  const buyTokenAddress = buyToken
    ? products.find(p => p.id === buyToken.id)?.tokenP2PAddress as `0x${string}`
    : undefined;

  // Read balances for selected tokens
  const { balance: sellBalance, isConnected, refetch: refetchSellBalance } = useSwapBalance({
    tokenAddress: sellTokenAddress,
    isUSDT: false,
  });

  const { balance: buyBalance, refetch: refetchBuyBalance } = useSwapBalance({
    tokenAddress: buyTokenAddress,
    isUSDT: false,
  });

  // Use SwapRouter hook
  const {
    isSwapping,
    executeSwap,
    isSwapTxSuccess,
    isSwapTxError,
    swapTxHash,
  } = useSwapRouter({
    fromTokenAddress: sellTokenAddress!,
    toTokenAddress: buyTokenAddress!,
    onSuccess: () => {
      toast.success('Swap successful! 🎉');
      refetchSellBalance();
      refetchBuyBalance();
    },
  });

  // Set initial sell token from URL parameter
  useEffect(() => {
    if (initialSellTokenId) {
      const token = availableTokens.find(t => t.id === initialSellTokenId);
      if (token) {
        setSellToken(token);
      }
    }
  }, [initialSellTokenId]);

  // Update step based on transaction states
  useEffect(() => {
    if (isSwapping && step !== 'swapping') {
      setStep('swapping');
    }
  }, [isSwapping, step]);

  // Handle swap success - reset step and clear amounts
  useEffect(() => {
    if (isSwapTxSuccess) {
      setStep('input');
      setSellAmount('');
      setBuyAmount('');
    }
  }, [isSwapTxSuccess]);

  // Handle swap failure - reset step but keep amounts for retry
  useEffect(() => {
    if (isSwapTxError) {
      setStep('input');
      toast.error('Swap transaction failed. Please try again.');
    }
  }, [isSwapTxError]);


  const handleTokenSelect = (token: any, isSell: boolean) => {
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
      // Execute swap directly without approval check
      toast.info(`Swapping ${sellAmount} ${sellToken?.ticker} for ${buyToken?.ticker}...`);
      setStep('swapping');
      await executeSwap(sellAmount);
    } catch (error: any) {
      console.error('Swap error:', error);
      setStep('input'); // Reset step on error
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

  // Clear amounts when tokens are changed
  useEffect(() => {
    setSellAmount('');
    setBuyAmount('');
    setStep('input'); // Reset step when changing tokens
  }, [sellToken?.id, buyToken?.id]);

  // Determine button state and text
  const getButtonState = () => {
    if (!isConnected) {
      return { disabled: true, text: 'Connect Wallet' };
    }
    if (!sellAmount || parseFloat(sellAmount) <= 0) {
      return { disabled: true, text: 'Enter Amount' };
    }
    if (parseFloat(sellAmount) > sellBalance) {
      return {
        disabled: true, text: 'Insufficient Balance'
      };
    }
    if (!sellToken || !buyToken) {
      return { disabled: true, text: 'Select Tokens' };
    }

    // condition bug state
    // Kondisi 1: Swap Error (prioritas tertinggi)
    if ((step === 'swapping' || isSwapping) && isSwapTxError) {
      return { disabled: false, text: 'ulang', showLoader: false };
    }

    // Kondisi 2: Swap sedang berlangsung (belum sukses & tidak error)
    if ((step === 'swapping' || isSwapping) && !isSwapTxSuccess && !isSwapTxError) {
      return { disabled: true, text: 'Swapping...', showLoader: true };
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
                        onClick={() => {
                          // Format balance to 6 decimals and remove trailing zeros
                          const formattedBalance = sellBalance.toFixed(6).replace(/\.?0+$/, '');
                          setSellAmount(formattedBalance);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 text-xs font-semibold text-primary hover:text-primary hover:bg-primary/10"
                      >
                        MAX
                      </Button>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground mt-2">
                    {isConnected && sellToken
                      ? `Balance: ${sellBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${sellToken.ticker}`
                      : !sellToken ? 'Select a token' : 'Connect wallet to see balance'}
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
                  <span className='text-sm text-muted-foreground mb-2'>Get amount :</span>

                  <Input
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={buyAmount}
                    disabled
                    className="pr-16 h-14 text-lg text-green-500 cursor-not-allowed select-none"
                  />

                  <span className="text-sm text-muted-foreground mt-2">
                    {isConnected && buyToken
                      ? `Balance: ${buyBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${buyToken.ticker}`
                      : !buyToken ? 'Select a token' : 'Connect wallet to see balance'}
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
            className="w-full h-14 text-lg font-semibold bg-[#225B3A] hover:bg-[#1C4A30] mt-6 rounded-xl transition-all cursor-pointer hover:shadow-lg hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSwap}
            disabled={buttonState.disabled}
          >
            {buttonState.showLoader && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {buttonState.text}
          </Button>

          {/* Transaction Status */}
          {(isSwapping || isSwapTxSuccess || isSwapTxError) && swapTxHash && (
            <div className={`mt-4 p-4 rounded-lg border ${isSwapTxError
              ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
              : 'bg-muted/50'
              }`}>
              <div className="flex items-start gap-3">
                {isSwapping ? (
                  <Loader2 className="h-5 w-5 animate-spin text-primary mt-0.5" />
                ) : isSwapTxError ? (
                  <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`font-medium text-sm ${isSwapTxError ? 'text-red-600' : ''}`}>
                    {isSwapping
                      ? `Swapping ${sellToken?.ticker} for ${buyToken?.ticker}...`
                      : isSwapTxError
                        ? 'Swap Transaction Failed'
                        : isSwapTxSuccess
                          ? 'Swap Completed Successfully!'
                          : 'Processing...'}
                  </p>
                  {swapTxHash && (
                    <>
                      <p className="text-xs text-muted-foreground mt-1 break-all">
                        Tx: {swapTxHash.slice(0, 10)}...{swapTxHash.slice(-8)}
                      </p>
                      <a
                        href={`https://sepolia.mantlescan.xyz/tx/${swapTxHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline mt-1 inline-block"
                      >
                        View on Explorer →
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

        </CardContent>
      </Card>

      {/* Token Selection Modal for Sell */}
      {/* Token Selection Modal for Sell */}
      <TokenSelectionDialog
        open={isSelectingSell}
        onOpenChange={setIsSelectingSell}
        title="Select a token to sell"
        description="Choose from available tokens"
        tokens={availableTokens.filter(token => token.id !== buyToken?.id)}
        selectedToken={sellToken}
        onSelect={(token) => handleTokenSelect(token, true)}
      />

      {/* Token Selection Modal for Buy */}
      <TokenSelectionDialog
        open={isSelectingBuy}
        onOpenChange={setIsSelectingBuy}
        title="Select a token to buy"
        description="Choose from available tokens"
        tokens={availableTokens.filter(token => token.id !== sellToken?.id)}
        selectedToken={buyToken}
        onSelect={(token) => handleTokenSelect(token, false)}
      />
    </>
  );
}