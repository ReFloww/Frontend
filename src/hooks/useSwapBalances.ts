import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { tokenP2PAbi } from '@/lib/abis/TokenP2P';
import { mockUsdtAbi } from '@/lib/abis/MockUSDT';

const USDT_ADDRESS = process.env.NEXT_PUBLIC_USDT_ADDRESS as `0x${string}`;

interface UseSwapBalancesProps {
    tokenAddress?: `0x${string}`;
    isUSDT?: boolean;
}

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

    // Format balance (using 6 decimals for USDT-backed tokens)
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
