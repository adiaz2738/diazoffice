import fs from "fs";
import path from "path";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type PhotoRecord = {
  file: string;
  town: string;
  date: string;
  alt: string;
  caption: string;
};

function loadPhotos(): PhotoRecord[] {
  const dataPath = path.join(process.cwd(), "src", "data", "photos.json");
  if (!fs.existsSync(dataPath)) return [];
  try {
    return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  } catch {
    return [];
  }
}

export default function DevPhotosPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  const photos = loadPhotos();
  const byTown = new Map<string, PhotoRecord[]>();
  for (const photo of photos) {
    const list = byTown.get(photo.town) ?? [];
    list.push(photo);
    byTown.set(photo.town, list);
  }
  const towns = [...byTown.keys()].sort();

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <p className="label-tag label-tag--accent mb-3">Dev only</p>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Photo inbox</h1>
      <p className="mt-3 text-muted">
        {photos.length} photo{photos.length === 1 ? "" : "s"} across {towns.length} town
        {towns.length === 1 ? "" : "s"}.
      </p>

      {towns.length === 0 ? (
        <p className="mt-10 text-muted border border-dashed border-line p-8 text-center">
          No photos yet. Drop images in photo-inbox/ and run{" "}
          <code className="text-ink">npm run photos</code>.
        </p>
      ) : (
        towns.map((town) => (
          <div key={town} className="mt-12">
            <p className="label-tag mb-4">{town}</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {byTown.get(town)!.map((photo) => (
                <div key={photo.file}>
                  <div className="relative aspect-video border border-line overflow-hidden">
                    <Image
                      src={`/images/photos/${photo.file}`}
                      alt={photo.alt || photo.file}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted break-all">{photo.file}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
