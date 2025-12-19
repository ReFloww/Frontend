'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

// Navbar Component
function Navbar() {
  return (
    <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl">
      <div className="bg-white rounded-full shadow-lg shadow-gray-200/50 border border-gray-100 px-4 md:px-6 py-3 md:py-3.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <Image
              src="/images/logo-navbar.png"
              alt="ReFlow Logo"
              width={32}
              height={32}
              className="h-7 w-7 md:h-8 md:w-8"
            />
            <Image
              src="/images/reflow-text-navbar.png"
              alt="ReFlow"
              width={80}
              height={24}
              className="h-5 md:h-6 w-auto"
            />
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-gray-600 hover:text-[#0A6A74] transition-colors text-sm font-medium">
              About
            </Link>
            <Link href="#features" className="text-gray-600 hover:text-[#0A6A74] transition-colors text-sm font-medium">
              Feature
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-[#0A6A74] transition-colors text-sm font-medium">
              Contact
            </Link>
            <Link
              href="/faucet"
              className="px-4 py-1.5 bg-gradient-to-r from-[#79B7D2] to-[#255C9C] text-white rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Faucet
            </Link>
          </div>

          {/* CTA Button - Connect Wallet */}
          <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
              const connected = mounted && account && chain;

              return (
                <button
                  onClick={connected ? openAccountModal : openConnectModal}
                  className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-1.5 md:px-5 md:py-2 rounded-full text-sm font-medium transition-all border border-gray-300 hover:border-gray-400 hover:shadow-sm"
                >
                  {connected ? `${account.displayName}` : 'Connect wallet'}
                </button>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </nav>
  );
}

// Hero Section Component
function HeroSection() {
  const router = useRouter();
  const { isConnected } = useAccount();

  const handleHeroButtonClick = () => {
    if (isConnected) {
      router.push('/dashboard');
    }
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen pt-24 md:pt-28 overflow-hidden">
      {/* Background Layer 1: Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#e8f4f8] via-[#f0f7fa] to-white" />

      {/* Background Layer 2: Blurred Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[140vw] md:w-[100vw] lg:w-[80vw] aspect-square">
        <div className="w-full h-full rounded-full border-[40px] md:border-[60px] lg:border-[80px] border-white/60 blur-[60px] md:blur-[80px] lg:blur-[100px]" />
      </div>

      {/* Secondary inner ring for more depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[120vw] md:w-[85vw] lg:w-[65vw] aspect-square">
        <div className="w-full h-full rounded-full border-[30px] md:border-[50px] lg:border-[60px] border-[#A0C5D5]/30 blur-[40px] md:blur-[60px] lg:blur-[80px]" />
      </div>

      {/* Decorative 3D Assets */}
      {/* Coin - Top Left */}
      <div className="absolute top-[18%] md:top-[20%] left-[5%] md:left-[12%] lg:left-[18%] w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 animate-float z-10">
        <Image src="/images/coin-asset.png" alt="" fill className="object-contain" />
      </div>

      {/* Coin - Top Right */}
      <div className="absolute top-[15%] md:top-[18%] right-[5%] md:right-[12%] lg:right-[18%] w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 animate-float-delayed z-10">
        <Image src="/images/coin-asset.png" alt="" fill className="object-contain" />
      </div>

      {/* Defense/Shield - Left Middle-Bottom */}
      <div className="absolute top-[45%] md:top-[50%] left-[3%] md:left-[8%] lg:left-[15%] w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 animate-float z-10">
        <Image src="/images/defense-asset.png" alt="" fill className="object-contain" />
      </div>

      {/* Wallet - Right Middle-Bottom */}
      <div className="absolute top-[50%] md:top-[55%] right-[3%] md:right-[8%] lg:right-[15%] w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 animate-float-delayed z-10">
        <Image src="/images/wallet-asset.png" alt="" fill className="object-contain" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 lg:pt-28">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a2e] leading-[1.15]">
            A Transparent, Trustless<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Approach to P2P Lending
          </h1>
          <p className="mt-5 md:mt-6 text-gray-500 text-sm md:text-base lg:text-lg max-w-xl md:max-w-2xl mx-auto leading-relaxed px-4">
            Unlock secure, round-the-clock lending powered by blockchain,
            built for lenders who demand clarity, efficiency, and control.
          </p>
          <div className="mt-7 md:mt-8">
            {isConnected ? (
              <button
                onClick={handleHeroButtonClick}
                className="bg-[#255C9C] hover:bg-[#1e4d82] text-white px-7 md:px-8 py-3 md:py-3.5 rounded-full text-sm md:text-base font-semibold transition-all hover:shadow-xl hover:scale-105 active:scale-100"
              >
                Launch ReFlow
              </button>
            ) : (
              <ConnectButton.Custom>
                {({ openConnectModal, mounted }) => {
                  return (
                    <button
                      onClick={openConnectModal}
                      disabled={!mounted}
                      className="bg-[#255C9C] hover:bg-[#1e4d82] text-white px-7 md:px-8 py-3 md:py-3.5 rounded-full text-sm md:text-base font-semibold transition-all hover:shadow-xl hover:scale-105 active:scale-100 disabled:opacity-50"
                    >
                      Connect Wallet
                    </button>
                  );
                }}
              </ConnectButton.Custom>
            )}
          </div>
        </div>
      </div>

      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}

// Main LandingHeader Component
export function LandingHeader() {
  return (
    <>
      <Navbar />
      <HeroSection />
    </>
  );
}
