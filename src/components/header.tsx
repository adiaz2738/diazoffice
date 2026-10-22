"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { strings, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/cn";

// `switchMap` maps this page's path to its translation's path; pages without a translation
// fall back to the other language's home.
export function Header({
  lang = "en",
  switchMap = {},
  nav,
}: {
  lang?: Lang;
  switchMap?: Record<string, string>;
  nav?: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const s = strings[lang];
  const navItems = nav ?? s.nav;
  const otherLang: Lang = lang === "en" ? "es" : "en";
  const switchHref = switchMap[pathname] ?? strings[otherLang].homeHref;
  const switchLink = (
    <Link
      href={switchHref}
      lang={otherLang}
      hrefLang={otherLang}
      onClick={() => setOpen(false)}
      className="text-sm font-medium text-muted transition-colors hover:text-kw-red"
    >
      {strings[otherLang].switchLabel}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href={s.homeHref} onClick={() => setOpen(false)}>
          <Image
            src="/diazoffice-logo.svg"
            alt="Anthony Diaz"
            width={140}
            height={34}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-kw-red",
                  active ? "text-ink" : "text-muted"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={s.contactHref}
            className="border border-ink px-4 py-2 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
          >
            {s.header.contact}
          </Link>
          {switchLink}
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          aria-label={open ? s.header.closeMenu : s.header.openMenu}
          aria-expanded={open}
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-line bg-paper px-5 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base font-medium border-b border-line last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={s.contactHref}
            onClick={() => setOpen(false)}
            className="mt-4 text-center border border-ink px-4 py-3 text-sm font-medium"
          >
            {s.header.contact}
          </Link>
          <div className="mt-3 text-center">{switchLink}</div>
          <a
            href={`tel:${siteConfig.phone.replace(/[^\d]/g, "")}`}
            className="mt-2 text-center text-sm text-muted"
          >
            {siteConfig.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
