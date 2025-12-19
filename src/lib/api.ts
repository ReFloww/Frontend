/**
 * API Configuration and Service Layer
 */

// Get API base URL from environment variable
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:30000/v1/api';

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

    // Metadata
    description: string | null;
    experienceYears: number | null;
    maxProfitLAPY: string | null;
    riskLevel: string | null;
    strategy: string | null;
    assetUnderManagement: string | null;
    totalClients: number | null;
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
            cache: 'no-store', // Disable caching for fresh data
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
        const response = await fetch(`${API_BASE_URL}/auto-manage/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // Disable caching for fresh data
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
        const response = await fetch(`${API_BASE_URL}/auto-manage/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // Disable caching for fresh data
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
 * Fetch market item by ID from API
 */
export async function fetchMarketItemById(id: string): Promise<MarketItem> {
    try {
        const response = await fetch(`${API_BASE_URL}/market/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // Disable caching for fresh data
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
