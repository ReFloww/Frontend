'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Stepper } from '@/components/kyc/Stepper';
import { Step1InvestmentProfile } from '@/components/kyc/Step1InvestmentProfile';
import { Step2Citizenship } from '@/components/kyc/Step2Citizenship';
import { Step3Verification } from '@/components/kyc/Step3Verification';
import { Step4FaceVerification } from '@/components/kyc/Step4FaceVerification';

const steps = [
  { id: 1, name: 'Investment Profile' },
  { id: 2, name: 'Citizenship' },
  { id: 3, name: 'Document' },
  { id: 4, name: 'Face Verification' },
];

export default function KYCPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    investorType: 'individual',
    purchaseAmount: '',
    country: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('KYC Form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="space-y-6">
      {/* Back to Profile Button */}
      <div>
        <Link href="/profile">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Button>
        </Link>
      </div>

      {/* Stepper */}
      <Stepper steps={steps} currentStep={currentStep} />

      {/* Form Card */}
      <div className="flex justify-center">
        {currentStep === 1 && (
          <Step1InvestmentProfile
            formData={formData}
            onInputChange={handleInputChange}
            onContinue={handleContinue}
          />
        )}

        {currentStep === 2 && (
          <Step2Citizenship
            formData={formData}
            onInputChange={handleInputChange}
            onContinue={handleContinue}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <Step3Verification
            onBack={handleBack}
            onContinue={handleContinue}
          />
        )}

        {currentStep === 4 && (
          <Step4FaceVerification
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
