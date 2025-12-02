'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronDown, Users, Wallet, Sprout, Fish, TreePine } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Mock managers data
const managers = [
  {
    id: '1',
    name: 'John Doe',
    avatar: '/images/john-doe.png',
    riskLevel: 'High Risk',
    maxProfit: '20%',
    experience: '2 years',
    totalAUM: '$1.2M',
    totalInvestors: 156,
    products: [
      { name: 'Green Valley Farms', category: 'Agriculture', icon: Sprout },
      { name: 'Ocean Harvest Co.', category: 'Fisheries', icon: Fish },
      { name: 'Sunrise Agriculture', category: 'Agriculture', icon: Sprout },
    ],
  },
  {
    id: '2',
    name: 'Sarah Smith',
    avatar: '/images/sarah-smith.png',
    riskLevel: 'Medium Risk',
    maxProfit: '10%',
    experience: '3 years',
    totalAUM: '$850K',
    totalInvestors: 98,
    products: [
      { name: 'Timber Works Ltd', category: 'Forestry', icon: TreePine },
      { name: 'Valley Crops Farm', category: 'Agriculture', icon: Sprout },
    ],
  },
  {
    id: '3',
    name: 'Michael Chen',
    avatar: '/images/michael-chen.png',
    riskLevel: 'Low Risk',
    maxProfit: '5%',
    experience: '5 years',
    totalAUM: '$2.5M',
    totalInvestors: 312,
    products: [
      { name: 'Highland Timber Co.', category: 'Forestry', icon: TreePine },
      { name: 'Green Valley Farms', category: 'Agriculture', icon: Sprout },
      { name: 'Forest Products Co', category: 'Forestry', icon: TreePine },
    ],
  },
  {
    id: '4',
    name: 'Emily Johnson',
    avatar: '/images/emily-johnson.png',
    riskLevel: 'Medium Risk',
    maxProfit: '12%',
    experience: '4 years',
    totalAUM: '$1.8M',
    totalInvestors: 203,
    products: [
      { name: 'Coastal Fisheries Inc', category: 'Fisheries', icon: Fish },
      { name: 'Pacific Seafood Ltd', category: 'Fisheries', icon: Fish },
      { name: 'Timber Works Ltd', category: 'Forestry', icon: TreePine },
    ],
  },
  {
    id: '5',
    name: 'David Wilson',
    avatar: '/images/david-wilson.png',
    riskLevel: 'High Risk',
    maxProfit: '25%',
    experience: '3 years',
    totalAUM: '$680K',
    totalInvestors: 67,
    products: [
      { name: 'Ocean Harvest Co.', category: 'Fisheries', icon: Fish },
      { name: 'Sunrise Agriculture', category: 'Agriculture', icon: Sprout },
    ],
  },
];

const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'High Risk':
      return 'border-red-400 text-red-500 bg-red-50 dark:bg-red-900/20';
    case 'Medium Risk':
      return 'border-orange-400 text-orange-500 bg-orange-50 dark:bg-orange-900/20';
    case 'Low Risk':
      return 'border-green-400 text-green-500 bg-green-50 dark:bg-green-900/20';
    default:
      return 'border-gray-400 text-gray-500 bg-gray-50';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Agriculture':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'Fisheries':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    case 'Forestry':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function AutoManagePage() {
  const router = useRouter();

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
