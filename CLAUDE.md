@AGENTS.md

---

# SEO Rules — Every Page Must Follow This Pattern

Read `lib/seo.ts` and `components/seo/JsonLd.tsx` before adding any new page.

## Mandatory Checklist for Every New Page

### 1. Export `metadata` (static pages)
```tsx
import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/seo"

export const metadata: Metadata = generatePageMetadata({
  title:       "Page Title",       // becomes "Page Title | Pewes Skor"
  description: "Page description matching the target keywords.",
  path:        "/your-path",
  imageUrl:    "https://…",        // optional — OG image
})
```

### 2. `generateMetadata` (dynamic pages with slug params)
```tsx
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = await sanityFetch({ query: myQuery, params: { slug } })
  return generatePageMetadata({
    title:       post?.title,
    description: post?.excerpt ?? undefined,
    path:        `/section/${slug}`,
    ogType:      "article",
  })
}
```

### 3. Add `BreadcrumbJsonLd` to every inner page (not the home page)
```tsx
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd"

// Inside the page JSX, before <main>:
<BreadcrumbJsonLd crumbs={[
  { name: "Hem",        path: "/" },
  { name: "Avdelning",  path: "/avdelning" },
  { name: "Sida",       path: "/avdelning/sida" },  // only for 3rd level
]} />
```

### 4. `generateStaticParams` for dynamic routes
```tsx
import { client } from "@/sanity/lib/client"

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(`*[_type == "myType"]{ "slug": slug.current }`)
    return slugs.map((s: { slug: string }) => ({ slug: s.slug }))
  } catch { return [] }
}
```

### 5. `notFound()` for missing dynamic documents
```tsx
import { notFound } from "next/navigation"
if (!post) notFound()
```

---

## SEO Utility Reference (`lib/seo.ts`)

| Export                    | Purpose                                          |
|---------------------------|--------------------------------------------------|
| `siteConfig`              | Store name, URL, address, phone, email, keywords |
| `generatePageMetadata()`  | Returns `Metadata` object for a page             |
| `buildLocalBusinessSchema()` | Schema.org LocalBusiness JSON-LD            |
| `buildBreadcrumbSchema()` | Schema.org BreadcrumbList JSON-LD               |
| `buildWebPageSchema()`    | Schema.org WebPage JSON-LD                      |
| `buildArticleSchema()`    | Schema.org Article JSON-LD                      |

## SEO Component Reference (`components/seo/JsonLd.tsx`)

| Component              | Usage                                        |
|------------------------|----------------------------------------------|
| `LocalBusinessJsonLd`  | In `layout.tsx` only — already wired up      |
| `BreadcrumbJsonLd`     | All inner pages — pass `crumbs` array        |
| `JsonLd`               | Generic — pass any schema.org `data` object  |

---

## Target Keywords

- skoaffär Anderstorp
- skor Småland
- köpa skor Anderstorp

Include naturally in page descriptions. Do not keyword-stuff titles.

---

## Sitemap

`app/sitemap.ts` auto-includes all nyheter posts fetched from Sanity.
When adding a new static route, add an entry to the `STATIC` array in `app/sitemap.ts`.
