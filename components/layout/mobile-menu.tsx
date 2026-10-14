"use client";

import { PillLink } from "@/components/ui/pill-link";
import { contactInfo, type NavLink } from "@/lib/site-data";
import { NavItemLink } from "./nav-item-link";
import styles from "./mobile-menu.module.css";
import { useMobileMenuDismissal } from "./use-mobile-menu-dismissal";

type MobileMenuProps = {
  links: NavLink[];
  onClose: () => void;
};

function formatPosition(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function MobileMenu({ links, onClose }: MobileMenuProps) {
  useMobileMenuDismissal(onClose);

  return (
    <div className={styles.menu}>
      <nav aria-label="Menu mobile" className={styles.links}>
        {links.map((link, index) => (
          <NavItemLink
            key={link.href}
            href={link.href}
            className={styles.link}
            onClick={onClose}
          >
            <span className={styles.number}>
              {formatPosition(index)}
            </span>
            {link.label}
          </NavItemLink>
        ))}
      </nav>
      <div className={styles.footer}>
        <PillLink href="/contact" variant="filled" className={styles.footerPill} onClick={onClose}>
          Votre projet
        </PillLink>
        <PillLink href={contactInfo.phoneHref} className={styles.footerPill}>
          {contactInfo.phone}
        </PillLink>
      </div>
    </div>
  );
}
