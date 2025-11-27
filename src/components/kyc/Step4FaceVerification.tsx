'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, AlertCircle } from 'lucide-react';

interface Step4Props {
  onBack: () => void;
  onSubmit: () => void;
}

export function Step4FaceVerification({ onBack }: Step4Props) {
  const router = useRouter();

  const handleOpenCamera = () => {
    // Mock - camera functionality not implemented
    console.log('Camera feature coming soon...');
  };

  const handleSubmit = () => {
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Face Verification</CardTitle>
        <CardDescription>
          Take a photo of yourself for identity verification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Camera/Photo Area */}
        <div className="space-y-4">
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
            <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm font-medium mb-1">Take a photo of yourself</p>
            <p className="text-xs text-muted-foreground mb-4">
              Position your face in the center
            </p>
            <Button onClick={handleOpenCamera} className="mt-2">
              <Camera className="h-4 w-4 mr-2" />
              Open Camera
            </Button>
            <p className="text-xs text-muted-foreground mt-4 italic">
              Camera feature coming soon
            </p>
          </div>
        </div>

        {/* Photo Requirements */}
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-4">
          <div className="flex items-start gap-2 mb-3">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100">Please Note</h4>
          </div>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span><strong>Maximum Brightness:</strong> Take pictures with maximum brightness</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span><strong>Background:</strong> Avoid crowded backgrounds</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span><strong>Clarity:</strong> Make sure the picture taken is clear and bright</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 transition-all hover:scale-[1.02]"
          >
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
