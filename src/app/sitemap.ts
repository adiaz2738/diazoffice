import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getPostPath } from "@/lib/guides";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/blog",
    "/buyers-guide",
    "/neighborhoods",
    "/videos",
    "/about",
    "/contact",
    "/listings",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${siteConfig.url}${getPostPath(post)}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...postRoutes];
}
