import { buildLocalBusinessSchema, buildBreadcrumbSchema, siteConfig } from "@/lib/seo";

/** Generic JSON-LD script tag — accepts any schema.org object */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // Escape <, >, and & so CMS content cannot break out of the script tag.
  // JSON.stringify does not escape these by default; a literal </script> in a
  // value would cause the browser's HTML parser to close the tag prematurely.
  const safe = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}

/** LocalBusiness + ShoeStore — render in root layout for site-wide presence */
export function LocalBusinessJsonLd() {
  return <JsonLd data={buildLocalBusinessSchema() as Record<string, unknown>} />;
}

/** BreadcrumbList — render on inner pages */
export function BreadcrumbJsonLd({
  crumbs,
}: {
  crumbs: Array<{ name: string; path: string }>;
}) {
  const items = crumbs.map((c) => ({
    name: c.name,
    url:  `${siteConfig.url}${c.path}`,
  }));
  return <JsonLd data={buildBreadcrumbSchema(items) as Record<string, unknown>} />;
}
