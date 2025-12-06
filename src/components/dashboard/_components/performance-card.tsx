'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PerformanceData {
  month: string;
  value: number;
}

export function PerformanceCard() {
  // Mock chart data for performance
  const performanceData: PerformanceData[] = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 72 },
    { month: 'Mar', value: 68 },
    { month: 'Apr', value: 80 },
    { month: 'May', value: 85 },
    { month: 'Jun', value: 90 },
  ];

  const maxValue = Math.max(...performanceData.map(d => d.value));

  return (
    <Card className="border-2 bg-[#F1F7F3]">
      <CardHeader>
        <CardDescription className="text-[#475569]">Performance Overview</CardDescription>
        <CardTitle className="text-2xl text-[#0F172A]">Portfolio Growth</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Line Chart */}
          <div className="h-48 relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-[#475569]">
              <span>${maxValue}</span>
              <span>${Math.round(maxValue * 0.5)}</span>
              <span>$0</span>
            </div>

            {/* Chart area */}
            <div className="ml-12 h-full relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                <div className="border-t border-[#BBF7D0]" />
                <div className="border-t border-[#BBF7D0]" />
                <div className="border-t border-[#BBF7D0]" />
              </div>

              {/* SVG Line Chart */}
              <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                {/* Gradient area fill */}
                <defs>
                  <linearGradient id="chartGreen" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#047857" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Area Fill */}
                <path
                  d={`M 0 ${100 - (performanceData[0].value / maxValue) * 100}
                  L 60 ${100 - (performanceData[1].value / maxValue) * 100}
                  L 120 ${100 - (performanceData[2].value / maxValue) * 100}
                  L 180 ${100 - (performanceData[3].value / maxValue) * 100}
                  L 240 ${100 - (performanceData[4].value / maxValue) * 100}
                  L 300 ${100 - (performanceData[5].value / maxValue) * 100}
                  L 300 100 L 0 100 Z`}
                  fill="url(#chartGreen)"
                />

                {/* Main Line */}
                <polyline
                  points={performanceData
                    .map((d, i) => `${i * 60},${100 - (d.value / maxValue) * 100}`)
                    .join(" ")}
                  fill="none"
                  stroke="#047857"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Points */}
                {performanceData.map((data, index) => (
                  <circle
                    key={index}
                    cx={index * 60}
                    cy={100 - (data.value / maxValue) * 100}
                    r="3"
                    fill="#047857"
                    className="hover:r-5 transition-all"
                  />
                ))}
              </svg>

              {/* X-axis labels */}
              <div className="flex justify-between mt-2">
                {performanceData.map((data, index) => (
                  <span key={index} className="text-xs text-[#475569]">
                    {data.month}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ROI Section */}
          <div className="pt-4 border-t border-[#BBF7D0]">
            <div className="flex justify-between text-sm">
              <span className="text-[#475569]">Average ROI</span>
              <span className="font-semibold text-[#16A34A]">10.2% p.a.</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
