# Components — Forma Web Agency

Component architecture, patterns, and rules. Read this before building anything.

---

## Folder Structure Pattern

Every project uses the same top-level shape. Adapt the subfolders inside `blocks/` to match the project type.

```
components/
├── layout/             # Page chrome — nav, footer, providers
│   ├── Header.tsx      # Client nav (state: mobile menu, dropdowns)
│   ├── HeaderServer.tsx # Server wrapper — fetches CMS data for nav
│   ├── Footer.tsx
│   └── LenisProvider.tsx  # Smooth scroll (add once to app/layout.tsx)
│
├── blocks/             # Full-width page sections
│   ├── Reveal.tsx      # Shared whileInView wrapper — stays at blocks root
│   │
│   ├── home/           # Sections used only on the landing/home page
│   ├── [domain]/       # Feature-area sections (e.g. brands/, products/, services/)
│   └── content/        # Blog, news, editorial, modals
│
└── seo/
    └── JsonLd.tsx      # JSON-LD schema components
```

### How to classify a component

| Question | Yes → put it in |
|----------|-----------------|
| Is it page chrome (nav/footer)? | `layout/` |
| Is it only on the home/landing page? | `blocks/home/` |
| Is it tied to a content domain (brands, products, services)? | `blocks/[domain]/` |
| Is it blog, news, modals, editorial? | `blocks/content/` |
| Is it a JSON-LD script tag? | `seo/` |

---

## Layout Components

### `Header` + `HeaderServer`

Always use `HeaderServer` in page files — it fetches CMS nav data server-side and passes it to the client `Header` for interactivity.

```tsx
import Header from "@/components/layout/HeaderServer"
<Header />
```

`Header` (client) handles: mobile menu toggle, dropdown hover state, active link highlighting.

### `Footer`

```tsx
import Footer from "@/components/layout/Footer"
<Footer />
```

No props. Hardcoded for the project — edit directly for address/link changes.

### `LenisProvider`

Renders nothing. Hooks Lenis into the RAF loop for site-wide smooth scroll. Add once in `app/layout.tsx`, never again.

```tsx
// app/layout.tsx
import LenisProvider from "@/components/layout/LenisProvider"
// ...
<LenisProvider />
```

---

## `Reveal` — The Shared Animation Wrapper

Every whileInView animation goes through `Reveal`. Never add `initial`/`whileInView`/`viewport`/`transition` props directly to individual motion elements.

```tsx
import Reveal from "@/components/blocks/Reveal"

<Reveal from="up" delay={0.1}>
  <p>Content that fades in from below on scroll</p>
</Reveal>
```

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `from` | `"up" \| "down" \| "left" \| "right" \| "none"` | `"up"` | Direction of entrance |
| `delay` | `number` | `0` | Seconds before animation starts |
| `duration` | `number` | `0.6` | Animation duration in seconds |
| `distance` | `number` | `32` | Travel distance in pixels |
| `amount` | `number` | `0.2` | Intersection threshold (0–1) |
| `as` | `"div" \| "section"` | `"div"` | Rendered element |

**Import rules:**
- From a page file: `"@/components/blocks/Reveal"`
- From inside a blocks subfolder: `"../Reveal"`

---

## Block Component Patterns

### Server vs Client

```tsx
// Default — server component. Fetches Sanity data, no interactivity.
export default async function MySection({ data }) { ... }

// Client component — only when needed for hooks or events
"use client"
export default function MySection() { ... }
```

### Fallback data — use sparingly

**Do not** provide fallback strings for editorial content (headings, body copy, CTAs). A stale fallback silently shows wrong text and hides the fact that CMS data is missing.

**Do** provide fallbacks for structural/layout defaults (booleans, layout variants, image dimensions) that are never customer-facing copy.

For missing editorial content, make it visible in development and render nothing in production:

```tsx
export default function MySection({ data }) {
  if (!data?.heading) {
    if (process.env.NODE_ENV === "development") {
      return <div className="border-2 border-red-500 p-4 text-red-500">⚠ Missing: heading from Sanity</div>
    }
    return null
  }
  return <section>...</section>
}
```

This forces real content to be entered in the CMS before launch, and makes gaps immediately obvious during development.

### The `ssr: false` wrapper pattern

Any component that uses R3F Canvas, WebGL, or reads `window` at module level needs a client wrapper with `dynamic({ ssr: false })`.

```tsx
// MyComponent.Client.tsx — thin wrapper, this is what page files import
"use client"
import dynamic from "next/dynamic"

const MyComponent = dynamic(() => import("./MyComponent"), {
  ssr:     false,
  loading: () => <div className="h-[500vh]" />,  // same height as real component
})

export default function MyComponentClient() {
  return <MyComponent />
}
```

---

## Home Sections

Sections only used on the landing/home page go in `blocks/home/`. They are imported only in `app/page.tsx`.

Common home sections for any project:

| Section | Purpose |
|---------|---------|
| `HeroSection` | Above-the-fold opener |
| `StoryReveal` | Scroll-driven brand narrative |
| `FeaturedBanner` | Seasonal or promotional highlight |
| `CollectionPreview` | Category / product family grid |
| `AboutSection` | Two-col heritage / team section |
| `FindUs` | Contact + map |
| `BrandsBar` | Logo or name marquee |

---

## Domain Sections

Create subfolders for each content domain the project has. Examples:

| Project type | Subfolder | Contains |
|-------------|-----------|---------|
| Retail / shoe store | `brands/` | Per-brand heroes, heritage sections, product grids |
| SaaS | `features/` | Feature highlights, pricing, testimonials |
| Portfolio | `work/` | Case study cards, project detail sections |
| Restaurant | `menu/` | Menu categories, specials, reservation |
| Blog / media | `posts/` | Article cards, author bios, category filters |

Each domain subfolder follows the same rules — server component by default, `FALLBACK` data, `Reveal` for animations.

---

## Content / Editorial

Blog posts, news, modals, and long-form content go in `blocks/content/`.

**Pattern — card list + modal:**
```tsx
// List component — renders cards, manages open/close state
"use client"
export default function PostList({ posts }) {
  const [active, setActive] = useState(null)
  return (
    <>
      {posts.map(p => <PostCard key={p.id} post={p} onOpen={() => setActive(p)} />)}
      {active && <PostModal post={active} onClose={() => setActive(null)} />}
    </>
  )
}
```

Keep `PostModal` internal to the list — pages never import the modal directly.

---

## SEO Components

### `LocalBusinessJsonLd`
```tsx
// Rendered once in app/layout.tsx — never on individual pages
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd"
<LocalBusinessJsonLd />
```

### `BreadcrumbJsonLd`
```tsx
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd"

// Add to every non-home page, as first child of the root fragment
<BreadcrumbJsonLd crumbs={[
  { name: "Home",     path: "/" },
  { name: "Category", path: "/category" },
  { name: "Page",     path: "/category/page" },
]} />
```

Every inner page needs this. See lessons.md for why.

### `JsonLd` (generic)
```tsx
import { JsonLd } from "@/components/seo/JsonLd"
<JsonLd data={mySchemaObject} />
```

Escapes `<`, `>`, `&` automatically to prevent CMS content from breaking out of the script tag.

---

## Creating a New Component — Checklist

1. Decide the subfolder (see classification table above)
2. Default to server component — add `"use client"` only if needed
3. Define a `FALLBACK` constant for all Sanity-sourced props
4. Use `<Reveal>` for scroll-in animations — don't add motion props manually
5. If it uses `window` / Canvas / WebGL: create a `.Client.tsx` wrapper with `ssr: false`
6. Add the component to `COMPONENTS.md` under the right section
7. Run `npm run build` — confirm it compiles before marking done
