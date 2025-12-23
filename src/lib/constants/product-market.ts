import { Sprout, Fish, TreePine } from 'lucide-react';
import { TokenizedProduct } from '@/types/product-market';

// Re-export as Product for compatibility with market components
export type Product = TokenizedProduct;

/**
 * Tokenized Product Market Data
 * Each product has its own unique P2P token contract address
 */
export const PRODUCT_MARKET: TokenizedProduct[] = [
  {
    id: '1',
    productName: 'Green Valley Farms',
    symbol: 'GVF',
    categoryId: 'Agriculture',
    description: 'Purchase of fertilizers and seeds',
    loanInterest: 10.00,
    loanAmount: 50000.00,
    loanTenor: 10,
    creditRate: 'A',
    contractId: 'contract-uuid-1',
    tokenP2PAddress: '0x6A3beA365C43c5eC0337f10C0dbD748d39120030',
    holderCount: 0,
    status: 'active',
    icon: Sprout,
  },
  {
    id: '2',
    productName: 'Ocean Harvest Co.',
    symbol: 'OHF',
    categoryId: 'Fisheries',
    description: 'Upgrade fishing equipment',
    loanInterest: 10.20,
    loanAmount: 75000.00,
    loanTenor: 18,
    creditRate: 'B',
    contractId: 'contract-uuid-2',
    tokenP2PAddress: '0x3db507Ce55B0d9DC29045916Fb36efc4d13be4DB',
    holderCount: 0,
    status: 'active',
    icon: Fish,
  },
  {
    id: '3',
    productName: 'Timber Works Ltd',
    symbol: 'TWL',
    categoryId: 'Forestry',
    description: 'Expansion of logging operations',
    loanInterest: 9.80,
    loanAmount: 120000.00,
    loanTenor: 24,
    creditRate: 'A',
    contractId: 'contract-uuid-3',
    tokenP2PAddress: '0x59cA3aa58e5Daa439B00Ce827FE017C5C572c7BB',
    holderCount: 0,
    status: 'active',
    icon: TreePine,
  },
  {
    id: '4',
    productName: 'Sunrise Agriculture',
    symbol: 'SUN',
    categoryId: 'Agriculture',
    description: 'Purchase of raw materials',
    loanInterest: 7.50,
    loanAmount: 35000.00,
    loanTenor: 6,
    creditRate: 'A',
    contractId: 'contract-uuid-4',
    tokenP2PAddress: '0x160aA9041Bbb55D424f4C06617cfB907F56AC262',
    holderCount: 0,
    status: 'active',
    icon: Sprout,
  },
  {
    id: '5',
    productName: 'Coastal Fisheries Inc',
    symbol: 'CFI',
    categoryId: 'Fisheries',
    description: 'Purchase of processing equipment',
    loanInterest: 11.50,
    loanAmount: 90000.00,
    loanTenor: 15,
    creditRate: 'B',
    contractId: 'contract-uuid-5',
    tokenP2PAddress: '0xf9e7863E3f7637feb86Cb6bC5bfF922009e1487C',
    holderCount: 0,
    status: 'active',
    icon: Fish,
  },
  {
    id: '6',
    productName: 'Forest Products Co',
    symbol: 'FPC',
    categoryId: 'Forestry',
    description: 'Purchase of raw materials',
    loanInterest: 12.80,
    loanAmount: 65000.00,
    loanTenor: 12,
    creditRate: 'C',
    contractId: 'contract-uuid-6',
    tokenP2PAddress: '0x81d0c239C9E25Ba1Ca5475E95Fe31292168e03Eb',
    holderCount: 0,
    status: 'active',
    icon: TreePine,
  },
];

/**
 * Get credit rating color classes
 */
export const getCreditRatingColor = (rating: string) => {
  switch (rating) {
    case 'A':
      return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400';
    case 'B':
      return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'C':
      return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400';
    default:
      return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

/**
 * Get product by ID
 */
export const getProductById = (id: string): TokenizedProduct | undefined => {
  return PRODUCT_MARKET.find((product) => product.id === id);
};
