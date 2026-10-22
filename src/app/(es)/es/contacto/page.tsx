import { ContactView } from "@/components/contact-view";
import { buildSpanishPageMetadata } from "@/lib/es-pages";
import { siteConfig } from "@/lib/site-config";
import { strings } from "@/lib/i18n";

const t = strings.es.contact;

export const metadata = buildSpanishPageMetadata({
  enPath: "/contact",
  esPath: "/es/contacto",
  title: t.metaTitle,
  description: t.metaDescription(siteConfig.name, siteConfig.brokerage),
});

export default function Page() {
  return <ContactView lang="es" />;
}
