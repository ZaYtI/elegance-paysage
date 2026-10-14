import { Label } from "@/components/ui/label";
import { errorTextClasses } from "./field-classes";

type FormFieldProps = {
  htmlFor: string;
  label: string;
  error?: string;
  children: React.ReactNode;
};

export function FormField({ htmlFor, label, error, children }: FormFieldProps) {
  return (
    <div>
      <Label htmlFor={htmlFor} className="mb-2 text-[0.8rem] text-stone-400">
        {label}
      </Label>
      {children}
      {error && <p className={errorTextClasses}>{error}</p>}
    </div>
  );
}
