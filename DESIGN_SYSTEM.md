# Design System — Forma Web Agency

How we approach visual identity, tokens, and motion for any client project.

---

## Step 1 — Choose an Aesthetic Mode

Pick one mode per project and commit to it. Mixing modes produces inconsistency.

| Mode | Character | Typical client |
|------|-----------|----------------|
| **Luxury Minimal** | Warm neutrals, generous white space, editorial type, restrained motion | Premium retail, boutique, artisan |
| **Modern SaaS** | Cool grays, tight grid, data-heavy, subtle shadows | B2B tools, dashboards, dev products |
| **Editorial / Magazine** | Strong type contrasts, full-bleed images, kinetic layout | Media, publishing, culture |
| **Brutalist** | Raw typography, intentional misalignment, bold borders | Agencies, art, portfolio |
| **Friendly Consumer** | Rounded corners, playful color, approachable type | E-commerce, lifestyle, food |

Once chosen, document the mode in `tasks/project.md` so every session starts with the right mental frame.

---

## Step 2 — Define Color Tokens

All colors live as Tailwind v4 `@theme` tokens in `app/globals.css`. Never hardcode hex values in components — always use token names.

### Token naming pattern (Material Design 3 inspired)

```css
@theme {
  /* Primary action color */
  --color-primary:           #...;
  --color-primary-container: #...;   /* Hover fills, light variants */
  --color-on-primary:        #fff;   /* Text on primary bg */
  --color-inverse-primary:   #...;   /* Inverted accent */

  /* Secondary / neutral */
  --color-secondary:           #...;
  --color-secondary-container: #...;

  /* Surfaces */
  --color-surface:                  #...;  /* Page background */
  --color-surface-container-low:    #...;  /* Card bg */
  --color-surface-container:        #...;  /* Sticky nav, chips */
  --color-surface-container-high:   #...;  /* Borders, dividers */
  --color-inverse-surface:          #...;  /* Dark CTA banners */

  /* Text roles */
  --color-on-surface:       #...;  /* Primary headings */
  --color-outline:          #...;  /* Metadata, breadcrumbs */
  --color-outline-variant:  #...;  /* Subtle borders */
}
```

### Color palette recipes by mode

**Luxury Minimal** — warm earth tones
```
primary: cognac / amber / tan
surface: off-white (#f8f9fa)
on-surface: near-black (#191c1d)
secondary: warm gray (#5f5e5e)
```

**Modern SaaS** — cool neutrals
```
primary: indigo / blue / violet
surface: white (#ffffff)
on-surface: slate-900
secondary: slate-500
```

**Brutalist** — high contrast
```
primary: black (#000)
surface: white (#fff)
accent: one vivid pop color only (e.g. lime, red, electric blue)
```

---

## Step 3 — Set Typography

Never use more than 2 font families per project.

### Standard pairing roles

| Role | Purpose | Weight range |
|------|---------|--------------|
| **Display / Headline** | H1–H3, hero text | 700–900 |
| **Body / UI** | Paragraphs, labels, nav, captions | 300–600 |

### Applying in Tailwind v4

```jsx
// Headline font (CSS variable set on <html> or <body>)
<h1 className="font-(family-name:--font-display) font-extrabold tracking-tighter">

// Body font
<p className="font-(family-name:--font-body) font-light">
```

### Heading scale (use consistently)

| Element | Class pattern |
|---------|---------------|
| Hero H1 | `text-6xl md:text-8xl font-extrabold tracking-tighter` |
| Section H2 | `text-4xl md:text-5xl font-bold tracking-tight` |
| Card H3 | `text-xl md:text-2xl font-bold tracking-tight` |
| Eyebrow | `text-xs uppercase tracking-[0.2em] text-primary font-bold` |
| Caption / breadcrumb | `text-[10px] uppercase tracking-widest text-outline` |

---

## Step 4 — Spacing & Layout

- Max page width: `max-w-screen-2xl mx-auto px-6`
- Section vertical padding: `py-24` (standard) / `py-32` (major sections)
- Grid gaps: `gap-12` large / `gap-8` medium / `gap-6` tight
- Never use arbitrary pixel values when a Tailwind v4 canonical class exists

---

## Step 5 — Border Radius

Radius communicates personality — pick a level and hold it.

| Personality | Radius level | Tailwind |
|-------------|-------------|---------|
| Ultra-minimal / luxury | Near-zero | `rounded` (0.125rem) or `rounded-sm` |
| Modern / neutral | Moderate | `rounded-md` / `rounded-lg` |
| Friendly / consumer | High | `rounded-xl` / `rounded-2xl` |
| Brutal | Zero | `rounded-none` |

Chips, badges, and avatars always use `rounded-full` regardless of mode.

---

## Buttons

### Primary CTA (adapt colors to project)
```jsx
<button className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-on-primary
  font-(family-name:--font-body) font-bold uppercase tracking-widest text-xs
  rounded-sm hover:bg-primary/90 transition-all duration-300">
  Label →
</button>
```

### Secondary / Outline
```jsx
<button className="inline-flex items-center gap-3 px-8 py-4
  border border-outline/30 text-on-surface
  font-(family-name:--font-body) font-bold uppercase tracking-widest text-xs
  rounded-sm hover:bg-surface-container-low transition-all duration-300">
  Label →
</button>
```

---

## Animation

- Library: `motion/react` (Framer Motion v11+) — import from `"motion/react"`
- Icons: `lucide-react` only
- Smooth scroll: Lenis (`npm install lenis`) — never the Framer fixed-container trick

### Standard whileInView pattern

Use the `<Reveal>` wrapper (see COMPONENTS.md). Never add `initial` / `whileInView` / `viewport` props to individual elements — it creates inconsistency and verbosity.

### Scroll-driven rules

```tsx
// ✅ Use global scrollY + container offset — works after dynamic import
const { scrollY } = useScroll();
const topRef = useRef(0);
useEffect(() => {
  topRef.current = el.getBoundingClientRect().top + window.scrollY;
}, []);

// ❌ Never use useScroll({ target: ref }) for ssr:false components
// — the component mounts after scroll position, so progress starts mid-range
```

### Timing constants

```
Standard reveal: duration 0.6s, ease [0.22, 1, 0.36, 1]
Hover transitions: duration 0.3s (color) / 0.5s (transform)
Stagger children: 0.08–0.12s between items
```

### Reduced-motion

Always add to `globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Cards

```jsx
<div className="bg-surface-container-low rounded-xl overflow-hidden
  transition-shadow duration-500 hover:shadow-lg">
  {/* content */}
</div>
```

---

## Hero Gradients

```jsx
{/* Over a full-bleed image */}
<div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
```

---

## Responsive Breakpoints

| Prefix | Min-width | Design target |
|--------|-----------|---------------|
| *(none)* | 0px | Mobile first |
| `sm` | 640px | Large phone |
| `md` | 768px | Tablet |
| `lg` | 1024px | Laptop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Wide desktop |

Mobile-first always. Never write desktop styles without a mobile fallback.
