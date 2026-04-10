# Design System — Pewes Skor

Aesthetic mode: **Luxury Minimal**. Warm earth tones, generous white space, editorial typography, and restrained animation.

---

## Color Tokens

All colors are Tailwind v4 `@theme` tokens defined in `app/globals.css`. Use the token names directly as Tailwind classes.

### Primary (Cognac Brown)

| Token                   | Value     | Usage                          |
|-------------------------|-----------|-------------------------------|
| `primary`               | `#725a39` | Buttons, active states, accents |
| `primary-container`     | `#d2b48c` | Hover backgrounds, light fills |
| `on-primary`            | `#ffffff` | Text on primary backgrounds    |
| `inverse-primary`       | `#e1c299` | Inverted surfaces              |

### Secondary (Warm Gray)

| Token                   | Value     | Usage                          |
|-------------------------|-----------|-------------------------------|
| `secondary`             | `#5f5e5e` | Body text, secondary copy      |
| `secondary-container`   | `#e5e2e1` | Chip/tag backgrounds           |

### Surfaces

| Token                          | Value     | Usage                          |
|--------------------------------|-----------|-------------------------------|
| `surface`                      | `#f8f9fa` | Page background                |
| `surface-container-low`        | `#f3f4f5` | Card backgrounds               |
| `surface-container`            | `#edeeef` | Sticky nav, chips              |
| `surface-container-high`       | `#e7e8e9` | Borders, dividers              |
| `inverse-surface`              | `#2e3132` | Dark sections (CTA banners)    |

### Text

| Token              | Value     | Usage             |
|--------------------|-----------|-------------------|
| `on-surface`       | `#191c1d` | Primary headings  |
| `secondary`        | `#5f5e5e` | Body copy         |
| `outline`          | `#7f766a` | Metadata, breadcrumbs |
| `outline-variant`  | `#d1c5b8` | Borders, dividers |

---

## Typography

### Fonts

| Variable               | Family   | Weights         | Usage           |
|------------------------|----------|-----------------|-----------------|
| `--font-manrope`       | Manrope  | 200–800         | All headings    |
| `--font-inter`         | Inter    | 300–600         | Body, labels, meta |

### Applying fonts in Tailwind v4

```jsx
// Heading
<h1 className="font-(family-name:--font-manrope) font-extrabold tracking-tighter">

// Body / label
<p className="font-(family-name:--font-inter) font-light">
```

### Heading Scale

| Element | Classes                                                              |
|---------|----------------------------------------------------------------------|
| Hero H1 | `text-6xl md:text-8xl font-extrabold tracking-tighter`              |
| Section H2 | `text-5xl font-bold tracking-tighter`                           |
| Card H3 | `text-xl md:text-2xl font-bold tracking-tight`                      |
| Eyebrow | `text-xs uppercase tracking-[0.2em] text-primary font-bold`         |
| Breadcrumb | `text-[10px] uppercase tracking-widest text-outline`            |

---

## Spacing & Layout

- Max page width: `max-w-screen-2xl mx-auto px-6`
- Section vertical padding: `py-24` (standard) / `py-32` (major sections)
- Grid gap: `gap-12` (large) / `gap-8` (medium) / `gap-6` (tight)

---

## Border Radius

| Token       | Value      | Usage                    |
|-------------|------------|--------------------------|
| `rounded`   | `0.125rem` | Inputs, buttons, tags    |
| `rounded-lg`| `0.25rem`  | Cards, modals            |
| `rounded-xl`| `0.5rem`   | Large cards, sections    |
| `rounded-full` | 9999px  | Chips, badges, avatars   |

Buttons and primary CTAs use `rounded-sm` (extra minimal).

---

## Buttons

### Primary CTA
```jsx
<Link className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white
  font-(family-name:--font-manrope) font-bold uppercase tracking-widest text-xs
  rounded-sm hover:bg-primary/90 transition-all duration-300 shadow-md shadow-primary/20">
  Label →
</Link>
```

### Secondary / Outline
```jsx
<Link className="inline-flex items-center gap-3 px-8 py-4
  border border-outline/30 text-on-surface
  font-(family-name:--font-manrope) font-bold uppercase tracking-widest text-xs
  rounded-sm hover:bg-surface transition-all duration-300">
  Label →
</Link>
```

---

## Cards

```jsx
<div className="bg-surface-container-low rounded-xl shadow-sm hover:shadow-lg
  transition-shadow duration-500 overflow-hidden">
  {/* content */}
</div>
```

---

## Gradients (Hero sections)

```jsx
{/* Full-bleed image section */}
<div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
```

---

## Animation

- Library: `motion` (import from `"motion/react"`)
- Scroll animations: `useScroll` + `useTransform`
- **Rule**: Never call hooks inside JSX. Declare all `useTransform` calls at the top of the component.
- Hover scale: `transition-transform duration-700 group-hover:scale-105`
- Hover color: `transition-colors duration-300`
- CTA lift: `hover:-translate-y-1 transition-transform duration-300`

---

## Iconography

SVG inline, `stroke="currentColor"`, `strokeWidth="2"`, `strokeLinecap="round"`.
Standard icon size: `24×24`. Small: `16×16` or `10×10`.

---

## Responsive Breakpoints (Tailwind defaults)

| Breakpoint | Min-width |
|------------|-----------|
| `sm`       | 640px     |
| `md`       | 768px     |
| `lg`       | 1024px    |
| `xl`       | 1280px    |
| `2xl`      | 1536px    |
