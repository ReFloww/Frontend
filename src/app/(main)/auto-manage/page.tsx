'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export default function AutoManagePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#225B3A]">Auto Manage</h1>
        <p className="text-muted-foreground mt-1">Automatically manage your portfolio</p>
      </div>

      {/* Placeholder Content */}
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="border-2 max-w-md w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Coming Soon</CardTitle>
            <CardDescription className="text-base">
              Auto Manage feature is under development
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            This feature will help you automatically manage and optimize your portfolio for the best returns.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
