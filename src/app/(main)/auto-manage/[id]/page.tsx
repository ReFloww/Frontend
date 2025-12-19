'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    Users,
    Wallet,
    Shield,
    Target,
    Loader2,
    AlertCircle,
    TrendingUp,
    Unlock
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { fetchManagerById, ManagerItem } from '@/lib/api';
import ManagerChartsWithTabs from '@/components/ManagerChartsWithTabs';

const getRiskColor = (riskLevel: string | null) => {
    if (!riskLevel) return 'border-gray-400 text-gray-500 bg-gray-50 dark:bg-gray-900/20';

    const level = riskLevel.toLowerCase();
    if (level.includes('high')) {
        return 'border-red-400 text-red-500 bg-red-50 dark:bg-red-900/20';
    } else if (level.includes('medium')) {
        return 'border-orange-400 text-orange-500 bg-orange-50 dark:bg-orange-900/20';
    } else if (level.includes('low')) {
        return 'border-green-400 text-green-500 bg-green-50 dark:bg-green-900/20';
    }
    return 'border-gray-400 text-gray-500 bg-gray-50 dark:bg-gray-900/20';
};

const MANAGER_LOGOS: Record<string, string> = {
    'BNI AM': '/images/logo-BNI.png',
    'MANDIRI MI': '/images/logo-MANDIRI.png',
    'Mandiri MI': '/images/logo-MANDIRI.png',
    'BRI MI': '/images/logo-BRI.png',
};

const formatRiskLevel = (riskLevel: string | null): string => {
    if (!riskLevel) return 'Unknown Risk';
    const level = riskLevel.toLowerCase();
    if (level.includes('high')) return 'High Risk';
    if (level.includes('medium')) return 'Medium Risk';
    if (level.includes('low')) return 'Low Risk';
    return riskLevel;
};

const formatCurrency = (value: string | null): string => {
    if (!value) return '$0';
    const num = parseFloat(value);
    if (isNaN(num)) return '$0';

    if (num >= 1000000) {
        return `$${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
        return `$${(num / 1000).toFixed(0)}K`;
    }
    return `$${num.toFixed(0)}`;
};

export default function ManagerDetailPage() {
    const router = useRouter();
    const params = useParams();
    const managerId = params.id as string;

    const [manager, setManager] = useState<ManagerItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Mock data for invested and liquidable assets (consistent with chart data - July 2025)
    const mockInvestedAssets = 850000;  // $850K - matches chart's latest investment value
    const mockLiquidableAssets = 260000; // $260K - matches chart's latest liquidity value

    useEffect(() => {
        const loadManagerDetail = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchManagerById(managerId);
                setManager(data);
            } catch (err) {
                console.error('Error loading manager detail:', err);
                setError('Failed to load manager details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadManagerDetail();
    }, [managerId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                    <p className="text-muted-foreground">Loading manager details...</p>
                </div>
            </div>
        );
    }

    if (error || !manager) {
        return (
            <div className="space-y-6">
                <Button
                    variant="ghost"
                    onClick={() => router.push('/auto-manage')}
                    className="hover:scale-105 transition-transform cursor-pointer"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Auto Manage
                </Button>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center space-y-4">
                        <AlertCircle className="h-8 w-8 mx-auto text-destructive" />
                        <p className="text-destructive font-medium">{error || 'Manager not found'}</p>
                        <Button onClick={() => router.push('/auto-manage')} variant="outline">
                            Back to Auto Manage
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Button
                variant="ghost"
                onClick={() => router.push('/auto-manage')}
                className="hover:scale-105 transition-transform cursor-pointer"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Auto Manage
            </Button>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-2">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-6">
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-white border border-gray-100 flex items-center justify-center p-2">
                                    {MANAGER_LOGOS[manager.name] ? (
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={MANAGER_LOGOS[manager.name]}
                                                alt={`${manager.name} Logo`}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#225B3A] to-[#0A6A74] flex items-center justify-center rounded-xl">
                                            <span className="text-4xl font-bold text-white">
                                                {manager.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-2xl font-bold text-[#225B3A]">{manager.name}</h1>
                                        <Badge variant="outline" className={`${getRiskColor(manager.riskLevel)} font-medium`}>
                                            {formatRiskLevel(manager.riskLevel)}
                                        </Badge>
                                    </div>
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-3xl font-bold text-[#0A6A74]">
                                            {formatCurrency(manager.assetUnderManagement)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">Assets Under Management</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <Card className="border-2">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                        <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Invested Assets</p>
                                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            ${mockInvestedAssets.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">Currently locked in investments</p>
                            </CardContent>
                        </Card>

                        <Card className="border-2">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                                        <Unlock className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Liquidable Assets</p>
                                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            ${mockLiquidableAssets.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">Available for withdrawal</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts with Tabs - Allocation & Performance */}
                    <ManagerChartsWithTabs />

                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle>About</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">{manager.description || 'No description available.'}</p>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div>
                                    <p className="text-sm text-muted-foreground">Experience</p>
                                    <p className="font-semibold">{manager.experienceYears ? `${manager.experienceYears} years` : 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Investors</p>
                                    <p className="font-semibold">{manager.totalClients || 0}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle>Statistics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="p-4 rounded-lg bg-muted/50">
                                    <p className="text-sm text-muted-foreground">Max Profit APY</p>
                                    <p className="text-xl font-bold text-green-600">
                                        {manager.maxProfitLAPY ? `${parseFloat(manager.maxProfitLAPY).toFixed(2)}%` : 'N/A'}
                                    </p>
                                </div>
                                <div className="p-4 rounded-lg bg-muted/50">
                                    <p className="text-sm text-muted-foreground">Risk Level</p>
                                    <p className="text-xl font-bold text-[#0A6A74]">{formatRiskLevel(manager.riskLevel)}</p>
                                </div>
                                <div className="p-4 rounded-lg bg-muted/50">
                                    <p className="text-sm text-muted-foreground">Total Funds</p>
                                    <p className="text-xl font-bold text-[#225B3A]">{formatCurrency(manager.totalFundsManaged)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5 text-[#0A6A74]" />
                                Investment Strategy
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{manager.strategy || 'No strategy information available.'}</p>
                        </CardContent>
                    </Card>

                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-[#0A6A74]" />
                                Contract Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Contract Address</p>
                                <p className="font-mono text-sm bg-muted p-2 rounded break-all">{manager.contractAddress}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Owner Address</p>
                                <p className="font-mono text-sm bg-muted p-2 rounded break-all">{manager.owner}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:sticky lg:top-6 lg:self-start space-y-6">
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle>Quick Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Wallet className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">AUM</span>
                                </div>
                                <span className="font-semibold">{formatCurrency(manager.assetUnderManagement)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">Investors</span>
                                </div>
                                <span className="font-semibold">{manager.totalClients || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Target className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">Max APY</span>
                                </div>
                                <span className="font-semibold text-green-600">
                                    {manager.maxProfitLAPY ? `${parseFloat(manager.maxProfitLAPY).toFixed(2)}%` : 'N/A'}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-2">
                        <CardContent className="p-6">
                            <Button className="w-full h-12 text-base font-semibold bg-[#225B3A] hover:bg-[#1C4A30]">
                                Start Auto Manage
                            </Button>
                            <p className="text-xs text-muted-foreground text-center mt-3">
                                Connect your wallet to start auto-managing your portfolio
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
