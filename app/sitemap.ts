import { PROVINCES } from "@/lib/constants";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [];

  // Add home page
  routes.push({
    url: "https://qitari.werz.tech",
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1,
  });

  // Add all train routes
  for (const from of PROVINCES) {
    for (const to of PROVINCES) {
      if (from !== to) {
        routes.push({
          url: `https://qitari.werz.tech/routes/${from
            .toString()
            .toLowerCase()}/${to.toString().toLowerCase()}`,
          lastModified: new Date(),
          changeFrequency: "daily" as const,
          priority: 0.8,
        });
      }
    }
  }

  // Add Arabic versions
  routes.push({
    url: "https://qitari.werz.tech/ar",
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  });

  return routes;
}
