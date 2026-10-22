import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { strings } from "@/lib/i18n";

const t = strings.es.notFound;

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 sm:px-8 py-32 text-center">
      <p className="label-tag label-tag--accent mb-3">404</p>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{t.heading}</h1>
      <p className="mt-4 text-muted">{t.body}</p>
      <Link
        href="/es"
        className="mt-8 inline-flex items-center gap-2 border border-ink px-6 py-3 text-sm font-medium hover:bg-ink hover:text-paper transition-colors"
      >
        {t.back} <ArrowRight size={16} />
      </Link>
    </div>
  );
}
