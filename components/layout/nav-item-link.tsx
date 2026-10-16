import Link from "next/link";

type NavItemLinkProps = {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export function NavItemLink({ href, className, onClick, children }: NavItemLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
