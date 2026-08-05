import { Button } from "@/components/ui/button";
import { LogoIcon } from "@/components/logo-icon";
import { heroStats } from "@/lib/site-data";

export function HeroSection() {
  return (
    <section id="top" className="relative bg-ink-950 text-paper pt-16 overflow-hidden">
      <div className="mx-auto max-w-[1160px] px-7 grid gap-10 items-center md:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="rise-in d1 inline-flex items-center gap-2 mb-[18px] text-sage-300 font-heading font-semibold tracking-[0.09em] uppercase text-[0.72rem]">
            <span className="h-px w-5 bg-sage-300" aria-hidden="true" />
            Aménagement paysager &amp; élagage — Robillard &amp; Prévost
          </span>
          <h1 className="rise-in d2 font-heading font-bold text-[clamp(2.3rem,4.4vw,3.4rem)] leading-[1.08] max-w-[15ch]">
            Des jardins pensés avec <em className="not-italic text-bark-700">élégance</em>, de la racine à la cime.
          </h1>
          <p className="rise-in d3 mt-5 max-w-[46ch] text-[1.06rem] text-paper/85">
            Création d&apos;espaces verts, portails et clôtures, entretien et taille pour particuliers
            et professionnels. Un travail soigné, sécurisé, et pensé pour la santé de vos arbres sur le
            long terme.
          </p>
          <div className="rise-in d4 flex gap-[14px] mt-8 flex-wrap">
            <Button
              render={<a href="#contact" />}
              nativeButton={false}
              size="lg"
              className="bg-paper text-ink-950 hover:bg-bark-700 hover:text-white rounded-[3px] h-auto py-[13px] px-[22px] transition-transform hover:-translate-y-0.5"
            >
              Demander un devis gratuit
            </Button>
            <Button
              render={<a href="#services" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="border-white/15 text-paper bg-transparent hover:bg-transparent hover:border-sage-300 hover:text-paper rounded-[3px] h-auto py-[13px] px-[22px] transition-transform hover:-translate-y-0.5"
            >
              Voir les services
            </Button>
          </div>

          <div className="rise-in d5 flex gap-[30px] mt-12 pt-6 border-t border-white/10 flex-wrap">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <b className="block font-heading text-[1.4rem]">{stat.value}</b>
                <span className="text-[0.8rem] opacity-70">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center py-[10px] pb-[30px]" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="w-full h-auto max-w-[400px]">
            <defs>
              <radialGradient id="logoGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#B98B4E" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#B98B4E" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle className="glow-pulse" cx="100" cy="100" r="100" fill="url(#logoGlow)" />
          </svg>
          <LogoIcon onDark className="absolute inset-0 m-auto w-full h-auto max-w-[400px]" />
        </div>
      </div>

      <div className="h-9" aria-hidden="true">
        <svg preserveAspectRatio="none" viewBox="0 0 1160 36" className="w-full h-9 block">
          <path
            d="M0 18 Q 290 4 580 18 T 1160 18"
            fill="none"
            stroke="#FAF8F2"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
        </svg>
      </div>
    </section>
  );
}
