'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, History, Settings, Briefcase, TrendingUp, Package, Bot, User, Droplet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UsdtBalanceAvatar } from '@/components/UsdtBalanceAvatar';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Market', href: '/market', icon: TrendingUp },
  { name: 'Investment Funds', href: '/investment-funds', icon: Bot },
  { name: 'History', href: '/history', icon: History },
  { name: 'Settings', href: '/settings', icon: Settings },
  // { name: 'Profile', href: '/profile', icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b px-6">
            <Image
              src="/images/ReFloww.png"
              alt="ReFlow Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold text-[#225B3A]">ReFlow</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-3 p-4 pt-7">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#225B3A] text-white shadow-sm hover:bg-[#1C4A30]'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>

              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-6">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold">
              {navigation.find((item) => item.href === pathname)?.name || ''}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Faucet Button */}
            <Link
              href="/faucet"
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#79B7D2] to-[#255C9C] px-4 py-2 text-white hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Droplet className="h-4 w-4" />
              <span className="text-sm font-medium">Faucet</span>
            </Link>

            {/* USDT Balance */}
            <UsdtBalanceAvatar />

            {/* Connect Button */}
            <ConnectButton />

            {/* Profile Link */}
            <Link href="/profile" className="flex items-center gap-3 rounded-lg border bg-muted/50 px-3 py-2 hover:bg-muted transition-colors cursor-pointer">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">Profile</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
