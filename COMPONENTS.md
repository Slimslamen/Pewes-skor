# Components — Pewes Skor

Component inventory, props contracts, and usage patterns.

---

## Directory Structure

```
components/
├── layout/
│   ├── Header.tsx          # Fixed nav with dropdown support
│   └── Footer.tsx          # 4-col footer with newsletter
├── blocks/                 # Full-width page sections
│   ├── HomeHero.tsx
│   ├── BrandsBar.tsx
│   ├── FeaturedBanner.tsx
│   ├── AboutSection.tsx
│   ├── CollectionPreview.tsx
│   ├── FindUs.tsx
│   ├── ProductGrid.tsx
│   ├── EccoHero.tsx
│   ├── EccoHeritage.tsx
│   └── ShoeAnatomy.tsx     # 500vh scroll-driven
└── seo/
    └── JsonLd.tsx          # JSON-LD structured data
```

---

## Layout

### `Header`
```tsx
import Header from "@/components/layout/Header"

<Header />                  // uses defaultLinks
<Header links={customLinks} cartCount={3} />
```

**`NavLink` interface:**
```ts
interface NavLink {
  label:    string
  href:     string
  active?:  boolean
  dropdown?: { label: string; href: string }[]
}
```

Default links (defined in Header.tsx):
- **Sortiment** → `/skor` with dropdown: Herr, Dam, Barn
- **Varumärken** → `/varumarken` with dropdown: ECCO, Gabor, Dolomite, Rieker, Skechers
- **Blogg** → `/blogg`
- **Journal** → `/journal`

### `Footer`
```tsx
import Footer from "@/components/layout/Footer"
<Footer />
```
No required props. Uses hardcoded store details.

---

## Blocks

### `HomeHero`
```tsx
import HomeHero from "@/components/blocks/HomeHero"
<HomeHero data={page?.hero} />
```

| Prop | Type | Notes |
|------|------|-------|
| `data.heading` | `string` | Newlines rendered as `<br>` |
| `data.address` | `string` | Glass badge text |
| `data.hours`   | `string` | Glass badge sub-text |
| `data.ctaLabel`| `string` | Button label |
| `data.ctaHref` | `string` | Button href |
| `data.image`   | `{ url, alt }` | Background image |

All props optional — fallback content always shown.

### `BrandsBar`
```tsx
<BrandsBar data={page?.brands} />
```
`data` is `Array<{ name: string }>`. Displays brand names as styled text. Fallback: ECCO, Rieker, Gabor, Skechers, DOLOMITE.

### `FeaturedBanner`
```tsx
import FeaturedBanner from "@/components/blocks/FeaturedBanner"
<FeaturedBanner />
```
No props — static editorial section linking to `/skor/dam` and `/skor/herr`. Edit directly for seasonal updates.

### `AboutSection`
```tsx
<AboutSection data={page?.about} />
```
Two-column: image left, editorial text right. All props optional with fallbacks.

### `CollectionPreview`
```tsx
<CollectionPreview data={page?.collection} />
```
Three-column category grid (Dam, Herr, Barn). Middle column offset by `translate-y-12`.

### `FindUs`
```tsx
<FindUs data={page?.findUs} />
```
Two-column: contact info + map placeholder. Hardcoded address fallback.

### `ProductGrid`
```tsx
import ProductGrid from "@/components/blocks/ProductGrid"
<ProductGrid products={products} />
```

**`Product` interface:**
```ts
interface Product {
  brand?:       string
  name?:        string
  price?:       string
  description?: string   // shown as small text below name
  image?:       { url?: string; alt?: string }
}
```
`description` is optional — safe to omit for existing dam page.

### `EccoHero` / `EccoHeritage`
Used only on `/varumarken/ecco`. Accept `data` from `eccoPageQuery`.

### `ShoeAnatomy`
```tsx
<ShoeAnatomy zones={anatomyZones} sectionTitle="Anatomy of Innovation" />
```
500vh scroll-driven animation. Requires layer images in `/public/ecco/`:
- `layer-outsole.png`
- `layer-midsole.png`
- `layer-insole.png`
- `layer-upper.png`

**Rules (see `tasks/lessons.md`):**
- Never call `useTransform` inside JSX — declare at top level
- Use `scaleX: -1` instead of `transform: "scaleX(-1)"`

---

## SEO

### `LocalBusinessJsonLd`
```tsx
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd"
// Rendered in app/layout.tsx — do NOT add to individual pages
<LocalBusinessJsonLd />
```

### `BreadcrumbJsonLd`
```tsx
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd"
<BreadcrumbJsonLd crumbs={[
  { name: "Hem",      path: "/" },
  { name: "Nyheter",  path: "/nyheter" },
  { name: post.title, path: `/nyheter/${slug}` },
]} />
```
Add to every inner page (non-home).

### `JsonLd` (generic)
```tsx
import { JsonLd } from "@/components/seo/JsonLd"
<JsonLd data={mySchemaObject} />
```
Use for article, product, or any other schema type not covered above.

---

## Creating a New Component

1. **Block component** (full-width page section): `/components/blocks/MySection.tsx`
2. **Layout component** (chrome): `/components/layout/MyWidget.tsx`
3. **SEO component**: `/components/seo/MySchema.tsx`

Template:
```tsx
interface MyData { title?: string }
interface Props  { data?: MyData | null }

const FALLBACK: MyData = { title: "Default" }

export default function MySection({ data }: Props) {
  const d = { title: data?.title ?? FALLBACK.title }
  return <section className="py-24 bg-surface">…</section>
}
```

Rules:
- Always provide `FALLBACK` data so the page works without Sanity
- Use `optional chaining (?.)` and nullish coalescing `(??)` everywhere
- Server components by default; add `"use client"` only for hooks/interactivity
- No `styled-components` — Tailwind only
