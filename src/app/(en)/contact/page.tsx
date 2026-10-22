import type { Metadata } from "next";
import { ContactView } from "@/components/contact-view";
import { siteConfig } from "@/lib/site-config";
import { staticPageAlternates } from "@/lib/alternates";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}, ${siteConfig.brokerage}.`,
  alternates: staticPageAlternates("en", "/contact"),
};

export default function ContactPage() {
  return <ContactView />;
}
