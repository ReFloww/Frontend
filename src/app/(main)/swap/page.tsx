'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SwapCard from '@/components/swap/swap-card';
import { fetchMarketList, MarketItem } from '@/lib/api';
import { TokenizedProduct } from '@/types/product-market';
import { Sprout, Fish, TreePine, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Icon mapping based on category
const getCategoryIcon = (category: string | null | undefined) => {
  if (!category) return Sprout;
  switch (category.toLowerCase()) {
    case 'agriculture':
      return Sprout;
    case 'fisheries':
      return Fish;
    case 'forestry':
      return TreePine;
    default:
      return Sprout;
  }
};

// Convert API response to TokenizedProduct format
const mapApiToProduct = (item: MarketItem): TokenizedProduct => ({
  id: item.id,
  productName: item.name,
  symbol: item.symbol,
  categoryId: item.categoryId as 'Agriculture' | 'Fisheries' | 'Forestry',
  description: item.description,
  loanInterest: parseFloat(item.loanInterest),
  loanAmount: parseFloat(item.loanAmount),
  loanTenor: item.loanTenor,
  creditRate: item.creditRate as 'A' | 'B' | 'C',
  contractId: item.contractAddress,
  tokenP2PAddress: item.contractAddress as `0x${string}`,
  holderCount: parseInt(item.holderCount) || 0,
  status: item.status,
  icon: getCategoryIcon(item.categoryId),
});

export default function SwapPage() {
  const searchParams = useSearchParams();
  const sellTokenParam = searchParams.get('sellToken');

  const [products, setProducts] = useState<TokenizedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch market data on component mount
  useEffect(() => {
    const loadMarketData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMarketList();
        const mappedProducts = data.map(mapApiToProduct);
        setProducts(mappedProducts);
      } catch (err) {
        console.error('Error loading market data:', err);
        setError('Failed to load market data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadMarketData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading swap data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <AlertCircle className="h-8 w-8 mx-auto text-destructive" />
          <p className="text-destructive font-medium">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#225B3A]">SWAP</h1>
        {/* <p className="text-muted-foreground mt-1">Exchange tokens seamlessly</p> */}
      </div>

      {/* Swap Interface */}
      <div className="max-w-xl mx-auto">
        <SwapCard products={products} initialSellTokenId={sellTokenParam} />
      </div>
    </div>
  );
}
