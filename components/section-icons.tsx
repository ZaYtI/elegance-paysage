import type { SVGProps } from "react";
import type { Engagement, Service } from "@/lib/site-data";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      {children}
    </svg>
  );
}

export function ElagageIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 34 L34 14 M14 14 L34 34" strokeLinecap="round" />
      <circle cx="14" cy="14" r="4.5" />
      <circle cx="14" cy="34" r="4.5" />
    </IconBase>
  );
}

export function AbattageIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M22 40 V 20" strokeLinecap="round" />
      <path d="M22 20 L10 8 M22 20 L34 8" strokeLinecap="round" />
      <path d="M6 40 H 38" strokeLinecap="round" />
    </IconBase>
  );
}

export function HaiesIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 30 H 42 M6 30 C 6 20 12 14 24 14 C 36 14 42 20 42 30" strokeLinecap="round" />
      <path d="M6 30 V 38 H 42 V 30" strokeLinecap="round" />
    </IconBase>
  );
}

export function AmenagementIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M24 40 V 24" strokeLinecap="round" />
      <path d="M24 24 C 14 24 12 14 12 10 C 18 10 24 14 24 24 Z" />
      <path d="M24 24 C 34 24 36 16 36 12 C 29 12 24 16 24 24 Z" />
      <path d="M14 40 H 34" strokeLinecap="round" />
    </IconBase>
  );
}

const serviceIcons: Record<Service["icon"], (props: IconProps) => React.JSX.Element> = {
  elagage: ElagageIcon,
  abattage: AbattageIcon,
  haies: HaiesIcon,
  amenagement: AmenagementIcon,
};

export function ServiceIcon({ icon, ...props }: { icon: Service["icon"] } & IconProps) {
  const Icon = serviceIcons[icon];
  return <Icon {...props} />;
}

export function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M12 3l7 3v5c0 5-3.2 8.3-7 10-3.8-1.7-7-5-7-10V6l7-3Z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ToolsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="3" y="9" width="18" height="10" rx="1.5" />
      <path d="M8 9V6a4 4 0 0 1 8 0v3" strokeLinecap="round" />
      <path d="M10.5 9v3M13.5 9v3" strokeLinecap="round" />
    </svg>
  );
}

export function QuoteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4" strokeLinecap="round" />
    </svg>
  );
}

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round" />
      <path d="M12 14v2.5l1.8 1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const engagementIcons: Record<Engagement["icon"], (props: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  shield: ShieldIcon,
  tools: ToolsIcon,
  quote: QuoteIcon,
  clock: ClockIcon,
};

export function EngagementIcon({ icon, ...props }: { icon: Engagement["icon"] } & SVGProps<SVGSVGElement>) {
  const Icon = engagementIcons[icon];
  return <Icon {...props} />;
}

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M4 5c0 8 7 15 15 15l3-4-6-3-2 2c-3-1-5-3-6-6l2-2-3-6Z" />
    </svg>
  );
}

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 6l9 7 9-7" />
    </svg>
  );
}

export function FrameIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <rect x="6" y="10" width="36" height="28" rx="2" />
      <path d="M6 30 L18 20 L26 28 L34 18 L42 26" />
    </svg>
  );
}
