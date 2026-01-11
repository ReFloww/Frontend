'use client';

import { useEffect, useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { abi as SwapRouterABI } from '@/lib/abis/SwapRouter';
import { tokenP2PAbi } from '@/lib/abis/TokenP2P';

const SWAP_ROUTER_ADDRESS = process.env.NEXT_PUBLIC_SWAP_ROUTER_ADDRESS as `0x${string}`;

interface UseSwapRouterProps {
  fromTokenAddress: `0x${string}`;
  toTokenAddress: `0x${string}`;
  onSuccess?: () => void;
}

export function useSwapRouter({ fromTokenAddress, toTokenAddress, onSuccess }: UseSwapRouterProps) {
  const { address: userAddress, isConnected } = useAccount();
  const [lastApprovedTx, setLastApprovedTx] = useState<`0x${string}` | null>(null);
  const [lastSwapTx, setLastSwapTx] = useState<`0x${string}` | null>(null);
  const [pendingSwapAmount, setPendingSwapAmount] = useState<string | null>(null);

  // Read allowance for the fromToken
  const { data: allowance = BigInt(0), refetch: refetchAllowance } = useReadContract({
    address: fromTokenAddress,
    abi: tokenP2PAbi,
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

  // Handle approval success - then execute swap
  useEffect(() => {
    if (isApproveTxSuccess && approveTxHash && approveTxHash !== lastApprovedTx) {
      setLastApprovedTx(approveTxHash);
      refetchAllowance();
      console.log('✅ Approval successful:', approveTxHash);

      // If there's a pending swap, execute it after approval
      if (pendingSwapAmount) {
        console.log('🔄 Executing pending swap after approval...');
        const amount = pendingSwapAmount;
        setPendingSwapAmount(null);

        setTimeout(() => {
          performSwap(amount);
        }, 1000);
      }
    }
  }, [isApproveTxSuccess, approveTxHash, lastApprovedTx, refetchAllowance, pendingSwapAmount]);

  // Handle approval error
  useEffect(() => {
    if (isApproveTxError && approveTxHash) {
      console.error('❌ Approval failed:', approveTxHash);
      setPendingSwapAmount(null);
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
          abi: tokenP2PAbi,
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

  // Perform the actual swap
  const performSwap = (amount: string) => {
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

  // One-click swap: approve if needed, then swap
  const executeSwap = async (amount: string) => {
    if (!isConnected || !userAddress) {
      throw new Error('Wallet not connected');
    }

    if (!fromTokenAddress || !toTokenAddress) {
      throw new Error('Invalid token addresses');
    }

    try {
      const amountInWei = parseUnits(amount, 6);

      // Check if allowance is sufficient
      if (allowance < amountInWei) {
        console.log('⚠️ Insufficient allowance, approving first...');
        setPendingSwapAmount(amount);
        await approveToken(amount);
      } else {
        console.log('✅ Sufficient allowance, proceeding with swap...');
        performSwap(amount);
      }
    } catch (error) {
      console.error('Error in swap flow:', error);
      throw error;
    }
  };

  return {
    // State
    allowance,
    isApproving: isApproveTxPending || !!pendingSwapAmount,
    isSwapping: isSwapTxPending,
    isConnected,
    isApproveTxSuccess,
    isSwapTxSuccess,
    isApproveTxError,
    isSwapTxError,

    // Functions
    executeSwap,
    refetchAllowance,

    // Transaction hashes
    approveTxHash,
    swapTxHash,
  };
}
