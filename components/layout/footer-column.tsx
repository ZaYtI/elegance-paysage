import type { NavLink } from "@/lib/site-data";
import { NavItemLink } from "./nav-item-link";
import styles from "./site-footer.module.css";

type FooterColumnProps = {
  title: string;
  links: NavLink[];
};

export function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <nav aria-label={title} className={styles.column}>
      <h2 className={styles.columnTitle}>{title}</h2>
      <ul className={styles.columnList}>
        {links.map((link) => (
          <li key={link.href}>
            <NavItemLink href={link.href} className={styles.underline}>
              {link.label}
            </NavItemLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
