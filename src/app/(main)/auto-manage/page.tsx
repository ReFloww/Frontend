'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronDown, Users, Wallet, Sprout, Fish, TreePine, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDeployedManagers } from '@/hooks/useAutoManage';
import { managerMetadata, defaultManagerMetadata, formatAUM, getRiskColor, getCategoryColor } from '@/lib/constants/manager-metadata';

export default function AutoManagePage() {
  const router = useRouter();
  const { managers: onChainManagers, isLoading } = useDeployedManagers();

  // Combine on-chain data with off-chain metadata
  const managers = onChainManagers.map((manager) => {
    const addressLower = manager.address.toLowerCase();
    const metadata = managerMetadata[addressLower] || defaultManagerMetadata;

    return {
      id: manager.address,
      name: metadata.displayName || manager.name, // Use displayName if available, fallback to on-chain name
      address: manager.address,
      owner: manager.owner,
      avatar: metadata.avatar,
      riskLevel: metadata.riskLevel,
      maxProfit: metadata.maxProfit,
      experience: metadata.experience,
      totalAUM: formatAUM(manager.totalDeposits),
      totalInvestors: 0, // Would need to track this separately
      products: metadata.products,
    };
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#225B3A]">Auto Manage</h1>
          <p className="text-muted-foreground mt-1">
            Choose a manager to handle your portfolio automatically
          </p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <Skeleton className="w-24 h-24 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (managers.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#225B3A]">Auto Manage</h1>
          <p className="text-muted-foreground mt-1">
            Choose a manager to handle your portfolio automatically
          </p>
        </div>
        <Card className="border-2 border-dashed">
          <CardContent className="p-12 text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Managers Available</h3>
            <p className="text-muted-foreground">
              There are no investment managers deployed yet. Check back later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#225B3A]">Auto Manage</h1>
        <p className="text-muted-foreground mt-1">
          Choose a manager to handle your portfolio automatically
        </p>
      </div>

      {/* Managers List */}
      <div className="space-y-4">
        {managers.map((manager) => (
          <Card
            key={manager.id}
            className="border-2 hover:border-[#225B3A]/50 transition-all cursor-pointer group overflow-hidden"
            onClick={() => router.push(`/auto-manage/${manager.id}`)}
          >
            <CardContent className="p-0">
              {/* Main Card Content */}
              <div className="flex items-center gap-6 p-6">
                {/* Avatar */}
                <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-muted">
                  <Image
                    src={manager.avatar}
                    alt={manager.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{manager.name}</h3>
                    <Badge
                      variant="outline"
                      className={`${getRiskColor(manager.riskLevel)} font-medium`}
                    >
                      {manager.riskLevel}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                    <p className="text-muted-foreground">
                      Max profit: <span className="font-semibold text-foreground">{manager.maxProfit}</span>
                    </p>
                    <p className="text-muted-foreground">
                      Experience: <span className="font-semibold text-foreground">{manager.experience}</span>
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Wallet className="h-3.5 w-3.5" />
                      AUM: <span className="font-semibold text-foreground">{manager.totalAUM}</span>
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      Investors: <span className="font-semibold text-foreground">{manager.totalInvestors}</span>
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-[#225B3A] transition-colors">
                    <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>

              {/* Hover Dropdown - Products Handled */}
              <div className="max-h-0 group-hover:max-h-48 overflow-hidden transition-all duration-300 ease-in-out">
                <div className="border-t bg-muted/30 px-6 py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Products Handled</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {manager.products.map((product, index) => {
                      const ProductIcon = product.icon;
                      return (
                        <div
                          key={index}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${getCategoryColor(product.category)}`}
                        >
                          <ProductIcon className="h-3.5 w-3.5" />
                          <span>{product.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
