import path from "path";
import sharp from "sharp";
import Image from "next/image";

export async function Photo({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const filePath = path.join(process.cwd(), "public", src);
  const { width = 1800, height = 1200 } = await sharp(filePath).metadata();

  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 768px) 768px, 100vw"
        className="w-full h-auto border border-line"
      />
      {caption && <figcaption className="mt-2 text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}
