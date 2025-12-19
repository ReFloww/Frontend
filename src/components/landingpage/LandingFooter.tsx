import Link from 'next/link';

export function LandingFooter() {
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
