// Approximate town-center coordinates for Monterey County, used to sort
// photos by nearest town. Shared between the photo pipeline script and
// anything else that wants the same list.
export const towns = [
  { slug: "monterey", lat: 36.6002, lng: -121.8947 },
  { slug: "pacific-grove", lat: 36.6177, lng: -121.9166 },
  { slug: "carmel-by-the-sea", lat: 36.5552, lng: -121.9233 },
  { slug: "pebble-beach", lat: 36.5725, lng: -121.9486 },
  { slug: "seaside", lat: 36.6111, lng: -121.85 },
  { slug: "sand-city", lat: 36.6155, lng: -121.8631 },
  { slug: "del-rey-oaks", lat: 36.5965, lng: -121.8275 },
  { slug: "marina", lat: 36.6844, lng: -121.8025 },
  { slug: "carmel-valley", lat: 36.4836, lng: -121.7319 },
  { slug: "salinas", lat: 36.6777, lng: -121.6555 },
  { slug: "moss-landing", lat: 36.8038, lng: -121.7885 },
  { slug: "castroville", lat: 36.7647, lng: -121.7544 },
  { slug: "prunedale", lat: 36.7897, lng: -121.6594 },
  { slug: "big-sur", lat: 36.2704, lng: -121.8081 },
];

// Beyond this, a photo's GPS point is treated as not actually being in any
// of the towns above (e.g. a vacation photo from somewhere else entirely).
export const TOWN_CUTOFF_KM = 20;

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

/** Great-circle distance between two lat/lng points, in kilometers. */
export function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

/** Nearest town slug for a GPS point, or "unsorted" if nothing is close enough. */
export function nearestTown(lat, lng) {
  let best = null;
  let bestDist = Infinity;
  for (const town of towns) {
    const dist = haversineKm(lat, lng, town.lat, town.lng);
    if (dist < bestDist) {
      bestDist = dist;
      best = town.slug;
    }
  }
  return best && bestDist <= TOWN_CUTOFF_KM ? best : "unsorted";
}
