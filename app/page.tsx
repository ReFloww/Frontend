import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted">
      <main className="flex flex-col items-center justify-center text-center px-4">
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            The Future of RWA P2P Lending.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Supply liquidity to tokenized real-world assets.
          </p>
          <div className="pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6 hover:scale-105 transition-transform cursor-pointer">
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
