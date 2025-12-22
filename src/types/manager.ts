/**
 * Manager Types
 * Types for manager data from the investment-funds API
 */

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

export interface Manager {
    id: string;
    name: string;
    contractAddress: string;
    owner: string;
    riskLevel: 'Low Risk' | 'Medium Risk' | 'High Risk';
    maxProfit: string;
    experience: string;
    totalAUM: string;
    totalInvestors: number;
    description: string;
    strategy: string;
    createdAt: Date;
}
