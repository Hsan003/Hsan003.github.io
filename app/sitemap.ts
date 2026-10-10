import type { MetadataRoute } from "next"
import { getDetailProjects } from "@/data/projects"
import { volunteering } from "@/data/volunteering"
import { SITE_URL } from "@/lib/site"
import { getPublishedArticles } from "@/lib/writing"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    ...getDetailProjects().map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...volunteering.map((m) => ({
      url: `${SITE_URL}/volunteering/${m.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    // Published articles only: drafts never reach the sitemap.
    ...getPublishedArticles().map((a) => ({
      url: `${SITE_URL}/writing/${a.slug}`,
      lastModified: a.date ? new Date(`${a.date}T00:00:00Z`) : lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ]
}
