'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronDown, Users, Wallet, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { fetchManagerList, ManagerItem } from '@/lib/api';
import { Button } from '@/components/ui/button';

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

export default function AutoManagePage() {
  const router = useRouter();
  const [managers, setManagers] = useState<ManagerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch manager data on component mount
  useEffect(() => {
    const loadManagerData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchManagerList();

        // Sort managers by risk level: Low → Medium → High
        const sortedData = data.sort((a, b) => {
          const getRiskValue = (riskLevel: string | null): number => {
            if (!riskLevel) return 999; // Put unknown risk at the end
            const level = riskLevel.toLowerCase();
            if (level.includes('low')) return 1;
            if (level.includes('medium')) return 2;
            if (level.includes('high')) return 3;
            return 999; // Unknown risk levels at the end
          };

          return getRiskValue(a.riskLevel) - getRiskValue(b.riskLevel);
        });

        setManagers(sortedData);
      } catch (err) {
        console.error('Error loading manager data:', err);
        setError('Failed to load manager data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadManagerData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading manager data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <AlertCircle className="h-8 w-8 mx-auto text-destructive" />
          <p className="text-destructive font-medium">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Empty state
  if (managers.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#225B3A]">Auto Manage</h1>
          <p className="text-muted-foreground mt-1">
            Choose a manager to handle your portfolio automatically
          </p>
        </div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">No managers available at the moment.</p>
          </div>
        </div>
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
                {/* Avatar Placeholder */}
                <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-[#225B3A] to-[#0A6A74] flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {manager.name.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{manager.name}</h3>
                    <Badge
                      variant="outline"
                      className={`${getRiskColor(manager.riskLevel)} font-medium`}
                    >
                      {formatRiskLevel(manager.riskLevel)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                    <p className="text-muted-foreground">
                      Max profit: <span className="font-semibold text-foreground">
                        {manager.maxProfitLAPY ? `${parseFloat(manager.maxProfitLAPY).toFixed(2)}%` : 'N/A'}
                      </span>
                    </p>
                    <p className="text-muted-foreground">
                      Experience: <span className="font-semibold text-foreground">
                        {manager.experienceYears ? `${manager.experienceYears} years` : 'N/A'}
                      </span>
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Wallet className="h-3.5 w-3.5" />
                      AUM: <span className="font-semibold text-foreground">
                        {formatCurrency(manager.assetUnderManagement)}
                      </span>
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      Investors: <span className="font-semibold text-foreground">
                        {manager.totalClients || 0}
                      </span>
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

              {/* Hover Dropdown - Manager Details */}
              <div className="max-h-0 group-hover:max-h-48 overflow-hidden transition-all duration-300 ease-in-out">
                <div className="border-t bg-muted/30 px-6 py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Manager Details</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    {manager.description && (
                      <p className="text-muted-foreground">
                        <span className="font-medium">Description:</span> {manager.description}
                      </p>
                    )}
                    {manager.strategy && (
                      <p className="text-muted-foreground">
                        <span className="font-medium">Strategy:</span> {manager.strategy}
                      </p>
                    )}
                    <p className="text-muted-foreground">
                      <span className="font-medium">Contract:</span>{' '}
                      <span className="font-mono text-xs">{manager.contractAddress}</span>
                    </p>
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