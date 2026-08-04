import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  variant?: "light" | "dark";
  className?: string;
};

export function SectionHeading({ eyebrow, title, variant = "light", className }: SectionHeadingProps) {
  const eyebrowColor = variant === "dark" ? "text-sage-300" : "text-bark-700";
  const lineColor = variant === "dark" ? "bg-sage-300" : "bg-bark-700";

  return (
    <div className={cn("max-w-[56ch] mb-11", className)}>
      <span className={cn("inline-flex items-center gap-2 mb-2.5 font-heading font-semibold tracking-[0.09em] uppercase text-[0.72rem]", eyebrowColor)}>
        <span className={cn("h-px w-5", lineColor)} aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="font-heading font-semibold text-[clamp(1.6rem,2.8vw,2.15rem)] leading-tight">
        {title}
      </h2>
    </div>
  );
}
