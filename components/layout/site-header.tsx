import Link from "next/link";
import { LogoIcon } from "@/components/logo-icon";
import type { NavLink } from "@/lib/site-data";
import { HeaderMenu } from "./header-menu";
import { NavItemLink } from "./nav-item-link";
import styles from "./site-header.module.css";

type SiteHeaderProps = {
  links: NavLink[];
  homeHref: string;
};

export function SiteHeader({ links, homeHref }: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <nav aria-label="Navigation principale" className={styles.nav}>
        <Link href={homeHref} className={styles.brand}>
          <LogoIcon onDark className={styles.logo} />
          <span className={styles.wordmark}>
            <span className={styles.name}>élégance paysage</span>
            <span className={styles.signature}>Robillard &amp; Prévost</span>
          </span>
        </Link>
        <div className={styles.links}>
          {links.map((link) => (
            <NavItemLink key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </NavItemLink>
          ))}
        </div>
        <NavItemLink href="/contact" className={styles.cta}>
          Votre projet
        </NavItemLink>
        <HeaderMenu links={links} />
      </nav>
    </header>
  );
}
