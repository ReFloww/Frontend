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
          <div className="pt-4 flex gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="text-lg px-8 py-6 hover:scale-105 transition-transform cursor-pointer 
              bg-gradient-to-r from-[#0575E6] to-[#00B46D] 
             hover:brightness-110 text-white"
              >
                Get Started
              </Button>

            </Link>
            {/* <Link href="/register">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover:scale-105 transition-transform cursor-pointer">
                Register
              </Button>
            </Link> */}
          </div>
        </div>
      </main>
    </div>
  );
}
