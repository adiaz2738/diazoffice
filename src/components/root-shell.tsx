import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site-config";
import { getLanguageSwitchMap, getNav } from "@/lib/alternates";
import type { Lang } from "@/lib/i18n";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Existing YouTube link stays in; siteConfig.sameAs adds the rest. Deduped, omitted when empty.
const sameAs = [...new Set([siteConfig.social.youtube, ...siteConfig.sameAs].filter(Boolean))];

const realEstateAgentSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: siteConfig.name,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  url: siteConfig.url,
  areaServed: ["Monterey County", "Santa Cruz County", "San Benito County"].map((name) => ({
    "@type": "AdministrativeArea",
    name: `${name}, California`,
  })),
  knowsLanguage: ["English", "Spanish"],
  // address: TODO — add a PostalAddress object here if/when an office address should be published.
  ...(sameAs.length > 0 && { sameAs }),
};

/** The <html>/<body> chrome shared by the English and Spanish root layouts. */
export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentSchema) }}
        />
        <Header lang={lang} switchMap={getLanguageSwitchMap(lang)} nav={getNav(lang)} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} nav={getNav(lang)} />
      </body>
    </html>
  );
}
