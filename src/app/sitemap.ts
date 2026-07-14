import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

// Auto-generated sitemap. New nav routes and featured projects are included
// automatically because they're derived from the data files.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url.replace(/\/$/, "");

  const staticRoutes = ["", "/resume", ...site.nav.map((n) => n.href)];

  const projectRoutes = projects
    .filter((p) => p.featured)
    .map((p) => `/projects/${p.slug}`);

  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
