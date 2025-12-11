'use client';

import { useState } from 'react';
import { TrendingUp } from 'lucide-react';

// Mock data for the charts (2025 data) - Balanced for better visualization
// Note: AUM values represent total assets under management (realistic scale)
// Investment and Liquidity are proportional subsets of AUM
export const mockPerformanceData = [
    {
        date: '2025-01-01',
        investment: 520000, // ~61% of AUM
        liquidity: 180000,  // ~21% of AUM
        aum: 850000,        // $850K
    },
    {
        date: '2025-02-01',
        investment: 580000, // ~63% of AUM
        liquidity: 195000,  // ~21% of AUM
        aum: 920000,        // $920K
    },
    {
        date: '2025-03-01',
        investment: 630000, // ~64% of AUM
        liquidity: 210000,  // ~21% of AUM
        aum: 980000,        // $980K
    },
    {
        date: '2025-04-01',
        investment: 690000, // ~66% of AUM
        liquidity: 225000,  // ~21% of AUM
        aum: 1050000,       // $1.05M
    },
    {
        date: '2025-05-01',
        investment: 750000, // ~67% of AUM
        liquidity: 240000,  // ~21% of AUM
        aum: 1120000,       // $1.12M
    },
    {
        date: '2025-06-01',
        investment: 810000, // ~69% of AUM
        liquidity: 255000,  // ~22% of AUM
        aum: 1180000,       // $1.18M
    },
    {
        date: '2025-07-01',
        investment: 850000, // ~71% of AUM
        liquidity: 260000,  // ~22% of AUM
        aum: 1200000,       // $1.2M (current)
    },
];

type ChartLine = 'investment' | 'liquidity' | 'aum';

interface ChartConfig {
    key: ChartLine;
    label: string;
    color: string;
    enabled: boolean;
}

// Toggle Switch Component
const ToggleSwitch = ({
    label,
    enabled,
    color,
    onToggle
}: {
    label: string;
    enabled: boolean;
    color: string;
    onToggle: () => void;
}) => {
    return (
        <button
            onClick={onToggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted/50 transition-colors"
        >
            <div
                className={`relative w-10 h-5 rounded-full transition-colors ${enabled ? 'bg-opacity-100' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                style={{ backgroundColor: enabled ? color : undefined }}
            >
                <div
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                />
            </div>
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
};

export default function ManagerPerformanceChart() {
    const [hoveredPoint, setHoveredPoint] = useState<{ index: number; x: number; y: number } | null>(null);
    const [chartLines, setChartLines] = useState<ChartConfig[]>([
        { key: 'investment', label: 'Investment', color: '#3b82f6', enabled: true },
        { key: 'liquidity', label: 'Liquidity', color: '#22c55e', enabled: true },
        { key: 'aum', label: 'AUM', color: '#a855f7', enabled: true },
    ]);

    const toggleLine = (key: ChartLine) => {
        setChartLines(prev =>
            prev.map(line =>
                line.key === key ? { ...line, enabled: !line.enabled } : line
            )
        );
    };

    // Chart dimensions
    const width = 600;
    const height = 300;
    const padding = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Find min and max values for scaling
    const allValues = mockPerformanceData.flatMap(d => [d.investment, d.liquidity, d.aum]);
    const minValue = 0; // Start from 0 for better visualization
    const maxValue = Math.max(...allValues) * 1.1; // Add 10% padding

    // Scale functions
    const scaleX = (index: number) => (index / (mockPerformanceData.length - 1)) * chartWidth;
    const scaleY = (value: number) => chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;

    // Generate path for a line
    const generateLinePath = (key: ChartLine) => {
        return mockPerformanceData
            .map((d, i) => {
                const x = scaleX(i);
                const y = scaleY(d[key]);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ');
    };

    // Generate area path (line + fill to bottom)
    const generateAreaPath = (key: ChartLine) => {
        const linePath = mockPerformanceData
            .map((d, i) => {
                const x = scaleX(i);
                const y = scaleY(d[key]);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ');

        // Close the path to create an area
        const lastX = scaleX(mockPerformanceData.length - 1);
        const firstX = scaleX(0);
        return `${linePath} L ${lastX} ${chartHeight} L ${firstX} ${chartHeight} Z`;
    };

    // Format date
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Format currency
    const formatCurrency = (value: number) => {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(2)}M`;
        } else if (value >= 1000) {
            return `$${(value / 1000).toFixed(1)}K`;
        }
        return `$${value.toLocaleString()}`;
    };

    return (
        <>
            {/* Toggle switches */}
            <div className="flex gap-4 mb-4 justify-end">
                {chartLines.map(line => (
                    <ToggleSwitch
                        key={line.key}
                        label={line.label}
                        enabled={line.enabled}
                        color={line.color}
                        onToggle={() => toggleLine(line.key)}
                    />
                ))}
            </div>

            {/* Chart */}
            <div className="relative w-full overflow-x-auto">
                <svg
                    viewBox={`0 0 ${width} ${height}`}
                    className="w-full h-auto"
                    style={{ minWidth: '600px' }}
                >
                    <defs>
                        {/* Gradient definitions for each line */}
                        {chartLines.map(line => (
                            <linearGradient
                                key={`gradient-${line.key}`}
                                id={`gradient-${line.key}`}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop offset="0%" stopColor={line.color} stopOpacity="0.3" />
                                <stop offset="100%" stopColor={line.color} stopOpacity="0.05" />
                            </linearGradient>
                        ))}
                    </defs>

                    <g transform={`translate(${padding.left}, ${padding.top})`}>
                        {/* Horizontal grid lines */}
                        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                            const y = chartHeight * (1 - ratio);
                            const value = minValue + (maxValue - minValue) * ratio;
                            return (
                                <g key={i}>
                                    <line
                                        x1={0}
                                        y1={y}
                                        x2={chartWidth}
                                        y2={y}
                                        stroke="#e5e7eb"
                                        strokeWidth="1"
                                        strokeDasharray="4"
                                    />
                                    <text
                                        x={-10}
                                        y={y}
                                        textAnchor="end"
                                        alignmentBaseline="middle"
                                        className="text-[10px] fill-gray-500"
                                    >
                                        {formatCurrency(value)}
                                    </text>
                                </g>
                            );
                        })}

                        {/* Vertical grid lines and labels */}
                        {mockPerformanceData.map((d, i) => {
                            const x = scaleX(i);
                            return (
                                <g key={i}>
                                    <line
                                        x1={x}
                                        y1={0}
                                        x2={x}
                                        y2={chartHeight}
                                        stroke="#e5e7eb"
                                        strokeWidth="1"
                                        strokeDasharray="4"
                                    />
                                    <text
                                        x={x}
                                        y={chartHeight + 20}
                                        textAnchor="middle"
                                        className="text-[10px] fill-gray-500"
                                    >
                                        {new Date(d.date).toLocaleDateString('en-US', { month: 'short' })}
                                    </text>
                                </g>
                            );
                        })}

                        {/* Area fills (background) */}
                        {chartLines
                            .filter(line => line.enabled)
                            .reverse() // Draw from back to front
                            .map(line => (
                                <path
                                    key={`area-${line.key}`}
                                    d={generateAreaPath(line.key)}
                                    fill={`url(#gradient-${line.key})`}
                                />
                            ))}

                        {/* Chart lines (foreground) */}
                        {chartLines
                            .filter(line => line.enabled)
                            .map(line => (
                                <path
                                    key={line.key}
                                    d={generateLinePath(line.key)}
                                    fill="none"
                                    stroke={line.color}
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            ))}

                        {/* Data points */}
                        {chartLines
                            .filter(line => line.enabled)
                            .map(line =>
                                mockPerformanceData.map((d, i) => {
                                    const x = scaleX(i);
                                    const y = scaleY(d[line.key]);
                                    return (
                                        <circle
                                            key={`${line.key}-${i}`}
                                            cx={x}
                                            cy={y}
                                            r="4"
                                            fill={line.color}
                                            stroke="white"
                                            strokeWidth="2"
                                            className="cursor-pointer hover:r-6 transition-all"
                                            onMouseEnter={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                setHoveredPoint({
                                                    index: i,
                                                    x: rect.left + rect.width / 2,
                                                    y: rect.top,
                                                });
                                            }}
                                            onMouseLeave={() => setHoveredPoint(null)}
                                        />
                                    );
                                })
                            )}
                    </g>
                </svg>

                {/* Tooltip */}
                {hoveredPoint !== null && (
                    <div
                        className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 pointer-events-none"
                        style={{
                            left: `${hoveredPoint.x}px`,
                            top: `${hoveredPoint.y - 10}px`,
                            transform: 'translate(-50%, -100%)',
                        }}
                    >
                        <div className="space-y-1 min-w-[150px]">
                            <p className="font-semibold text-sm">
                                {formatDate(mockPerformanceData[hoveredPoint.index].date)}
                            </p>
                            {chartLines
                                .filter(line => line.enabled)
                                .map(line => (
                                    <div key={line.key} className="flex items-center justify-between gap-4">
                                        <span className="text-xs" style={{ color: line.color }}>
                                            {line.label}:
                                        </span>
                                        <span className="text-xs font-medium">
                                            {formatCurrency(mockPerformanceData[hoveredPoint.index][line.key])}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
