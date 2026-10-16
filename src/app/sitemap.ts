import type { MetadataRoute } from "next";
import { brand } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/estates", "/commercial"].map((p) => ({
    url: `${brand.siteUrl}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.8,
  }));
}
