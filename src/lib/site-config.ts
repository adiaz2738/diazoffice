// Central place for site-wide constants. Update these once, they propagate everywhere.
export const siteConfig = {
  name: "Anthony Diaz",
  tagline: "Monterey County, told right.",
  description:
    "Real estate in Monterey County from a local who's obsessed with how this place became what it is: the adobes, the canneries, the cottages, and the coastline in between.",
  url: "https://diazoffice.com", // update if the domain changes
  brokerage: "Monterey Peninsula Home Team at KW Coastal Estates",
  dre: "DRE# 02121333",
  phone: "(831) 383-3112",
  email: "anthony.diaz@mphtre.com",
  social: {
    youtube: "https://youtube.com/@anthonydiaz6101",
    instagram: "", // fill in
    facebook: "", // fill in
  },
};

export type NavLink = {
  label: string;
  href: string;
};

export const primaryNav: NavLink[] = [
  { label: "Blog", href: "/blog" },
  { label: "Buyer's Guide", href: "/buyers-guide" },
  { label: "Neighborhoods", href: "/neighborhoods" },
  { label: "Videos", href: "/videos" },
  { label: "About", href: "/about" },
];

export const blogCategories = [
  { slug: "history", label: "History" },
  { slug: "real-estate", label: "Real Estate" },
  { slug: "buyers-guide", label: "Buyer's Guide" },
] as const;

export type BlogCategorySlug = (typeof blogCategories)[number]["slug"];
