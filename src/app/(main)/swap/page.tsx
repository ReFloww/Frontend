'use client';

import SwapCard from '@/components/swap/swap-card';

export default function SwapPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#225B3A]">Swap</h1>
        <p className="text-muted-foreground mt-1">Exchange tokens seamlessly</p>
      </div>

      {/* Swap Interface */}
      <div className="max-w-xl mx-auto">
        <SwapCard />
      </div>
    </div>
  );
}
