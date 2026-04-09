import { type MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { nyheterSlugsQuery } from "@/sanity/lib/queries";

const BASE = "https://pewesskor.se";

const STATIC: MetadataRoute.Sitemap = [
  { url: BASE,                       priority: 1.0, changeFrequency: "weekly"  },
  { url: `${BASE}/skor/dam`,         priority: 0.9, changeFrequency: "weekly"  },
  { url: `${BASE}/skor/herr`,        priority: 0.9, changeFrequency: "weekly"  },
  { url: `${BASE}/skor/barn`,        priority: 0.9, changeFrequency: "weekly"  },
  { url: `${BASE}/nyheter`,          priority: 0.8, changeFrequency: "weekly"  },
  { url: `${BASE}/blogg`,            priority: 0.7, changeFrequency: "weekly"  },
  { url: `${BASE}/varumarken`,          priority: 0.8, changeFrequency: "monthly" },
  { url: `${BASE}/varumarken/ecco`,     priority: 0.7, changeFrequency: "monthly" },
  { url: `${BASE}/varumarken/gabor`,    priority: 0.7, changeFrequency: "monthly" },
  { url: `${BASE}/varumarken/dolomite`, priority: 0.7, changeFrequency: "monthly" },
  { url: `${BASE}/varumarken/rieker`,   priority: 0.7, changeFrequency: "monthly" },
  { url: `${BASE}/varumarken/skechers`, priority: 0.7, changeFrequency: "monthly" },
  { url: `${BASE}/skovard`,          priority: 0.6, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch nyheter slugs directly via client (sitemap runs outside React context)
  let dynamicEntries: MetadataRoute.Sitemap = [];

  try {
    const slugs: Array<{ slug: string }> = await client.fetch(nyheterSlugsQuery);
    dynamicEntries = slugs.map((s) => ({
      url:             `${BASE}/nyheter/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority:        0.6,
    }));
  } catch {
    // Silently skip — Sanity may not be configured yet
  }

  return [...STATIC, ...dynamicEntries];
}
