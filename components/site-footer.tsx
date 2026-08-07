export function SiteFooter() {
  return (
    <div className="bg-ink-950 text-paper">
      <div className="mx-auto max-w-290 px-7">
        <footer className="border-t border-white/10 mt-0 py-5.5 flex justify-between flex-wrap gap-2.5 text-[0.82rem] opacity-60">
          <span>© {new Date().getFullYear()} Élégance Paysages — Robillard &amp; Prévost</span>
          <span>Site en construction — mentions légales à venir</span>
        </footer>
      </div>
    </div>
  );
}
