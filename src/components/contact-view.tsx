import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/lib/site-config";
import { strings, type Lang } from "@/lib/i18n";

export function ContactView({ lang = "en" }: { lang?: Lang }) {
  const t = strings[lang].contact;

  return (
    <div className="mx-auto max-w-4xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="label-tag label-tag--accent mb-3">{t.eyebrow}</p>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight max-w-xl">{t.heading}</h1>

      <div className="mt-14 grid gap-12 md:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="label-tag mb-3">{t.direct}</p>
          <div className="space-y-2 text-lg">
            <a href={`mailto:${siteConfig.email}`} className="block hover:text-kw-red">
              {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/[^\d]/g, "")}`}
              className="block hover:text-kw-red"
            >
              {siteConfig.phone}
            </a>
          </div>
          <p className="mt-8 text-sm text-muted leading-relaxed">
            {siteConfig.brokerage}
            <br />
            {siteConfig.dre}
          </p>
        </div>

        <ContactForm lang={lang} />
      </div>
    </div>
  );
}
