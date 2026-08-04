import { zoneInfo } from "@/lib/site-data";

export function ZoneSection() {
  return (
    <section id="zone" className="py-[70px] bg-paper">
      <div className="mx-auto max-w-[1160px] px-7 grid gap-12 items-center md:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 mb-2.5 text-bark-700 font-heading font-semibold tracking-[0.09em] uppercase text-[0.72rem]">
            <span className="h-px w-5 bg-bark-700" aria-hidden="true" />
            Zone d&apos;intervention
          </span>
          <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] mt-2.5 font-heading font-semibold">
            Un rayon de {zoneInfo.radiusKm} km autour de {zoneInfo.city}
          </h2>
          <p className="mt-3.5 text-ink-600 max-w-[42ch]">
            Particuliers, copropriétés et professionnels. Déplacement à évaluer au-delà de cette zone
            selon le chantier — n&apos;hésitez pas à demander.
          </p>
        </div>
        <div className="mx-auto w-full max-w-[340px]" aria-hidden="true">
          <svg viewBox="0 0 300 300" className="w-full h-auto">
            <circle cx="150" cy="150" r="120" fill="none" stroke="#A08469" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="150" cy="150" r="80" fill="none" stroke="#A08469" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="150" cy="150" r="6" fill="#B98B4E" />
            <text x="150" y="140" textAnchor="middle" fontFamily="var(--font-poppins)" fontWeight="600" fontSize="9" fill="#5B5546">
              {zoneInfo.city.toUpperCase()}
            </text>
            <text x="150" y="26" textAnchor="middle" fontFamily="var(--font-poppins)" fontWeight="600" fontSize="9" fill="#5B5546">
              {zoneInfo.radiusKm} KM
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
