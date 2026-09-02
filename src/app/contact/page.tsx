import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}, ${siteConfig.brokerage}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="label-tag label-tag--accent mb-3">Get in touch</p>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight max-w-xl">
        Questions about buying, selling, or just the town: send them over.
      </h1>

      <div className="mt-14 grid gap-12 md:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="label-tag mb-3">Direct</p>
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

        <ContactForm />
      </div>
    </div>
  );
}
