'use client';

import { LandingHeader } from '@/components/landingpage/LandingHeader';
import { LandingContent } from '@/components/landingpage/LandingContent';
import { LandingFooter } from '@/components/landingpage/LandingFooter';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <LandingContent />
      <LandingFooter />
    </div>
  );
}
