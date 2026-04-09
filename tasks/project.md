# Project Context — Pewes Skor

## What We're Building
A premium footwear retailer website for Pewes Skor (Anderstorp, Sweden). Family-owned shoe store
since 1948 selling brands: ECCO, Rieker, Gabor, Skechers, DOLOMITE. Site includes a home page,
category listing pages, and brand pages — all driven by Sanity CMS.

## Tech Stack
- Next.js 16 (App Router) — React 19
- TypeScript
- Tailwind CSS v4
- motion/react (Framer Motion v11+)
- Sanity v5 + next-sanity v12
- No shadcn/ui yet (not installed)

## Design Direction
- Aesthetic mode: Luxury Minimal (from DESIGN_SYSTEM.md)
- Fonts: Manrope (headline) + Inter (body) — faithful to Stitch.html design
- Colors: warm earth tones — primary #725a39 (cognac brown), surface #f8f9fa
- Border-radius: very minimal (0.125rem default)

## Current Status
Built from Stitch.html prototype:
- ✅ globals.css with full Pewes design token system
- ✅ layout.tsx with Manrope + Inter + SanityLive
- ✅ /components/layout/Header.tsx + Footer.tsx
- ✅ /app/page.tsx (home) + all home blocks
- ✅ /app/skor/dam/page.tsx + ProductGrid
- ✅ /app/varumarken/ecco/page.tsx (ECCO brand page)
- ✅ /components/blocks/ShoeAnatomy.tsx (500vh scroll-driven)
- ✅ Sanity schemas: homePage, eccoBrandPage, shoesPage
- ✅ next.config.ts image domains (lh3.googleusercontent.com, cdn.sanity.io)
- ✅ /public/ecco/ directory ready for shoe layer images

## Open Issues
- Layer images (/public/ecco/*.png) must be placed manually or uploaded via Sanity
- Fine-tune layer alignment offsets (scaleX offsets) once real images are available
- Sanity content documents not yet created (schemas deployed, awaiting content entry)

## Key Decisions Made
- ShoeAnatomy uses 500vh scroll container with sticky viewport + useScroll/useTransform
- Layer separation: outsole moves DOWN, insole moves UP (exploded view logic)
- Mobile: no sticky behavior, shoe 100vw, annotations as cards below
- All content has fallback values — site works without Sanity data

## Next Steps
1. Place shoe layer images in /public/ecco/
2. Fine-tune layer offsets in ShoeAnatomy.tsx after visual review
3. Create Sanity content documents via /studio
4. Add /app/skor/herr and /app/skor/barn pages
5. Add /app/varumarken page (brand listing)
6. Consider adding blog section from Stitch.html
