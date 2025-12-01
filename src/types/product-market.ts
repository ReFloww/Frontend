import { LucideIcon } from 'lucide-react';

/**
 * Represents a tokenized product in the market
 * Each loan product has its own symbol/ticker
 */
export interface TokenizedProduct {
  id: string;
  productName: string;
  symbol: string; // Trading symbol (e.g., GVF, OHF, TWL)
  categoryId: 'Agriculture' | 'Fisheries' | 'Forestry';
  description: string;
  loanInterest: number; // Annual percentage
  loanAmount: number; // Loan amount in dollars
  loanTenor: number; // Duration in months
  creditRate: 'A' | 'B' | 'C';
  contractId: string;
  icon: LucideIcon; // For UI display
}

/**
 * Product Market Category Types
 */
export type ProductCategory = 'Agriculture' | 'Fisheries' | 'Forestry' | 'All';

/**
 * Credit Rating Types
 */
export type CreditRating = 'A' | 'B' | 'C';
