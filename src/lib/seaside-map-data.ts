// Coordinates for the two rough, unofficial Seaside areas shown by
// <SeasideMap />. Every vertex is a real street intersection (or, for the
// two curved stretches, a sampled point along the actual road), geocoded
// once via the OpenStreetMap/Overpass road geometry and hardcoded here so
// the map never makes a live API call. Nominatim's text search can't
// resolve "street & street" corners, so the real intersection point was
// computed from each pair of roads' actual OSM geometry instead of guessed.

export type LatLng = [number, number];

// Fremont Blvd & Military Ave -> Coe Ave & General Jim Moore Blvd -> south
// along General Jim Moore Blvd -> General Jim Moore Blvd & Canyon del Rey
// Blvd -> west along Canyon del Rey Blvd/Hwy 218 -> Canyon del Rey Blvd &
// Fremont Blvd -> Fremont Blvd & Hilby Ave -> Hilby Ave & Yosemite St ->
// Yosemite St & La Salle Ave -> La Salle Ave & Fremont Blvd -> back to start.
export const horseshoeArea: LatLng[] = [
  [36.621445, -121.840708], // Fremont Blvd & Military Ave
  [36.62175, -121.817351], // Coe Ave & General Jim Moore Blvd
  [36.608369, -121.823107], // General Jim Moore Blvd, heading south
  [36.601659, -121.826278], // General Jim Moore Blvd, heading south
  [36.590903, -121.832599], // General Jim Moore Blvd & Canyon del Rey Blvd
  [36.59503, -121.83876], // Canyon del Rey Blvd, heading west
  [36.595787, -121.845546], // Canyon del Rey Blvd, heading west
  [36.598846, -121.850729], // Canyon del Rey Blvd & Fremont Blvd
  [36.602612, -121.84881], // Fremont Blvd & Hilby Ave
  [36.602286, -121.830475], // Hilby Ave & Yosemite St
  [36.616664, -121.828143], // Yosemite St & La Salle Ave
  [36.616793, -121.841815], // La Salle Ave & Fremont Blvd
];

// Noche Buena St & La Salle Ave -> Yosemite St & La Salle Ave -> Yosemite
// St & Hilby Ave -> Noche Buena St & Hilby Ave -> back to start.
export const midBroadwayArea: LatLng[] = [
  [36.616754, -121.837531], // Noche Buena St & La Salle Ave
  [36.616664, -121.828143], // Yosemite St & La Salle Ave
  [36.602286, -121.830475], // Yosemite St & Hilby Ave
  [36.602416, -121.837926], // Noche Buena St & Hilby Ave
];

export const SEASIDE_CENTER: LatLng = [36.6075, -121.8345];
export const SEASIDE_ZOOM = 14;
