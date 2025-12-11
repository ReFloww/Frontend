import { Sprout, Fish, TreePine } from 'lucide-react';

// Metadata for known managers (not stored on-chain)
// Map by manager contract address (lowercase)
export const managerMetadata: Record<string, {
  displayName: string;
  avatar: string;
  riskLevel: string;
  maxProfit: string;
  experience: string;
  products: { name: string; category: string; icon: typeof Sprout }[];
}> = {
  // Manager High Risk
  '0x7ef09ec32cb2d7f88ebff29cfb60ed2c06a328dc': {
    displayName: 'John Doe',
    avatar: '/images/john-doe.png',
    riskLevel: 'High Risk',
    maxProfit: '20%',
    experience: '2 years',
    products: [
      { name: 'Green Valley Farms', category: 'Agriculture', icon: Sprout },
      { name: 'Ocean Harvest Co.', category: 'Fisheries', icon: Fish },
      { name: 'Sunrise Agriculture', category: 'Agriculture', icon: Sprout },
    ],
  },
  // Manager Low Risk
  '0x0e5e7fc419fe944fa3ed1db55958f81e13c26727': {
    displayName: 'Michael Chen',
    avatar: '/images/michael-chen.png',
    riskLevel: 'Low Risk',
    maxProfit: '5%',
    experience: '5 years',
    products: [
      { name: 'Highland Timber Co.', category: 'Forestry', icon: TreePine },
      { name: 'Green Valley Farms', category: 'Agriculture', icon: Sprout },
      { name: 'Forest Products Co', category: 'Forestry', icon: TreePine },
    ],
  },
  // Manager Mid Risk
  '0x86ef0b4ad79589e08a96cb5336a8de7ea8db502c': {
    displayName: 'Sarah Smith',
    avatar: '/images/sarah-smith.png',
    riskLevel: 'Medium Risk',
    maxProfit: '10%',
    experience: '3 years',
    products: [
      { name: 'Timber Works Ltd', category: 'Forestry', icon: TreePine },
      { name: 'Valley Crops Farm', category: 'Agriculture', icon: Sprout },
    ],
  },
  // Pantera
  '0x9c8e85a88b84c2b4f5e9db3de713ca390ed148c6': {
    displayName: 'Emily Johnson',
    avatar: '/images/emily-johnson.png',
    riskLevel: 'Medium Risk',
    maxProfit: '12%',
    experience: '4 years',
    products: [
      { name: 'Coastal Fisheries Inc', category: 'Fisheries', icon: Fish },
      { name: 'Pacific Seafood Ltd', category: 'Fisheries', icon: Fish },
      { name: 'Timber Works Ltd', category: 'Forestry', icon: TreePine },
    ],
  },
  // Pantera Capital
  '0x67a7c4e260c9dc3de844abe0c78c92f7a4573782': {
    displayName: 'David Wilson',
    avatar: '/images/david-wilson.png',
    riskLevel: 'High Risk',
    maxProfit: '25%',
    experience: '3 years',
    products: [
      { name: 'Ocean Harvest Co.', category: 'Fisheries', icon: Fish },
      { name: 'Sunrise Agriculture', category: 'Agriculture', icon: Sprout },
    ],
  },
};

export const defaultManagerMetadata = {
  displayName: '', // Will use on-chain name if no display name
  avatar: '/images/default-avatar.png',
  riskLevel: 'Medium Risk',
  maxProfit: '10%',
  experience: '1 year',
  products: [
    { name: 'Various Products', category: 'Agriculture', icon: Sprout },
  ],
};

export const formatAUM = (amount: number): string => {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
  return `$${amount.toFixed(2)}`;
};

export const getRiskColor = (riskLevel: string): string => {
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

export const getCategoryColor = (category: string): string => {
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
