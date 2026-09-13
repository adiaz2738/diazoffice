import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name}, a REALTOR® serving Monterey County.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="label-tag label-tag--accent mb-3">About</p>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Anthony Diaz</h1>
      <p className="mt-3 text-muted">
        {siteConfig.brokerage}, {siteConfig.dre}
      </p>

      <div className="mt-10 space-y-5 text-lg leading-relaxed text-ink/90">
        <p>
          {/* TODO: replace with your real bio. Keep the voice conversational, not a résumé. */}
          [Write 2-3 paragraphs here: how you got into real estate, what drew you to Monterey
          County specifically, and why the history side of this site exists. The honest version
          of &ldquo;I&apos;ve always wanted to do this but never started.&rdquo;]
        </p>
        <p>
          [A paragraph on how you work with buyers/sellers: your actual process, not generic
          agent marketing copy. Reference the buyer consultation approach if it fits: showing
          sold data first, walking through paperwork page by page, that kind of specific detail.]
        </p>
      </div>

      <div className="mt-12 border border-line p-8 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
        <div>
          <p className="font-medium">Have a property question, or just curious about a place?</p>
          <p className="text-muted text-sm mt-1">I answer both kinds of messages.</p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 border border-ink px-6 py-3 text-sm font-medium hover:bg-ink hover:text-paper transition-colors shrink-0"
        >
          Contact me <ArrowRight size={16} />
        </Link>
      </div>

      <p className="mt-6 text-sm text-muted">
        Have a quick question first?{" "}
        <Link href="/faq" className="underline decoration-kw-red underline-offset-2 hover:text-kw-red">
          Common questions
        </Link>
      </p>
    </div>
  );
}
