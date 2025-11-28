import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface Step1Props {
  formData: {
    firstName: string;
    lastName: string;
    investorType: string;
    purchaseAmount: string;
  };
  onInputChange: (field: string, value: string) => void;
  onContinue: () => void;
}

export function Step1InvestmentProfile({ formData, onInputChange, onContinue }: Step1Props) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Investment Profile</CardTitle>
        <CardDescription>
          Tell us about your investment preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => onInputChange('firstName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => onInputChange('lastName', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Investor Type</Label>
          <div className="grid gap-4 md:grid-cols-2">
            <div
              onClick={() => onInputChange('investorType', 'individual')}
              className={cn(
                'cursor-pointer rounded-lg border-2 p-4 transition-colors',
                formData.investorType === 'individual'
                  ? 'border-[#00A864] bg-[#00A864]/5'
                  : 'border-muted hover:border-[#006FD6]'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'h-5 w-5 rounded-full border-2 flex items-center justify-center',
                    formData.investorType === 'individual'
                      ? 'border-[#00A864]'
                      : 'border-muted-foreground/50'
                  )}
                >
                  {formData.investorType === 'individual' && (
                    <div className="h-3 w-3 rounded-full bg-[#00A864]" />
                  )}
                </div>
                <div>
                  <p className="font-medium">Individual</p>
                  <p className="text-sm text-muted-foreground">
                    Personal investment account
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => onInputChange('investorType', 'organization')}
              className={cn(
                'cursor-pointer rounded-lg border-2 p-4 transition-colors',
                formData.investorType === 'organization'
                  ? 'border-[#00A864] bg-[#00A864]/5'
                  : 'border-muted hover:border-[#006FD6]'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'h-5 w-5 rounded-full border-2 flex items-center justify-center',
                    formData.investorType === 'organization'
                      ? 'border-[#00A864]'
                      : 'border-muted-foreground/50'
                  )}
                >
                  {formData.investorType === 'organization' && (
                    <div className="h-3 w-3 rounded-full bg-[#00A864]" />
                  )}
                </div>
                <div>
                  <p className="font-medium">Organization</p>
                  <p className="text-sm text-muted-foreground">
                    Business or institutional
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Likely Purchase Amount</Label>
          <div className="grid gap-3">
            {[
              { value: '$0-$1,000', label: '$0 - $1,000' },
              { value: '$1,000-$10,000', label: '$1,000 - $10,000' },
              { value: '$10,000-$100,000', label: '$10,000 - $100,000' },
            ].map((option) => (
              <div
                key={option.value}
                onClick={() => onInputChange('purchaseAmount', option.value)}
                className={cn(
                  'cursor-pointer rounded-lg border-2 p-3 transition-colors',
                  formData.purchaseAmount === option.value
                    ? 'border-[#00A864] bg-[#00A864]/5'
                    : 'border-muted hover:border-[#006FD6]'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'h-5 w-5 rounded-full border-2 flex items-center justify-center',
                      formData.purchaseAmount === option.value
                        ? 'border-[#00A864]'
                        : 'border-muted-foreground/50'
                    )}
                  >
                    {formData.purchaseAmount === option.value && (
                      <div className="h-3 w-3 rounded-full bg-[#00A864]" />
                    )}
                  </div>
                  <span className="font-medium">{option.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={onContinue}
          className="w-full bg-[#00A864] hover:bg-[#006FD6] hover:scale-105 transition-all cursor-pointer"
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
