import { useAccount, useReadContracts, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { tokenP2PAbi } from '@/lib/abis/TokenP2P';
import { mockUsdtAbi } from '@/lib/abis/MockUSDT';
import { TokenizedProduct } from '@/types/product-market';

const USDT_ADDRESS = '0xe01c5464816a544d4d0d6a336032578bd4629F10' as `0x${string}`;

/**
 * Hook to read balances and prices for all P2P tokens in the product market
 * Returns the actual wallet balances, token prices, and USD values for each product
 * @param products - Array of tokenized products from API
 */
export function usePortfolioBalances(products: TokenizedProduct[] = []) {
    const { address: userAddress, isConnected } = useAccount();

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

    // Create contract read calls for all P2P token balances
    const balanceContracts = products.map((product) => ({
        address: product.tokenP2PAddress,
        abi: tokenP2PAbi,
        functionName: 'balanceOf' as const,
        args: userAddress ? [userAddress] : undefined,
    }));

    // Create contract read calls for all P2P token prices
    const priceContracts = products.map((product) => ({
        address: product.tokenP2PAddress,
        abi: tokenP2PAbi,
        functionName: 'getTokenPrice' as const,
    }));

    // Read all balances
    const { data: balanceData, isLoading: isLoadingBalances, isError: isErrorBalances, refetch: refetchBalances } = useReadContracts({
        contracts: balanceContracts,
        query: {
            enabled: isConnected && !!userAddress && products.length > 0,
            refetchInterval: 10000,
        },
    });

    // Read all prices
    const { data: priceData, isLoading: isLoadingPrices, isError: isErrorPrices, refetch: refetchPrices } = useReadContracts({
        contracts: priceContracts,
        query: {
            enabled: products.length > 0,
            refetchInterval: 10000,
        },
    });

    // Map the results to a more usable format
    const balances = products.map((product, index) => {
        const balanceResult = balanceData?.[index];
        const priceResult = priceData?.[index];

        // Get raw balance (in token units with 6 decimals)
        const rawBalance = balanceResult?.status === 'success' ? balanceResult.result : BigInt(0);
        const formattedBalance = rawBalance ? parseFloat(formatUnits(rawBalance as bigint, 6)) : 0;

        // Get token price (in USDT with 6 decimals)
        const rawPrice = priceResult?.status === 'success' ? priceResult.result : BigInt(1000000); // Default to 1 USDT if price not available
        const tokenPrice = rawPrice ? parseFloat(formatUnits(rawPrice as bigint, 6)) : 1;

        // Calculate USD value: balance * price
        const usdValue = formattedBalance * tokenPrice;

        return {
            productId: product.id,
            productName: product.productName,
            symbol: product.symbol,
            categoryId: product.categoryId,
            icon: product.icon,
            balance: formattedBalance,
            rawBalance: rawBalance as bigint,
            tokenPrice: tokenPrice,
            rawPrice: rawPrice as bigint,
            usdValue: usdValue,
            tokenP2PAddress: product.tokenP2PAddress,
        };
    });

    // Filter out assets with zero balance for the portfolio display
    const activeAssets = balances.filter((asset) => asset.balance > 0);

    // Calculate total portfolio value (sum of all USD values)
    const totalValue = balances.reduce((sum, asset) => sum + asset.usdValue, 0);

    // Format USDT balance
    const formattedUsdtBalance = usdtBalance
        ? parseFloat(formatUnits(usdtBalance, 6))
        : 0;

    const isLoading = isLoadingBalances || isLoadingPrices;
    const isError = isErrorBalances || isErrorPrices;

    return {
        balances,
        activeAssets,
        totalValue,
        usdtBalance: formattedUsdtBalance,
        rawUsdtBalance: usdtBalance,
        isLoading,
        isError,
        isConnected,
        refetch: () => {
            refetchBalances();
            refetchPrices();
            refetchUsdtBalance();
        },
    };
}
