'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

// SVG Icons for Features
const CoinIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <circle cx="24" cy="24" r="20" fill="url(#coinGradient)" />
    <circle cx="24" cy="24" r="16" stroke="#7DD3E8" strokeWidth="2" fill="none" opacity="0.5" />
    <circle cx="24" cy="24" r="12" stroke="#7DD3E8" strokeWidth="1" fill="none" opacity="0.3" />
    <defs>
      <linearGradient id="coinGradient" x1="4" y1="4" x2="44" y2="44">
        <stop stopColor="#B8E4F0" />
        <stop offset="1" stopColor="#7DD3E8" />
      </linearGradient>
    </defs>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <path d="M24 4L6 12V22C6 33.05 13.92 43.22 24 46C34.08 43.22 42 33.05 42 22V12L24 4Z" fill="url(#shieldGradient)" />
    <path d="M24 8L10 14V22C10 31.05 16.42 39.22 24 41.5C31.58 39.22 38 31.05 38 22V14L24 8Z" stroke="#7DD3E8" strokeWidth="1" fill="none" opacity="0.5" />
    <defs>
      <linearGradient id="shieldGradient" x1="6" y1="4" x2="42" y2="46">
        <stop stopColor="#B8E4F0" />
        <stop offset="1" stopColor="#7DD3E8" />
      </linearGradient>
    </defs>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <circle cx="24" cy="24" r="20" fill="url(#clockGradient)" />
    <circle cx="24" cy="24" r="16" stroke="#7DD3E8" strokeWidth="1" fill="none" opacity="0.3" />
    <path d="M24 14V24L30 30" stroke="#0A6A74" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="clockGradient" x1="4" y1="4" x2="44" y2="44">
        <stop stopColor="#B8E4F0" />
        <stop offset="1" stopColor="#7DD3E8" />
      </linearGradient>
    </defs>
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <rect x="4" y="4" width="40" height="40" rx="8" fill="url(#chartGradient)" />
    <path d="M12 32L20 24L28 28L36 16" stroke="#0A6A74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="20" cy="24" r="2" fill="#0A6A74" />
    <circle cx="28" cy="28" r="2" fill="#0A6A74" />
    <circle cx="36" cy="16" r="2" fill="#0A6A74" />
    <defs>
      <linearGradient id="chartGradient" x1="4" y1="4" x2="44" y2="44">
        <stop stopColor="#B8E4F0" />
        <stop offset="1" stopColor="#7DD3E8" />
      </linearGradient>
    </defs>
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <circle cx="24" cy="24" r="20" fill="url(#globeGradient)" />
    <ellipse cx="24" cy="24" rx="8" ry="20" stroke="#0A6A74" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M4 24H44" stroke="#0A6A74" strokeWidth="1.5" opacity="0.5" />
    <path d="M8 14H40" stroke="#0A6A74" strokeWidth="1" opacity="0.3" />
    <path d="M8 34H40" stroke="#0A6A74" strokeWidth="1" opacity="0.3" />
    <defs>
      <linearGradient id="globeGradient" x1="4" y1="4" x2="44" y2="44">
        <stop stopColor="#B8E4F0" />
        <stop offset="1" stopColor="#7DD3E8" />
      </linearGradient>
    </defs>
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <circle cx="22" cy="22" r="14" fill="url(#searchGradient)" />
    <circle cx="22" cy="22" r="10" stroke="#0A6A74" strokeWidth="2" fill="none" opacity="0.5" />
    <path d="M32 32L42 42" stroke="#7DD3E8" strokeWidth="4" strokeLinecap="round" />
    <defs>
      <linearGradient id="searchGradient" x1="8" y1="8" x2="36" y2="36">
        <stop stopColor="#B8E4F0" />
        <stop offset="1" stopColor="#7DD3E8" />
      </linearGradient>
    </defs>
  </svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <path d="M24 4C24 4 32 12 32 24C32 36 24 44 24 44C24 44 16 36 16 24C16 12 24 4 24 4Z" fill="url(#rocketGradient)" />
    <circle cx="24" cy="20" r="4" fill="#0A6A74" opacity="0.5" />
    <path d="M16 32L12 40L20 36" fill="#7DD3E8" />
    <path d="M32 32L36 40L28 36" fill="#7DD3E8" />
    <defs>
      <linearGradient id="rocketGradient" x1="16" y1="4" x2="32" y2="44">
        <stop stopColor="#B8E4F0" />
        <stop offset="1" stopColor="#7DD3E8" />
      </linearGradient>
    </defs>
  </svg>
);

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
            <button disabled className="text-gray-400 cursor-not-allowed text-sm font-medium">
              Register
            </button>
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

// Hero Section
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

// What is ReFlow Section
function WhatIsReFlowSection() {
  return (
    <section id="about" className="py-14 md:py-20 lg:py-24 bg-white">
      <div className="w-[calc(100%-2rem)] max-w-4xl mx-auto">
        {/* Section Label */}
        <div className="flex justify-center mb-10 md:mb-14">
          <span className="inline-block px-5 md:px-6 py-2 bg-white text-[#255C9C] rounded-full text-xs md:text-sm font-medium border border-[#255C9C]">
            What is ReFlow?
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[280px] md:max-w-[300px] lg:max-w-[340px]">
              <Image
                src="/images/what-is-reflow-image.png"
                alt="Real-World Lending"
                width={400}
                height={300}
                className="w-full h-auto rounded-2xl shadow-md"
              />
            </div>
          </div>

          {/* Content */}
          <div className="text-center md:text-left md:pl-0 lg:pl-0">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1a1a2e] leading-tight">
              Real-World Lending Logic,<br />
              Upgraded
            </h2>
            <p className="mt-3 md:mt-4 text-gray-500 text-sm md:text-base leading-relaxed max-w-sm mx-auto md:mx-0">
              Built on the proven framework of Restock.id, ReFlow transforms
              traditional P2P lending mechanics into a transparent and
              programmable blockchain ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Key Features Section
function KeyFeaturesSection() {
  const features = [
    {
      icon: "/images/icon-lending.png",
      title: "Built on Proven Lending Logic",
      description: "ReFlow adapts Restock.id's successful lending flow with a fully on-chain backend."
    },
    {
      icon: "/images/icon-security.png",
      title: "Institutional-Grade Security",
      description: "Smart contracts and immutable ledgers protect every asset and transaction."
    },
    {
      icon: "/images/icon-availability.png",
      title: "Always-On Availability",
      description: "On-chain infrastructure keeps lending open, verifiable, and accessible anytime."
    },
    {
      icon: "/images/icon-yield.png",
      title: "Optimized Yield Efficiency",
      description: "Clear fees and streamlined operations ensure lenders keep more of their returns."
    }
  ];

  return (
    <section id="features" className="py-14 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="flex justify-center mb-10 md:mb-14">
          <span className="inline-block px-5 md:px-6 py-2 bg-white text-[#255C9C] rounded-full text-xs md:text-sm font-medium border border-[#255C9C]">
            Key Features
          </span>
        </div>

        {/* Features Grid - 2x2 layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 md:p-8 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #79B7D2 0%, #255C9C 100%)'
              }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 mb-4 relative">
                <Image
                  src={feature.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 leading-snug">
                {feature.title}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Lenders Choose ReFlow Section
function WhyLendersSection() {
  const reasons = [
    {
      title: "Always-On Infrastructure",
      description: "Your lending doesn't pause for downtime. The chain runs continuously."
    },
    {
      title: "On-Chain Transparency",
      description: "Everything is visible, immutable, and auditable. If it moves, you can track it."
    },
    {
      title: "Effortless Growth with Auto-Managed Lending",
      description: "Let trusted managers grow your lending automatically."
    },
    {
      title: "Instant Portfolio Insights",
      description: "Track performance instantly through on-chain data with no delays."
    }
  ];

  return (
    <section className="relative py-14 md:py-20 lg:py-24 overflow-hidden">
      {/* Background - mostly white with subtle greeny hint spanning across cards */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] md:w-[1100px] h-[150px] bg-[#B1CCD0] rounded-full blur-[80px] opacity-20" />

      <div className="relative z-10">
        {/* Section Label */}
        <div className="flex justify-center mb-10 md:mb-14">
          <span className="inline-block px-5 md:px-6 py-2 bg-white text-[#255C9C] rounded-full text-xs md:text-sm font-medium border border-[#255C9C]">
            Why Lenders Choose Reflow?
          </span>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 md:gap-6 px-4 sm:px-6 lg:px-8 pb-4 min-w-max md:min-w-0 md:justify-center">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm min-w-[280px] max-w-[300px] md:min-w-[260px] md:max-w-[280px] flex-shrink-0"
              >
                <h3 className="text-lg md:text-xl font-bold text-[#1a1a2e] mb-3 leading-snug text-center">
                  {reason.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed text-center">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Partnership Section
function PartnershipSection() {
  return (
    <section className="py-14 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="flex justify-center mb-10 md:mb-14">
          <span className="inline-block px-5 md:px-6 py-2 bg-white text-[#255C9C] rounded-full text-xs md:text-sm font-medium border border-[#255C9C]">
            Partnership & Compliance
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-4 lg:gap-6 items-start">
          {/* Logos */}
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <Image
              src="/images/restock-icon.png"
              alt="Restock.id"
              width={200}
              height={60}
              className="w-[160px] md:w-[200px] h-auto"
            />
            <div className="text-gray-800 text-xl md:text-2xl font-normal">×</div>
            <Image
              src="/images/reflow-icon.png"
              alt="ReFlow"
              width={160}
              height={55}
              className="w-[130px] md:w-[160px] h-auto"
            />
          </div>

          {/* Content */}
          <div className="space-y-6 md:space-y-8 md:-ml-8 lg:-ml-12">
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              ReFlow is built on the proven compliance and operational model of
              Restock.id, bringing its established borrower workflows and repayment
              structure onto the blockchain. By combining real-world lending standards
              with on-chain transparency, ReFlow ensures every validation, repayment,
              and RWA record is verifiable, automated, and aligned with trusted regulatory
              practices.
            </p>
            {/* Quoted text with left border */}
            <div className="border-l-4 border-[#1a1a2e] pl-5 md:pl-6">
              <p className="text-[#1a1a2e] text-base md:text-lg font-semibold leading-relaxed">
                ReFlow applies Restock.id&apos;s proven processes with on-chain transparency that&apos;s always open and auditable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const router = useRouter();
  const { isConnected } = useAccount();

  const handleCTAButtonClick = () => {
    if (isConnected) {
      router.push('/dashboard');
    }
  };

  return (
    <section id="contact" className="py-14 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-2xl overflow-hidden max-w-4xl mx-auto"
          style={{
            background: 'linear-gradient(135deg, #79B7D2 0%, #255C9C 100%)'
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 p-5 md:p-6">
            {/* Image - Left side, inside card */}
            <div className="w-full md:w-[45%] flex-shrink-0">
              <Image
                src="/images/CTA-image.png"
                alt="Lending Platform"
                width={350}
                height={230}
                className="w-full h-auto rounded-xl"
              />
            </div>

            {/* Content - Right side */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                Step Into the Next<br />
                Evolution of Lending
              </h2>
              <p className="mt-3 text-white/80 text-sm leading-relaxed">
                No gatekeepers. No blind spots. Just programmable, transparent, on-chain lending.
              </p>
              <div className="mt-5">
                {isConnected ? (
                  <button
                    onClick={handleCTAButtonClick}
                    className="bg-white hover:bg-gray-50 text-[#255C9C] px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg active:scale-[0.98]"
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
                          className="bg-white hover:bg-gray-50 text-[#255C9C] px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
                        >
                          Launch ReFlow
                        </button>
                      );
                    }}
                  </ConnectButton.Custom>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-6 md:py-8 bg-[#5995BE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <p className="text-white/80 text-xs md:text-sm">
            © 2024 ReFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="#" className="text-white/80 hover:text-white text-xs md:text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/80 hover:text-white text-xs md:text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <WhatIsReFlowSection />
      <KeyFeaturesSection />
      <WhyLendersSection />
      <PartnershipSection />
      <CTASection />
      <Footer />
    </div>
  );
}
