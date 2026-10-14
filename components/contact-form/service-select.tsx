import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ContactFormValues } from "@/lib/contact-schema";
import { serviceOptions } from "@/lib/site-data";
import { fieldClasses } from "./field-classes";
import { FormField } from "./form-field";

type ServiceSelectProps = {
  value: ContactFormValues["service"];
  onChange: (service: ContactFormValues["service"]) => void;
};

export function ServiceSelect({ value, onChange }: ServiceSelectProps) {
  return (
    <FormField htmlFor="service" label="Type de demande">
      <Select
        name="service"
        value={value}
        onValueChange={(selected) => onChange(selected as ContactFormValues["service"])}
      >
        <SelectTrigger id="service" className={`w-full ${fieldClasses}`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {serviceOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}
