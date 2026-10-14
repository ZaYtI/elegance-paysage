import { cn } from "@/lib/utils";

type EyebrowProps = {
  className?: string;
  children: React.ReactNode;
};

export function Eyebrow({ className, children }: EyebrowProps) {
  return (
    <div className={cn("text-xs font-medium uppercase tracking-[2px]", className)}>
      {children}
    </div>
  );
}
