import { contactInfo, zoneInfo } from "@/lib/site-data";
import { ContactDetailRow } from "./contact-detail-row";

export function ContactDetails() {
  return (
    <dl className="mt-12 flex flex-col border-t border-paper/15">
      <ContactDetailRow label="Téléphone" value={contactInfo.phone} href={contactInfo.phoneHref} />
      <ContactDetailRow label="Téléphone" value={contactInfo.phoneSecondary} href={contactInfo.phoneSecondaryHref} />
      <ContactDetailRow label="Email" value={contactInfo.email} href={contactInfo.emailHref} />
      <ContactDetailRow label="Secteur" value={`${zoneInfo.radiusKm} km autour d’${zoneInfo.city}`} />
    </dl>
  );
}
