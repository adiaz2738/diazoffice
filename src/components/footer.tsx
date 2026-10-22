import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { strings, type Lang } from "@/lib/i18n";

export function Footer({
  lang = "en",
  nav,
}: {
  lang?: Lang;
  nav?: { label: string; href: string }[];
}) {
  const s = strings[lang];
  return (
    <footer className="border-t border-line mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 grid gap-12 md:grid-cols-2">
        <div>
          <Image
            src="/diazoffice-logo.svg"
            alt="Anthony Diaz"
            width={150}
            height={36}
            className="h-9 w-auto"
          />
          <p className="mt-2 text-sm text-muted leading-relaxed max-w-xs">
            {siteConfig.brokerage}
            <br />
            {siteConfig.dre}
          </p>
          <div className="mt-4 flex flex-col gap-1 text-sm">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-kw-red">
              {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/[^\d]/g, "")}`}
              className="hover:text-kw-red"
            >
              {siteConfig.phone}
            </a>
          </div>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <span className="label-tag mb-2">{s.footer.explore}</span>
          {[...(nav ?? s.nav), ...s.footerExtraNav].map((item) => (
            <Link key={item.href} href={item.href} className="text-muted hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-6 flex flex-col gap-2 text-xs text-muted">
          <p>© {new Date().getFullYear()} Anthony Diaz. {s.footer.rights}</p>
          <p>{s.footer.kwDisclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
