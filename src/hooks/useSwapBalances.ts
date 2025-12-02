import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { tokenP2PAbi } from '@/lib/abis/TokenP2P';
import { mockUsdtAbi } from '@/lib/abis/MockUSDT';

const USDT_ADDRESS = '0xe01c5464816a544d4d0d6a336032578bd4629F10' as `0x${string}`;

interface UseSwapBalancesProps {
    tokenAddress?: `0x${string}`;
    isUSDT?: boolean;
}

/**
 * Hook to read balance for a specific token (P2P or USDT)
 */
export function useSwapBalance({ tokenAddress, isUSDT = false }: UseSwapBalancesProps) {
    const { address: userAddress, isConnected } = useAccount();

    // Read balance based on token type
    const { data: balance, refetch } = useReadContract({
        address: isUSDT ? USDT_ADDRESS : tokenAddress,
        abi: isUSDT ? mockUsdtAbi : tokenP2PAbi,
        functionName: 'balanceOf',
        args: userAddress ? [userAddress] : undefined,
        query: {
            enabled: isConnected && !!userAddress && (isUSDT || !!tokenAddress),
            refetchInterval: 10000,
        },
    });

    // Format balance
    const formattedBalance = balance
        ? parseFloat(formatUnits(balance as bigint, 6))
        : 0;

    return {
        balance: formattedBalance,
        rawBalance: balance,
        isConnected,
        refetch,
    };
}
