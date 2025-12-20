'use client';

import React from 'react';
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="flex justify-center mb-10 md:mb-14">
          <span className="inline-block px-5 md:px-6 py-2 bg-white text-[#255C9C] rounded-full text-xs md:text-sm font-medium border border-[#255C9C]">
            What is ReFlow?
          </span>
        </div>

        {/* Horizontal Layout: Image | Content */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[320px] md:max-w-[360px]">
              <Image
                src="/images/what-is-reflow-image.png"
                alt="Real-World Lending"
                width={400}
                height={300}
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* Content */}
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1a1a2e] leading-tight mb-4">
              P2P Lending with <br />
              <span className="text-[#255C9C]">Full Transparency and Liquidity</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              ReFlow is a platform that helps P2P lending investors access their money sooner.
              Instead of waiting until the loan ends, investors can sell their investment to others who want to earn the returns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Managers Marquee Section
function ManagersMarquee() {
  const managers = [
    { name: 'BRI', logo: '/images/BRI-logo.png' },
    { name: 'BNI', logo: '/images/BNI-logo.png' },
    { name: 'Mandiri', logo: '/images/Mandiri-logo.png' },
  ];

  // Repeat enough times to fill screen
  const repeatedManagers = [...managers, ...managers, ...managers, ...managers, ...managers, ...managers];

  return (
    <section className="py-4 md:py-5" style={{ backgroundColor: '#F9FBFD' }}>
      <div className="marquee">
        <div className="marquee-track">
          {/* First half */}
          {repeatedManagers.map((manager, index) => (
            <div key={`a-${index}`} className="marquee-item">
              <Image
                src={manager.logo}
                alt={manager.name}
                width={120}
                height={48}
                className="h-8 md:h-10 w-auto object-contain opacity-70"
              />
            </div>
          ))}
          {/* Second half for seamless loop */}
          {repeatedManagers.map((manager, index) => (
            <div key={`b-${index}`} className="marquee-item">
              <Image
                src={manager.logo}
                alt={manager.name}
                width={120}
                height={48}
                className="h-8 md:h-10 w-auto object-contain opacity-70"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Simple Flow Diagram with numbered nodes
const FlowDiagram = ({ steps }: { steps: string[] }) => (
  <svg viewBox="0 0 500 95" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
    {/* Curved connecting paths */}
    <path
      d="M60 25 Q100 25 115 35 Q130 50 160 50"
      fill="none"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="2"
      strokeDasharray="5 4"
    />
    <path
      d="M200 50 Q230 50 245 35 Q260 20 290 20"
      fill="none"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="2"
      strokeDasharray="5 4"
    />
    <path
      d="M330 20 Q360 20 375 35 Q390 50 420 50"
      fill="none"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="2"
      strokeDasharray="5 4"
    />

    {/* Node 1 */}
    <circle cx="50" cy="25" r="14" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    <text x="50" y="30" textAnchor="middle" fill="white" fontSize="12" fontWeight="500">1</text>
    <text x="50" y="53" textAnchor="middle" fill="white" fontSize="9" opacity="0.7">{steps[0]}</text>

    {/* Node 2 */}
    <circle cx="180" cy="50" r="14" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    <text x="180" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="500">2</text>
    <text x="180" y="78" textAnchor="middle" fill="white" fontSize="9" opacity="0.7">{steps[1]}</text>

    {/* Node 3 */}
    <circle cx="310" cy="20" r="14" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    <text x="310" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="500">3</text>
    <text x="310" y="48" textAnchor="middle" fill="white" fontSize="9" opacity="0.7">{steps[2]}</text>

    {/* Node 4 */}
    <circle cx="440" cy="50" r="14" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
    <text x="440" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="500">4</text>
    <text x="440" y="78" textAnchor="middle" fill="white" fontSize="9" opacity="0.7">{steps[3]}</text>
  </svg>
);

// Key Features Section - Stacked Cards (Slide & Fade)
function KeyFeaturesSection() {
  const [activeMode, setActiveMode] = React.useState<'managed' | 'self'>('managed');

  const managedSteps = ['Deposit', 'Auto Allocate', 'Earn Yield', 'Exit Anytime'];
  const selfSteps = ['Browse', 'Buy Tokens', 'Monitor', 'Sell / Hold'];

  return (
    <section id="features" className="py-14 md:py-20 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="flex justify-center mb-6 md:mb-8">
          <span className="inline-block px-5 md:px-6 py-2 bg-white text-[#255C9C] rounded-full text-xs md:text-sm font-medium border border-[#255C9C]">
            Choose How You Lend
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-center text-gray-500 text-sm md:text-base mb-8 max-w-md mx-auto">
          Two modes. You decide.
        </p>

        {/* Toggle - NOW AT TOP with colors */}
        <div className="flex justify-center mb-8">
          <div className="relative inline-flex items-center p-1 bg-gray-100 rounded-full">
            {/* Sliding background indicator */}
            <div
              className={`absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-out ${
                activeMode === 'managed'
                  ? 'left-1 w-[100px] md:w-[110px] bg-gradient-to-r from-[#5A9FCA] to-[#2E6BA8]'
                  : 'left-[108px] md:left-[118px] w-[120px] md:w-[130px] bg-gradient-to-r from-[#7B6BA5] to-[#4A3F7B]'
              }`}
            />
            <button
              onClick={() => setActiveMode('managed')}
              className={`relative z-10 px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeMode === 'managed'
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Managed
            </button>
            <button
              onClick={() => setActiveMode('self')}
              className={`relative z-10 px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeMode === 'self'
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Self-Managed
            </button>
          </div>
        </div>

        {/* Single Card - Changes based on toggle */}
        <div
          className="rounded-2xl p-6 md:p-8 shadow-lg transition-all duration-400"
          style={{
            background: activeMode === 'managed'
              ? 'linear-gradient(145deg, #5A9FCA 0%, #2E6BA8 100%)'
              : 'linear-gradient(145deg, #7B6BA5 0%, #4A3F7B 100%)'
          }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-1">
                {activeMode === 'managed' ? 'Managed Lending' : 'Self-Managed Lending'}
              </h3>
              <p className="text-white/70 text-sm">
                {activeMode === 'managed' ? 'Set it and forget it' : 'Full control over your portfolio'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
              {activeMode === 'managed' ? (
                <>
                  <span className="px-3 py-1 bg-white/15 rounded-full text-white/90 text-xs">Beginners</span>
                  <span className="px-3 py-1 bg-white/15 rounded-full text-white/90 text-xs">Passive</span>
                </>
              ) : (
                <>
                  <span className="px-3 py-1 bg-white/15 rounded-full text-white/90 text-xs">Active</span>
                  <span className="px-3 py-1 bg-white/15 rounded-full text-white/90 text-xs">Experienced</span>
                </>
              )}
            </div>
          </div>

          {/* Flow Diagram */}
          <div className="mt-6 mb-6 md:mt-8 md:mb-7">
            <FlowDiagram steps={activeMode === 'managed' ? managedSteps : selfSteps} />
          </div>

          <p className="text-white/60 text-xs md:text-sm text-center">
            {activeMode === 'managed'
              ? 'Your funds are automatically allocated and managed by trusted strategies.'
              : 'Choose, trade, and manage loan assets directly on-chain.'}
          </p>
        </div>
      </div>
    </section>
  );
}

// Icons for comparison features
const LiquidityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path d="M12 2L12 22M12 2C12 2 8 6 8 12C8 18 12 22 12 22M12 2C12 2 16 6 16 12C16 18 12 22 12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3" />
  </svg>
);

const TransparencyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ControlIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const AccessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CustodyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path d="M12 2L4 6V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Why Lenders Choose ReFlow Section - Comparison Table
function WhyLendersSection() {
  const comparisonData = [
    {
      feature: "Liquidity",
      icon: LiquidityIcon,
      traditional: "Locked 6-12 months",
      reflow: "Exit anytime"
    },
    {
      feature: "Transparency",
      icon: TransparencyIcon,
      traditional: "Platform-reported",
      reflow: "On-chain"
    },
    {
      feature: "Portfolio Control",
      icon: ControlIcon,
      traditional: "Manual",
      reflow: "Managed or self-managed"
    },
    {
      feature: "Access",
      icon: AccessIcon,
      traditional: "Office hours",
      reflow: "Always on"
    },
    {
      feature: "Custody",
      icon: CustodyIcon,
      traditional: "Platform-held",
      reflow: "Non-custodial"
    }
  ];

  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-14 md:py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fbfc] via-white to-white" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] md:w-[1100px] h-[200px] bg-[#B1CCD0] rounded-full blur-[100px] opacity-15" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className={`flex justify-center mb-10 md:mb-14 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block px-5 md:px-6 py-2 bg-white text-[#255C9C] rounded-full text-xs md:text-sm font-medium border border-[#255C9C]">
            Why Lenders Choose Reflow?
          </span>
        </div>

        {/* Comparison Cards Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Traditional P2P Lending Card */}
          <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="bg-gradient-to-r from-gray-500 to-gray-600 px-6 py-4">
              <h3 className="text-white font-semibold text-lg text-center">Other Traditional P2P Lending</h3>
            </div>
            <div className="p-4 md:p-6">
              {comparisonData.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 py-4 ${index !== comparisonData.length - 1 ? 'border-b border-gray-100' : ''} ${isVisible ? `animate-fade-in-up comparison-row-${index + 1}` : 'opacity-0'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 flex-shrink-0">
                    <item.icon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{item.feature}</p>
                    <p className="text-gray-600 font-medium">{item.traditional}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reflow Card - Highlighted */}
          <div className={`bg-white rounded-2xl shadow-lg border-2 border-[#255C9C]/20 overflow-hidden animate-glow-pulse ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="bg-gradient-to-r from-[#4A90B8] to-[#255C9C] px-6 py-4">
              <h3 className="text-white font-semibold text-lg text-center">Reflow</h3>
            </div>
            <div className="p-4 md:p-6">
              {comparisonData.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 py-4 ${index !== comparisonData.length - 1 ? 'border-b border-[#255C9C]/10' : ''} group hover:bg-[#255C9C]/5 rounded-lg transition-colors duration-200 -mx-2 px-2 ${isVisible ? `animate-fade-in-up comparison-row-${index + 1}` : 'opacity-0'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#79B7D2] to-[#255C9C] flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <item.icon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#255C9C] uppercase tracking-wide mb-1 font-medium">{item.feature}</p>
                    <p className="text-[#1a1a2e] font-semibold">{item.reflow}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View - Merged Table (for smaller screens) */}
        <div className="lg:hidden mt-8">
          <div className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr>
                    <th className="bg-gradient-to-r from-[#4A90B8] to-[#255C9C] text-white py-3 px-4 text-left text-sm font-semibold">Feature</th>
                    <th className="bg-gray-500 text-white py-3 px-4 text-center text-sm font-semibold">Traditional</th>
                    <th className="bg-gradient-to-r from-[#4A90B8] to-[#255C9C] text-white py-3 px-4 text-center text-sm font-semibold">Reflow</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'} hover:bg-[#255C9C]/5 transition-colors`}>
                      <td className="py-3 px-4 text-sm font-medium text-[#1a1a2e] flex items-center gap-2">
                        <span className="text-[#255C9C]"><item.icon /></span>
                        {item.feature}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500 text-center">{item.traditional}</td>
                      <td className="py-3 px-4 text-sm text-[#255C9C] font-semibold text-center">{item.reflow}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
            {/* OJK Regulation */}
            <p className="text-gray-600 text-base md:text-lg font-medium">
              Regulated by OJK (Otoritas Jasa Keuangan)
            </p>
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
            © 2025 ReFlow. All rights reserved.
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
      <ManagersMarquee />
      <KeyFeaturesSection />
      <WhyLendersSection />
      <PartnershipSection />
      <CTASection />
      <Footer />
    </div>
  );
}
