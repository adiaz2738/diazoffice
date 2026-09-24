import Image from "next/image";
import Link from "next/link";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { NewsletterForm } from "@/components/newsletter-form";

export function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 grid gap-12 md:grid-cols-3">
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
          <span className="label-tag mb-2">Explore</span>
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted hover:text-ink">
              {item.label}
            </Link>
          ))}
          <Link href="/listings" className="text-muted hover:text-ink">
            Listings
          </Link>
          <Link href="/faq" className="text-muted hover:text-ink">
            FAQ
          </Link>
        </nav>

        <div>
          <span className="label-tag mb-2 block">Notes from the archive</span>
          <p className="text-sm text-muted mb-3 max-w-xs">
            New posts on Monterey County history and real estate, roughly twice a month. No spam.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-6 flex flex-col sm:flex-row gap-2 sm:justify-between text-xs text-muted">
          <p>© {new Date().getFullYear()} Anthony Diaz. All rights reserved.</p>
          <p>Equal Housing Opportunity.</p>
        </div>
      </div>
    </footer>
  );
}
