'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" required />
            </div>

            <Button type="submit" className="w-full hover:scale-105 transition-transform cursor-pointer">
              Login
            </Button>

            {/* GOOGLE LOGIN */}
            <Button
              variant="outline"
              className="w-full hover:scale-105 transition-transform cursor-pointer"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              Login with Google
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary underline-offset-4 hover:underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
