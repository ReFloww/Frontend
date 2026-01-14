/**
 * API Configuration and Service Layer
 */

// Get API base URL from environment variable
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:30000/api/v1';

/**
 * API Response Types
 */
export interface MarketItem {
    id: string;
    contractAddress: string;
    name: string;
    symbol: string;
    holderCount: string;
    status: string;
    description: string;
    loanInterest: string;
    loanAmount: string;
    creditRate: string;
    categoryId: string;
    loanTenor: number;
}

export interface ManagerItem {
    // Onchain data
    id: string;
    sequenceId: string;
    contractAddress: string;
    name: string;
    owner: string;
    createdAt: string;
    createdAtBlock: string;
    totalFundsManaged: string;
    lockedFundValue: string;
    liquidFundValue: string;
    sharePrice: string;

    // Metadata
    description: string | null;
    experienceYears: number | null;
    maxProfitLAPY: string | null;
    riskLevel: string | null;
    strategy: string | null;
    assetUnderManagement: string | null;
    totalClients: number | null;
}

export interface UserManagerInvestment {
    managerId: string;           // Manager contract address
    assetName: string;           // Manager name (Asset column)
    sector: string;              // Risk level (Sector column)
    balanceTokens: number;       // Share balance (Balance column)
    valueUsdt: number;           // USDT value (Value column)
    returnPct: number;           // APY percentage (Return column)
    sharePercentage?: number;    // Optional share percentage
    metadata?: {
        description?: string;
        experienceYears?: number;
        strategy?: string;
        totalClients?: number;
    };
}

export interface UserManagerInvestmentsListResponse {
    investments: UserManagerInvestment[];
    totalInvested: number;
}

/**
 * Fetch market list from API
 */
export async function fetchMarketList(): Promise<MarketItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/market/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const result: MarketItem[] = await response.json();
        return result || [];
    } catch (error) {
        console.error('Failed to fetch market list:', error);
        throw error;
    }
}

/**
 * Fetch manager list from API
 */
export async function fetchManagerList(): Promise<ManagerItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/investment-funds/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const result: ManagerItem[] = await response.json();
        return result || [];
    } catch (error) {
        console.error('Failed to fetch manager list:', error);
        throw error;
    }
}

/**
 * Fetch manager detail by ID from API
 */
export async function fetchManagerById(id: string): Promise<ManagerItem> {
    try {
        const response = await fetch(`${API_BASE_URL}/investment-funds/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const result: ManagerItem = await response.json();
        return result;
    } catch (error) {
        console.error('Failed to fetch manager detail:', error);
        throw error;
    }
}

/**
 * Fetch user manager investments from API
 */
export async function fetchUserManagerInvestments(wallet: string): Promise<UserManagerInvestmentsListResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/investment-funds/user/investments?wallet=${wallet}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const result: UserManagerInvestmentsListResponse = await response.json();
        return {
            investments: result.investments || [],
            totalInvested: result.totalInvested || 0,
        };
    } catch (error) {
        console.error('Failed to fetch user manager investments:', error);
        return {
            investments: [],
            totalInvested: 0,
        };
    }
}

/**
 * Fetch market item by ID from API
 */
export async function fetchMarketItemById(id: string): Promise<MarketItem> {
    try {
        const response = await fetch(`${API_BASE_URL}/market/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const result: MarketItem = await response.json();
        return result;
    } catch (error) {
        console.error(`Failed to fetch market item ${id}:`, error);
        throw error;
    }
}

/**
 * Transaction History Types
 */
export interface TransactionHistoryItem {
    id: string;
    type: string;
    from: string;
    to: string;
    amountIn: string;
    amountOut: string;
    transactionHash: string;
    timestamp: string;
    blockNumber: string;
}

export interface RepaymentHistoryItem {
    id: string;
    contractAddress: string;
    repaymentNumber: string;
    principalPaid: string;
    interestPaid: string;
    totalDistributed: string;
    remainingPrincipal: string;
    transactionHash: string;
    timestamp: string;
    blockNumber: string;
}

/**
 * Fetch transaction history for a user
 */
export async function fetchTransactionHistory(userAddress: string): Promise<TransactionHistoryItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/history/transactions?user=${userAddress}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const result: TransactionHistoryItem[] = await response.json();
        return result || [];
    } catch (error) {
        console.error('Failed to fetch transaction history:', error);
        throw error;
    }
}

/**
 * Fetch repayment history for a user
 */
export async function fetchRepaymentHistory(userAddress: string): Promise<RepaymentHistoryItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/history/repayments?user=${userAddress}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const result: RepaymentHistoryItem[] = await response.json();
        return result || [];
    } catch (error) {
        console.error('Failed to fetch repayment history:', error);
        throw error;
    }
}

/**
 * Product Repayment Record (for product detail page)
 */
export interface ProductRepaymentItem {
    repaymentNumber: string;
    principal: string;
    interestPaid: string;
    timestamp: string;
    transactionHash: string;
}

/**
 * Fetch repayment records for a specific product
 */
export async function fetchProductRepayments(productId: string): Promise<ProductRepaymentItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/market/${productId}/repayments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const result: ProductRepaymentItem[] = await response.json();
        return result || [];
    } catch (error) {
        console.error('Failed to fetch product repayments:', error);
        throw error;
    }
}
