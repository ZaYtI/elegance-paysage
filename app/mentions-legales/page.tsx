import type { Metadata } from "next";
import Link from "next/link";
import { LogoLockup } from "@/components/logo-lockup";
import { SiteFooter } from "@/components/site-footer";
import { contactInfo, legalInfo } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Mentions légales — Élégance Paysage",
  description:
    "Mentions légales du site Élégance Paysage : éditeur, hébergeur, propriété intellectuelle et données personnelles.",
  robots: { index: false, follow: true },
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[13rem_1fr] gap-x-6 gap-y-1 py-2 border-b border-ink-900/10">
      <dt className="font-heading font-semibold text-[0.86rem] text-ink-600">{label}</dt>
      <dd className="text-[0.95rem]">{children}</dd>
    </div>
  );
}

export default function MentionsLegalesPage() {
  const publicationDirector =
    legalInfo.publicationDirector ||
    `Le gérant de la société ${legalInfo.companyName}`;

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-50 bg-ink-950 text-paper border-b border-white/10">
        <div className="mx-auto max-w-290 px-7 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center text-paper no-underline">
            <LogoLockup onDark className="h-10 w-auto" />
          </Link>
          <Link
            href="/"
            className="text-[0.9rem] no-underline text-paper opacity-85 pb-0.75 border-b border-transparent transition-[opacity,border-color] duration-150 hover:opacity-100 hover:border-gold-600"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </header>

      <main className="flex flex-col flex-1 bg-paper text-ink-900">
        <div className="mx-auto w-full max-w-3xl px-7 py-14 md:py-20">
          <span className="inline-flex items-center gap-2 mb-2.5 text-gold-700 font-heading font-semibold tracking-[0.09em] uppercase text-[0.72rem]">
            <span className="h-px w-5 bg-gold-700" aria-hidden="true" />
            Informations légales
          </span>
          <h1 className="text-[clamp(1.7rem,3.2vw,2.3rem)] font-heading font-semibold">
            Mentions légales
          </h1>
          <p className="opacity-70 mt-3 text-[0.95rem]">
            Conformément aux articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la
            confiance dans l&apos;économie numérique (LCEN).
          </p>

          <section className="mt-10">
            <h2 className="text-[1.15rem] font-heading font-semibold mb-2">Éditeur du site</h2>
            <dl>
              <Row label="Dénomination sociale">{legalInfo.companyName}</Row>
              <Row label="Forme juridique">{legalInfo.legalForm}</Row>
              <Row label="Capital social">{legalInfo.capital}</Row>
              <Row label="Siège social">{legalInfo.address}</Row>
              <Row label="Immatriculation">
                RCS {legalInfo.rcsCity} {legalInfo.siren}
              </Row>
              <Row label="Numéro SIREN">{legalInfo.siren}</Row>
              <Row label="TVA intracommunautaire">
                {legalInfo.vatNumber ? legalInfo.vatNumber : "En cours d'attribution"}
              </Row>
              <Row label="Directeur de la publication">{publicationDirector}</Row>
            </dl>
          </section>

          <section className="mt-10">
            <h2 className="text-[1.15rem] font-heading font-semibold mb-2">Contact</h2>
            <dl>
              <Row label="Téléphone">
                <a className="hover:text-gold-700" href={contactInfo.phoneHref}>
                  {contactInfo.phone}
                </a>{" "}
                —{" "}
                <a className="hover:text-gold-700" href={contactInfo.phoneSecondaryHref}>
                  {contactInfo.phoneSecondary}
                </a>
              </Row>
              <Row label="E-mail">
                <a className="hover:text-gold-700" href={contactInfo.emailHref}>
                  {contactInfo.email}
                </a>
              </Row>
            </dl>
          </section>

          <section className="mt-10">
            <h2 className="text-[1.15rem] font-heading font-semibold mb-2">Hébergement</h2>
            <p className="text-[0.95rem]">
              Le site est hébergé par <strong>{legalInfo.host.name}</strong>,{" "}
              {legalInfo.host.address} —{" "}
              <a
                className="hover:text-gold-700"
                href={legalInfo.host.url}
                target="_blank"
                rel="noreferrer"
              >
                {legalInfo.host.url.replace("https://", "")}
              </a>
              .
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-[1.15rem] font-heading font-semibold mb-2">Propriété intellectuelle</h2>
            <p className="text-[0.95rem]">
              {`L'ensemble des contenus du site (textes, logo, illustrations, photographies, mise en page) est la propriété exclusive de la société ${legalInfo.companyName} ou de ses partenaires, et est protégé par le droit d'auteur. Toute reproduction, représentation, modification ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.`}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-[1.15rem] font-heading font-semibold mb-2">Données personnelles</h2>
            <p className="text-[0.95rem]">
              {`Les informations transmises via le formulaire de contact (nom, adresse e-mail, téléphone, description du projet et photographies éventuelles) sont utilisées uniquement pour répondre à votre demande et établir un devis. Elles sont adressées à ${legalInfo.companyName} par courrier électronique et ne sont ni cédées ni revendues à des tiers. Elles sont conservées le temps nécessaire au traitement de la demande, puis archivées ou supprimées.`}
            </p>
            <p className="text-[0.95rem] mt-3">
              Conformément au Règlement général sur la protection des données (RGPD) et à la loi
              « Informatique et Libertés », vous disposez d&apos;un droit d&apos;accès, de
              rectification, d&apos;effacement et d&apos;opposition sur vos données. Pour l&apos;exercer,
              écrivez à{" "}
              <a className="hover:text-gold-700" href={contactInfo.emailHref}>
                {contactInfo.email}
              </a>
              . Vous pouvez également introduire une réclamation auprès de la CNIL (
              <a
                className="hover:text-gold-700"
                href="https://www.cnil.fr"
                target="_blank"
                rel="noreferrer"
              >
                cnil.fr
              </a>
              ).
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-[1.15rem] font-heading font-semibold mb-2">Cookies</h2>
            <p className="text-[0.95rem]">
              Ce site ne dépose aucun cookie de mesure d&apos;audience, de traçage ou de publicité.
              Seuls des cookies techniques strictement nécessaires à son fonctionnement peuvent être
              utilisés.
            </p>
          </section>

          {legalInfo.mediator.name ? (
            <section className="mt-10">
              <h2 className="text-[1.15rem] font-heading font-semibold mb-2">
                Médiation de la consommation
              </h2>
              <p className="text-[0.95rem]">
                Conformément à l&apos;article L. 612-1 du Code de la consommation, le client
                consommateur peut recourir gratuitement au médiateur de la consommation suivant :{" "}
                <strong>{legalInfo.mediator.name}</strong>
                {legalInfo.mediator.url ? (
                  <>
                    {" "}
                    —{" "}
                    <a
                      className="hover:text-gold-700"
                      href={legalInfo.mediator.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {legalInfo.mediator.url.replace(/^https?:\/\//, "")}
                    </a>
                  </>
                ) : null}
                .
              </p>
            </section>
          ) : null}

          <p className="mt-12 text-[0.8rem] opacity-55">
            Dernière mise à jour : {legalInfo.lastUpdated}
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
