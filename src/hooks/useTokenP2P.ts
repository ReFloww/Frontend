import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { tokenP2PAbi } from '@/lib/abis/TokenP2P';
import { mockUsdtAbi } from '@/lib/abis/MockUSDT';
import { useEffect } from 'react';

const USDT_ADDRESS = process.env.NEXT_PUBLIC_USDT_ADDRESS as `0x${string}`;

interface UseTokenP2PProps {
    tokenP2PAddress: `0x${string}`;
}

/**
 * Hook for interacting with TokenP2P contracts
 * Each product has its own unique P2P token contract
 *
 * @param tokenP2PAddress - The unique contract address for the specific P2P token
 */
export function useTokenP2P({ tokenP2PAddress }: UseTokenP2PProps) {
    const { address: userAddress, isConnected } = useAccount();
    const { writeContract, data: hash, isPending, error } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    // Read P2P token balance for the SPECIFIC tokenP2PAddress
    const { data: p2pBalance, refetch: refetchP2pBalance } = useReadContract({
        address: tokenP2PAddress,
        abi: tokenP2PAbi,
        functionName: 'balanceOf',
        args: userAddress ? [userAddress] : undefined,
        query: {
            enabled: isConnected && !!userAddress,
            refetchInterval: 10000,
        },
    });

    // Read USDT balance
    const { data: usdtBalance, refetch: refetchUsdtBalance } = useReadContract({
        address: USDT_ADDRESS,
        abi: mockUsdtAbi,
        functionName: 'balanceOf',
        args: userAddress ? [userAddress] : undefined,
        query: {
            enabled: isConnected && !!userAddress,
            refetchInterval: 10000,
        },
    });

    // Read USDT allowance for the SPECIFIC TokenP2P contract address
    // This ensures approval is specific to each product's P2P token contract
    const { data: allowance, refetch: refetchAllowance } = useReadContract({
        address: USDT_ADDRESS,
        abi: mockUsdtAbi,
        functionName: 'allowance',
        args: userAddress ? [userAddress, tokenP2PAddress] : undefined,
        query: {
            enabled: isConnected && !!userAddress,
            refetchInterval: 10000,
        },
    });

    // Read max supply
    const { data: maxSupply } = useReadContract({
        address: tokenP2PAddress,
        abi: tokenP2PAbi,
        functionName: 'maxSupply',
    });

    // Read total supply
    const { data: totalSupply } = useReadContract({
        address: tokenP2PAddress,
        abi: tokenP2PAbi,
        functionName: 'totalSupply',
    });

    // Refetch all balances when transaction is successful
    useEffect(() => {
        if (isSuccess) {
            refetchP2pBalance();
            refetchUsdtBalance();
            refetchAllowance();
        }
    }, [isSuccess, refetchP2pBalance, refetchUsdtBalance, refetchAllowance]);

    // Write functions - all use the SPECIFIC tokenP2PAddress
    const approveUSDT = (amount: string) => {
        const amountInWei = parseUnits(amount, 6);
        // Approve USDT spending for the SPECIFIC P2P token contract
        writeContract({
            address: USDT_ADDRESS,
            abi: mockUsdtAbi,
            functionName: 'approve',
            args: [tokenP2PAddress, amountInWei], // Uses the specific contract address
        });
    };

    const buyTokens = (amount: string) => {
        const amountInWei = parseUnits(amount, 6);
        // Buy tokens from the SPECIFIC P2P token contract
        writeContract({
            address: tokenP2PAddress, // Uses the specific contract address
            abi: tokenP2PAbi,
            functionName: 'buyTokens',
            args: [amountInWei],
        });
    };

    const sellTokens = (amount: string) => {
        const amountInWei = parseUnits(amount, 6);
        // Sell tokens to the SPECIFIC P2P token contract
        writeContract({
            address: tokenP2PAddress, // Uses the specific contract address
            abi: tokenP2PAbi,
            functionName: 'sellTokens',
            args: [amountInWei],
        });
    };

    // Helper function to mint USDT (for testing)
    const mintUSDT = (amount: string, address: `0x${string}`) => {
        const amountInWei = parseUnits(amount, 6);
        writeContract({
            address: USDT_ADDRESS,
            abi: mockUsdtAbi,
            functionName: 'mint',
            args: [address, amountInWei],
        });
    };

    // Check if approval is needed
    const needsApproval = (amount: string): boolean => {
        if (!allowance) return true;
        const amountInWei = parseUnits(amount, 6);
        return allowance < amountInWei;
    };

    // Format balances
    const formattedUsdtBalance = usdtBalance
        ? parseFloat(formatUnits(usdtBalance, 6)).toFixed(2)
        : '0.00';

    const formattedP2pBalance = p2pBalance
        ? parseFloat(formatUnits(p2pBalance, 6)).toFixed(2)
        : '0.00';

    const formattedAllowance = allowance
        ? parseFloat(formatUnits(allowance, 6)).toFixed(2)
        : '0.00';

    return {
        // State
        isPending: isPending || isConfirming,
        isSuccess,
        error,
        hash,
        isConnected,
        userAddress,

        // Balances
        usdtBalance: formattedUsdtBalance,
        p2pBalance: formattedP2pBalance,
        rawUsdtBalance: usdtBalance,
        rawP2pBalance: p2pBalance,

        // Allowance
        allowance: formattedAllowance,
        rawAllowance: allowance,
        needsApproval,

        // Supply data
        maxSupply: maxSupply ? formatUnits(maxSupply, 6) : '0',
        totalSupply: totalSupply ? formatUnits(totalSupply, 6) : '0',

        // Actions
        approveUSDT,
        buyTokens,
        sellTokens,
        mintUSDT,

        // Refetch functions
        refetchBalances: () => {
            refetchUsdtBalance();
            refetchP2pBalance();
            refetchAllowance();
        },
    };
}