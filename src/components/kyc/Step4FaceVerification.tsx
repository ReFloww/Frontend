'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, AlertCircle, CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Step4Props {
  onBack: () => void;
  onSubmit: () => void;
}

export function Step4FaceVerification({ onBack }: Step4Props) {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleOpenCamera = () => {
    // Mock - camera functionality not implemented
    console.log('Camera feature coming soon...');
  };

  const handleSubmit = () => {
    // Show success modal instead of redirecting immediately
    setShowSuccessModal(true);
  };

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <>
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
              <Button onClick={handleOpenCamera} className="mt-2 bg-[#00A864] hover:bg-[#006FD6]">
                <Camera className="h-4 w-4 mr-2" />
                Open Camera
              </Button>
              <p className="text-xs text-muted-foreground mt-4 italic">
                Camera feature coming soon
              </p>
            </div>
          </div>

          {/* Photo Requirements */}
          <div className="rounded-lg bg-[#006FD6]/5 dark:bg-[#006FD6]/10 border border-[#006FD6]/30 p-4">
            <div className="flex items-start gap-2 mb-3">
              <AlertCircle className="h-5 w-5 text-[#006FD6] mt-0.5 flex-shrink-0" />
              <h4 className="font-semibold text-sm text-foreground">Please Note</h4>
            </div>
            <ul className="space-y-2 text-sm text-foreground/90">
              <li className="flex items-start gap-2">
                <span className="text-[#006FD6] mt-0.5">•</span>
                <span><strong>Maximum Brightness:</strong> Take pictures with maximum brightness</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#006FD6] mt-0.5">•</span>
                <span><strong>Background:</strong> Avoid crowded backgrounds</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#006FD6] mt-0.5">•</span>
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
              className="flex-1 bg-[#00A864] hover:bg-[#006FD6] transition-all hover:scale-[1.02]"
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-[#00A864]/10 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-[#00A864]" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">
              Verification Submitted Successfully!
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Your verification has been submitted and is now waiting for approval from our system.
              We will notify you once the review is complete.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button
              onClick={handleGoToDashboard}
              className="w-full bg-[#00A864] hover:bg-[#006FD6] hover:scale-105 transition-all"
            >
              Back to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
