"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const SeasideMap = dynamic(() => import("@/components/seaside-map").then((m) => m.SeasideMap), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-paper-dim">
      <p className="label-tag">Loading map…</p>
    </div>
  ),
});

export function SeasideMapLoader() {
  return (
    <div className="my-8 w-full h-[400px] border border-line">
      <SeasideMap />
    </div>
  );
}
