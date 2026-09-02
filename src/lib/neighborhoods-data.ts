export type Neighborhood = {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  blurb: string;
  relatedPostSlugs: string[];
};

// Starter set covering Monterey County. Add more as you write the history posts
// that back them — keep blurb short, the depth lives in the linked post.
export const neighborhoods: Neighborhood[] = [
  {
    slug: "carmel-by-the-sea",
    name: "Carmel-by-the-Sea",
    lat: 36.5552,
    lng: -121.9233,
    blurb:
      "Fairy-tale cottages, no street addresses, and an arts colony origin story that shaped the town's building code.",
    relatedPostSlugs: [],
  },
  {
    slug: "monterey",
    name: "Monterey",
    lat: 36.6002,
    lng: -121.8947,
    blurb:
      "Once the sardine capital of the world. Cannery Row is named literally, not romantically.",
    relatedPostSlugs: ["stokes-adobe-monterey"],
  },
  {
    slug: "pacific-grove",
    name: "Pacific Grove",
    lat: 36.6177,
    lng: -121.9166,
    blurb: "Butterfly Town USA, and the Methodist retreat that built it on a grid.",
    relatedPostSlugs: [],
  },
  {
    slug: "moss-landing",
    name: "Moss Landing",
    lat: 36.8038,
    lng: -121.7885,
    blurb:
      "A working harbor town with a power plant skyline, and a quieter story about why parts of it sit empty.",
    relatedPostSlugs: ["why-moss-landing-is-empty"],
  },
  {
    slug: "salinas",
    name: "Salinas",
    lat: 36.6777,
    lng: -121.6555,
    blurb:
      "Salad Bowl of the World, and Ohlone land long before that. The valley's agricultural story starts here.",
    relatedPostSlugs: ["ohlone-salinas-valley"],
  },
];
