import { useAccount, useReadContract, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';
import { factoryManagerAbi } from '@/lib/abis/FactoryManager';
import { managerInvestmentAbi } from '@/lib/abis/ManagerInvestment';
import { mockUsdtAbi } from '@/lib/abis/MockUSDT';
import { FACTORY_MANAGER_ADDRESS, USDT_ADDRESS } from '@/lib/constants/contracts';
import { useState, useEffect } from 'react';

export interface ManagerInfo {
  address: `0x${string}`;
  name: string;
  owner: `0x${string}`;
  totalDeposits: number;
  rawTotalDeposits: bigint;
}

/**
 * Hook to fetch all deployed managers from the Factory contract
 */
export function useDeployedManagers() {
  const [managers, setManagers] = useState<ManagerInfo[]>([]);

  // Get all deployed manager addresses
  const { data: deployedManagerAddresses, isLoading: isLoadingAddresses, refetch } = useReadContract({
    address: FACTORY_MANAGER_ADDRESS,
    abi: factoryManagerAbi,
    functionName: 'getDeployedManagers',
  });

  // Create contract calls to fetch details for each manager
  const managerAddresses = (deployedManagerAddresses as `0x${string}`[]) || [];

  // Fetch name for each manager
  const nameContracts = managerAddresses.map((address) => ({
    address,
    abi: managerInvestmentAbi,
    functionName: 'name' as const,
  }));

  // Fetch owner for each manager
  const ownerContracts = managerAddresses.map((address) => ({
    address,
    abi: managerInvestmentAbi,
    functionName: 'owner' as const,
  }));

  // Fetch totalDeposits for each manager
  const depositsContracts = managerAddresses.map((address) => ({
    address,
    abi: managerInvestmentAbi,
    functionName: 'totalDeposits' as const,
  }));

  const { data: namesData, isLoading: isLoadingNames } = useReadContracts({
    contracts: nameContracts,
    query: { enabled: managerAddresses.length > 0 },
  });

  const { data: ownersData, isLoading: isLoadingOwners } = useReadContracts({
    contracts: ownerContracts,
    query: { enabled: managerAddresses.length > 0 },
  });

  const { data: depositsData, isLoading: isLoadingDeposits } = useReadContracts({
    contracts: depositsContracts,
    query: { enabled: managerAddresses.length > 0 },
  });

  useEffect(() => {
    if (namesData && ownersData && depositsData && managerAddresses.length > 0) {
      const managersInfo: ManagerInfo[] = managerAddresses.map((address, index) => {
        const nameResult = namesData[index];
        const ownerResult = ownersData[index];
        const depositsResult = depositsData[index];

        const name = nameResult?.status === 'success' ? (nameResult.result as string) : 'Unknown';
        const owner = ownerResult?.status === 'success' ? (ownerResult.result as `0x${string}`) : '0x0';
        const rawDeposits = depositsResult?.status === 'success' ? (depositsResult.result as bigint) : BigInt(0);
        const totalDeposits = parseFloat(formatUnits(rawDeposits, 6));

        return {
          address,
          name,
          owner,
          totalDeposits,
          rawTotalDeposits: rawDeposits,
        };
      });

      setManagers(managersInfo);
    }
  }, [namesData, ownersData, depositsData, managerAddresses]);

  return {
    managers,
    isLoading: isLoadingAddresses || isLoadingNames || isLoadingOwners || isLoadingDeposits,
    refetch,
  };
}

/**
 * Hook to interact with a specific Manager Investment contract
 */
export function useManagerInvestment(managerAddress: `0x${string}` | undefined) {
  const { address: userAddress, isConnected } = useAccount();
  const { writeContract, data: hash, isPending: isWritePending, error: writeError } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Read manager details
  const { data: name } = useReadContract({
    address: managerAddress,
    abi: managerInvestmentAbi,
    functionName: 'name',
    query: { enabled: !!managerAddress },
  });

  const { data: owner } = useReadContract({
    address: managerAddress,
    abi: managerInvestmentAbi,
    functionName: 'owner',
    query: { enabled: !!managerAddress },
  });

  const { data: totalShares, refetch: refetchTotalShares } = useReadContract({
    address: managerAddress,
    abi: managerInvestmentAbi,
    functionName: 'totalShares',
    query: { enabled: !!managerAddress },
  });

  const { data: sharePrice, refetch: refetchSharePrice } = useReadContract({
    address: managerAddress,
    abi: managerInvestmentAbi,
    functionName: 'getSharePrice',
    query: { enabled: !!managerAddress },
  });

  const { data: liquidFund, refetch: refetchLiquidFund } = useReadContract({
    address: managerAddress,
    abi: managerInvestmentAbi,
    functionName: 'getLiquidFund',
    query: { enabled: !!managerAddress },
  });

  // Read user's shares in this manager
  const { data: userShares, refetch: refetchUserShares } = useReadContract({
    address: managerAddress,
    abi: managerInvestmentAbi,
    functionName: 'userShares',
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: !!managerAddress && !!userAddress },
  });

  // Read user's share value in USDT
  const { data: userShareValue, refetch: refetchUserShareValue } = useReadContract({
    address: managerAddress,
    abi: managerInvestmentAbi,
    functionName: 'getUserShareValue',
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: !!managerAddress && !!userAddress },
  });

  // Read user's USDT balance
  const { data: usdtBalance, refetch: refetchUsdtBalance } = useReadContract({
    address: USDT_ADDRESS,
    abi: mockUsdtAbi,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: !!userAddress },
  });

  // Read user's USDT allowance for the manager contract
  const { data: usdtAllowance, refetch: refetchAllowance } = useReadContract({
    address: USDT_ADDRESS,
    abi: mockUsdtAbi,
    functionName: 'allowance',
    args: userAddress && managerAddress ? [userAddress, managerAddress] : undefined,
    query: { enabled: !!userAddress && !!managerAddress },
  });

  // Approve USDT spending
  const approveUsdt = async (amount: string) => {
    if (!managerAddress) return;
    const amountInWei = parseUnits(amount, 6);
    writeContract({
      address: USDT_ADDRESS,
      abi: mockUsdtAbi,
      functionName: 'approve',
      args: [managerAddress, amountInWei],
    });
  };

  // Deposit USDT to manager
  const deposit = async (amount: string) => {
    if (!managerAddress) return;
    const amountInWei = parseUnits(amount, 6);
    writeContract({
      address: managerAddress,
      abi: managerInvestmentAbi,
      functionName: 'deposit',
      args: [amountInWei],
    });
  };

  // Withdraw shares from manager (amount is in shares, not USDT)
  const withdraw = async (shareAmount: string) => {
    if (!managerAddress) return;
    // shareAmount is the number of shares to burn (6 decimals like USDT)
    const sharesInWei = parseUnits(shareAmount, 6);
    writeContract({
      address: managerAddress,
      abi: managerInvestmentAbi,
      functionName: 'withdraw',
      args: [sharesInWei],
    });
  };

  // Refetch all data
  const refetch = () => {
    refetchTotalShares();
    refetchSharePrice();
    refetchLiquidFund();
    refetchUserShares();
    refetchUserShareValue();
    refetchUsdtBalance();
    refetchAllowance();
  };

  return {
    // Manager info
    name: name as string | undefined,
    owner: owner as `0x${string}` | undefined,
    totalShares: totalShares ? parseFloat(formatUnits(totalShares as bigint, 6)) : 0,
    rawTotalShares: totalShares as bigint | undefined,
    sharePrice: sharePrice ? parseFloat(formatUnits(sharePrice as bigint, 6)) : 1,
    rawSharePrice: sharePrice as bigint | undefined,
    liquidFund: liquidFund ? parseFloat(formatUnits(liquidFund as bigint, 6)) : 0,
    rawLiquidFund: liquidFund as bigint | undefined,

    // User info
    userShares: userShares ? parseFloat(formatUnits(userShares as bigint, 6)) : 0,
    rawUserShares: userShares as bigint | undefined,
    userDeposit: userShareValue ? parseFloat(formatUnits(userShareValue as bigint, 6)) : 0,
    rawUserDeposit: userShareValue as bigint | undefined,
    usdtBalance: usdtBalance ? parseFloat(formatUnits(usdtBalance as bigint, 6)) : 0,
    rawUsdtBalance: usdtBalance as bigint | undefined,
    usdtAllowance: usdtAllowance ? parseFloat(formatUnits(usdtAllowance as bigint, 6)) : 0,
    rawUsdtAllowance: usdtAllowance as bigint | undefined,

    // Actions
    approveUsdt,
    deposit,
    withdraw,

    // Transaction state
    isWritePending,
    isConfirming,
    isConfirmed,
    writeError,
    hash,

    // Utils
    isConnected,
    refetch,
  };
}

/**
 * Hook to get manager count from factory
 */
export function useManagerCount() {
  const { data, isLoading } = useReadContract({
    address: FACTORY_MANAGER_ADDRESS,
    abi: factoryManagerAbi,
    functionName: 'managerCount',
  });

  return {
    count: data ? Number(data) : 0,
    isLoading,
  };
}

export interface UserManagerInvestment {
  managerAddress: `0x${string}`;
  managerName: string;
  depositAmount: number;
  rawDepositAmount: bigint;
  totalDeposits: number;
  sharePercentage: number;
}

/**
 * Hook to fetch user's deposits across all managers
 */
export function useUserManagerInvestments() {
  const { address: userAddress, isConnected } = useAccount();
  const [investments, setInvestments] = useState<UserManagerInvestment[]>([]);

  // Get all deployed manager addresses
  const { data: deployedManagerAddresses, isLoading: isLoadingAddresses, refetch } = useReadContract({
    address: FACTORY_MANAGER_ADDRESS,
    abi: factoryManagerAbi,
    functionName: 'getDeployedManagers',
  });

  const managerAddresses = (deployedManagerAddresses as `0x${string}`[]) || [];

  // Fetch name for each manager
  const nameContracts = managerAddresses.map((address) => ({
    address,
    abi: managerInvestmentAbi,
    functionName: 'name' as const,
  }));

  // Fetch user deposits for each manager
  const userDepositContracts = managerAddresses.map((address) => ({
    address,
    abi: managerInvestmentAbi,
    functionName: 'userDeposits' as const,
    args: userAddress ? [userAddress] : undefined,
  }));

  // Fetch totalDeposits for each manager
  const totalDepositsContracts = managerAddresses.map((address) => ({
    address,
    abi: managerInvestmentAbi,
    functionName: 'totalDeposits' as const,
  }));

  const { data: namesData, isLoading: isLoadingNames } = useReadContracts({
    contracts: nameContracts,
    query: { enabled: managerAddresses.length > 0 },
  });

  const { data: userDepositsData, isLoading: isLoadingUserDeposits } = useReadContracts({
    contracts: userDepositContracts,
    query: { enabled: managerAddresses.length > 0 && !!userAddress },
  });

  const { data: totalDepositsData, isLoading: isLoadingTotalDeposits } = useReadContracts({
    contracts: totalDepositsContracts,
    query: { enabled: managerAddresses.length > 0 },
  });

  useEffect(() => {
    if (namesData && userDepositsData && totalDepositsData && managerAddresses.length > 0) {
      const userInvestments: UserManagerInvestment[] = [];

      managerAddresses.forEach((address, index) => {
        const nameResult = namesData[index];
        const userDepositResult = userDepositsData[index];
        const totalDepositsResult = totalDepositsData[index];

        const name = nameResult?.status === 'success' ? (nameResult.result as string) : 'Unknown';
        const rawUserDeposit = userDepositResult?.status === 'success' ? (userDepositResult.result as bigint) : BigInt(0);
        const rawTotalDeposits = totalDepositsResult?.status === 'success' ? (totalDepositsResult.result as bigint) : BigInt(0);

        const depositAmount = parseFloat(formatUnits(rawUserDeposit, 6));
        const totalDeposits = parseFloat(formatUnits(rawTotalDeposits, 6));

        // Only include managers where user has deposits > 0
        if (depositAmount > 0) {
          userInvestments.push({
            managerAddress: address,
            managerName: name,
            depositAmount,
            rawDepositAmount: rawUserDeposit,
            totalDeposits,
            sharePercentage: totalDeposits > 0 ? (depositAmount / totalDeposits) * 100 : 0,
          });
        }
      });

      setInvestments(userInvestments);
    }
  }, [namesData, userDepositsData, totalDepositsData, managerAddresses]);

  // Calculate total invested across all managers
  const totalInvested = investments.reduce((sum, inv) => sum + inv.depositAmount, 0);

  return {
    investments,
    totalInvested,
    isLoading: isLoadingAddresses || isLoadingNames || isLoadingUserDeposits || isLoadingTotalDeposits,
    isConnected,
    refetch,
  };
}
