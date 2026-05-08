# Lessons Learned — Forma Web Agency

Rules distilled from real mistakes. Read at session start. Add to after any correction.

---

## React & Hooks

### Never call hooks inside JSX
All hook calls (`useTransform`, `useMotionValue`, `useRef`, etc.) must be at the top level of the component function, before `return`. Never inside `style={{ }}`, event handlers, or conditional branches.

```tsx
// ❌ Wrong — violates Rules of Hooks, runtime crash
<motion.div style={{ opacity: useTransform(progress, [0, 1], [0, 1]) }}>

// ✅ Correct
const opacity = useTransform(progress, [0, 1], [0, 1]);
<motion.div style={{ opacity }}>
```

### Don't mix raw `transform` strings with motion MotionValues
`motion/react` composites all transforms (x, y, scale, scaleX, rotate…) into one CSS string internally. Passing a raw `transform: "scaleX(-1)"` overrides that output entirely.

```tsx
// ❌ Wrong
style={{ y: someMotionValue, transform: "scaleX(-1)" }}

// ✅ Correct — use atomic motion props
style={{ y: someMotionValue, scaleX: -1 }}
```

### Lazy-init `useState` from `window.*` in ssr:false components
In components wrapped with `dynamic({ ssr: false })`, `window` is available at first render. Use lazy initializer — don't set state inside `useEffect` just to read `window`.

```tsx
// ❌ Wrong — cascading render, lint error (react-hooks/set-state-in-effect)
const [isMobile, setIsMobile] = useState(false);
useEffect(() => { setIsMobile(window.matchMedia("(max-width: 767px)").matches); }, []);

// ✅ Correct — safe only inside ssr:false components
const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);
useEffect(() => { /* subscribe to change events only */ }, []);
```

---

## Framer Motion / motion/react

### Keyframe input positions must be strictly increasing
Two identical positions in a `useTransform` input array create a zero-width segment — division by zero in the interpolator. Values leak outside their intended range in unpredictable ways.

```tsx
// ❌ Wrong — duplicate 0s = degenerate segment
useTransform(p, [0, 0, 0.10, 0.15], [1, 1, 0, 0])

// ✅ Correct
useTransform(p, [0, 0.10, 0.15], [1, 1, 0])
```

### Pin motion values across the full [0, 1] range when stacking layers
Don't rely on implicit clamping when multiple `useTransform` outputs share a scroll range. Explicit pin to 0 at both ends removes all ambiguity.

```tsx
// ✅ Spans full scroll, no bleed between layers
useTransform(p, [0.00, 0.20, 0.22, 0.38, 0.40, 1.00], [0, 0, 1, 1, 0, 0])
```

### `useScroll({ target })` is unreliable for components loaded via dynamic import
If a component is `dynamic({ ssr: false })`, it mounts after the user has already scrolled to it. `scrollYProgress` initialises mid-range and skips early animation phases.

**Fix:** Use global `scrollY` + measure the container's document offset in `useEffect`.

```tsx
const { scrollY } = useScroll();
const topRef = useRef(0);
useEffect(() => {
  const measure = () => {
    topRef.current = containerRef.current!.getBoundingClientRect().top + window.scrollY;
  };
  measure();
  window.addEventListener("resize", measure);
  return () => window.removeEventListener("resize", measure);
}, []);

const opacity = useTransform(scrollY, (y) => {
  const p = Math.max(0, Math.min(1, (y - topRef.current) / sectionHeight));
  return p < 0.5 ? p * 2 : 1;
});
```

---

## Scroll & Layout

### Sticky sections and smooth scroll: use Lenis, not the fixed-container trick
The Framer Motion "smooth scroll" pattern (all content inside `position: fixed` + `y` transform) breaks `position: sticky` and `position: fixed` children (e.g. the header). Use Lenis instead — it drives native scroll so sticky layout, IntersectionObserver, and `useScroll` all keep working.

```tsx
// components/layout/LenisProvider.tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2 });
    let id: number;
    function raf(t: number) { lenis.raf(t); id = requestAnimationFrame(raf); }
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
  return null;
}
```

### Sticky-scroll sections need a mobile fallback
A `500vh` sticky container forces users to scroll through dead space on mobile. Render a completely different component on small screens (e.g. a simple stacked card list) that communicates the same content without the scroll requirement.

```tsx
const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);
// ...
return isMobile ? <MobileCards data={data} /> : <DesktopStickyScroll data={data} />;
```

---

## Responsive & Tailwind

### Always use Tailwind v4 canonical class names
Never use arbitrary bracket notation when a canonical equivalent exists.

```
w-[400px]     → w-100
h-[240px]     → h-60
top-[72px]    → top-18
aspect-[16/9] → aspect-video
max-w-[760px] → max-w-190
min-h-[480px] → min-h-120
```

The IDE linter (`suggestCanonicalClasses`) flags these. Fix immediately.

### Never hard-code pixel sizes with inline `style`
Inline `style={{ width: 480 }}` cannot go responsive. Use Tailwind's responsive class chain instead.

```tsx
// ❌ Wrong
<div style={{ width: 480, height: 480 }}>

// ✅ Correct
<div className="w-60 md:w-120 lg:w-150">
```

### `as const` makes arrays readonly — watch Next.js Metadata type
`as const` turns nested arrays into `readonly` tuples. `Metadata.keywords` expects `string[]` (mutable). Annotate the array before `as const`.

```ts
export const siteConfig = {
  keywords: ["term one", "term two"] as string[],  // mutable override
} as const;
```

---

## Next.js App Router

### R3F / Canvas components need a client wrapper with `dynamic({ ssr: false })`
`<Canvas>` touches `window`, so it cannot server-render. App Router only allows `ssr: false` inside a `"use client"` file. Create a thin wrapper:

```tsx
// MyComponent.Client.tsx
"use client"
import dynamic from "next/dynamic"

const MyComponent = dynamic(() => import("./MyComponent"), {
  ssr:     false,
  loading: () => <div style={{ height: "500vh" }} />,
})
export default function MyComponentClient() { return <MyComponent /> }
```

### Exclude test config files from Next.js type checking
Files like `vitest.config.ts` import dev-only packages. Next.js build runs `tsc` on all included files and will fail.

```json
// tsconfig.json
"exclude": ["node_modules", "vitest.config.ts", "vitest.setup.ts"]
```

---

## Scroll-driven Image Sequences

### Mutate `ref.src` directly — never `setState` per frame
Scroll-driven frame sequences fire ~60× per second. `setState` triggers a React re-render on each frame, causing severe jank. Mutate the DOM directly.

```tsx
const imgRef = useRef<HTMLImageElement>(null);
useMotionValueEvent(scrollYProgress, "change", (v) => {
  const idx = Math.min(Math.round(v * (TOTAL - 1)), TOTAL - 1);
  if (imgRef.current) imgRef.current.src = frames[idx];
});
```

---

## Product / Filter UI

### Move filter state into the client component that owns the list
If filter buttons control visible items, the buttons and the list must share state — which means they must be in the same client component. Don't put filter buttons in a server page.

```tsx
// ✅ Filter bar inside the client list component
"use client"
export default function ProductGrid({ products }) {
  const [activeBrand, setActiveBrand] = useState<string | null>(null)
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))]
  const visible = activeBrand ? products.filter(p => p.brand === activeBrand) : products
  // render filter bar + grid using `visible`
}
```

### Don't stagger grid items with vertical offset (`mt-*` on every nth card)
Conditional `mt-12` on every 3rd card breaks visual alignment when filtering changes which cards appear. Use uniform grid rows.

---

## SEO

### Every inner page needs `BreadcrumbJsonLd`
Breadcrumb structured data helps Google show rich trails in search results. Every page below the homepage needs it.

```tsx
// Place before <Header />, as first child of the root fragment
<BreadcrumbJsonLd crumbs={[
  { name: "Home",     path: "/" },
  { name: "Category", path: "/category" },
  { name: "Page",     path: "/category/page" },
]} />
```

### Don't use fallback strings for editorial CMS content
Hardcoded fallback text (headings, body copy, CTAs) can silently show stale content for months if Sanity data goes missing or is never entered. Nobody notices because the page "works."

Instead: make missing editorial content visible in dev, render nothing in production.

```tsx
if (!data?.heading) {
  if (process.env.NODE_ENV === "development")
    return <div className="border-2 border-red-500 p-4 text-red-500">⚠ Missing: heading from Sanity</div>
  return null
}
```

Fallbacks are fine for structural/layout defaults (booleans, variants, counts) — never for text the client is expected to maintain.

---

### Brand-page heroes should each have their own component
Trying to build one generic hero component for multiple brands produces either a props explosion or visual sameness. Each brand page gets its own `[Brand]Hero.tsx` with unique motion choreography. Shared constants (easing curves, timing) can be duplicated — they're small.

---

## Data & Seed Scripts

### Validate external image URLs before committing them to seed scripts
Hosted image URLs (Google Photos, Aida, Unsplash signed URLs) expire. Run `curl -I <url>` before adding any URL to a seed script. Prefer images from `public/` — they are always stable.

### Log response bodies on HTTP errors in upload functions
A bare `HTTP 400` gives no diagnostic information. Always capture and log the response body.

```typescript
if (!res.ok) {
  const body = await res.text().catch(() => "");
  throw new Error(`HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
}
```

---

## Component Organization

### Keep the blocks/ folder organized into domain subfolders
A flat `blocks/` folder with 30+ files is hard to navigate. Group by domain:

```
blocks/
  Reveal.tsx          ← stays at root (imported as "../Reveal" from subfolders)
  home/               ← landing-page-only sections
  [domain]/           ← feature-area sections (brands, products, services, etc.)
  content/            ← blog, news, modals, editorial
```

When importing `Reveal` from inside a subfolder, use the relative path `"../Reveal"`, not the alias.

### Use a `<Reveal>` wrapper for all whileInView animations
Adding `initial`, `whileInView`, `viewport`, `transition` to every section is verbose and inconsistent. A single `<Reveal from="up" delay={0.1}>` wrapper enforces uniformity.

---

## Log

<!-- Add entries here: date, what went wrong, what the fix was -->

### 2026-04-09 — motion/react hooks
- Called `useTransform` inside JSX `style` prop → Rules of Hooks violation → moved to component top level
- Mixed `transform: "scaleX(-1)"` string with `y: MotionValue` → conflict → switched to `scaleX: -1`

### 2026-04-10 — scroll animation debugging
- Duplicate keyframe positions `[0, 0, ...]` → degenerate interpolation segment → outsole image leaked into later scroll zones → fixed with strictly-increasing positions
- Relied on implicit clamping → first layer still bled through → fixed by explicitly pinning each layer to 0 outside its window

### 2026-04-10 — responsive layout
- Hard-coded `style={{ width: 480 }}` on sticky frame → overflowed mobile viewport → fixed with responsive Tailwind classes

### 2026-04-12 — App Router + R3F
- Tried importing Canvas component from a server page (even with "use client") → SSR crash → fixed with `dynamic({ ssr: false })` inside a thin client wrapper file

### 2026-04-12 — filter buttons
- Static filter buttons in server page → no state → non-functional → moved filter bar into the client ProductGrid component

### 2026-04-12 — SEO
- Missing `BreadcrumbJsonLd` on several inner pages → added systematically to all non-home pages
- `siteConfig.keywords as const` → `readonly` array incompatible with `Metadata.keywords: string[]` → annotated with `as string[]`

### 2026-04-21 — Lenis vs fixed-container smooth scroll
- Attempted Framer Motion fixed-container smooth scroll pattern → broke `position: sticky` on StoryReveal and ShoeRise, broke fixed header → replaced with Lenis provider

### 2026-04-21 — `useScroll({ target })` in dynamic components
- `scrollYProgress` initialised mid-section on first render (component mounts after scroll) → first animation phases invisible → switched to global `scrollY` + measured container offset

### 2026-05-08 — component folder reorganization
- Flat `blocks/` folder grew to 30+ files → hard to navigate → reorganized into `home/`, `brands/`, `products/`, `content/` subfolders → updated all import paths from `@/components/blocks/X` to `@/components/blocks/[folder]/X` → internal `./Reveal` imports updated to `../Reveal`
