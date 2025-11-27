'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, History, Settings, Briefcase, TrendingUp, Package, Wallet, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Market', href: '/market', icon: TrendingUp },
  { name: 'Wallet', href: '/wallet', icon: Wallet },
  { name: 'History', href: '/history', icon: History },
  { name: 'Settings', href: '/settings', icon: Settings },
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
          <div className="flex h-16 items-center border-b px-6">
            <h1 className="text-xl font-bold">RWA Lending</h1>
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
                      ? 'bg-primary text-primary-foreground'
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
              {navigation.find((item) => item.href === pathname)?.name || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-lg border bg-muted/50 px-3 py-2 hover:bg-muted transition-colors cursor-pointer">
            <User className="h-5 w-5" />
            <span className="text-sm font-medium">Profile</span>
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
