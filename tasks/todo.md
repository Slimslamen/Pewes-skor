# Todo — Scroll-driven 3D shoe hero

## Plan

- [x] Install `@react-three/fiber`, `@react-three/drei`, `@types/three`
- [x] Create `components/blocks/HeroShoe3DScene.tsx` — Canvas + `<ShoeModel>` (auto-center + scale, sole flipped to +Y) + `<CameraRig>` (4-keyframe scroll-driven camera)
- [x] Create `components/blocks/HeroShoe3D.tsx` — 500vh sticky shell, overlay copy (heading/eyebrow/badge/CTA), cognac loading bar, reduced-motion fallback
- [x] Create `components/blocks/HeroShoe3DClient.tsx` — thin client wrapper using `next/dynamic({ ssr: false })`
- [x] Wire into `app/page.tsx` (replace `HomeHero` with `HeroShoe3DClient`)
- [x] `npm run lint` — only pre-existing error in `app/skor/dam/page.tsx:38` remains; my files are clean
- [x] `npm run build` — Turbopack compiled successfully; type-check fails on pre-existing `app/skor/barn/page.tsx:24` (not from this task)
- [x] Dev server boots, GET / returns 200, HeroShoe3D chunk is served
- [ ] **Manual visual tuning required** — keyframe positions in `KEYFRAMES` and the `rotation={[Math.PI, 0, 0]}` sole-up flip need eyeballing against the actual GLB

## Review

### What was built
- **`components/blocks/HeroShoe3DScene.tsx`** — R3F `<Canvas>` with one ambient + two directional lights and a studio HDR environment (skipped on mobile). The `<ShoeModel>` normalizes the GLB: auto-center via `Box3`, scale to `1 / maxAxis`, then flip 180° around X so the sole faces +Y. `<CameraRig>` reads `progress.get()` inside `useFrame`, picks the active segment between the four keyframes, lerps `camera.position` and `camera.fov` toward the target with a 0.12 / 0.15 smoothing factor, and calls `lookAt(0,0,0)` each frame.
- **`components/blocks/HeroShoe3D.tsx`** — 500vh / 450vh-md scroll container with `sticky top-0 h-screen` viewport (mirrors `ShoeAnatomy`). Holds the canvas, a soft left-side surface gradient for copy legibility, the original hero copy (heading + eyebrow + address badge + cognac CTA) fading out across `[0, 0.15, 0.35]`, the “Scrolla ↓” hint fading out across `[0, 0.05, 0.15]`, and a thin cognac progress bar at the top driven by drei's `useProgress`.
- **`components/blocks/HeroShoe3DClient.tsx`** — `"use client"` wrapper that does `dynamic(() => import("./HeroShoe3D"), { ssr: false })`. Required because R3F's Canvas needs `window`; App Router only allows `ssr: false` from a client component. Provides a fallback that holds the same 500vh height to avoid layout jump while the bundle loads.
- **`app/page.tsx`** — swapped `HomeHero` → `HeroShoe3DClient`.

### Camera choreography
| t    | camera.position    | fov | stage                          |
|------|--------------------|-----|--------------------------------|
| 0.00 | `(1.8, 0.35, 0)`   | 35  | profile, pulled back           |
| 0.33 | `(0.9, 0.5, 0)`    | 35  | dolly closer along the side    |
| 0.66 | `(0.1, 1.6, 0)`    | 30  | arc up over the shoe           |
| 1.00 | `(0.0, 0.45, 0)`   | 22  | sole + logo fills frame        |

### Constraints honoured (from `tasks/lessons.md`)
- All hooks (`useRef`, `useScroll`, `useTransform`, `useState`, `useEffect`, `useProgress`, `useGLTF`, `useFrame`, `useThree`, `useMemo`) are at the top of their components — never inside JSX.
- No `useTransform` keyframe arrays for the camera — driven directly inside `useFrame` so there's no degenerate-segment risk.
- The two `useTransform` calls used for overlay opacity have strictly increasing input ranges that span `[0, 1]`.
- Container height uses the same `h-[500vh] md:h-[450vh]` shape as `ShoeAnatomy`.
- Lazy-init `useState(() => window.matchMedia(...).matches)` is safe because `HeroShoe3D` is dynamic-imported with `ssr: false`. Avoided the `setState`-in-`useEffect` antipattern that lint catches.

### Open follow-ups
1. **Visual tuning** — open http://localhost:3000 and scroll. Adjust the `KEYFRAMES` vectors in `HeroShoe3DScene.tsx` until the four phases read clearly. If the shoe arrives sole-down, change `rotation={[Math.PI, 0, 0]}` → `[0, 0, 0]` (or rotate around Z instead of X depending on the GLB's native axis).
2. **64 MB GLB optimization** — run `gltf-transform draco public/Pewes.glb public/Pewes.compressed.glb` (or the meshopt variant) and switch the path. Likely 70-90% size reduction.
3. **Sanity hero overlay copy** — currently uses fallback strings; `data?.hero` prop is wired through but the existing `homePageQuery` may need confirmation that the shape still matches.
4. Once tuning lands, delete `components/blocks/HomeHero.tsx` (no other callers) and update `COMPONENTS.md`.
