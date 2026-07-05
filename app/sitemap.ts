import type { MetadataRoute } from "next";
import { services } from "@/lib/services";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://domesticstaffinghub.com").replace(/\/$/, "");

const publicRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "weekly" }
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const serviceRoutes = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75
  }));

  return [
    ...publicRoutes.map((route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority
    })),
    ...serviceRoutes
  ];
}
