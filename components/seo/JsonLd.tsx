import { buildLocalBusinessSchema, buildBreadcrumbSchema, siteConfig } from "@/lib/seo";

/** Generic JSON-LD script tag — accepts any schema.org object */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
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
