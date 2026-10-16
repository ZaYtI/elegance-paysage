import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { phoneCountries, type PhoneCountryCode } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";
import { FormField } from "./form-field";

type PhoneFieldProps = {
  country: PhoneCountryCode;
  number: string;
  error?: string;
  onCountryChange: (country: PhoneCountryCode) => void;
  onNumberChange: (number: string) => void;
};

export function PhoneField({ country, number, error, onCountryChange, onNumberChange }: PhoneFieldProps) {
  const activeCountry = phoneCountries.find((c) => c.code === country) ?? phoneCountries[0];

  return (
    <FormField htmlFor="tel" label="Téléphone" error={error}>
      <div
        className={cn(
          "flex items-stretch overflow-hidden rounded-lg border transition-colors",
          "focus-within:border-sage-500 focus-within:ring-3 focus-within:ring-sage-500/40",
          error ? "border-destructive ring-3 ring-destructive/20" : "border-white/15"
        )}
      >
        <Select
          name="telCountry"
          value={country}
          onValueChange={(value) => onCountryChange(value as PhoneCountryCode)}
        >
          <SelectTrigger className="w-auto shrink-0 rounded-none border-0 border-r border-white/15 bg-ink-700 text-paper focus-visible:ring-0">
            <SelectValue>
              {activeCountry.flag} {activeCountry.code}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {phoneCountries.map((option) => (
              <SelectItem key={option.code} value={option.code}>
                {option.flag} {option.label} ({option.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          id="tel"
          name="tel"
          type="tel"
          inputMode="numeric"
          placeholder={activeCountry.placeholder}
          value={number}
          onChange={(e) => onNumberChange(e.target.value)}
          aria-invalid={Boolean(error)}
          className="rounded-none border-0 bg-ink-950 text-paper placeholder:text-paper/40 focus-visible:border-transparent focus-visible:ring-0"
        />
      </div>
    </FormField>
  );
}
