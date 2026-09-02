"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import type { Neighborhood } from "@/lib/neighborhoods-data";

// Custom marker: a simple ink-ringed dot in the KW red, styled with plain CSS
// so we don't need to bundle Leaflet's default marker image assets.
const markerIcon = L.divIcon({
  className: "",
  html: `<span style="
    display:block;
    width:16px;
    height:16px;
    border-radius:9999px;
    background:#ce011f;
    border:3px solid #fafaf8;
    box-shadow:0 0 0 1.5px #0a0a0a;
  "></span>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -10],
});

export function NeighborhoodMap({ neighborhoods }: { neighborhoods: Neighborhood[] }) {
  // Rough centroid over Monterey County / the coast.
  const center: [number, number] = [36.68, -121.85];

  return (
    <MapContainer
      center={center}
      zoom={10}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {neighborhoods.map((n) => (
        <Marker key={n.slug} position={[n.lat, n.lng]} icon={markerIcon}>
          <Popup>
            <p className="font-semibold mb-1">{n.name}</p>
            <p className="text-sm mb-2">{n.blurb}</p>
            {n.relatedPostSlugs.length > 0 && (
              <Link href={`/blog/${n.relatedPostSlugs[0]}`}>Read the history →</Link>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
