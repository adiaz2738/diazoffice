import type { Metadata } from "next";
import Image from "next/image";
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
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <Image
          src="/images/about/anthony-headshot.jpg"
          alt="Anthony Diaz"
          width={180}
          height={180}
          className="rounded-full object-cover shrink-0 ring-[3px] ring-kw-red ring-offset-4 ring-offset-paper"
        />
        <div className="hidden sm:block w-px self-stretch bg-line" aria-hidden />
        <div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Anthony Diaz</h1>
          <p className="label-tag label-tag--accent mt-3">REALTOR® | {siteConfig.dre}</p>
          <p className="mt-2 text-muted">{siteConfig.brokerage}</p>
          <div className="mt-4 h-0.5 w-8 bg-kw-red" aria-hidden />
          <p className="mt-4 text-sm text-muted">
            {siteConfig.phone}
            <span className="mx-2 text-line">|</span>
            {siteConfig.email}
            <span className="mx-2 text-line">|</span>
            {siteConfig.url.replace("https://", "")}
          </p>
        </div>
      </div>

      <div className="mt-10 space-y-5 text-lg leading-relaxed text-ink/90">
        <p>
          I&apos;m an analytical person. I like the numbers, I know the contracts, and what
          actually pulls me into this work is the relationships: how a transaction really moves
          from an offer to a closed deal. I take protecting my clients seriously. Knowing their
          options, catching what they&apos;d miss, making sure they feel confident they&apos;re
          doing things the right way.
        </p>
        <p>
          When I work with sellers, I don&apos;t hand you a number on day one. I come see the home
          first and learn about your situation, then I go do the homework: comparable sales,
          market conditions, what&apos;s actually driving value on your street right now. The
          second time we talk, I walk you through a real price range, backed by what I found, not
          a guess.
        </p>
        <p>
          With buyers, I make sure you understand what&apos;s actually happening in the market and
          what to expect at each step, so the process feels less like a surprise and more like
          something you&apos;re prepared for. Buying a home is complicated enough without also
          feeling in the dark about it.
        </p>
        <p>
          I also work fluently in Spanish. About half my clients speak Spanish as a first
          language, and that shouldn&apos;t be the reason anyone feels less informed about the
          biggest financial decision of their life.
        </p>
      </div>

      <div className="mt-12">
        <p className="label-tag mb-4">Brokerage</p>
        <div className="flex flex-wrap items-center gap-8">
          <Image
            src="/images/about/kw-coastal-estates-logo.png"
            alt="Keller Williams Coastal Estates"
            width={200}
            height={40}
            className="h-10 w-auto"
          />
          <Image
            src="/images/about/mpht-logo.png"
            alt="Monterey Peninsula Home Team"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
        </div>
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
