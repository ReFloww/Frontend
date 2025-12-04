'use client';

import { useEffect, useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { abi as SwapRouterABI } from '@/lib/abis/SwapRouter';
import { mockUsdtAbi as ERC20ABI } from '@/lib/abis/MockUSDT';

const SWAP_ROUTER_ADDRESS = '0x6c83fab8Bf840F62F810c51B9eB986a75411a950' as `0x${string}`;
const USDT_ADDRESS = '0xe01c5464816a544d4d0d6a336032578bd4629F10' as `0x${string}`;

interface UseSwapRouterProps {
  fromTokenAddress: `0x${string}`;
  toTokenAddress: `0x${string}`;
  onSuccess?: () => void;
}

export function useSwapRouter({ fromTokenAddress, toTokenAddress, onSuccess }: UseSwapRouterProps) {
  const { address: userAddress, isConnected } = useAccount();
  const [lastApprovedTx, setLastApprovedTx] = useState<`0x${string}` | null>(null);
  const [lastSwapTx, setLastSwapTx] = useState<`0x${string}` | null>(null);

  // Read allowance for the fromToken
  const { data: allowance = BigInt(0), refetch: refetchAllowance } = useReadContract({
    address: fromTokenAddress,
    abi: ERC20ABI,
    functionName: 'allowance',
    args: userAddress ? [userAddress, SWAP_ROUTER_ADDRESS] : undefined,
    query: {
      enabled: isConnected && !!userAddress && !!fromTokenAddress,
      refetchInterval: 3000, // Refetch every 3 seconds
    },
  });

  // Approve token spending
  const { writeContract: approveWrite, data: approveTxHash, reset: resetApprove } = useWriteContract();

  const {
    isLoading: isApproveTxPending,
    isSuccess: isApproveTxSuccess,
    isError: isApproveTxError,
  } = useWaitForTransactionReceipt({
    hash: approveTxHash,
  });

  // Execute swap
  const { writeContract: swapWrite, data: swapTxHash, reset: resetSwap } = useWriteContract();

  const {
    isLoading: isSwapTxPending,
    isSuccess: isSwapTxSuccess,
    isError: isSwapTxError,
  } = useWaitForTransactionReceipt({
    hash: swapTxHash,
  });

  // Handle approval success
  useEffect(() => {
    if (isApproveTxSuccess && approveTxHash && approveTxHash !== lastApprovedTx) {
      setLastApprovedTx(approveTxHash);
      refetchAllowance();
      console.log('✅ Approval successful:', approveTxHash);
    }
  }, [isApproveTxSuccess, approveTxHash, lastApprovedTx, refetchAllowance]);

  // Handle approval error
  useEffect(() => {
    if (isApproveTxError && approveTxHash) {
      console.error('❌ Approval failed:', approveTxHash);
      resetApprove();
    }
  }, [isApproveTxError, approveTxHash, resetApprove]);

  // Handle swap success
  useEffect(() => {
    if (isSwapTxSuccess && swapTxHash && swapTxHash !== lastSwapTx) {
      setLastSwapTx(swapTxHash);
      console.log('✅ Swap successful:', swapTxHash);
      if (onSuccess) {
        onSuccess();
      }
      // Reset after success callback
      setTimeout(() => {
        resetSwap();
      }, 1000);
    }
  }, [isSwapTxSuccess, swapTxHash, lastSwapTx, onSuccess, resetSwap]);

  // Handle swap error
  useEffect(() => {
    if (isSwapTxError && swapTxHash) {
      console.error('❌ Swap failed:', swapTxHash);
      resetSwap();
    }
  }, [isSwapTxError, swapTxHash, resetSwap]);

  // Approve tokens
  const approveToken = async (amount: string) => {
    if (!isConnected || !userAddress) {
      throw new Error('Wallet not connected');
    }

    if (!fromTokenAddress) {
      throw new Error('Invalid token address');
    }

    try {
      const amountInWei = parseUnits(amount, 6);

      console.log('📝 Approving:', {
        token: fromTokenAddress,
        spender: SWAP_ROUTER_ADDRESS,
        amount: amount,
        amountWei: amountInWei.toString(),
      });

      approveWrite(
        {
          address: fromTokenAddress,
          abi: ERC20ABI,
          functionName: 'approve',
          args: [SWAP_ROUTER_ADDRESS, amountInWei],
        },
        {
          onError: (error) => {
            console.error('Approval write error:', error);
            throw error;
          },
        }
      );
    } catch (error) {
      console.error('Error approving token:', error);
      throw error;
    }
  };

  // Execute swap
  const executeSwap = async (amount: string) => {
    if (!isConnected || !userAddress) {
      throw new Error('Wallet not connected');
    }

    if (!fromTokenAddress || !toTokenAddress) {
      throw new Error('Invalid token addresses');
    }

    try {
      const amountInWei = parseUnits(amount, 6);

      console.log('🔄 Executing swap:', {
        from: fromTokenAddress,
        to: toTokenAddress,
        amount: amount,
        amountWei: amountInWei.toString(),
      });

      swapWrite(
        {
          address: SWAP_ROUTER_ADDRESS,
          abi: SwapRouterABI,
          functionName: 'swap',
          args: [fromTokenAddress, toTokenAddress, amountInWei],
        },
        {
          onError: (error) => {
            console.error('Swap write error:', error);
            throw error;
          },
        }
      );
    } catch (error) {
      console.error('Error executing swap:', error);
      throw error;
    }
  };

  return {
    // State
    allowance,
    isApproving: isApproveTxPending,
    isSwapping: isSwapTxPending,
    isConnected,
    isApproveTxSuccess,
    isSwapTxSuccess,
    isApproveTxError,
    isSwapTxError,

    // Functions
    approveToken,
    executeSwap,
    refetchAllowance,

    // Transaction hashes
    approveTxHash,
    swapTxHash,
  };
}
