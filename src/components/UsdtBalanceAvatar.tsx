'use client';

import { useAccount } from 'wagmi';
import { useUsdtBalance } from '@/hooks/useUsdtBalance';
import { cn } from "@/lib/utils"; // Jika menggunakan Shadcn, jika tidak pakai string biasa

export function UsdtBalanceAvatar() {
  const { address } = useAccount();
  const { balance, isLoading } = useUsdtBalance(address);

  if (!address) return null;

  return (
    <div className="flex items-center gap-1 p-1 pr-3 rounded-full bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:border-green-500/50 transition-all duration-200 shadow-sm group">
      {/* Balance Section */}
      <div className="flex flex-col ml-1">
        {isLoading ? (
          <div className="h-4 w-16 bg-zinc-300 dark:bg-zinc-600 animate-pulse rounded mt-1" />
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 font-mono">
              {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] font-extrabold text-green-600 dark:text-green-400">
              USDT
            </span>
          </div>
        )}
      </div>
    </div>
  );
}