"use client";

import dynamic from "next/dynamic";
import type { Neighborhood } from "@/lib/neighborhoods-data";
import "leaflet/dist/leaflet.css";

const NeighborhoodMap = dynamic(
  () => import("@/components/neighborhood-map").then((m) => m.NeighborhoodMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-paper-dim">
        <p className="label-tag">Loading map…</p>
      </div>
    ),
  }
);

export function NeighborhoodMapLoader({ neighborhoods }: { neighborhoods: Neighborhood[] }) {
  return <NeighborhoodMap neighborhoods={neighborhoods} />;
}
