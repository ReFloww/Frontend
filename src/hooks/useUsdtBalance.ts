'use client';

import { useReadContract } from 'wagmi';
import { erc20Abi } from '@/lib/abis/erc20';

export function useUsdtBalance(address: `0x${string}` | undefined) {
  const usdtAddress = process.env.NEXT_PUBLIC_USDT_ADDRESS as `0x${string}`;

  const { data: balance, isLoading } = useReadContract({
    address: usdtAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const { data: decimals } = useReadContract({
    address: usdtAddress,
    abi: erc20Abi,
    functionName: 'decimals',
    query: {
      enabled: !!usdtAddress,
    },
  });

  // Convert balance from wei to proper decimal format
  const formattedBalance = balance && decimals !== undefined && decimals !== null
    ? Number(balance) / (10 ** Number(decimals))
    : 0;

  return {
    balance: formattedBalance,
    isLoading,
  };
}
