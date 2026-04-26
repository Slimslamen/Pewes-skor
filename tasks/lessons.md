# Lessons Learned — Pewes Skor

## Rules

### Never call hooks inside JSX
Never call `useTransform()`, `useMotionValue()`, or any React hook inside JSX expressions
(including inside `style={{ ... }}` props). All hook calls must be at the top level of the
component function, before the `return` statement.

**Why:** Calling hooks inside JSX violates React's Rules of Hooks and causes runtime errors.
`useTransform(scrollYProgress, ...)` inside `style={{ opacity: useTransform(...) }}` is invalid.

**How to apply:** Always declare motion value derivations at the top of the component:
```tsx
const myOpacity = useTransform(progress, [0, 1], [0, 1]); // top of component
// ...
<motion.div style={{ opacity: myOpacity }}>  // JSX
```

---

### Don't mix `transform` string with motion MotionValues
Never pass `style={{ transform: "scaleX(-1)", y: someMotionValue }}` on a `<motion.div>`.
The string `transform` property will conflict with motion's transform pipeline.

**Why:** motion/react composites all transform values (x, y, scale, rotate, scaleX…) into one
`transform` CSS string. Passing a raw `transform` string overrides motion's output.

**How to apply:** Use motion's atomic transform props instead:
```tsx
// ❌ Wrong
style={{ y: outsoleY, transform: "scaleX(-1)" }}

// ✅ Correct
style={{ y: outsoleY, scaleX: -1 }}
```

---

### Remove unused function declarations that reference hooks
If a helper function uses a hook type but is never called, TypeScript will complain if it
references hook return types from parameters. Clean up unused hook-wrapping helpers.

---

### Never use duplicate keyframe positions in `useTransform`
Never write `useTransform(value, [0, 0, 0.10, 0.15], [1, 1, 0, 0])`. Two identical input
positions create a zero-width segment → division by zero in motion's interpolator → values
can leak/wrap and reappear far outside their intended range.

**Why:** During the ShoeAnatomy build the outsole image kept reappearing during the upper
and assembled zones because `opacity0` had `[0, 0, …]` as its first two keyframes. The bug
looked like a clamping failure but was actually a degenerate interpolation segment.

**How to apply:** Every keyframe position in a `useTransform` input array must be strictly
increasing. If you want a value to "hold" before the first transition, just start the range
at `0` with a single keyframe:
```tsx
// ❌ Wrong — duplicate 0s
useTransform(p, [0, 0, 0.10, 0.13], [1, 1, 0, 0])
// ✅ Correct
useTransform(p, [0, 0.10, 0.13], [1, 1, 0])
```

---

### Lock motion values across the full `[0, 1]` range when stacking layers
When you have multiple `useTransform` outputs that should be `0` outside their visible window
(e.g. stacked image layers), don't rely on framer-motion's clamping behavior alone. Make every
input range explicitly start at `0` and end at `1` and pin the value to `0` at both ends.

**Why:** Even with strictly-increasing keyframes, relying on implicit clamping caused the
first ShoeAnatomy image to bleed back through at later scroll positions. Explicit ranges
removed all ambiguity and made the bug disappear.

**How to apply:**
```tsx
// ✅ Spans the entire scroll, no leak possible
useTransform(p, [0.00, 0.20, 0.22, 0.38, 0.40, 1.00], [0, 0, 1, 1, 0, 0])
```

---

### Don't pin layout sizes with inline `style={{ width: 480 }}` — use responsive Tailwind
Inline pixel sizes can't go responsive and will break mobile layouts. Use Tailwind's
canonical sizing classes (`w-60`, `md:w-120`, `lg:w-150`) so the same component scales
across viewports. The IDE will warn when arbitrary values like `w-[480px]` have a canonical
equivalent — prefer the canonical form.

**Why:** ShoeAnatomy originally hard-coded `width: 480, height: 480` on the image stage,
which overflowed mobile viewports and pushed the assembled-shoe zone below the fold of the
sticky frame so the user never saw it.

**How to apply:** Whenever you reach for `style={{ width, height }}`, stop and write the
Tailwind responsive class chain instead.

---

### Always use Tailwind v4 canonical class names
Tailwind v4 has canonical equivalents for many arbitrary values. The linter warns when you
use the arbitrary form. Always prefer the canonical version.

**Why:** Keeps the codebase consistent, reduces bundle size, and avoids IDE warnings that
slow down development.

**How to apply:**
```
❌ aspect-[16/9]    → ✅ aspect-video
❌ aspect-[4/3]     → ✅ aspect-4/3
❌ max-w-screen-xl  → ✅ max-w-7xl
❌ max-w-[760px]    → ✅ max-w-190
❌ min-h-[700px]    → ✅ min-h-175
❌ min-h-[360px]    → ✅ min-h-90
❌ h-[400px]        → ✅ h-100
❌ min-h-[480px]    → ✅ min-h-120
❌ min-h-[100vh]    → ✅ min-h-screen
```

---

### Scroll-scrubbed frame sequences: mutate ref.src directly, never use React state
When animating a multi-frame image sequence driven by scroll position, never `setState` each
frame — it triggers React re-renders (~100 per scroll) and causes severe jank.

**Why:** The Skechers 107-frame shoe rotation used `useMotionValueEvent` to pick the right
frame index. Setting state would re-render the component on every frame. Mutating
`imgRef.current.src` directly bypasses React and updates the DOM at native speed.

**How to apply:**
```tsx
const imgRef = useRef<HTMLImageElement>(null);
useMotionValueEvent(scrollYProgress, "change", (v) => {
  const idx = Math.min(Math.round(v * (TOTAL - 1)), TOTAL - 1);
  if (imgRef.current) imgRef.current.src = frames[idx];
});
```

---

### Hero animations should be per-brand, not generic
Each brand page hero has its own personality (Gabor = video + thin wordmark, Skechers = tech
tags + accent bar, Rieker = split RIEKER/ANTISTRESS, Dolomite = DOLO/MITE + shoe from right,
ECCO = scale + fade). Creating separate hero components per brand preserves the unique feel.

**Why:** A single generic "animated hero" component couldn't capture the distinct motion
choreography each brand required. Separate files keep the animation code focused and simple.

**How to apply:** Each brand gets its own `[Brand]Hero.tsx` in `/components/blocks/`. Shared
constants (like the EASE curve `[0.22, 1, 0.36, 1]`) can be duplicated — they're small.

---

### Use a Reveal wrapper for consistent whileInView animations
Instead of adding motion props (`initial`, `whileInView`, `viewport`, `transition`) to every
section manually, create a reusable `<Reveal>` client component that wraps children.

**Why:** Adding the same 5 motion props to dozens of sections is verbose and error-prone.
A single `<Reveal from="left" delay={0.1}>` is cleaner and enforces consistency.

**How to apply:** Use `/components/blocks/Reveal.tsx` — supports `from` (up/down/left/right/none),
`distance`, `delay`, `duration`, `amount`, and `as` (div or section).

---

### Move interactive filter state into client components, not server pages
When filter buttons need to control which products are visible, the filter bar and product
grid must share state — which means they must be in the same client component. Don't leave
static filter buttons in a server component page.

**Why:** The sortiment pages (dam/herr/barn) had non-functional filter buttons because they
were plain `<button>` elements in a server component with no state management. Moving the
filter into `ProductGrid` (already "use client") made it work with zero extra plumbing.

**How to apply:** If a section needs interactivity, either make it a client component or wrap
it in one. Derive data (like unique brand names) from the props rather than hardcoding.

---

### Don't stagger product card vertical offsets — keep grid rows uniform
Using `lg:mt-12` on every third card creates a masonry-like stagger that looks intentional
in isolation but breaks visual alignment when cards have different image aspect ratios or
when filtering changes which cards appear.

**Why:** After filtering, the "staggered" cards no longer line up consistently — card 2 and 5
shift but the pattern doesn't match the new grid. Uniform height is cleaner and more robust.

**How to apply:** Remove conditional margin-top offsets from grid items. Use consistent
`aspect-3/4` on all card images and `flex flex-col` on the card wrapper.

---

### `as const` makes arrays readonly — Next.js Metadata expects mutable `string[]`
When using `as const` on a config object, nested arrays become `readonly` tuples. The
Next.js `Metadata` type expects `string[]` (mutable), not `readonly string[]`.

**Why:** `siteConfig.keywords` was typed as `readonly ["skoaffär Anderstorp", ...]` which
couldn't be assigned to `Metadata.keywords: string[] | undefined`. The build failed on
`layout.tsx:27`.

**How to apply:** Annotate the specific array as `string[]` before `as const`:
```tsx
export const siteConfig = {
  keywords: ["skoaffär", "skor"] as string[],  // mutable override
} as const;
```

---

### Every inner page needs BreadcrumbJsonLd for SEO
Breadcrumb structured data helps Google show rich breadcrumb trails in search results. Every
page below the homepage should include `<BreadcrumbJsonLd>` with the full path.

**Why:** The ECCO and Blogg pages were missing breadcrumb structured data while all other
brand and category pages had it — inconsistent coverage weakens the site's search appearance.

**How to apply:** Add `<BreadcrumbJsonLd crumbs={[...]} />` in every `page.tsx` that isn't
the homepage. Include it right after the opening `<>` fragment, before `<Header />`.

---

### Exclude test config files from Next.js type checking
Files like `vitest.config.ts` may import dev-only packages (`vitest/config`) that aren't
installed as production dependencies. Next.js build runs `tsc` over all included files, so
these will fail type checking.

**Why:** The build failed on `vitest.config.ts:1` because `vitest` was not in `dependencies`.
It's a test runner config that Next.js doesn't need to check.

**How to apply:** Add test config files to `tsconfig.json`'s `exclude` array:
```json
"exclude": ["node_modules", "vitest.config.ts", "vitest.setup.ts"]
```

---

### R3F / Canvas components need a client wrapper with `dynamic({ ssr: false })`
`@react-three/fiber`'s `<Canvas>` instantiates a `WebGLRenderer` that touches
`window`, so it can't render on the server. Next.js App Router only allows
`dynamic(..., { ssr: false })` inside a `"use client"` file — you can't call
it from a server component directly.

**Why:** The Pewes home page is a server component (Sanity fetch at request
time). Attempting to import `HeroShoe3D` directly — even with `"use client"` —
still SSRs the shell, which crashes R3F. A thin client wrapper that does the
`dynamic({ ssr: false })` import is the standard workaround.

**How to apply:** For any R3F / Canvas / WebGL component used from a server
page, create a sibling `*.Client.tsx` with `"use client"` that imports the
heavy component via `dynamic(() => import("./X"), { ssr: false, loading: ... })`.
Also provide a `loading` fallback at the same height as the final component so
layout doesn't jump while the R3F bundle loads. See
`components/blocks/HeroShoe3DClient.tsx`.

---

### Lazy-init `useState` from `window.*` in ssr:false components, never sync-set in useEffect
When a component is dynamic-imported with `ssr: false`, `window` is available
at first render — so `useState(() => window.matchMedia(...).matches)` works.
Don't use `useState(false)` + `useEffect(() => setState(window....matches), [])`
— React 19's lint rule `react-hooks/set-state-in-effect` flags the
synchronous `setState` in the effect body as a cascading-render antipattern.

**Why:** Lint errored on `HeroShoe3D.tsx` because the effect set state on mount
to read `matchMedia`. Lazy init avoids the extra render entirely and is safe
here because the `ssr: false` wrapper guarantees `window` exists.

**How to apply:**
```tsx
// ❌ Wrong — cascading render, lint error
const [x, setX] = useState(false);
useEffect(() => { setX(window.matchMedia(q).matches); /* subscribe */ }, []);

// ✅ Correct — for ssr:false components only
const [x, setX] = useState(() => window.matchMedia(q).matches);
useEffect(() => { /* subscribe to change events only */ }, []);
```

---

## Log

### 2026-04-09 — ShoeAnatomy initial build
- Called `useTransform` inside JSX `style` prop → violated Rules of Hooks → moved to top level
- Mixed `transform: "scaleX(-1)"` string with `y: MotionValue` → conflict → switched to `scaleX: -1`
- Had unused `useActiveZone` function wrapper → removed

### 2026-04-10 — ShoeAnatomy scroll-anim debugging
- Wrote `[0, 0, 0.10, 0.15]` as a keyframe input → degenerate segment → outsole kept
  reappearing at later scroll positions. Fix: strictly-increasing positions only.
- Relied on implicit clamping past the last keyframe → first image still leaked through.
  Fix: every `useTransform` input range now spans `[0, 1]` explicitly with `0` pinned at
  both ends.
- Hard-coded `style={{ width: 480, height: 480 }}` on the image stage → mobile layout
  overflowed sticky frame, assembled-shoe zone never visible. Fix: responsive Tailwind
  sizing (`w-60 md:w-120 lg:w-150`).
- Zone 0 had only 13% of scroll dwell vs ~17% for the others → first text disappeared
  before the user could read it. Fix: rebalanced keyframes so each zone gets ~18–20%.

### 2026-04-11 — Brand page animations
- Built per-brand hero components (Gabor video, Skechers tech tags, Rieker split, Dolomite
  DOLO/MITE, ECCO scale). Each with unique motion choreography.
- Skechers 107-frame scroll rotation: initially used state → jank. Switched to direct
  `imgRef.current.src` mutation via `useMotionValueEvent`. Smooth.
- Dolomite tech grid: used `staggerChildren: 0.18, staggerDirection: -1` for right-to-left
  reveal. Heritage section: text from y:-200, "1897" from y:300.

### 2026-04-12 — Reveal component + filter buttons + SEO fixes
- Created reusable `<Reveal>` wrapper for whileInView animations. Applied to all main
  sections across all pages (home, brand, skor, skovard, blogg, nyheter).
- GaborFeatures extracted to client component with image-from-outside / text-from-inside
  slide animations.
- ProductGrid filter buttons were non-functional static elements in server pages. Moved
  filter bar into ProductGrid (client component), derived brands from products, added state.
- Removed staggered `lg:mt-12` from product cards — broke visual alignment after filtering.
- Fixed `siteConfig.keywords` readonly type error: `as string[]` annotation.
- Added missing BreadcrumbJsonLd to ECCO and Blogg pages.
- Excluded vitest config from tsconfig to fix unrelated build error.
- Created PostModal + BloggList/NyheterList for click-to-open post modals with longer
  descriptions. Added body text to all blog and nyheter fallback posts.

### 2026-04-21 — 3D shoe hero with R3F
- Installed `@react-three/fiber@9.6`, `@react-three/drei@10.7`, `@types/three`.
  `three` v0.184 was already a direct dep.
- Built a scroll-driven camera rig that reads `scrollYProgress.get()` inside
  `useFrame` rather than piping through `useTransform` — avoids all the
  keyframe-array pitfalls that bit ShoeAnatomy.
- Had to add a thin `HeroShoe3DClient.tsx` wrapper because App Router
  server-renders anything a server page imports, including `"use client"`
  modules, and R3F's Canvas needs `window`. Wrapped the dynamic import
  with `ssr: false` in a client file.
- Lint caught a `setState` inside `useEffect` — fixed by lazy-initialising
  state from `window.matchMedia()` (safe because the whole component only
  mounts client-side).

### 2026-04-16 — Seed script image upload failures

#### Rules learned:

### Always validate external image URLs before committing them to seed scripts
When copying URLs from component fallback data into seed scripts, verify each URL actually
returns a 200 response. Google Photos (`lh3.googleusercontent.com/aida-public/`) URLs expire
and return HTTP 400 without warning.

**Why:** 4 out of ~15 image uploads failed silently during seeding because the URLs were
either truncated, hybridized (copy-paste error merging two URLs), or expired.

**How to apply:** Before adding an external image URL to a seed script, `curl -I <url>` to
check the status code. If it fails, look for a local equivalent in `public/` or use a
different working URL.

---

### Prefer local images in `public/` over external URLs for seed scripts
External URLs (especially Google Photos) expire unpredictably. Local files in `public/`
are stable and always available.

**Why:** The `pGaborSandal` URL was broken across ALL source files in the codebase — not
just the seed script. The fix was to point at `public/gabor/sandaler.png` instead.

**How to apply:** When a local equivalent exists in `public/`, always prefer it over an
external URL in seed data. Use the path format `"/folder/file.png"` and detect local vs
remote in the upload function.

---

### Log response bodies on HTTP errors in upload functions
A bare `HTTP 400` error gives zero diagnostic information. Always capture and log the
response body (truncated) when an upload fails.

**Why:** Debugging the 4 failed uploads required manually curling each URL to understand
the failures. With response body logging, the cause would have been immediately visible.

**How to apply:**
```typescript
if (!res.ok) {
  const body = await res.text().catch(() => "");
  throw new Error(`HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
}
```

#### Log entry:
- `collectionBarn` URL was truncated at ~192 chars (full URL ~320 chars) — inherited from
  `CollectionPreview.tsx:45` where it was already broken. Replaced with working substitute.
- `pEccoSneaker` URL was a hybrid: correct first half but suffix from `collectionHerr` URL
  (copy-paste error during script generation). Fixed with correct URL from `ProductGrid.tsx:67`.
- `pGaborSandal` external URL expired (HTTP 400 from Google). Same broken URL in all source
  files. Fixed by pointing to `public/gabor/sandaler.png`.
- Added response body logging to `uploadOne` error handler for future debugging.

---

### Mobile-first: sticky-scroll sections need a separate mobile fallback component
Never use a `500vh` / `420vh` sticky-scroll container on mobile — it forces the user to scroll through 4+ viewports of dead space on a small screen.

**Why:** `StoryReveal` used `grid grid-cols-2` inside a sticky viewport. On mobile this rendered two squished columns that were unusable. The fix: render a completely different component on mobile — a simple stacked cards layout that doesn't require any scroll-driven animation.

**How to apply:** Use a `useEffect` media query check (`window.matchMedia("(max-width: 767px)")`) inside the component, defaulting to `false` on initial render. Render `<MobileFallback />` when true, `<DesktopStickyScroll />` when false. Both branches share the same data array.

---

### WCAG 2.1 AA checklist for interactive components
When building interactive UI (accordions, dropdowns, buttons, videos):
1. **Interactive `div`s**: Replace with `<button type="button">` + `aria-expanded` + `aria-controls` pointing to the panel's `id`. The panel needs `role="region"` + `aria-label`.
2. **Decorative video/images/SVGs**: Add `aria-hidden="true"` + `tabIndex={-1}` on video; `aria-hidden="true"` on decorative SVGs.
3. **Mobile hamburger**: `aria-expanded={menuOpen}` + `aria-controls="mobile-menu"` + dynamic `aria-label` ("Öppna meny" / "Stäng meny").
4. **Breadcrumb `<nav>`**: Must have `aria-label="Brödsmulor"` (WCAG 2.1 SC 1.3.6).
5. **Focus ring**: Add `focus-visible` outline in `globals.css`. Never suppress `:focus` without a `focus-visible` alternative.
6. **Reduced motion**: Add `@media (prefers-reduced-motion: reduce)` in `globals.css` that sets `animation-duration: 0.01ms` and `transition-duration: 0.01ms` on all elements. WCAG 2.1 SC 2.3.3.

---

### Tailwind v4 canonical class names
Tailwind v4 uses direct CSS values as class names. Avoid arbitrary bracket notation when a canonical form exists:
- `w-[400px]` → `w-100`
- `h-[240px]` → `h-60`
- `top-[72px]` → `top-18`
- `bottom-[72px]` → `bottom-18`
- `aspect-[4/3]` → `aspect-4/3`

The IDE linter (`suggestCanonicalClasses`) will flag these. Fix them immediately to keep the codebase consistent.

---

### `useScroll({ target, offset: ["start start", "end end"] })` is unreliable for sticky sections
Never use framer-motion's `scrollYProgress` with a target ref for sticky-scroll sections loaded via dynamic import (`ssr: false`).

**Why:** The component only mounts after the user has already scrolled to that part of the page. By the time `scrollYProgress` initialises, the scroll position can already be mid-section, skipping earlier animation phases entirely. This caused the Herr shoe (ShoeRise) and the first two StoryReveal sections to be invisible on first render.

**How to apply:** Use `useScroll()` (global `scrollY`) instead. Measure the container's document offset in `useEffect` and store it in a ref. Compute each transform with the function form of `useTransform`:
```tsx
const { scrollY } = useScroll();
const secTopRef = useRef(0);
const vhRef = useRef(800);
useEffect(() => {
  const measure = () => {
    vhRef.current = window.innerHeight;
    secTopRef.current = containerRef.current!.getBoundingClientRect().top + window.scrollY;
  };
  measure();
  window.addEventListener("resize", measure);
  return () => window.removeEventListener("resize", measure);
}, []);
// Effective scroll = containerHeight − viewport (e.g. 500vh → vhRef * 4, 420vh → vhRef * 3.2)
const op = useTransform(scrollY, (y) => {
  const p = Math.max(0, Math.min(1, (y - secTopRef.current) / (vhRef.current * 4)));
  // use p like scrollYProgress...
});
```

---

### Use Lenis for smooth scrolling — never the Framer Motion fixed-container approach
For site-wide smooth (inertial) scrolling, use **Lenis** (`npm install lenis`). Do not use
the Framer Motion `useSpring(scrollYProgress)` + `position: fixed` wrapper pattern from
articles like dev.to/ironcladdev/smooth-scrolling-with-react-framer-motion-dih.

**Why:** The fixed-container approach works by putting all content inside a `position: fixed`
`motion.div` with a `y` transform. This has two fatal incompatibilities with this project:
1. CSS `position: sticky` stops working — it needs a scrollable ancestor, which the fixed
   wrapper is not.
2. `position: fixed` children are positioned relative to the nearest ancestor with a
   transform (the wrapper), not the viewport. This breaks the fixed header.
Both `StoryReveal` and `ShoeRise` use sticky layout, so the whole approach breaks.

**How to apply:** Create a zero-render `"use client"` provider and add it once to
`app/layout.tsx`:
```tsx
// components/layout/LenisProvider.tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let rafId: number;
    function raf(time: number) { lenis.raf(time); rafId = requestAnimationFrame(raf); }
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);
  return null;
}
```
Lenis works by intercepting wheel/touch events and driving native scroll via
`scrollTo({ behavior: "instant" })`. This means `window.scrollY`, `position: sticky`,
IntersectionObserver, and Framer Motion's `useScroll` all keep working without any changes.
