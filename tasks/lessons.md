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
