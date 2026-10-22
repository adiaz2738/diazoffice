import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Listings",
  description: "Active listings, coming soon.",
};

export default function ListingsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 sm:px-8 py-24 sm:py-32 text-center">
      <p className="label-tag label-tag--accent mb-3">Coming soon</p>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
        Live listings are on the way
      </h1>
      <p className="mt-4 text-muted leading-relaxed">
        This page will connect directly to MLS listing data. In the meantime, reach out and
        I&apos;ll send you exactly what fits what you&apos;re looking for.
      </p>
      <Link
        href="/contact"
        className="mt-8 inline-flex items-center gap-2 border border-ink px-6 py-3 text-sm font-medium hover:bg-ink hover:text-paper transition-colors"
      >
        Contact me <ArrowRight size={16} />
      </Link>
    </div>
  );
}
