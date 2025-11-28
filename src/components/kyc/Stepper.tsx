import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  name: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-colors',
                  currentStep > step.id
                    ? 'border-[#00A864] bg-[#00A864] text-white'
                    : currentStep === step.id
                    ? 'border-[#006FD6] bg-[#006FD6] text-white'
                    : 'border-muted-foreground/30 bg-background text-muted-foreground'
                )}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={cn(
                  'text-sm font-medium',
                  currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-0.5 w-20',
                  currentStep > step.id ? 'bg-[#00A864]' : 'bg-muted-foreground/30'
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
