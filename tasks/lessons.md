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
