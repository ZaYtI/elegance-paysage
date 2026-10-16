import { LogoLockup } from "@/components/logo-lockup";
import { mainNav } from "@/lib/site-data";
import { BrandLink } from "./brand-link";
import { HeaderMenu } from "./header-menu";
import { NavItemLink } from "./nav-item-link";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <nav aria-label="Navigation principale" className={styles.nav}>
        <BrandLink className={styles.brand}>
          <LogoLockup onDark className={styles.logo} />
        </BrandLink>
        <div className={styles.links}>
          {mainNav.map((link) => (
            <NavItemLink key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </NavItemLink>
          ))}
        </div>
        <NavItemLink href="/contact" className={styles.cta}>
          Votre projet
        </NavItemLink>
        <HeaderMenu links={mainNav} />
      </nav>
    </header>
  );
}
