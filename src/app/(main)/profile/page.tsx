'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, ShieldCheck, AlertCircle } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-6">

      {/* KYC Verification Card */}
      <Card className="border-orange-200 dark:border-orange-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-orange-500" />
            Complete Your KYC
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Verify your account to unlock all features!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 p-4">
            <h4 className="font-medium mb-2">Why verify your account?</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Access higher lending limits
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Participate in exclusive loan opportunities
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Enhanced security and trust
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Lower transaction fees
              </li>
            </ul>
          </div>
          <Button className="w-full hover:scale-105 transition-transform cursor-pointer">
            <ShieldCheck className="h-4 w-4 mr-2" />
            Verify Now
          </Button>
        </CardContent>
      </Card>

      {/* Profile Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>Manage your account settings and verification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <p className="text-sm text-muted-foreground mt-1">user@example.com</p>
          </div>
          <div>
            <label className="text-sm font-medium">Account Status</label>
            <p className="text-sm text-muted-foreground mt-1">Active</p>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your preferences and security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates about your account</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
