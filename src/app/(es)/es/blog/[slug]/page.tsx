import { BlogPost, blogMetadata, blogStaticParams } from "@/lib/es-pages";

export function generateStaticParams() {
  return blogStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return blogMetadata(slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPost slug={slug} />;
}
