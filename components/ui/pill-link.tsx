import Link from "next/link";
import { cn } from "@/lib/utils";
import styles from "./pill-link.module.css";

type PillLinkVariant = "outline" | "filled" | "dark";

type PillLinkProps = {
  href: string;
  variant?: PillLinkVariant;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export function PillLink({ href, variant = "outline", className, onClick, children }: PillLinkProps) {
  return (
    <Link href={href} onClick={onClick} className={cn(styles.pill, styles[variant], className)}>
      {children}
    </Link>
  );
}
