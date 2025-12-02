import { useAccount, useReadContracts } from 'wagmi';
import { formatUnits } from 'viem';
import { tokenP2PAbi } from '@/lib/abis/TokenP2P';
import { PRODUCT_MARKET } from '@/lib/constants/product-market';

/**
 * Hook to read balances for all P2P tokens in the product market
 * Returns the actual wallet balances for each product's P2P token
 */
export function usePortfolioBalances() {
    const { address: userAddress, isConnected } = useAccount();

    // Create contract read calls for all P2P token balances
    const contracts = PRODUCT_MARKET.map((product) => ({
        address: product.tokenP2PAddress,
        abi: tokenP2PAbi,
        functionName: 'balanceOf' as const,
        args: userAddress ? [userAddress] : undefined,
    }));

    const { data, isLoading, isError, refetch } = useReadContracts({
        contracts,
        query: {
            enabled: isConnected && !!userAddress,
            refetchInterval: 10000, // Refetch every 10 seconds
        },
    });

    // Map the results to a more usable format
    const balances = PRODUCT_MARKET.map((product, index) => {
        const result = data?.[index];
        const rawBalance = result?.status === 'success' ? result.result : 0n;
        const formattedBalance = rawBalance ? parseFloat(formatUnits(rawBalance as bigint, 6)) : 0;

        return {
            productId: product.id,
            productName: product.productName,
            symbol: product.symbol,
            categoryId: product.categoryId,
            icon: product.icon,
            balance: formattedBalance,
            rawBalance: rawBalance as bigint,
            tokenP2PAddress: product.tokenP2PAddress,
        };
    });

    // Filter out assets with zero balance for the portfolio display
    const activeAssets = balances.filter((asset) => asset.balance > 0);

    // Calculate total portfolio value (sum of all P2P token balances)
    // Since P2P tokens are 1:1 backed by USDT, this represents the total USD value of all holdings
    const totalValue = balances.reduce((sum, asset) => sum + asset.balance, 0);

    return {
        balances,
        activeAssets,
        totalValue,
        isLoading,
        isError,
        isConnected,
        refetch,
    };
}
