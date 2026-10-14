import Link from "next/link";
import { LogoIcon } from "@/components/logo-icon";
import { contactInfo, homeSectionsNav, mainNav, zoneInfo } from "@/lib/site-data";
import { FooterColumn } from "./footer-column";
import { FooterWordmark } from "./footer-wordmark";
import styles from "./site-footer.module.css";

const contactLinks = [
  { label: contactInfo.phone, href: contactInfo.phoneHref },
  { label: contactInfo.phoneSecondary, href: contactInfo.phoneSecondaryHref },
  { label: contactInfo.email, href: contactInfo.emailHref },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.intro}>
          <Link href="/" className={styles.brand}>
            <LogoIcon className={styles.logo} />
            <span className={styles.name}>élégance paysage</span>
          </Link>
          <p className={styles.tagline}>
            Paysagiste &amp; élagueur, dans un rayon de {zoneInfo.radiusKm} km autour d’{zoneInfo.city}.
          </p>
        </div>
        <FooterColumn title="Pages" links={mainNav} />
        <FooterColumn title="Sur l’accueil" links={homeSectionsNav} />
        <FooterColumn title="Contact" links={contactLinks} />
      </div>

      <FooterWordmark />

      <div className={styles.bottom}>
        <span>
          © {currentYear} · Robillard &amp; Prévost · {zoneInfo.city}
        </span>
        <Link href="/mentions-legales" className={styles.underline}>
          Mentions légales
        </Link>
      </div>
    </footer>
  );
}
