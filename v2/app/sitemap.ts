import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://surevo.ai";
const routes = ["", "/audit", "/how-it-works", "/pricing", "/agent", "/results", "/agencies", "/about", "/blog", "/contact", "/privacy", "/terms", "/accessibility"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...routes.map((route) => ({
      url: `${site}${route}`,
      lastModified: new Date("2026-06-01"),
      changeFrequency: route === "" || route === "/blog" ? "weekly" as const : "monthly" as const,
      priority: route === "" || route === "/audit" ? 1 : route === "/pricing" ? .9 : .7,
    })),
  ];
}
