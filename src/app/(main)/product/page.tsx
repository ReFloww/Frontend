'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Shield, Zap, TrendingUp, Lock, Users } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secured by RWA',
    description: 'All loans backed by tokenized real-world assets with transparent on-chain verification'
  },
  {
    icon: Zap,
    title: 'Instant Liquidity',
    description: 'Deploy capital and start earning interest immediately with automated matching'
  },
  {
    icon: TrendingUp,
    title: 'Competitive Yields',
    description: 'Earn higher returns compared to traditional DeFi protocols with RWA-backed rates'
  },
  {
    icon: Lock,
    title: 'Risk Management',
    description: 'Advanced risk scoring and diversification tools to protect your investments'
  },
  {
    icon: Users,
    title: 'Verified Borrowers',
    description: 'All borrowers undergo KYC/AML verification and credit assessment'
  },
];

const products = [
  {
    name: 'Standard Pool',
    apy: '8-12%',
    minSupply: '100 USDC',
    lockPeriod: 'None',
    riskLevel: 'Medium',
    description: 'Diversified pool across multiple asset types with balanced risk-reward',
    features: ['Auto-compounding', 'Flexible withdrawal', 'Daily settlements']
  },
  {
    name: 'Premium Pool',
    apy: '12-18%',
    minSupply: '5,000 USDC',
    lockPeriod: '90 days',
    riskLevel: 'Medium-High',
    description: 'Higher yields with curated premium assets and longer commitment',
    features: ['Priority access', 'Premium assets only', 'Quarterly bonuses']
  },
  {
    name: 'Conservative Pool',
    apy: '5-8%',
    minSupply: '50 USDC',
    lockPeriod: 'None',
    riskLevel: 'Low',
    description: 'Lower risk pool focused on stable, high-quality RWA with proven track records',
    features: ['Low volatility', 'Capital preservation', 'Instant withdrawal']
  },
];

export default function ProductPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="border-2">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl">RWA P2P Lending Products</CardTitle>
          <CardDescription className="text-base">
            Choose the lending product that matches your investment goals and risk appetite
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Features Grid */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Why Choose Our Platform</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Products */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Lending Pools</h2>
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Pools</TabsTrigger>
            <TabsTrigger value="active">Active Positions</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Card key={product.name} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle>{product.name}</CardTitle>
                      <Badge variant={
                        product.riskLevel === 'Low' ? 'default' :
                        product.riskLevel === 'Medium' ? 'secondary' :
                        'destructive'
                      }>
                        {product.riskLevel}
                      </Badge>
                    </div>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">APY Range</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {product.apy}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Min. Supply</span>
                        <span className="font-medium">{product.minSupply}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Lock Period</span>
                        <span className="font-medium">{product.lockPeriod}</span>
                      </div>
                    </div>

                    <div className="space-y-2 border-t pt-4">
                      <p className="text-sm font-medium">Features</p>
                      <ul className="space-y-1">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full" size="lg">
                      Supply to Pool
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">No Active Positions</h3>
                <p className="mb-6 text-center text-sm text-muted-foreground">
                  Connect your wallet and supply to a pool to start earning
                </p>
                <Button>Connect Wallet</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
