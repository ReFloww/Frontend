'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

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

// Main LandingContent Component
export function LandingContent() {
  return (
    <>
      <WhatIsReFlowSection />
      <KeyFeaturesSection />
      <WhyLendersSection />
      <PartnershipSection />
      <CTASection />
    </>
  );
}
