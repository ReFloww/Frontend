import SwapCard from '@/components/market/swap-card';

export default function MarketPage() {
  return (
    <div className="space-y-8 py-8">
      <div className="text-center space-y-2">
        <p className="text-muted-foreground">Get RSF tokens and earn rewards through lending</p>
      </div>
      <SwapCard />
    </div>
  );
}