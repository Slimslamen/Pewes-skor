/**
 * seed-all.ts — Comprehensive Sanity seed for Pewes Skor
 *
 * Uploads all images to Sanity's asset pipeline and creates one document per
 * Sanity schema type with real content. Idempotent: safe to re-run — uses
 * `createOrReplace` with deterministic IDs.
 *
 * Usage:
 *   npx tsx scripts/seed-all.ts
 *
 * Required env vars (read from .env.local via @next/env):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN          (must have write permission — Editor or above)
 */

import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";
import fs from "node:fs";
import path from "node:path";

loadEnvConfig(process.cwd());

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token     = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing env vars: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-04-07",
  token,
  useCdn: false,
});

// ─── Document upsert helper ──────────────────────────────────────────────────

async function upsert(doc: Record<string, unknown> & { _id: string; _type: string }) {
  try {
    const result = await client.createOrReplace(doc);
    console.log(`  ✓ ${result._type} — ${doc._id}`);
  } catch (err) {
    console.error(`  ✗ Failed ${doc._id}:`, (err as Error).message);
    throw err;
  }
}

// ─── Image upload with deduplication ─────────────────────────────────────────
// Returns a Sanity image field: { _type: "image", asset: { _ref }, ...extras }
// Dedupes by source key so the same URL/path is only uploaded once per run.

type ImageField = {
  _type: "image";
  asset: { _type: "reference"; _ref: string };
  [extra: string]: unknown;
};

const assetCache = new Map<string, string>();

async function uploadOne(source: string, filename: string): Promise<string | null> {
  const cached = assetCache.get(source);
  if (cached) return cached;

  try {
    let buffer: Buffer;
    let contentType = "image/jpeg";

    if (source.startsWith("http://") || source.startsWith("https://")) {
      const res = await fetch(source);
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
      }
      buffer = Buffer.from(await res.arrayBuffer());
      contentType = res.headers.get("content-type") ?? "image/jpeg";
    } else {
      const abs = path.join(process.cwd(), "public", source.replace(/^\//, ""));
      buffer = fs.readFileSync(abs);
      const ext = path.extname(abs).toLowerCase();
      contentType =
        ext === ".png"  ? "image/png"  :
        ext === ".webp" ? "image/webp" :
        ext === ".gif"  ? "image/gif"  :
        "image/jpeg";
    }

    const asset = await client.assets.upload("image", buffer, { filename, contentType });
    console.log(`    ↑ ${filename} → ${asset._id}`);
    assetCache.set(source, asset._id);
    return asset._id;
  } catch (err) {
    console.warn(`    ⚠ upload failed for ${filename}: ${(err as Error).message}`);
    return null;
  }
}

async function img(source: string, alt: string, filename: string): Promise<ImageField | { alt: string; url: string }> {
  const id = await uploadOne(source, filename);
  if (!id) return { url: source, alt };
  return { _type: "image", asset: { _type: "reference", _ref: id }, alt };
}

async function productImg(source: string, imageAlt: string, filename: string): Promise<ImageField | { imageAlt: string; url: string }> {
  const id = await uploadOne(source, filename);
  if (!id) return { url: source, imageAlt };
  return { _type: "image", asset: { _type: "reference", _ref: id }, imageAlt };
}

// ─── Image source URLs ───────────────────────────────────────────────────────
// All external URLs and local file paths, collected here for clarity.

const IMG = {
  // Home
  heroLocal:        "/Hero.png",
  aboutInterior:    "https://lh3.googleusercontent.com/aida-public/AB6AXuB35ZrxF02880phzT7ssz7OnxfTjwwtp-dYdU__7EEkC_6kQHZiJ6kNpPfxKMpLMzOVXuEiO5P-ovcw9RnNmmqB68p17b8vQz1JYyYIi3BD_EVCj6Wu4o97n9lQ4_QMh7_EwbHaWQlvFEwQJ7LUzi0Fj8CzQxoA8A5PcOhbB_8a5h8KtPNgvrLase_OwKXNag66A5_NGf-Hdf4Zrm544tUZsoLSqduBVdxwHArKSn7XCdJFXHCwaGSjOaadn4T6bUZVxI8GzLtz_i-3",
  collectionDam:    "https://lh3.googleusercontent.com/aida-public/AB6AXuAkbc0XcQW3tjrMV1WalE25DQB1MCbgZyznh0ryA_FaPUlmSH7UMWGw-xzNfC2HmqSDdakIoxaxfHI8OldsBwGOUZRTWa9OAnfIHXCbax761VUpzu8GcnaT48I4AeHxtBubSIkwmYZwYNjugmOmyut-o5xATnD5pQiLYomeZKAfr1K-y9oPO4tIo4wjMyn93cLYA-TZbVAXqENNS5feGoU1JtpOgj2qJN-D-Ww1iSLDVXbCmfXqLfoTSzbQGr-tGQpTHQGkSpWw9trh",
  collectionHerr:   "https://lh3.googleusercontent.com/aida-public/AB6AXuCXWueTO72_4Vp8RNvWcEfrTNnIFpWBC6HJqhn234wOMAUoPPThRvKtqwH_NJyEzG1Bh_aT-aTnui-00yK5BEkaiBe4aSEzSpkjFAb84rCHg0_h_kUJprc5d46KEe4cf30PmOkxqLwyCHOM_cLZHVSZwfzPBYUmEYQ7nYPWQ8qRNXBZFHO-6SYrP8lnNRiEJXlfYETanWiEUEsgJ77EhlNL4Yqxm1mHy6MSEClH_6__wXYTtN2rS4cij1dvhGE9KOL2Bq3ONbaii2GQ",
  collectionBarn:   "https://lh3.googleusercontent.com/aida-public/AB6AXuAkbc0XcQW3tjrMV1WalE25DQB1MCbgZyznh0ryA_FaPUlmSH7UMWGw-xzNfC2HmqSDdakIoxaxfHI8OldsBwGOUZRTWa9OAnfIHXCbax761VUpzu8GcnaT48I4AeHxtBubSIkwmYZwYNjugmOmyut-o5xATnD5pQiLYomeZKAfr1K-y9oPO4tIo4wjMyn93cLYA-TZbVAXqENNS5feGoU1JtpOgj2qJN-D-Ww1iSLDVXbCmfXqLfoTSzbQGr-tGQpTHQGkSpWw9trh",

  // ECCO heritage
  eccoHeritage:     "https://lh3.googleusercontent.com/aida-public/AB6AXuDDjE8BechN6WiGCD7wr0l_6IlKFtnuYELGOJudeXhGLn1uNt4TZlnpFFIexmQFQSGBmNH9cLojp7Mc7g56ZOYNFAVXFbxehkkl8AiKsrUNtz1tY3xFSYCophER-J7d5ddFi-wluo7fCmNGTQBrZcDAu-0DjhL5HpuUNNN-2L9vluQHOAuHZ3xxUxQpAjs5ylVe1FbApJ_p7LT5wmXkPfhlRlbAsYHgagnRgJkbNuoi28eqC6Py3DFuocjuvM0W4bVmCTd_1GDGNiVu",

  // Shared product photos (reused across brands/pages)
  pBoots:           "https://lh3.googleusercontent.com/aida-public/AB6AXuBllu7V4UfIDA__RYIvIvVxNOeVCYM5cuW26DutTwmW7FbL7gpvDiPr7VzkIxabx0C6o6cMrQW_xlu7JtneUVRE6WVcwi_XH_1NwG2GkD87PJ4WyWCVojZKVAeRCNwYzLQKcZzWnTSQ2sTwpEFAPnVy70c0g7GQzdfg2NDgmLwmJvSNSFLHWnuW1wMUYaOwN555SAecS2qH530cav_DMbhXauDuF-5hen-s54YEkKtF3LGr9KysYjc31fKrNb5Jt7zJrnuKZPGm2YHu",
  pRiekerSneaker:   "https://lh3.googleusercontent.com/aida-public/AB6AXuDbPjRJBiveiH4Zsdv-tKUajuBJGT-E-c74JHdgWWTKlos4THgBA2_JCOTrns2Jnx-4hiWv514LZKH5_tfOXgM2cOBz_pj-i05-uEfJG7e9izC4_NMkJ-EKGuoVnL_Buz9ZkPjB9D4OuZJoqPfLCER5L016dr2dX6Q9BCu6wtkgUVZdK92W15cxspt1anPaD6GSL_kVUGt605cfkeFNXG38zI66PhhHRed8CurJASvTv8RcHtUhs1tak5iYLmOufUDZIcp_NnQSkMdx",
  pGaborLoafer:     "https://lh3.googleusercontent.com/aida-public/AB6AXuBk1thIjXgaGZUZykC15MQL5PkQJuyAvSlPfNEIF-A5_7122HbX29C4hcTy7_ecLsHyKH1RO0xE3Upli1fg9PPMOwWDuFm0U3m0Yc3utzxrxJjS5cYJXR7Tr_yeMfQpwuhqnRltRfQJG0wjwerH9h-G0oPaiWX763VekWTTgqi5cNi2u4e-PWKw3po_Tcy1jUXnnZDSf6xZohHIEMrxqDk5gbXfrdMSYdDdPAYBYixLgrc1DtYQyg3cXMW724pVDwPQ-ROQPmGw3ryV",
  pSkechersGrey:    "https://lh3.googleusercontent.com/aida-public/AB6AXuDtSDPwsNsjld1f5vUL5Js-MNavJlKQbp6il9N98VTwdN4XcXj1QN257LlgwGvuDr1CY0p-ALOXi7fH4FtjV8jxf5n3Sn6zsFWP186smdPp-7eeQf-PSD62Yf69M2JMe43JEHctp84JhUmcE0NGIswxGPHczaQQAHmCtucslPM6njV6LkBwq9xpcsIGutzv3lm9_0oaI8vpkMgBtMhBAlNGjhesFUyjDvfxt5b8Lbc9hksav9KHd3O6CAT8hK1dSEQk-y0vmUKJILI-",
  pEccoSneaker:     "https://lh3.googleusercontent.com/aida-public/AB6AXuBK4t0SThE6oVC2AyKt_NGET2Oq2fiPKmxOmev0ZFasMlMfVU7wEfohRq3ljQylyrMw_FvWQP3vIkdf77XJ7c3YkUte9v2T2lf4DaPHCyoQOwJaqMy1sALhFPUGb3nDMWbrp1FGEyMKGchda-6uUIFDSlBmEar3P0GtYEHpVRVk6USMySspxfBqTdwEf6zSh1-_Mspbo9LoZOPymeB0VCfzQfO6YeGJ8CoMFIAwkADb7gnw7Xqmo9jp6H9zLGQ0iv6mQeOrT6vLKm6v",
  pDolomiteLow:     "https://lh3.googleusercontent.com/aida-public/AB6AXuA9BFoV4o3O5ua1lY7PdSnL67yKlSovA2xBfU9wxIQ8OBqE1RTNoiWx09TXMxIWS6y6uKHh_s7T6rtnO8CDoz0d21fYf7rv80mnG15VOh513EDkS1h7J6jyRyuRVtHZaNBac8dT0tzeR3HupLOfpYETM5IJkTZh8zaRctbitpMY_mBaYbvBR91Pu_gnuxo-eoSYZ42rk1LSWK4kGgOH2EH3TcqXu4aSi3L6pdP_LGBo108f5oyxhkdCd7QMukgOoe_8zTfO4p9w9RO9",
  pGaborSandal:     "/gabor/sandaler.png",
  pRiekerSuede:     "https://lh3.googleusercontent.com/aida-public/AB6AXuC-vo42JSDbvmi7wDnpWJbpoZzIcj7cVaSfqWolR8ETw_3GoSP6lSfSqYGnVoO0FjYa6dFnBXqtIKkLIdJoLnk9H8NpC9tEP2Ompd8aEsVknV08GvgTrhHf78Pot99cDMwOKtgT_xORv054fJd-wmMdwf1691i0NtzaICL9_lX6-RyRKIQkBQxbbXZ3O4fvz4o0L_pDfyJkrO7TqYGNRm5lE-BXJ8RlVYjSfEhs8mmnqxYRVzmuoL6WxSLtlstg6jq4dF2CHq28jwxt",

  // Local brand assets
  gaborSneaker:     "/gabor/sneaker.png",
  gaborSandal:      "/gabor/sandaler.png",
  gaborLoafer:      "/gabor/loafer.png",
};

// ─── Home Page ───────────────────────────────────────────────────────────────

async function seedHomePage() {
  console.log("▸ Seeding home page…");
  const [imgHero, imgAbout, imgDam, imgHerr, imgBarn, imgFeat] = await Promise.all([
    img(IMG.heroLocal,       "Premium leather shoes on minimal concrete pedestal", "home-hero.png"),
    img(IMG.aboutInterior,   "Interior of Pewes Skor boutique with warm wood shelving", "home-about.jpg"),
    img(IMG.collectionDam,   "Damkollektion",        "collection-dam.jpg"),
    img(IMG.collectionHerr,  "Herrkollektion",       "collection-herr.jpg"),
    img(IMG.collectionBarn,  "Barnkollektion",       "collection-barn.jpg"),
    img(IMG.collectionHerr,  "Ny skokollektion 2026","featured-banner.jpg"),
  ]);

  await upsert({
    _id:   "homePage",
    _type: "homePage",
    hero: {
      heading:  "Skor med känsla\nsedan generationer",
      address:  "Storgatan 11, Anderstorp",
      hours:    "Mån–Fre: 10–18 · Lör: 10–14",
      ctaLabel: "Se vårt sortiment",
      ctaHref:  "#collection",
      image:    imgHero,
    },
    brands: [
      { _key: "b1", name: "ECCO" },
      { _key: "b2", name: "Rieker" },
      { _key: "b3", name: "Gabor" },
      { _key: "b4", name: "Skechers" },
      { _key: "b5", name: "DOLOMITE" },
    ],
    about: {
      eyebrow:  "Vårt Arv",
      heading:  "En personlig skoaffär med hjärtat i Anderstorp.",
      body:     "Sedan generationer har Pewes Skor varit platsen där hantverk möter personlig service. Vi tror på kvalitet som känns i varje steg, och på relationer som varar lika länge som våra skor. Vår butik på Storgatan är mer än bara en affär – det är en del av vår familjehistoria.",
      ctaLabel: "Läs mer om oss",
      ctaHref:  "#",
      image:    imgAbout,
    },
    collection: {
      heading:    "Noggrant utvalda kollektioner för livets alla tillfällen.",
      subheading: "Dam, Herr & Barn",
      categories: [
        { _key: "c1", name: "Dam",  href: "/skor/dam",  image: imgDam  },
        { _key: "c2", name: "Herr", href: "/skor/herr", image: imgHerr },
        { _key: "c3", name: "Barn", href: "/skor/barn", image: imgBarn },
      ],
    },
    findUs: {
      heading: "Hitta till oss",
      address: "Storgatan 11, 334 32 Anderstorp",
      hoursRows: [
        { _key: "h1", days: "Måndag – Fredag", hours: "10:00 – 18:00" },
        { _key: "h2", days: "Lördag",          hours: "10:00 – 14:00" },
        { _key: "h3", days: "Söndag",          hours: "Stängt" },
      ],
      phone: "0371-150 20",
      email: "info@pewesskor.se",
    },
    featuredBanner: {
      eyebrow:       "Ny Kollektion · 2026",
      heading:       "Utforska",
      headingAccent: "vårens",
      headingRest:   "nyheter",
      body:          "Noggrant utvalda stilar för den nya säsongen. Från klassiska oxfords till moderna sneakers — alltid med fokus på komfort och hantverk.",
      cta1Label:     "Dam",
      cta1Href:      "/skor/dam",
      cta2Label:     "Herr",
      cta2Href:      "/skor/herr",
      stats: [
        { _key: "s1", value: "200+",    label: "Modeller" },
        { _key: "s2", value: "5",       label: "Varumärken" },
        { _key: "s3", value: "1 butik", label: "Anderstorp" },
      ],
      image:      imgFeat,
      badgeLabel: "Ny kollektion",
    },
  });
}

// ─── ECCO Brand Page ─────────────────────────────────────────────────────────

async function seedEccoBrandPage() {
  console.log("▸ Seeding ECCO brand page…");
  const imgHeritage = await img(IMG.eccoHeritage, "Leather workshop with artisan tools", "ecco-heritage.jpg");

  await upsert({
    _id:   "eccoBrandPage",
    _type: "eccoBrandPage",
    hero: {
      headline:    "ECCO",
      subheadline: "Danish Design, Global Quality",
    },
    anatomy: {
      sectionTitle: "Anatomy of Innovation",
      zones: [
        { _key: "z1", label: "01 / Sula",        title: "Sulan",                 body: "Dynamic flex rubber med horisontella spår för maximalt grepp och flexibilitet i varje steg." },
        { _key: "z2", label: "02 / Mellansulna", title: "PHORENE™ mellansullan", body: "Ultralätt skum som ger energiåterledning och stötdämpning." },
        { _key: "z3", label: "03 / Innersula",   title: "Dual-Fit innersula",    body: "Avtagbar innersula i textil som anpassar skons bredd efter din fot." },
        { _key: "z4", label: "04 / Ovandel",     title: "ECCO GRUUV STUDIO",     body: "Handsytt premium läder från ECCOs egna garveri. FLUIDFORM™ direktgjutning för sömlös komfort." },
        { _key: "z5", label: "Komplett",         title: "Byggd för att hålla",   body: "Fyra lager, en sko. Varje del samverkar för att ge dig komfort och stil du märker redan vid första steget." },
      ],
    },
    heritage: {
      eyebrow: "Vårt Arv",
      heading: "Grundat 1963 av Karl Toosbuy, byggdes ECCO på filosofin att skon måste följa foten.",
      body:    "Från vårt huvudkontor i Bredebro, Danmark, har vi förblivit ett av de få stora skoföretagen i världen som äger och hanterar varje steg i läder- och skotillverkningsprocessen. Vårt arv är rotat i tron att sann lyx finns i skärningspunkten mellan traditionellt hantverk och modern materialvetenskap.",
      images:  [{ _key: "hi1", ...imgHeritage }],
    },
  });
}

// ─── Brand Pages (Gabor / Rieker / Dolomite / Skechers) ──────────────────────
// NOTE: The dam/herr/barn pages pull their products from brandPage documents
// via `products["<category>" in categories]` — so every product MUST include a
// `categories` array for it to appear on the right shoe category page.

async function seedBrandPages() {
  console.log("▸ Seeding brand pages (Gabor / Rieker / Dolomite / Skechers)…");

  // Upload all product images in parallel
  const [
    gSneaker, gSandal, gLoafer,
    rSneakerW, rSuedeBoot, rDerby,
    dLow, dHiker,
    sGoWalk, sRelaxed,
  ] = await Promise.all([
    productImg(IMG.gaborSneaker,   "Gabor sneaker i ljust naturläder",   "gabor-sneaker.png"),
    productImg(IMG.gaborSandal,    "Gabor sandal i mjukt läder",          "gabor-sandal.png"),
    productImg(IMG.gaborLoafer,    "Gabor loafer i mörkt läder",          "gabor-loafer.png"),
    productImg(IMG.pRiekerSneaker, "Rieker Modern Flow sneaker",          "rieker-sneaker.jpg"),
    productImg(IMG.pRiekerSuede,   "Rieker suede boot",                   "rieker-suede.jpg"),
    productImg(IMG.pRiekerSneaker, "Rieker Tex Derby B1322",              "rieker-derby.jpg"),
    productImg(IMG.pDolomiteLow,   "Dolomite Cinquantaquattro Low",       "dolomite-low.jpg"),
    productImg(IMG.collectionHerr, "Dolomite Torq Tech Hiker",            "dolomite-hiker.jpg"),
    productImg(IMG.pSkechersGrey,  "Skechers GoWalk Arch Fit",            "skechers-gowalk.jpg"),
    productImg(IMG.pSkechersGrey,  "Skechers Relaxed Fit Elected",        "skechers-relaxed.jpg"),
  ]);

  await upsert({
    _id:   "brandPage-gabor",
    _type: "brandPage",
    name:  "Gabor",
    description: "Tyska Gabor förenar traditionellt hantverk från Rosenheim med modern passform. Lätta material, formbara innersulor och tidlös design.",
    slug:  { _type: "slug", current: "gabor" },
    featured: true,
    navOrder: 10,
    products: [
      { _key: "g1", name: "Gabor Rollingsoft Sneaker", price: "1.399 kr", categories: ["dam"],         sizes: ["36","37","38","39","40","41","42"], image: gSneaker },
      { _key: "g2", name: "Gabor Comfort Sandal",      price: "899 kr",   categories: ["dam"],         sizes: ["37","38","39","40","41"],           image: gSandal  },
      { _key: "g3", name: "Gabor Classic Loafer",      price: "1.100 kr", categories: ["dam"],         sizes: ["36","37","38","39","40"],           image: gLoafer  },
      { _key: "g4", name: "Gabor Lena Lace Junior",    price: "649 kr",   categories: ["barn"],        sizes: ["28","29","30","31","32","33","34"], image: gLoafer  },
    ],
  });

  await upsert({
    _id:   "brandPage-rieker",
    _type: "brandPage",
    name:  "Rieker",
    description: "Sedan 1874 har Rieker byggt skor kring ANTISTRESS-filosofin — lätt, flexibel och skonsam mot foten hela dagen.",
    slug:  { _type: "slug", current: "rieker" },
    featured: true,
    navOrder: 30,
    products: [
      { _key: "r1", name: "Rieker Modern Flow Sneaker", price: "899 kr",   categories: ["dam"],         sizes: ["36","37","38","39","40","41","42"], image: rSneakerW },
      { _key: "r2", name: "Rieker Comfort Suede",       price: "849 kr",   categories: ["dam"],         sizes: ["37","38","39","40","41"],           image: rSuedeBoot },
      { _key: "r3", name: "Rieker Tex Derby B1322",     price: "899 kr",   categories: ["herr"],        sizes: ["40","41","42","43","44","45","46"], image: rDerby },
      { _key: "r4", name: "Rieker Comfort Suede Boot",  price: "1.099 kr", categories: ["herr"],        sizes: ["40","41","42","43","44","45"],      image: rSuedeBoot },
      { _key: "r5", name: "Rieker Tex Sneaker Kids",    price: "549 kr",   categories: ["barn"],        sizes: ["28","29","30","31","32","33","34"], image: rSneakerW },
      { _key: "r6", name: "Rieker Zip Ankle Boot Kids", price: "649 kr",   categories: ["barn"],        sizes: ["28","29","30","31","32","33","34"], image: rSuedeBoot },
    ],
  });

  await upsert({
    _id:   "brandPage-dolomite",
    _type: "brandPage",
    name:  "Dolomite",
    description: "Italienskt bergshantverk sedan 1897. Från alpin vandring till urban lifestyle — byggda för extrema förhållanden.",
    slug:  { _type: "slug", current: "dolomite" },
    featured: true,
    navOrder: 20,
    products: [
      { _key: "d1", name: "Dolomite Cinquantaquattro Low", price: "1.499 kr", categories: ["dam"],  sizes: ["36","37","38","39","40","41"],           image: dLow   },
      { _key: "d2", name: "Dolomite Cinquantaquattro Low", price: "1.499 kr", categories: ["herr"], sizes: ["40","41","42","43","44","45","46"],      image: dLow   },
      { _key: "d3", name: "Dolomite Torq Tech Hiker",      price: "1.749 kr", categories: ["herr"], sizes: ["40","41","42","43","44","45"],           image: dHiker },
    ],
  });

  await upsert({
    _id:   "brandPage-skechers",
    _type: "brandPage",
    name:  "Skechers",
    description: "Air-Cooled Memory Foam och bred passform — Skechers är sedan 1992 synonymt med komfort för hela familjen.",
    slug:  { _type: "slug", current: "skechers" },
    featured: true,
    navOrder: 40,
    products: [
      { _key: "s1", name: "Skechers GoWalk Arch Fit",       price: "949 kr", categories: ["dam"],  sizes: ["36","37","38","39","40","41"], image: sGoWalk  },
      { _key: "s2", name: "Skechers Relaxed Fit Elected",   price: "949 kr", categories: ["herr"], sizes: ["40","41","42","43","44","45"], image: sRelaxed },
      { _key: "s3", name: "Skechers S-Lights Twinkle Sparks", price: "599 kr", categories: ["barn"], sizes: ["28","29","30","31","32"],    image: sGoWalk  },
      { _key: "s4", name: "Skechers GoRun Fast Valor",       price: "699 kr", categories: ["barn"], sizes: ["28","29","30","31","32","33"], image: sRelaxed },
    ],
  });
}

// ─── Shoes Category Pages (dam / herr / barn) ────────────────────────────────
// These only hold title/subtitle — products come from brandPage via queries.

async function seedShoesPages() {
  console.log("▸ Seeding shoes category pages (dam / herr / barn)…");

  await upsert({
    _id:   "shoesPage-dam",
    _type: "shoesPage",
    slug:  { _type: "slug", current: "dam" },
    title: "Dam",
    subtitle: "En noggrant utvald kollektion av skor för den moderna kvinnan. Från tidlösa klassiker till nutida design, utvald med fokus på hantverk och komfort.",
  });

  await upsert({
    _id:   "shoesPage-herr",
    _type: "shoesPage",
    slug:  { _type: "slug", current: "herr" },
    title: "Herr",
    subtitle: "En noggrant utvald kollektion av skor för den moderna mannen. Från tidlösa klassiker till funktionella friluftsskor, alltid med fokus på komfort och hantverk.",
  });

  await upsert({
    _id:   "shoesPage-barn",
    _type: "shoesPage",
    slug:  { _type: "slug", current: "barn" },
    title: "Barn",
    subtitle: "Skor skapade för barnfötter i alla åldrar och aktiviteter. Kvalitet, komfort och hållbarhet — för att barnfötter förtjänar det bästa.",
  });
}

// ─── Shoe Care Guide ─────────────────────────────────────────────────────────

async function seedShoeCarePage() {
  console.log("▸ Seeding shoe care page…");
  await upsert({
    _id:   "shoeCarePage",
    _type: "shoeCarePage",
    pageTitle:    "Skovårdsguide",
    pageSubtitle: "Välskötta skor håller längre och ser bättre ut. Här hittar du våra bästa råd för varje typ av material.",
    materials: [
      {
        _key: "m1", materialKey: "lader", title: "Läder", icon: "👞",
        intro: "Äkta läder är ett naturmaterial som kräver regelbunden vård för att behålla sin form, lyster och hållbarhet. Med rätt rutiner kan ett par läderskor hålla i decennier.",
        steps: [
          { _key: "s1", stepTitle: "Rengör regelbundet", body: "Borsta bort smuts och damm med en mjuk borste efter varje bärning. Använd en fuktig trasa med lite neutral tvål för envisare smuts. Torka aldrig med varmt vatten." },
          { _key: "s2", stepTitle: "Ge näring och fukt", body: "Applicera ett läderbalm eller skokräm var 4–6 vecka för att återfukta läderfibrerna och förhindra sprickor. Välj en produkt som matchar skodonets färg och lägg på ett tunt lager med cirkelrörelser." },
          { _key: "s3", stepTitle: "Impregnera",         body: "Spraya med ett vattenavstötande läder-impregnering efter rengöring och innan konditionering. Håll på 20 cm avstånd, låt torka i 15 minuter och upprepa vid behov." },
          { _key: "s4", stepTitle: "Använd skoblock",    body: "Sätt in skoblock av cederträ direkt när du tar av dig skorna. Cedern absorberar fukt och svett, motverkar lukt och hjälper skorna att behålla sin ursprungliga form." },
          { _key: "s5", stepTitle: "Torka rätt",         body: "Om skorna blivit blöta: stoppa in tidningspapper och låt torka i rumstemperatur i minst 24 timmar. Placera aldrig nära element, kamin eller i direkt solljus — värme torkar ut läderfibrerna och orsakar sprickor." },
        ],
        proTip: "Rotera ditt skoinnehav. Bär inte samma par två dagar i rad — läder mår bra av att vila minst ett dygn för att luftas ut och återhämta sin form.",
      },
      {
        _key: "m2", materialKey: "nubuck", title: "Nubuck & Mocka", icon: "🧴",
        intro: "Nubuck och mocka ger ett sofistikerat, matt utseende men är känsligare för fukt och smuts än blankt läder. Med rätt verktyg och rutin bevarar du ytan länge.",
        steps: [
          { _key: "s1", stepTitle: "Daglig borstning",           body: "Borsta nubuck och mocka med en mjuk suede-borste efter varje bärning, alltid längs fiberns riktning. Det plockar upp damm och håller ytan jämn och sammetslen." },
          { _key: "s2", stepTitle: "Behandla fläckar genast",    body: "Använd ett suede-suddgummi på torrsmuts och ljusare fläckar. Gnid försiktigt och borsta sedan bort rester. För envisare fläckar: gnid med en mjuk trasa fuktad i lite vitt vin-ättika och låt lufttorka." },
          { _key: "s3", stepTitle: "Impregnera före bärning",    body: "Spraya med suede/nubuck-impregnering innan första bärningen och sedan var 4–6 vecka. Det skapar ett osynligt skydd mot regn och smuts utan att förändra ytan." },
          { _key: "s4", stepTitle: "Återuppliva nedtryckta ytor", body: "Är ytan nedtryckt och glänsig? Håll skorna i 5–10 sekunder över ångande vatten (försiktigt) och borsta sedan upp fibrerna med en torr suede-borste. Det återställer den ursprungliga sammetsytan." },
        ],
        proTip: "Undvik nubuck och mocka vid regn och snö. Om skorna ändå blir blöta: borsta av överskottsvatten direkt med en torr borste och låt torka i rumstemperatur — aldrig nära värme.",
      },
      {
        _key: "m3", materialKey: "textil", title: "Textil", icon: "👟",
        intro: "Textilskor — löparskor, sneakers och tygbaserade modeller — är ofta lätta och andningsbara men behöver rätt hantering för att behålla form och funktion.",
        steps: [
          { _key: "s1", stepTitle: "Daglig rengöring", body: "Torka av ytan med en mjuk borste eller fuktig trasa och lite mild handtvål. Undvik att blöta hela skons insida — koncentrera rengöringen på överdelen." },
          { _key: "s2", stepTitle: "Maskintvättning",  body: "Många textilskor tål maskintvättning i 30 °C i en tvättpåse eller tvätta dem i en gammal örngottspåse. Ta ut innersulorna separat och ta av skosnörena. Välj ett skonsamt centrifugeringsprogram." },
          { _key: "s3", stepTitle: "Torka korrekt",    body: "Stoppa in tidningspapper och lufttorka i rumstemperatur. Aldrig i torktumlare — värmen krymper och deformerar både material och limmade sektioner. Byt tidningspapper varannan timme de första timmarna." },
          { _key: "s4", stepTitle: "Impregnera",       body: "Spraya med textilimpregnering efter varje tvättning. Det skyddar mot fukt, minskar mängden smuts som fastnar och förkortar rengöringstiden nästa gång." },
        ],
        proTip: "Byt skosnören och innersulor regelbundet. Nya sulor och rena snören fräschar upp utseendet dramatiskt utan att du behöver köpa ett nytt par.",
      },
      {
        _key: "m4", materialKey: "vandring", title: "Vandring", icon: "🥾",
        intro: "Vandringsskor utsätts för tuffa förhållanden — grus, lera, fukt och temperaturväxlingar. Regelbunden service förlänger livslängden och bibehåller viktiga funktioner som vattentäthet och grepp.",
        steps: [
          { _key: "s1", stepTitle: "Rengör efter varje tur",      body: "Spola bort grov smuts med kallt vatten och en styvare borste direkt efter turen. Rengör sulorna noga — inbyggd sten och grus sliter på pinnarna och minskar greppet. Torka ur insidan med en torr trasa." },
          { _key: "s2", stepTitle: "Torka korrekt",               body: "Lossa snöringen och ta ut innersulorna. Fyll med tidningspapper och ställ i rumstemperatur. Aldrig nära kamin, bilens fläkt eller hanteringsvarma ytor — extremvärme förstör Gore-Tex-membran och limmade delar." },
          { _key: "s3", stepTitle: "Vax och impregnera",          body: "Påför lämpligt skyddsmedel utifrån materialet: vax för glattläder, spray för Gore-Tex- och textilöverdelar. Värm upp läderytorna lätt med hårtork (låg värme) innan du applicerar vaxet." },
          { _key: "s4", stepTitle: "Kontrollera sula och sömmar", body: "Kontrollera regelbundet om sulan har skador, urslitna delar eller börjat lossna. En del-lossnad sula bör lagas omedelbart — vatten tränger in och inifrån-fukten förstör skon snabbt." },
          { _key: "s5", stepTitle: "Förvara rätt",                body: "Förvara i en torr, sval och mörk plats utan att trycka ihop sulorna. Undvik plastpåsar som skapar kondens. En påse med silikagelkuddar håller fukten borta under längre förvaring." },
        ],
        proTip: "Reaktivera DWR-skyddet (Durable Water Repellent) efter varje tvättning. Vatten ska fortfarande pärla på ytmaterialet. Om vatten börjar tränga in istället för att pärla är det dags att impregnera igen.",
      },
      {
        _key: "m5", materialKey: "syntet", title: "Syntet", icon: "🧪",
        intro: "Syntetiska material — PU-läder, mikrofiber och vattenavvisande ytmaterial — är lättskött men inte underhållsfritt. Rätt behandling bevarar både utseende och funktion.",
        steps: [
          { _key: "s1", stepTitle: "Rengör med mild tvål",   body: "Blanda lite diskmedel eller handtvål i ljummet vatten. Skrubba försiktigt med en mjuk borste eller trasa. Skölj med en ren trasa fuktad i rent vatten. Upprepa om nödvändigt." },
          { _key: "s2", stepTitle: "Torka i rumstemperatur", body: "Syntetmaterial tål inte hög värme — torka alltid i rumstemperatur. Direkt sol bleker och gör materialet sprött med tiden. Låt lufta i skugga." },
          { _key: "s3", stepTitle: "Behåll formen",          body: "Stoppa in tidningspapper under torkning för att bevara formen, precis som med läder. Syntetmaterial kan deformeras om de torkar i en hopvikt position." },
          { _key: "s4", stepTitle: "Impregnera",             body: "Många syntetmaterial drar nytta av ett universalimpregnering. Applicera och reaktivera därefter med en hårtork på lägsta värme — värmen aktiverar de vattenavstötande ämnena." },
        ],
        proTip: "Undvik organiska lösningsmedel som aceton, sprit eller terpentin — dessa löser upp limmet och kan missfärga syntetmaterial permanent. Håll dig till vatten och mild tvål.",
      },
    ],
  });
}

// ─── Nyheter Posts ───────────────────────────────────────────────────────────

async function seedNyheterPosts() {
  console.log("▸ Seeding nyheter posts…");

  const [
    coverSummer, coverSpring,
    pCozmo, pSunset, pGoWalkLite, pBreeze, pFlowt, pDaydream,
    pSpringLoafer, pEccoClassic, pSpringLace,
  ] = await Promise.all([
    img(IMG.pGaborSandal,   "Sommarens skokollektion 2026",  "news-summer-cover.jpg"),
    img(IMG.pGaborLoafer,   "Vårens skokollektion 2026",     "news-spring-cover.jpg"),
    img(IMG.pGaborSandal,   "ECCO Cozmo Sandal",             "news-cozmo.jpg"),
    img(IMG.pGaborLoafer,   "Gabor Sunset Strap",            "news-sunset.jpg"),
    img(IMG.pSkechersGrey,  "Skechers Go Walk Arch Lite",    "news-gowalk-lite.jpg"),
    img(IMG.pRiekerSneaker, "Rieker Breeze Mule",            "news-breeze.jpg"),
    img(IMG.pBoots,         "ECCO Flowt LX Sandal",          "news-flowt.jpg"),
    img(IMG.pEccoSneaker,   "Gabor Daydream Wedge",          "news-daydream.jpg"),
    img(IMG.pGaborLoafer,   "Gabor Spring Penny Loafer",     "news-penny.jpg"),
    img(IMG.pBoots,         "ECCO Classic Loafer",           "news-ecco-classic.jpg"),
    img(IMG.pRiekerSneaker, "Rieker Spring Lace",            "news-spring-lace.jpg"),
  ]);

  await upsert({
    _id:   "nyhetPost-sommar-2026",
    _type: "nyhetPost",
    title: "Sommarens nyheter 2026",
    slug:  { _type: "slug", current: "sommarens-nyheter-2026" },
    publishedAt: "2026-04-01T10:00:00.000Z",
    season:  "Sommar 2026",
    excerpt: "Solen lockar fram de ljusaste skorna. Utforska vår nysläppta sommarkollektion — från luftiga sandaler till färgglada sneakers och tidlösa loafers för de varmaste dagarna.",
    coverImage: coverSummer,
    editorial: {
      heading: "Välkommen till Sommarens Nyheter 2026",
      body:    "Det är dags att byta ut vinterstövlarna mot något som andas med de varma dagarna. Den här säsongen har vi handplockat ett urval av skor som kombinerar stil och komfort för alla sommarens tillfällen — från strandpromenaden till middagen på uteserveringen.\n\nVi har hämtat hem nya modeller från ECCO, Rieker, Gabor och Skechers med fokus på lättviktiga konstruktioner, öppna designs och material som andas. Låt sommaren börja.",
    },
    products: [
      { _key: "p1", brand: "ECCO",     name: "Cozmo Sandal",       description: "Mjukt nappaskinn med ergonomisk fotbädd och justerbar kardborrstängning. Perfekt för långa sommardagar.", price: "999 kr",   image: pCozmo    },
      { _key: "p2", brand: "GABOR",    name: "Sunset Strap",       description: "Elegant sandalett i glansläder med spänne. Liten klack ger lyft utan att ge avkall på komforten.",        price: "799 kr",   image: pSunset   },
      { _key: "p3", brand: "SKECHERS", name: "Go Walk Arch Lite",  description: "Ultralätt sommar-sneaker med ULTRA GO-dämpning och Arch Fit-innersula. Tål varma dagar.",                 price: "849 kr",   image: pGoWalkLite },
      { _key: "p4", brand: "RIEKER",   name: "Breeze Mule",        description: "Öppen läder-mule med antiperspirant-behandlad innersula och flexibel mellansulsteknik.",                  price: "699 kr",   image: pBreeze   },
      { _key: "p5", brand: "ECCO",     name: "Flowt LX Sandal",    description: "Minimalistisk sandal med ett band av mjukt nappa. Ergonomisk fotbädd i ett enda formgjutet stycke.",      price: "1.099 kr", image: pFlowt    },
      { _key: "p6", brand: "GABOR",    name: "Daydream Wedge",     description: "Korgvävd wedge-sandal med fotled-band och mjuk mocka-foder. Ger extra höjd med stabil känsla.",           price: "949 kr",   image: pDaydream },
    ],
  });

  await upsert({
    _id:   "nyhetPost-var-2026",
    _type: "nyhetPost",
    title: "Vårens kollektioner 2026",
    slug:  { _type: "slug", current: "varens-kollektioner-2026" },
    publishedAt: "2026-02-15T10:00:00.000Z",
    season:  "Vår 2026",
    excerpt: "Vårens kollektion är här — med mjuka pasteller, klassiska läderloafers och lättviktiga sneakers för de första varma dagarna.",
    coverImage: coverSpring,
    editorial: {
      heading: "Vårens kollektion 2026",
      body:    "När snön börjar smälta lyfts också garderoben. Vårkollektionen 2026 är byggd kring mjuka pasteller, jordnära toner och material som passar den svenska övergångsperioden — då marken fortfarande är fuktig men vinterkängorna känns overkill.\n\nLoafern står i centrum i år. Vi har tagit in Gabors nya pennyloafer i tre färger, ECCOs klassiker i mörkbrunt kalvläder och Riekers lättviktsmodell med elastisk krage. Gemensamt för alla tre: de är gjorda för att bäras utan strumpor när det blir varmare, och med strumpor tills dess.",
    },
    products: [
      { _key: "p1", brand: "GABOR",  name: "Spring Penny Loafer", description: "Ny pennyloafer i mjukt kalvläder, tillgänglig i tre färger. Formad innersula för heldag-komfort.",  price: "1.099 kr", image: pSpringLoafer },
      { _key: "p2", brand: "ECCO",   name: "Classic Loafer",      description: "Tidlös klassiker i mörkbrunt kalvläder med ECCOs COMFORT FIBRE innersula.",                         price: "1.299 kr", image: pEccoClassic  },
      { _key: "p3", brand: "RIEKER", name: "Spring Lace",         description: "Lättviktig sneaker med elastisk krage och reflexdetaljer. Perfekt för vårvädrets oregelbundna dagar.", price: "799 kr",   image: pSpringLace   },
    ],
  });
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function seed() {
  console.log(`\nSeeding Sanity project ${projectId} / dataset ${dataset}\n`);
  await seedHomePage();
  await seedEccoBrandPage();
  await seedBrandPages();
  await seedShoesPages();
  await seedShoeCarePage();
  await seedNyheterPosts();
  console.log("\n✅ Done seeding all documents.\n");
}

seed().catch((err) => {
  console.error("\n❌ Seed failed:", err);
  process.exit(1);
});
