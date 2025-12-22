'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { parseUnits } from 'viem';
import { mockUsdtAbi } from '@/lib/abis/MockUSDT';
import { ArrowLeft, Droplet, CheckCircle2, Loader2, AlertCircle, Wallet, Copy, Check } from 'lucide-react';

const USDT_ADDRESS = '0xe01c5464816a544d4d0d6a336032578bd4629F10' as `0x${string}`;
const FAUCET_AMOUNT = 1000; // 1000 USDT

export default function FaucetPage() {
  const { address, isConnected } = useAccount();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const {
    writeContract,
    data: hash,
    isPending: isWritePending,
    error: writeError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMint = async () => {
    if (!address) return;

    try {
      setIsSuccess(false);
      writeContract({
        address: USDT_ADDRESS,
        abi: mockUsdtAbi,
        functionName: 'mint',
        args: [address, parseUnits(FAUCET_AMOUNT.toString(), 6)],
      });
    } catch (error) {
      console.error('Minting error:', error);
    }
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(USDT_ADDRESS);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Update success state when transaction is confirmed
  if (isConfirmed && !isSuccess) {
    setIsSuccess(true);
  }

  const isPending = isWritePending || isConfirming;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8f4f8] via-[#f0f7fa] to-white">
      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-[#255C9C] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Centered Faucet Card */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-[#79B7D2] to-[#255C9C]">
                <Droplet className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">
                USDT Faucet
              </h1>
              <p className="text-gray-500 text-sm">
                Get free mock USDT tokens for testing
              </p>
            </div>

            {/* Network Info */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-sm font-semibold text-purple-900">
                  Mantle Sepolia Testnet
                </p>
              </div>
              <p className="text-xs text-purple-700 text-center mb-3">
                A Layer-2 scaling solution testnet for Ethereum, offering high throughput and low gas fees
              </p>

              {/* Contract Address */}
              <div className="bg-white rounded-xl p-3 border border-purple-100">
                <p className="text-xs text-purple-600 font-medium mb-2">Mock USDT Contract Address</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs text-purple-900 font-mono flex-1 break-all">
                    {USDT_ADDRESS}
                  </code>
                  <button
                    onClick={handleCopyAddress}
                    className="flex-shrink-0 p-1.5 hover:bg-purple-100 rounded-lg transition-colors"
                    title="Copy address"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-purple-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Faucet Amount Display */}
            <div className="bg-gradient-to-r from-[#79B7D2]/10 to-[#255C9C]/10 rounded-2xl p-6 mb-6 text-center">
              <p className="text-sm text-gray-600 mb-2">You will receive</p>
              <p className="text-4xl font-bold text-[#255C9C]">
                {FAUCET_AMOUNT.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">Mock USDT</p>
            </div>

            {/* Wallet Status - Only show when connected */}
            {isConnected && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-xs text-blue-600 font-medium mb-1">Connected Wallet</p>
                <p className="text-sm text-blue-900 font-mono">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
              </div>
            )}

            {/* Success Message */}
            {isSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Tokens Claimed Successfully!
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      {FAUCET_AMOUNT} USDT has been sent to your wallet
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {writeError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">
                      Transaction Failed
                    </p>
                    <p className="text-xs text-red-700 mt-1">
                      {writeError.message.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Connect Wallet or Claim Button */}
            {!isConnected ? (
              <ConnectButton.Custom>
                {({ openConnectModal, mounted }) => (
                  <button
                    onClick={openConnectModal}
                    disabled={!mounted}
                    className="w-full py-4 px-6 bg-gradient-to-r from-[#79B7D2] to-[#255C9C] text-white rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Wallet className="w-5 h-5" />
                    Connect Wallet to Claim
                  </button>
                )}
              </ConnectButton.Custom>
            ) : (
              <button
                onClick={handleMint}
                disabled={isPending}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#79B7D2] to-[#255C9C] text-white rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {isConfirming ? 'Confirming...' : 'Claiming...'}
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Claimed Successfully
                  </>
                ) : (
                  <>
                    <Droplet className="w-5 h-5" />
                    Claim {FAUCET_AMOUNT} USDT
                  </>
                )}
              </button>
            )}

            {/* Transaction Hash */}
            {hash && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Transaction Hash</p>
                <p className="text-xs text-gray-700 font-mono break-all">
                  {hash}
                </p>
              </div>
            )}

            {/* Info */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              {!isConnected ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#255C9C]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#255C9C] text-xs font-bold">1</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Connect your wallet using the button above
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#255C9C]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#255C9C] text-xs font-bold">2</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Click the claim button to receive {FAUCET_AMOUNT} mock USDT
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#255C9C]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#255C9C] text-xs font-bold">3</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Use these tokens for testing on the platform
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-500 text-center">
                  This faucet provides mock USDT tokens for testing purposes only.
                  These tokens have no real value.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
