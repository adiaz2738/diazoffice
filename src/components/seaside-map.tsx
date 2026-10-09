"use client";

import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import {
  horseshoeArea,
  midBroadwayArea,
  SEASIDE_CENTER,
  SEASIDE_ZOOM,
} from "@/lib/seaside-map-data";

export function SeasideMap() {
  return (
    <MapContainer
      center={SEASIDE_CENTER}
      zoom={SEASIDE_ZOOM}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      touchZoom={false}
      boxZoom={false}
      keyboard={false}
      zoomControl={false}
      attributionControl={true}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />

      <Polygon
        positions={horseshoeArea}
        pathOptions={{ color: "#ce011f", weight: 2, fillColor: "#ce011f", fillOpacity: 0.25 }}
      >
        <Tooltip permanent direction="center" className="seaside-map-label">
          The horseshoe
        </Tooltip>
      </Polygon>

      <Polygon
        positions={midBroadwayArea}
        pathOptions={{ color: "#4b5563", weight: 2, dashArray: "6 5", fillOpacity: 0 }}
      >
        <Tooltip permanent direction="center" className="seaside-map-label">
          Mid-Broadway
        </Tooltip>
      </Polygon>
    </MapContainer>
  );
}
