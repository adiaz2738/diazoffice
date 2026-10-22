import type { Metadata } from "next";
import "../globals.css";
import { RootShell } from "@/components/root-shell";
import { siteConfig } from "@/lib/site-config";
import { langMeta, strings } from "@/lib/i18n";

const s = strings.es;
const ogImageAlt = "Diaz Office, bienes raíces en el condado de Monterey";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${s.siteTagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: s.siteDescription,
  openGraph: {
    title: siteConfig.name,
    description: s.siteDescription,
    url: `${siteConfig.url}/es`,
    siteName: siteConfig.name,
    locale: langMeta.es.ogLocale,
    type: "website",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: ogImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: s.siteDescription,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: ogImageAlt }],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function SpanishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootShell lang="es">{children}</RootShell>;
}
