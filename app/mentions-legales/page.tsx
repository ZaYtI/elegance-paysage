import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { contactInfo, legalInfo } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Mentions légales — Élégance Paysage",
  description:
    "Mentions légales du site Élégance Paysage : éditeur, hébergeur, propriété intellectuelle et données personnelles.",
  alternates: { canonical: "/mentions-legales" },
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[13rem_1fr] gap-x-6 gap-y-1 py-2 border-b border-paper/10">
      <dt className="text-[0.86rem] text-stone-400">{label}</dt>
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
      <SiteHeader />

      <main className="flex flex-col flex-1 bg-ink-950 text-paper">
        <div className="mx-auto w-full max-w-3xl px-7 pt-32 pb-14 md:pt-40 md:pb-20">
          <Eyebrow className="mb-2.5 text-sage-500">Informations légales</Eyebrow>
          <h1 className="text-[clamp(1.7rem,3.2vw,2.3rem)] font-heading font-medium">
            Mentions légales
          </h1>
          <p className="text-stone-400 mt-3 text-[0.95rem]">
            Conformément aux articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la
            confiance dans l&apos;économie numérique (LCEN).
          </p>

          <section className="mt-10">
            <h2 className="text-[1.15rem] font-heading font-medium mb-2">Éditeur du site</h2>
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
            <h2 className="text-[1.15rem] font-heading font-medium mb-2">Contact</h2>
            <dl>
              <Row label="Téléphone">
                <a className="text-sage-500 underline underline-offset-4 hover:text-paper" href={contactInfo.phoneHref}>
                  {contactInfo.phone}
                </a>{" "}
                —{" "}
                <a className="text-sage-500 underline underline-offset-4 hover:text-paper" href={contactInfo.phoneSecondaryHref}>
                  {contactInfo.phoneSecondary}
                </a>
              </Row>
              <Row label="E-mail">
                <a className="text-sage-500 underline underline-offset-4 hover:text-paper" href={contactInfo.emailHref}>
                  {contactInfo.email}
                </a>
              </Row>
            </dl>
          </section>

          <section className="mt-10">
            <h2 className="text-[1.15rem] font-heading font-medium mb-2">Hébergement</h2>
            <p className="text-[0.95rem]">
              Le site est hébergé par <strong>{legalInfo.host.name}</strong>,{" "}
              {legalInfo.host.address} —{" "}
              <a
                className="text-sage-500 underline underline-offset-4 hover:text-paper"
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
            <h2 className="text-[1.15rem] font-heading font-medium mb-2">Propriété intellectuelle</h2>
            <p className="text-[0.95rem]">
              {`L'ensemble des contenus du site (textes, logo, illustrations, photographies, mise en page) est la propriété exclusive de la société ${legalInfo.companyName} ou de ses partenaires, et est protégé par le droit d'auteur. Toute reproduction, représentation, modification ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.`}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-[1.15rem] font-heading font-medium mb-2">Données personnelles</h2>
            <p className="text-[0.95rem]">
              {`Les informations transmises via le formulaire de contact (nom, adresse e-mail, téléphone, description du projet et photographies éventuelles) sont utilisées uniquement pour répondre à votre demande et établir un devis. Elles sont adressées à ${legalInfo.companyName} par courrier électronique et ne sont ni cédées ni revendues à des tiers. Elles sont conservées le temps nécessaire au traitement de la demande, puis archivées ou supprimées.`}
            </p>
            <p className="text-[0.95rem] mt-3">
              Conformément au Règlement général sur la protection des données (RGPD) et à la loi
              « Informatique et Libertés », vous disposez d&apos;un droit d&apos;accès, de
              rectification, d&apos;effacement et d&apos;opposition sur vos données. Pour l&apos;exercer,
              écrivez à{" "}
              <a className="text-sage-500 underline underline-offset-4 hover:text-paper" href={contactInfo.emailHref}>
                {contactInfo.email}
              </a>
              . Vous pouvez également introduire une réclamation auprès de la CNIL (
              <a
                className="text-sage-500 underline underline-offset-4 hover:text-paper"
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
            <h2 className="text-[1.15rem] font-heading font-medium mb-2">Cookies</h2>
            <p className="text-[0.95rem]">
              Ce site ne dépose aucun cookie de mesure d&apos;audience, de traçage ou de publicité.
              Seuls des cookies techniques strictement nécessaires à son fonctionnement peuvent être
              utilisés.
            </p>
          </section>

          {legalInfo.mediator.name ? (
            <section className="mt-10">
              <h2 className="text-[1.15rem] font-heading font-medium mb-2">
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
                      className="text-sage-500 underline underline-offset-4 hover:text-paper"
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

          <p className="mt-12 text-[0.8rem] text-stone-400">
            Dernière mise à jour : {legalInfo.lastUpdated}
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
