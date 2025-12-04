'use client';

import SwapCard from '@/components/swap/swap-card';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SwapContent() {
  const searchParams = useSearchParams();
  const initialSellTokenId = searchParams.get('sellToken');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#225B3A]">SWAP</h1>
        {/* <p className="text-muted-foreground mt-1">Exchange tokens seamlessly</p> */}
      </div>

      {/* Swap Interface */}
      <div className="max-w-xl mx-auto">
        <SwapCard initialSellTokenId={initialSellTokenId} />
      </div>
    </div>
  );
}

export default function SwapPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <SwapContent />
    </Suspense>
  );
}
