type ContactDetailRowProps = {
  label: string;
  value: string;
  href?: string;
};

export function ContactDetailRow({ label, value, href }: ContactDetailRowProps) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-paper/15 py-5">
      <dt className="text-xs uppercase tracking-[2px] text-stone-400">{label}</dt>
      <dd className="m-0 text-lg [overflow-wrap:anywhere]">
        {href ? (
          <a href={href} className="transition-colors hover:text-sage-500">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
