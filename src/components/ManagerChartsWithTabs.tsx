'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import ManagerPerformanceChart from './ManagerPerformanceChart';

// Mock allocation data - using symbols instead of full names
const mockAllocationData = [
    { name: 'GVF', fullName: 'Green Valley Farms', value: 30, color: '#22c55e' },
    { name: 'OHC', fullName: 'Ocean Harvest Co.', value: 25, color: '#3b82f6' },
    { name: 'TWL', fullName: 'Timber Works Ltd', value: 20, color: '#a855f7' },
    { name: 'SAG', fullName: 'Sunrise Agriculture', value: 15, color: '#f59e0b' },
    { name: 'PSL', fullName: 'Pacific Seafood Ltd', value: 10, color: '#ec4899' },
];

// Simple Pie Chart Component with Tooltip
const SimplePieChart = ({ data }: { data: typeof mockAllocationData }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    let cumulativePercent = 0;

    // Mock total AUM for calculation
    const totalAUM = 850000; // $850K from invested assets

    const createSlicePath = (percent: number, cumulativePercent: number) => {
        const startAngle = (cumulativePercent / 100) * 360;
        const endAngle = ((cumulativePercent + percent) / 100) * 360;

        const startRad = (startAngle - 90) * (Math.PI / 180);
        const endRad = (endAngle - 90) * (Math.PI / 180);

        const x1 = 50 + 45 * Math.cos(startRad);
        const y1 = 50 + 45 * Math.sin(startRad);
        const x2 = 50 + 45 * Math.cos(endRad);
        const y2 = 50 + 45 * Math.sin(endRad);

        const largeArc = percent > 50 ? 1 : 0;

        return `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`;
    };

    const handleMouseMove = (e: React.MouseEvent, index: number) => {
        setHoveredIndex(index);
        setTooltipPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative">
                <svg viewBox="0 0 100 100" className="w-48 h-48">
                    {data.map((item, index) => {
                        const path = createSlicePath(item.value, cumulativePercent);
                        cumulativePercent += item.value;
                        const isHovered = hoveredIndex === index;
                        return (
                            <path
                                key={index}
                                d={path}
                                fill={item.color}
                                stroke="white"
                                strokeWidth="0.5"
                                className="cursor-pointer transition-opacity"
                                style={{ opacity: isHovered ? 0.8 : 1 }}
                                onMouseMove={(e) => handleMouseMove(e, index)}
                                onMouseLeave={handleMouseLeave}
                            />
                        );
                    })}
                </svg>

                {/* Tooltip */}
                {hoveredIndex !== null && (
                    <div
                        className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 pointer-events-none"
                        style={{
                            left: `${tooltipPos.x + 10}px`,
                            top: `${tooltipPos.y + 10}px`,
                        }}
                    >
                        <div className="space-y-1">
                            <p className="font-semibold text-sm">{data[hoveredIndex].fullName}</p>
                            <p className="text-xs text-muted-foreground">${data[hoveredIndex].name}</p>
                            <p className="text-xs font-medium text-[#0A6A74]">
                                ${((totalAUM * data[hoveredIndex].value) / 100).toLocaleString()} USD ({data[hoveredIndex].value}%)
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-wrap gap-3 justify-center max-w-md">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-muted-foreground">
                            {item.name} ({item.value}%)
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

type TabType = 'allocation' | 'performance';

export default function ManagerChartsWithTabs() {
    const [activeTab, setActiveTab] = useState<TabType>('performance');

    const tabs = [
        { id: 'performance' as TabType, label: 'Performance', icon: TrendingUp },
        { id: 'allocation' as TabType, label: 'Allocation', icon: PieChartIcon },
    ];

    return (
        <Card className="border-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Portfolio Analytics</CardTitle>
                        <CardDescription>
                            {activeTab === 'allocation'
                                ? 'Portfolio distribution across products'
                                : 'Track investment, liquidity, and AUM over time'}
                        </CardDescription>
                    </div>
                </div>
                {/* Tabs */}
                <div className="flex gap-2 mt-4 border-b">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors relative ${activeTab === tab.id
                                    ? 'text-[#0A6A74] border-b-2 border-[#0A6A74]'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent>
                {activeTab === 'allocation' ? (
                    <SimplePieChart data={mockAllocationData} />
                ) : (
                    <div className="-mx-6 -mb-6">
                        <ManagerPerformanceChart />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
