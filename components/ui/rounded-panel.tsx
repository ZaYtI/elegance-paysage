import { cn } from "@/lib/utils";
import styles from "./rounded-panel.module.css";

type RoundedPanelSurround = "paper" | "sand";

type RoundedPanelProps = {
  id?: string;
  surround: RoundedPanelSurround;
  className?: string;
  children: React.ReactNode;
};

export function RoundedPanel({ id, surround, className, children }: RoundedPanelProps) {
  return (
    <section id={id} className={cn(styles.surround, styles[surround])}>
      <div className={cn(styles.panel, className)}>{children}</div>
    </section>
  );
}
