import { GuideChapter, guideChapterMetadata, guideChapterStaticParams } from "@/lib/es-pages";

const GUIDE_CATEGORY = "buyers-guide" as const;

export function generateStaticParams() {
  return guideChapterStaticParams(GUIDE_CATEGORY);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return guideChapterMetadata(GUIDE_CATEGORY, slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <GuideChapter category={GUIDE_CATEGORY} slug={slug} />;
}
