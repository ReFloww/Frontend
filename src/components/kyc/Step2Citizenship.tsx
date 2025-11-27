import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface Step2Props {
  formData: {
    country: string;
  };
  onInputChange: (field: string, value: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function Step2Citizenship({ formData, onInputChange, onContinue, onBack }: Step2Props) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Country of Citizenship</CardTitle>
        <CardDescription>
          Select the country of your citizenship that is the same as the government
          ID you will provide. You will be asked to upload an ID from this country
          in the next step. This needs to be an ID issued from the same country as
          your citizenship.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <select
            id="country"
            value={formData.country}
            onChange={(e) => onInputChange('country', e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer"
          >
            <option value="" disabled>Select a country</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="JP">Japan</option>
            <option value="SG">Singapore</option>
            <option value="ID">Indonesia</option>
            <option value="MY">Malaysia</option>
            <option value="TH">Thailand</option>
            <option value="VN">Vietnam</option>
            <option value="PH">Philippines</option>
          </select>
        </div>

        <div className="flex gap-3 w-full">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={onContinue}
            className="flex-1 transition-all hover:scale-[1.02]"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
