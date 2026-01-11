import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { tokenP2PAbi } from '@/lib/abis/TokenP2P';

interface UseTokenPriceProps {
  tokenAddress?: `0x${string}`;
  enabled?: boolean;
}

/**
 * Hook for reading the token price from TokenP2P contract
 * The price represents how much USDT is needed to buy 1 token
 */
export function useTokenPrice({ tokenAddress, enabled = true }: UseTokenPriceProps) {
  const { isConnected } = useAccount();

  const { data: tokenPrice, refetch } = useReadContract({
    address: tokenAddress,
    abi: tokenP2PAbi,
    functionName: 'getTokenPrice',
    query: {
      enabled: enabled && !!tokenAddress && isConnected,
      refetchInterval: 30000, // Refetch every 30 seconds
    },
  });

  // Format price from wei to readable number (6 decimals for USDT-backed tokens)
  const formattedPrice = tokenPrice
    ? parseFloat(formatUnits(tokenPrice as bigint, 6))
    : 0;

  return {
    price: formattedPrice,
    rawPrice: tokenPrice,
    refetch,
  };
}
