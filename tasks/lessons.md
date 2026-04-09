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

## Log

### 2026-04-09 — ShoeAnatomy initial build
- Called `useTransform` inside JSX `style` prop → violated Rules of Hooks → moved to top level
- Mixed `transform: "scaleX(-1)"` string with `y: MotionValue` → conflict → switched to `scaleX: -1`
- Had unused `useActiveZone` function wrapper → removed
