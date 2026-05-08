import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow:    "/",
        disallow: ["/studio/", "/api/"],
      },
      // Explicitly allow major AI crawlers on all public pages
      { userAgent: "GPTBot",              allow: "/" },
      { userAgent: "ClaudeBot",           allow: "/" },
      { userAgent: "Google-Extended",     allow: "/" },
      { userAgent: "PerplexityBot",       allow: "/" },
      { userAgent: "Amazonbot",           allow: "/" },
      { userAgent: "Bytespider",          allow: "/" },
      { userAgent: "Meta-ExternalAgent",  allow: "/" },
      { userAgent: "cohere-ai",           allow: "/" },
    ],
    sitemap: "https://pewesskor.se/sitemap.xml",
    host:    "https://pewesskor.se",
  };
}
