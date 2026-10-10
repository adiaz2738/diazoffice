import type { Metadata } from "next";
import Link from "next/link";
import { faqs, stripMarkdownLinks } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about buying and selling real estate in Monterey County with Anthony Diaz.",
};

// Answers may contain markdown links like [text](/path). Render them as internal links.
function renderAnswer(answer: string) {
  const parts: React.ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(answer)) !== null) {
    if (match.index > last) parts.push(answer.slice(last, match.index));
    parts.push(
      <Link
        key={match.index}
        href={match[2]}
        className="underline decoration-kw-red underline-offset-2 hover:text-kw-red"
      >
        {match[1]}
      </Link>
    );
    last = match.index + match[0].length;
  }
  if (last < answer.length) parts.push(answer.slice(last));

  return parts;
}

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripMarkdownLinks(faq.answer),
      },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <p className="label-tag label-tag--accent mb-3">Questions</p>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
        Frequently Asked Questions
      </h1>

      <div className="mt-10">
        {faqs.map((faq) => (
          <div key={faq.question} className="border-b border-line py-6">
            <h2 className="text-lg font-semibold tracking-tight">{faq.question}</h2>
            <p className="mt-2 text-muted leading-relaxed">{renderAnswer(faq.answer)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
