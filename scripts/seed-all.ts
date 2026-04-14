/**
 * seed-all.ts — Comprehensive Sanity seed for Pewes Skor
 *
 * Usage:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=<id> \
 *   NEXT_PUBLIC_SANITY_DATASET=<dataset> \
 *   SANITY_API_TOKEN=<write-token> \
 *   npx tsx scripts/seed-all.ts
 */

import { createClient } from "@sanity/client";

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

async function upsert(doc: Record<string, unknown>) {
  const id = doc._id as string;
  try {
    const result = await client.createOrReplace(doc);
    console.log(`✓ ${result._type} — ${id}`);
  } catch (err) {
    console.error(`✗ Failed ${id}:`, err);
  }
}

// ─── Home Page ───────────────────────────────────────────────────────────────

async function seedHomePage() {
  await upsert({
    _id:   "homePage",
    _type: "homePage",
    hero: {
      heading:  "Skor med känsla\nsedan generationer",
      address:  "Storgatan 11, Anderstorp",
      hours:    "Mån–Fre: 10–18 · Lör: 10–14",
      ctaLabel: "Se vårt sortiment",
      ctaHref:  "#collection",
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
      body:     "Sedan generationer har Pewes Skor varit platsen för dem som vet att en välvald sko gör skillnad. Vi bär märken vi tror på, ger råd som håller och behandlar varje kund som en gammal vän.",
      ctaLabel: "Läs mer om oss",
      ctaHref:  "#",
    },
    collection: {
      heading:    "Noggrant utvalda kollektioner för livets alla tillfällen.",
      subheading: "Dam, Herr & Barn",
      categories: [
        { _key: "c1", name: "Dam",  href: "/skor/dam",  image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk1thIjXgaGZUZykC15MQL5PkQJuyAvSlPfNEIF-A5_7122HbX29C4hcTy7_ecLsHyKH1RO0xE3Upli1fg9PPMOwWDuFm0U3m0Yc3utzxrxJjS5cYJXR7Tr_yeMfQpwuhqnRltRfQJG0wjwerH9h-G0oPaiWX763VekWTTgqi5cNi2u4e-PWKw3po_Tcy1jUXnnZDSf6xZohHIEMrxqDk5gbXfrdMSYdDdPAYBYixLgrc1DtYQyg3cXMW724pVDwPQ-ROQPmGw3ryV", alt: "Damkollektion" } },
        { _key: "c2", name: "Herr", href: "/skor/herr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXWueTO72_4Vp8RNvWcEfrTNnIFpWBC6HJqhn234wOMAUoPPThRvKtqwH_NJyEzG1Bh_aT-aTnui-00yK5BEkaiBe4aSEzSpkjFAb84rCHg0_h_kUJprc5d46KEe4cf30PmOkxqLwyCHOM_cLZHVSZwfzPBYUmEYQ7nYPWQ8qRNXBZFHO-6SYrP8lnNRiEJXlfYETanWiEUEsgJ77EhlNL4Yqxm1mHy6MSEClH_6__wXYTtN2rS4cij1dvhGE9KOL2Bq3ONbaii2GQ", alt: "Herrkollektion" } },
        { _key: "c3", name: "Barn", href: "/skor/barn", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYgkuoGad0DOqh9-q2tgcIJa3JzuAEIX5YlzfxL5RaV_ycAWG5fbe199CY8c49gYxu6ZZdtKVqM5xwVYmN0dNQRg7hLtGcXvpPf3agWcw0hJyBRmjZ8KZs7nQX9yFZFknepV9-6nHqxz", alt: "Barnkollektion" } },
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
      image:       { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXWueTO72_4Vp8RNvWcEfrTNnIFpWBC6HJqhn234wOMAUoPPThRvKtqwH_NJyEzG1Bh_aT-aTnui-00yK5BEkaiBe4aSEzSpkjFAb84rCHg0_h_kUJprc5d46KEe4cf30PmOkxqLwyCHOM_cLZHVSZwfzPBYUmEYQ7nYPWQ8qRNXBZFHO-6SYrP8lnNRiEJXlfYETanWiEUEsgJ77EhlNL4Yqxm1mHy6MSEClH_6__wXYTtN2rS4cij1dvhGE9KOL2Bq3ONbaii2GQ", alt: "Ny skokollektion 2026" },
      badgeLabel:    "Ny kollektion",
    },
  });
}

// ─── ECCO Brand Page ──────────────────────────────────────────────────────────

async function seedEccoBrandPage() {
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
        { _key: "z1", label: "01 / Sula",       title: "Sulan",               body: "Dynamic flex rubber med horisontella spår som möjliggör naturlig böjning under gång. Direkt-injicerad utan lim eller sömmar för maximal hållbarhet." },
        { _key: "z2", label: "02 / Mellansulna", title: "PHORENE™ mellansullan", body: "Ultralätt skum som ger energiåterledning och stötdämpning i varje steg. Formad för att matcha fotens naturliga kurva och bibehålla form i år." },
        { _key: "z3", label: "03 / Innersula",   title: "Dual-Fit innersula",   body: "Avtagbar innersula i textil med anatomisk form. Erbjuder extra volymalternativ och ventilerar fukt effektivt." },
        { _key: "z4", label: "04 / Ovandel",     title: "ECCO GRUUV STUDIO",    body: "Handsytt premium läder från ECCOs egna garveri — behandlat för att mjukna och forma sig efter din fot med varje bärning." },
        { _key: "z5", label: "Komplett",          title: "Byggd för att hålla",  body: "Fyra lager, en sko. Varje komponent är designad för att arbeta i harmoni med de andra — resultatet är en sko som förbättras med åren." },
      ],
    },
    heritage: {
      eyebrow: "Vårt Arv",
      heading: "Grundat 1963 av Karl Toosbuy, byggdes ECCO på filosofin att skon måste följa foten.",
      body:    "Från vårt huvudkontor i Bredebro, Danmark, har vi förblivit ett av de få stora skoföretagen i världen som äger och hanterar varje steg i läder- och skotillverkningsprocessen — från garveri till butik. Vårt arv är rotat i tron att sann lyx finns i skärningspunkten mellan traditionellt hantverk och modern materialvetenskap.\n\nHos Pewes Skor i Anderstorp hittar du ett noggrant urval av ECCOs aktuella kollektion — prova gärna flera modeller och känn skillnaden.",
    },
  });
}

// ─── Brand Pages (Gabor / Rieker / Dolomite / Skechers) ──────────────────────

async function seedBrandPages() {
  const pages = [
    {
      _id:   "brandPage-gabor",
      _type: "brandPage",
      name:  "Gabor",
      slug:  { _type: "slug", current: "gabor" },
      products: [
        { _key: "g1", name: "Gabor Rollingsoft Sneaker", price: "1.399 kr", category: "Sneakers", sizes: ["36","37","38","39","40","41","42"], image: { url: "/gabor/sneaker.png",   imageAlt: "Gabor sneaker i ljust naturläder" } },
        { _key: "g2", name: "Gabor Comfort Sandal",      price: "899 kr",   category: "Sandaler", sizes: ["37","38","39","40","41"],          image: { url: "/gabor/sandaler.png", imageAlt: "Gabor sandal i mjukt läder" } },
        { _key: "g3", name: "Gabor Classic Loafer",      price: "1.100 kr", category: "Loafers",  sizes: ["36","37","38","39","40"],          image: { url: "/gabor/loafer.png",   imageAlt: "Gabor loafer i mörkt läder" } },
      ],
      heritage: {
        eyebrow: "Gabors filosofi sedan 1949",
        heading: "En välsittande sko är en välmående fot.",
        body:    "Från sin bas i Rosenheim i Bayern tillverkar Gabor damskor av naturmaterial i kombination med modern teknik. Varje modell genomgår noggranna passformsstudier för att ge en sko som smälter samman med foten — vare sig du väljer sandal, sneaker eller loafer.\n\nHos Pewes Skor i Anderstorp hittar du ett noggrant urval av Gabors säsongsmodeller, utvalda med den svenska damfoten i fokus.",
      },
    },
    {
      _id:   "brandPage-rieker",
      _type: "brandPage",
      name:  "Rieker",
      slug:  { _type: "slug", current: "rieker" },
      products: [
        { _key: "r1", name: "Rieker Antistress Sneaker", price: "899 kr",  category: "Vardag",   sizes: ["36","37","38","39","40","41","42"],    image: { url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800", imageAlt: "Rieker sneaker" } },
        { _key: "r2", name: "Rieker Comfort Loafer",     price: "949 kr",  category: "Dress",    sizes: ["40","41","42","43","44","45","46"],    image: { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800", imageAlt: "Rieker loafer" } },
        { _key: "r3", name: "Rieker Summer Sandal",      price: "799 kr",  category: "Sandaler", sizes: ["36","37","38","39","40","41"],          image: { url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800", imageAlt: "Rieker sandal" } },
      ],
      heritage: {
        eyebrow: "150 År av Komfort",
        heading: "Rieker har under 150 år tillverkat skor som kroppen tackar dig för.",
        body:    "Sedan starten i Tuttlingen 1874 har Rieker levererat skor för det verkliga livet. ANTISTRESS-filosofin bygger på att skon ska vara lätt, flexibel och skonsam mot foten hela dagen — oavsett om du promenerar i city, arbetar på stan eller njuter av en dagsutflykt i naturen.",
      },
    },
    {
      _id:   "brandPage-dolomite",
      _type: "brandPage",
      name:  "Dolomite",
      slug:  { _type: "slug", current: "dolomite" },
      products: [
        { _key: "d1", name: "Dolomite 54 Low FG",    price: "1.799 kr", category: "Lifestyle", sizes: ["36","37","38","39","40","41","42","43","44","45","46"], image: { url: "https://images.unsplash.com/photo-1520639889410-1dfa467409f4?auto=format&fit=crop&q=80&w=800", imageAlt: "Dolomite 54 Low" } },
        { _key: "d2", name: "Dolomite Steinbock WT", price: "2.199 kr", category: "Hiking",    sizes: ["40","41","42","43","44","45"],                         image: { url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800", imageAlt: "Dolomite Steinbock" } },
        { _key: "d3", name: "Dolomite Crodarossa",   price: "1.899 kr", category: "Approach",  sizes: ["38","39","40","41","42"],                              image: { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800", imageAlt: "Dolomite Crodarossa" } },
      ],
      heritage: {
        eyebrow: "Grundat 1897 · Belluno, Italia",
        heading: "Byggd för extrema förhållanden sedan 1897.",
        body:    "Grundat 1897 i Belluno vid foten av Dolomiterna har varumärket alltid stått för italienskt bergshantverk av högsta klass. Varje sko är ett resultat av decennier av erfarenhet i alpint terrängarbete och modern materialteknik.\n\nHos Pewes Skor hittar du ett utvalt sortiment av Dolomites mest uppskattade modeller — från lifestyle till teknisk vandring.",
      },
    },
    {
      _id:   "brandPage-skechers",
      _type: "brandPage",
      name:  "Skechers",
      slug:  { _type: "slug", current: "skechers" },
      products: [
        { _key: "s1", name: "Skechers Arch Fit",   price: "1.299 kr", category: "Walk",   sizes: ["40","41","42","43","44","45","46"], image: { url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800", imageAlt: "Skechers Arch Fit" } },
        { _key: "s2", name: "Skechers Slip-ins",   price: "1.199 kr", category: "Fritid", sizes: ["36","37","38","39","40","41"],       image: { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800", imageAlt: "Skechers Slip-ins" } },
        { _key: "s3", name: "Skechers GoRun Trail", price: "1.449 kr", category: "Sport",  sizes: ["40","41","42","43","44","45"],       image: { url: "https://images.unsplash.com/photo-1520639889410-1dfa467409f4?auto=format&fit=crop&q=80&w=800", imageAlt: "Skechers GoRun Trail" } },
      ],
      heritage: {
        eyebrow: "Sedan 1992 · El Monte, California",
        heading: "Skechers bevisar att komfort och stil kan gå hand i hand — varje dag.",
        body:    "Sedan starten i El Monte, Kalifornien 1992 har Skechers vuxit till ett av världens mest sålda skomärken. Hemligheten är enkel: Air-Cooled Memory Foam som formar sig efter foten, breda passformar och prisvärda modeller för alla livsstilar.",
      },
    },
  ];

  for (const page of pages) {
    await upsert(page);
  }
}

// ─── Shoes Pages ─────────────────────────────────────────────────────────────

async function seedShoesPages() {
  await seedDamPage();
  await seedHerrPage();
  await seedBarnPage();
}

async function seedBarnPage() {
  await upsert({
    _id:   "shoesPage-barn",
    _type: "shoesPage",
    slug:  { _type: "slug", current: "barn" },
    title: "Barn",
    subtitle: "Skor skapade för barnfötter i alla åldrar och aktiviteter. Kvalitet, komfort och hållbarhet — för att barnfötter förtjänar det bästa.",
    products: [
      { _key: "b1", brand: "ECCO",     name: "Urban Mini Boot",          price: "749 kr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYgkuoGad0DOqh9-q2tgcIJa3JzuAEIX5YlzfxL5RaV_ycAWG5fbe199CY8c49gYxu6ZZdtKVqM5xwVYmN0dNQRg7hLtGcXvpPf3agWcw0hJyBRmjZ8KZs7nQX9yFZFknepV9-6nHqxz", imageAlt: "ECCO barnboot" } },
      { _key: "b2", brand: "SKECHERS", name: "S-Lights Twinkle Sparks",  price: "599 kr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtSDPwsNsjld1f5vUL5Js-MNavJlKQbp6il9N98VTwdN4XcXj1QN257LlgwGvuDr1CY0p-ALOXi7fH4FtjV8jxf5n3Sn6zsFWP186smdPp-7eeQf-PSD62Yf69M2JMe43JEHctp84JhUmcE0NGIswxGPHczaQQAHmCtucslPM6njV6LkBwq9xpcsIGutzv3lm9_0oaI8vpkMgBtMhBAlNGjhesFUyjDvfxt5b8Lbc9hksav9KHd3O6CAT8hK1dSEQk-y0vmUKJILI-", imageAlt: "Skechers S-Lights för barn" } },
      { _key: "b3", brand: "ECCO",     name: "Biom Natural Motion",      price: "899 kr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBllu7V4UfIDA__RYIvIvVxNOeVCYM5cuW26DutTwmW7FbL7gpvDiPr7VzkIxabx0C6o6cMrQW_xlu7JtneUVRE6WVcwi_XH_1NwG2GkD87PJ4WyWCVojZKVAeRCNwYzLQKcZzWnTSQ2sTwpEFAPnVy70c0g7GQzdfg2NDgmLwmJvSNSFLHWnuW1wMUYaOwN555SAecS2qH530cav_DMbhXauDuF-5hen-s54YEkKtF3LGr9KysYjc31fKrNb5Jt7zJrnuKZPGm2YHu", imageAlt: "ECCO Biom barn" } },
      { _key: "b4", brand: "RIEKER",   name: "Tex Sneaker Kids",         price: "549 kr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbPjRJBiveiH4Zsdv-tKUajuBJGT-E-c74JHdgWWTKlos4THgBA2_JCOTrns2Jnx-4hiWv514LZKH5_tfOXgM2cOBz_pj-i05-uEfJG7e9izC4_NMkJ-EKGuoVnL_Buz9ZkPjB9D4OuZJoqPfLCER5L016dr2dX6Q9BCu6wtkgUVZdK92W15cxspt1anPaD6GSL_kVUGt605cfkeFNXG38zI66PhhHRed8CurJASvTv8RcHtUhs1tak5iYLmOufUDZIcp_NnQSkMdx", imageAlt: "Rieker barn sneaker" } },
      { _key: "b5", brand: "GABOR",    name: "Lena Lace Junior",         price: "649 kr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk1thIjXgaGZUZykC15MQL5PkQJuyAvSlPfNEIF-A5_7122HbX29C4hcTy7_ecLsHyKH1RO0xE3Upli1fg9PPMOwWDuFm0U3m0Yc3utzxrxJjS5cYJXR7Tr_yeMfQpwuhqnRltRfQJG0wjwerH9h-G0oPaiWX763VekWTTgqi5cNi2u4e-PWKw3po_Tcy1jUXnnZDSf6xZohHIEMrxqDk5gbXfrdMSYdDdPAYBYixLgrc1DtYQyg3cXMW724pVDwPQ-ROQPmGw3ryV", imageAlt: "Gabor skolsko för barn" } },
      { _key: "b6", brand: "SKECHERS", name: "GoRun Fast Valor",         price: "699 kr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK4t0SThE6oVC2AyKt_NGET2Oq2fiPKmxOmev0ZFasMlMfVU7wEfohRq3ljQylyrMw_FvWQP3vIkdf77XJ7c3YkUte9v2T2lf4DaPHCyoQOwJaqMy1sAJprc5d46KEe4cf30PmOkxqLwyCHOM_cLZHVSZwfzPBYUmEYQ7nYPWQ8qRNXBZFHO-6SYrP8lnNRiEJXlfYETanWiEUEsgJ77EhlNL4Yqxm1mHy6MSEClH_6__wXYTtN2rS4cij1dvhGE9KOL2Bq3ONbaii2GQ", imageAlt: "Skechers GoRun för barn" } },
      { _key: "b7", brand: "ECCO",     name: "First Sandal",             price: "499 kr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFAWcfPkJ6h9yAnoCHnZ8mzjeC9S9V4IPWtSfAsegdJJYWqPc9nw6UCiu42nuwaavV7P0ykPLI-a_ZOmTBmWfPk9jJh6G5ckEtU8s_86-j2ahrla63P8C3BOPpiGZ3e0ltFJ_jZXyhnA65RUJGuuLKmGuVslsTTHKbr7GUT8c5ZssTKbfKj1VjRGWqxCoEUdoUMeE-Ou0QHILANAa4rIyL0LST96dpAQ3oaqcCFSe41jQW0kyLO-ARAUWMWJaLhXp0xHhlPS9aCZ", imageAlt: "ECCO sandal för barn" } },
      { _key: "b8", brand: "RIEKER",   name: "Zip Ankle Boot Kids",      price: "649 kr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-vo42JSDbvmi7wDnpWJbpoZzIcj7cVaSfqWolR8ETw_3GoSP6lSfSqYGnVoO0FjYa6dFnBXqtIKkLIdJoLnk9H8NpC9tEP2Ompd8aEsVknV08GvgTrhHf78Pot99cDMwOKtgT_xORv054fJd-wmMdwf1691i0NtzaICL9_lX6-RyRKIQkBQxbbXZ3O4fvz4o0L_pDfyJkrO7TqYGNRm5lE-BXJ8RlVYjSfEhs8mmnqxYRVzmuoL6WxSLtlstg6jq4dF2CHq28jwxt", imageAlt: "Rieker boot för barn" } },
    ],
  });
}

async function seedHerrPage() {
  await upsert({
    _id:   "shoesPage-herr",
    _type: "shoesPage",
    slug:  { _type: "slug", current: "herr" },
    title: "Herr",
    subtitle: "En noggrant utvald kollektion av skor för den moderna mannen. Från tidlösa klassiker till funktionella friluftsskor, alltid med fokus på komfort och hantverk.",
    products: [
      { _key: "h1", brand: "ECCO",     name: "Helsinki 2.0 Oxford",     price: "1.899 kr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBllu7V4UfIDA__RYIvIvVxNOeVCYM5cuW26DutTwmW7FbL7gpvDiPr7VzkIxabx0C6o6cMrQW_xlu7JtneUVRE6WVcwi_XH_1NwG2GkD87PJ4WyWCVojZKVAeRCNwYzLQKcZzWnTSQ2sTwpEFAPnVy70c0g7GQzdfg2NDgmLwmJvSNSFLHWnuW1wMUYaOwN555SAecS2qH530cav_DMbhXauDuF-5hen-s54YEkKtF3LGr9KysYjc31fKrNb5Jt7zJrnuKZPGm2YHu",   imageAlt: "ECCO Oxford i svart skinn" } },
      { _key: "h2", brand: "RIEKER",   name: "Tex Derby B1322",          price: "899 kr",   image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbPjRJBiveiH4Zsdv-tKUajuBJGT-E-c74JHdgWWTKlos4THgBA2_JCOTrns2Jnx-4hiWv514LZKH5_tfOXgM2cOBz_pj-i05-uEfJG7e9izC4_NMkJ-EKGuoVnL_Buz9ZkPjB9D4OuZJoqPfLCER5L016dr2dX6Q9BCu6wtkgUVZdK92W15cxspt1anPaD6GSL_kVUGt605cfkeFNXG38zI66PhhHRed8CurJASvTv8RcHtUhs1tak5iYLmOufUDZIcp_NnQSkMdx",   imageAlt: "Rieker derby i brunt" } },
      { _key: "h3", brand: "DOLOMITE", name: "Cinquantaquattro Low",      price: "1.499 kr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9BFoV4o3O5ua1lY7PdSnL67yKlSovA2xBfU9wxIQ8OBqE1RTNoiWx09TXMxIWS6y6uKHh_s7T6rtnO8CDoz0d21fYf7rv80mnG15VOh513EDkS1h7J6jyRyuRVtHZaNBac8dT0tzeR3HupLOfpYETM5IJkTZh8zaRctbitpMY_mBaYbvBR91Pu_gnuxo-eoSYZ42rk1LSWK4kGgOH2EH3TcqXu4aSi3L6pdP_LGBo108f5oyxhkdCd7QMukgOoe_8zTfO4p9w9RO9", imageAlt: "Dolomite Cinquantaquattro" } },
      { _key: "h4", brand: "ECCO",     name: "Street Lite Retro M",      price: "1.199 kr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK4t0SThE6oVC2AyKt_NGET2Oq2fiPKmxOmev0ZFasMlMfVU7wEfohRq3ljQylyrMw_FvWQP3vIkdf77XJ7c3YkUte9v2T2lf4DaPHCyoQOwJaqMy1sAJprc5d46KEe4cf30PmOkxqLwyCHOM_cLZHVSZwfzPBYUmEYQ7nYPWQ8qRNXBZFHO-6SYrP8lnNRiEJXlfYETanWiEUEsgJ77EhlNL4Yqxm1mHy6MSEClH_6__wXYTtN2rS4cij1dvhGE9KOL2Bq3ONbaii2GQ", imageAlt: "ECCO Street Lite sneakers" } },
      { _key: "h5", brand: "SKECHERS", name: "Relaxed Fit Elected",       price: "949 kr",   image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtSDPwsNsjld1f5vUL5Js-MNavJlKQbp6il9N98VTwdN4XcXj1QN257LlgwGvuDr1CY0p-ALOXi7fH4FtjV8jxf5n3Sn6zsFWP186smdPp-7eeQf-PSD62Yf69M2JMe43JEHctp84JhUmcE0NGIswxGPHczaQQAHmCtucslPM6njV6LkBwq9xpcsIGutzv3lm9_0oaI8vpkMgBtMhBAlNGjhesFUyjDvfxt5b8Lbc9hksav9KHd3O6CAT8hK1dSEQk-y0vmUKJILI-", imageAlt: "Skechers Relaxed Fit i grå" } },
      { _key: "h6", brand: "RIEKER",   name: "Comfort Suede Boot",        price: "1.099 kr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-vo42JSDbvmi7wDnpWJbpoZzIcj7cVaSfqWolR8ETw_3GoSP6lSfSqYGnVoO0FjYa6dFnBXqtIKkLIdJoLnk9H8NpC9tEP2Ompd8aEsVknV08GvgTrhHf78Pot99cDMwOKtgT_xORv054fJd-wmMdwf1691i0NtzaICL9_lX6-RyRKIQkBQxbbXZ3O4fvz4o0L_pDfyJkrO7TqYGNRm5lE-BXJ8RlVYjSfEhs8mmnqxYRVzmuoL6WxSLtlstg6jq4dF2CHq28jwxt",  imageAlt: "Rieker suede boots" } },
      { _key: "h7", brand: "ECCO",     name: "Soft 7 Tred GTX",          price: "1.599 kr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk1thIjXgaGZUZykC15MQL5PkQJuyAvSlPfNEIF-A5_7122HbX29C4hcTy7_ecLsHyKH1RO0xE3Upli1fg9PPMOwWDuFm0U3m0Yc3utzxrxJjS5cYJXR7Tr_yeMfQpwuhqnRltRfQJG0wjwerH9h-G0oPaiWX763VekWTTgqi5cNi2u4e-PWKw3po_Tcy1jUXnnZDSf6xZohHIEMrxqDk5gbXfrdMSYdDdPAYBYixLgrc1DtYQyg3cXMW724pVDwPQ-ROQPmGw3ryV", imageAlt: "ECCO GTX sneaker" } },
      { _key: "h8", brand: "DOLOMITE", name: "Torq Tech Hiker",           price: "1.749 kr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXWueTO72_4Vp8RNvWcEfrTNnIFpWBC6HJqhn234wOMAUoPPThRvKtqwH_NJyEzG1Bh_aT-aTnui-00yK5BEkaiBe4aSEzSpkjFAb84rCHg0_h_kUJprc5d46KEe4cf30PmOkxqLwyCHOM_cLZHVSZwfzPBYUmEYQ7nYPWQ8qRNXBZFHO-6SYrP8lnNRiEJXlfYETanWiEUEsgJ77EhlNL4Yqxm1mHy6MSEClH_6__wXYTtN2rS4cij1dvhGE9KOL2Bq3ONbaii2GQ", imageAlt: "Dolomite hiking boot" } },
    ],
  });
}

async function seedDamPage() {
  await upsert({
    _id:   "shoesPage-dam",
    _type: "shoesPage",
    slug:  { _type: "slug", current: "dam" },
    title: "Dam",
    subtitle: "En noggrant utvald kollektion av skor för den moderna kvinnan. Från tidlösa klassiker till nutida design, utvald med fokus på hantverk och komfort.",
    products: [
      { _key: "d1", brand: "ECCO",     name: "Sculptured 45 Boot",       price: "1.299 kr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBllu7V4UfIDA__RYIvIvVxNOeVCYM5cuW26DutTwmW7FbL7gpvDiPr7VzkIxabx0C6o6cMrQW_xlu7JtneUVRE6WVcwi_XH_1NwG2GkD87PJ4WyWCVojZKVAeRCNwYzLQKcZzWnTSQ2sTwpEFAPnVy70c0g7GQzdfg2NDgmLwmJvSNSFLHWnuW1wMUYaOwN555SAecS2qH530cav_DMbhXauDuF-5hen-s54YEkKtF3LGr9KysYjc31fKrNb5Jt7zJrnuKZPGm2YHu", imageAlt: "ECCO Sculptured 45 Boot" } },
      { _key: "d2", brand: "RIEKER",   name: "Modern Flow Sneaker",       price: "899 kr",   image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbPjRJBiveiH4Zsdv-tKUajuBJGT-E-c74JHdgWWTKlos4THgBA2_JCOTrns2Jnx-4hiWv514LZKH5_tfOXgM2cOBz_pj-i05-uEfJG7e9izC4_NMkJ-EKGuoVnL_Buz9ZkPjB9D4OuZJoqPfLCER5L016dr2dX6Q9BCu6wtkgUVZdK92W15cxspt1anPaD6GSL_kVUGt605cfkeFNXG38zI66PhhHRed8CurJASvTv8RcHtUhs1tak5iYLmOufUDZIcp_NnQSkMdx", imageAlt: "Rieker Modern Flow Sneaker" } },
      { _key: "d3", brand: "GABOR",    name: "Posh Leather Loafer",       price: "1.100 kr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk1thIjXgaGZUZykC15MQL5PkQJuyAvSlPfNEIF-A5_7122HbX29C4hcTy7_ecLsHyKH1RO0xE3Upli1fg9PPMOwWDuFm0U3m0Yc3utzxrxJjS5cYJXR7Tr_yeMfQpwuhqnRltRfQJG0wjwerH9h-G0oPaiWX763VekWTTgqi5cNi2u4e-PWKw3po_Tcy1jUXnnZDSf6xZohHIEMrxqDk5gbXfrdMSYdDdPAYBYixLgrc1DtYQyg3cXMW724pVDwPQ-ROQPmGw3ryV", imageAlt: "Gabor Posh Leather Loafer" } },
      { _key: "d4", brand: "SKECHERS", name: "GoWalk Arch Fit",           price: "949 kr",   image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtSDPwsNsjld1f5vUL5Js-MNavJlKQbp6il9N98VTwdN4XcXj1QN257LlgwGvuDr1CY0p-ALOXi7fH4FtjV8jxf5n3Sn6zsFWP186smdPp-7eeQf-PSD62Yf69M2JMe43JEHctp84JhUmcE0NGIswxGPHczaQQAHmCtucslPM6njV6LkBwq9xpcsIGutzv3lm9_0oaI8vpkMgBtMhBAlNGjhesFUyjDvfxt5b8Lbc9hksav9KHd3O6CAT8hK1dSEQk-y0vmUKJILI-", imageAlt: "Skechers GoWalk Arch Fit" } },
      { _key: "d5", brand: "ECCO",     name: "Street Lite Retro",         price: "1.099 kr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK4t0SThE6oVC2AyKt_NGET2Oq2fiPKmxOmev0ZFasMlMfVU7wEfohRq3ljQylyrMw_FvWQP3vIkdf77XJ7c3YkUte9v2T2lf4DaPHCyoQOwJaqMy1sAJprc5d46KEe4cf30PmOkxqLwyCHOM_cLZHVSZwfzPBYUmEYQ7nYPWQ8qRNXBZFHO-6SYrP8lnNRiEJXlfYETanWiEUEsgJ77EhlNL4Yqxm1mHy6MSEClH_6__wXYTtN2rS4cij1dvhGE9KOL2Bq3ONbaii2GQ", imageAlt: "ECCO Street Lite Retro" } },
      { _key: "d6", brand: "DOLOMITE", name: "Cinquantaquattro Low",       price: "1.499 kr", image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9BFoV4o3O5ua1lY7PdSnL67yKlSovA2xBfU9wxIQ8OBqE1RTNoiWx09TXMxIWS6y6uKHh_s7T6rtnO8CDoz0d21fYf7rv80mnG15VOh513EDkS1h7J6jyRyuRVtHZaNBac8dT0tzeR3HupLOfpYETM5IJkTZh8zaRctbitpMY_mBaYbvBR91Pu_gnuxo-eoSYZ42rk1LSWK4kGgOH2EH3TcqXu4aSi3L6pdP_LGBo108f5oyxhkdCd7QMukgOoe_8zTfO4p9w9RO9", imageAlt: "Dolomite Cinquantaquattro Low" } },
      { _key: "d7", brand: "GABOR",    name: "Sunset Strap Sandal",       price: "799 kr",   image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk1thIjXgaGZUZykC15MQL5PkQJuyAvSlPfNEIF-A5_7122HbX29C4hcTy7_ecLsHyKH1RO0xE3Upli1fg9PPMOwWDuFm0U3m0Yc3utzxrxJjS5cYJXR7Tr_yeMfQpwuhqnRltRfQJG0wjwerH9h-G0oPaiWX763VekWTTgqi5cNi2u4e-PWKw3po_Tcy1jUXnnZDSf6xZohHIEMrxqDk5gbXfrdMSYdDdPAYBYixLgrc1DtYQyg3cXMW724pVDwPQ-ROQPmGw3ryV", imageAlt: "Gabor Sunset Strap Sandal" } },
      { _key: "d8", brand: "RIEKER",   name: "Comfort Suede",             price: "849 kr",   image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-vo42JSDbvmi7wDnpWJbpoZzIcj7cVaSfqWolR8ETw_3GoSP6lSfSqYGnVoO0FjYa6dFnBXqtIKkLIdJoLnk9H8NpC9tEP2Ompd8aEsVknV08GvgTrhHf78Pot99cDMwOKtgT_xORv054fJd-wmMdwf1691i0NtzaICL9_lX6-RyRKIQkBQxbbXZ3O4fvz4o0L_pDfyJkrO7TqYGNRm5lE-BXJ8RlVYjSfEhs8mmnqxYRVzmuoL6WxSLtlstg6jq4dF2CHq28jwxt", imageAlt: "Rieker Comfort Suede" } },
    ],
  });
}

// ─── Shoe Care Page ───────────────────────────────────────────────────────────

async function seedShoeCarePage() {
  await upsert({
    _id:   "shoeCarePage",
    _type: "shoeCarePage",
    pageTitle:    "Skovårdsguide",
    pageSubtitle: "Välskötta skor håller längre och ser bättre ut. Här hittar du våra bästa råd för varje typ av material.",
    materials: [
      {
        _key: "m1", materialKey: "lader", title: "Läder",
        intro: "Äkta läder är ett naturmaterial som kräver regelbunden vård för att behålla sin form, lyster och hållbarhet. Med rätt rutiner kan ett par läderskor hålla i decennier.",
        steps: [
          { _key: "s1", stepTitle: "Rengör regelbundet",  body: "Borsta bort smuts och damm med en mjuk borste efter varje bärning. Använd en fuktig trasa med lite neutral tvål för envisare smuts. Torka aldrig med varmt vatten." },
          { _key: "s2", stepTitle: "Ge näring och fukt",  body: "Applicera ett läderbalm eller skokräm var 4–6 vecka för att återfukta läderfibrerna och förhindra sprickor. Välj en produkt som matchar skodonets färg." },
          { _key: "s3", stepTitle: "Impregnera",          body: "Spraya med ett vattenavstötande läder-impregnering efter rengöring och innan konditionering. Håll på 20 cm avstånd, låt torka i 15 minuter." },
          { _key: "s4", stepTitle: "Använd skoblock",     body: "Sätt in skoblock av cederträ direkt när du tar av dig skorna. Cedern absorberar fukt och svett, motverkar lukt och hjälper skorna att behålla sin form." },
          { _key: "s5", stepTitle: "Torka rätt",          body: "Om skorna blivit blöta: stoppa in tidningspapper och låt torka i rumstemperatur i minst 24 timmar. Placera aldrig nära element eller i direkt solljus." },
        ],
        proTip: "Rotera ditt skoinnehav. Bär inte samma par två dagar i rad — läder mår bra av att vila minst ett dygn för att luftas ut och återhämta sin form.",
      },
      {
        _key: "m2", materialKey: "nubuck", title: "Nubuck & Mocka",
        intro: "Nubuck och mocka ger ett sofistikerat, matt utseende men är känsligare för fukt och smuts än blankt läder. Med rätt verktyg och rutin bevarar du ytan länge.",
        steps: [
          { _key: "s1", stepTitle: "Daglig borstning",           body: "Borsta nubuck och mocka med en mjuk suede-borste efter varje bärning, alltid längs fiberns riktning." },
          { _key: "s2", stepTitle: "Behandla fläckar genast",    body: "Använd ett suede-suddgummi på torrsmuts och ljusare fläckar. Gnid försiktigt och borsta sedan bort rester." },
          { _key: "s3", stepTitle: "Impregnera före bärning",    body: "Spraya med suede/nubuck-impregnering innan första bärningen och sedan var 4–6 vecka." },
          { _key: "s4", stepTitle: "Återuppliva nedtryckta ytor", body: "Håll skorna i 5–10 sekunder över ångande vatten (försiktigt) och borsta sedan upp fibrerna med en torr suede-borste." },
        ],
        proTip: "Undvik nubuck och mocka vid regn och snö. Om skorna ändå blir blöta: borsta av överskottsvatten direkt och låt torka i rumstemperatur — aldrig nära värme.",
      },
      {
        _key: "m3", materialKey: "textil", title: "Textil",
        intro: "Textilskor — löparskor, sneakers och tygbaserade modeller — är ofta lätta och andningsbara men behöver rätt hantering för att behålla form och funktion.",
        steps: [
          { _key: "s1", stepTitle: "Daglig rengöring", body: "Torka av ytan med en mjuk borste eller fuktig trasa och lite mild handtvål. Undvik att blöta hela skons insida." },
          { _key: "s2", stepTitle: "Maskintvättning",  body: "Många textilskor tål maskintvättning i 30 °C i en tvättpåse. Ta ut innersulorna separat och ta av skosnörena." },
          { _key: "s3", stepTitle: "Torka korrekt",    body: "Stoppa in tidningspapper och lufttorka i rumstemperatur. Aldrig i torktumlare — värmen krymper och deformerar materialet." },
          { _key: "s4", stepTitle: "Impregnera",       body: "Spraya med textilimpregnering efter varje tvättning. Det skyddar mot fukt och minskar mängden smuts som fastnar." },
        ],
        proTip: "Byt skosnören och innersulor regelbundet. Nya sulor och rena snören fräschar upp utseendet dramatiskt utan att du behöver köpa ett nytt par.",
      },
      {
        _key: "m4", materialKey: "vandring", title: "Vandring",
        intro: "Vandringsskor utsätts för tuffa förhållanden — grus, lera, fukt och temperaturväxlingar. Regelbunden service förlänger livslängden och bibehåller viktiga funktioner.",
        steps: [
          { _key: "s1", stepTitle: "Rengör efter varje tur",      body: "Spola bort grov smuts med kallt vatten och en styvare borste direkt efter turen. Rengör sulorna noga." },
          { _key: "s2", stepTitle: "Torka korrekt",               body: "Lossa snöringen och ta ut innersulorna. Fyll med tidningspapper och ställ i rumstemperatur." },
          { _key: "s3", stepTitle: "Vax och impregnera",          body: "Påför lämpligt skyddsmedel utifrån materialet: vax för glattläder, spray för Gore-Tex och textilöverdelar." },
          { _key: "s4", stepTitle: "Kontrollera sula och sömmar", body: "Kontrollera regelbundet om sulan har skador eller börjat lossna. En del-lossnad sula bör lagas omedelbart." },
          { _key: "s5", stepTitle: "Förvara rätt",                body: "Förvara i en torr, sval och mörk plats. Undvik plastpåsar som skapar kondens." },
        ],
        proTip: "Reaktivera DWR-skyddet efter varje tvättning. Vatten ska fortfarande pärla på ytmaterialet. Om vatten börjar tränga in istället är det dags att impregnera igen.",
      },
      {
        _key: "m5", materialKey: "syntet", title: "Syntet",
        intro: "Syntetiska material — PU-läder, mikrofiber och vattenavvisande ytmaterial — är lättskött men inte underhållsfritt. Rätt behandling bevarar både utseende och funktion.",
        steps: [
          { _key: "s1", stepTitle: "Rengör med mild tvål",     body: "Blanda lite diskmedel i ljummet vatten. Skrubba försiktigt med en mjuk borste. Skölj med en ren fuktig trasa." },
          { _key: "s2", stepTitle: "Torka i rumstemperatur",   body: "Syntetmaterial tål inte hög värme — torka alltid i rumstemperatur. Direkt sol bleker och gör materialet sprött." },
          { _key: "s3", stepTitle: "Behåll formen",            body: "Stoppa in tidningspapper under torkning för att bevara formen. Syntetmaterial kan deformeras om de torkar ihopvikta." },
          { _key: "s4", stepTitle: "Impregnera",               body: "Applicera universalimpregnering och reaktivera med en hårtork på lägsta värme — värmen aktiverar de vattenavstötande ämnena." },
        ],
        proTip: "Undvik organiska lösningsmedel som aceton eller sprit — dessa löser upp limmet och kan missfärga syntetmaterial permanent. Håll dig till vatten och mild tvål.",
      },
    ],
  });
}

// ─── Nyheter Posts ────────────────────────────────────────────────────────────

async function seedNyheterPosts() {
  const posts = [
    {
      _id:   "nyhetPost-sommar-2026",
      _type: "nyhetPost",
      title: "Sommarens nyheter 2026",
      slug:  { _type: "slug", current: "sommarens-nyheter-2026" },
      publishedAt: "2026-04-01T10:00:00.000Z",
      season:  "Sommar 2026",
      excerpt: "Solen lockar fram de ljusaste skorna. Utforska vår nysläppta sommarkollektion — från luftiga sandaler till färgglada sneakers och tidlösa loafers för de varmaste dagarna.",
      coverImage: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFAWcfPkJ6h9yAnoCHnZ8mzjeC9S9V4IPWtSfAsegdJJYWqPc9nw6UCiu42nuwaavV7P0ykPLI-a_ZOmTBmWfPk9jJh6G5ckEtU8s_86-j2ahrla63P8C3BOPpiGZ3e0ltFJ_jZXyhnA65RUJGuuLKmGuVslsTTHKbr7GUT8c5ZssTKbfKj1VjRGWqxCoEUdoUMeE-Ou0QHILANAa4rIyL0LST96dpAQ3oaqcCFSe41jQW0kyLO-ARAUWMWJaLhXp0xHhlPS9aCZ", alt: "Sommarens skokollektion 2026" },
      editorial: {
        heading: "Välkommen till Sommarens Nyheter 2026",
        body:    "Det är dags att byta ut vinterstövlarna mot något som andas med de varma dagarna. Den här säsongen har vi handplockat ett urval av skor som kombinerar stil och komfort för alla sommarens tillfällen.\n\nVi har hämtat hem nya modeller från ECCO, Rieker, Gabor och Skechers med fokus på lättviktiga konstruktioner, öppna designs och material som andas. Låt sommaren börja.",
      },
      products: [
        { _key: "p1", brand: "ECCO",     name: "Cozmo Sandal",        description: "Mjukt nappaskinn med ergonomisk fotbädd och justerbar kardborrstängning. Perfekt för långa sommardagar.", price: "999 kr" },
        { _key: "p2", brand: "GABOR",    name: "Sunset Strap",        description: "Elegant sandalett i glansläder med spänne. Liten klack ger lyft utan att ge avkall på komforten.",        price: "799 kr" },
        { _key: "p3", brand: "SKECHERS", name: "Go Walk Arch Lite",   description: "Ultralätt sommar-sneaker med ULTRA GO-dämpning och Arch Fit-innersula.",                                  price: "849 kr" },
        { _key: "p4", brand: "RIEKER",   name: "Breeze Mule",         description: "Öppen läder-mule med antiperspirant-behandlad innersula och flexibel mellansulsteknik.",                  price: "699 kr" },
      ],
    },
    {
      _id:   "nyhetPost-var-2026",
      _type: "nyhetPost",
      title: "Vårens kollektioner 2026",
      slug:  { _type: "slug", current: "varens-kollektioner-2026" },
      publishedAt: "2026-02-15T10:00:00.000Z",
      season:  "Vår 2026",
      excerpt: "Vårens kollektion är här — med mjuka pasteller, klassiska läderloafers och lättviktiga sneakers för de första varma dagarna.",
      coverImage: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk1thIjXgaGZUZykC15MQL5PkQJuyAvSlPfNEIF-A5_7122HbX29C4hcTy7_ecLsHyKH1RO0xE3Upli1fg9PPMOwWDuFm0U3m0Yc3utzxrxJjS5cYJXR7Tr_yeMfQpwuhqnRltRfQJG0wjwerH9h-G0oPaiWX763VekWTTgqi5cNi2u4e-PWKw3po_Tcy1jUXnnZDSf6xZohHIEMrxqDk5gbXfrdMSYdDdPAYBYixLgrc1DtYQyg3cXMW724pVDwPQ-ROQPmGw3ryV", alt: "Vårens skokollektion 2026" },
      editorial: {
        heading: "Vårens kollektion 2026",
        body:    "När snön börjar smälta lyfts också garderoben. Vårkollektionen 2026 är byggd kring mjuka pasteller, jordnära toner och material som passar den svenska övergångsperioden.\n\nLoafern står i centrum i år. Vi har tagit in Gabors nya pennyloafer i tre färger, ECCOs klassiker i mörkbrunt kalvläder och Riekers lättviktsmodell. Gemensamt: de är gjorda för att bäras utan strumpor när det blir varmare.",
      },
      products: [
        { _key: "p1", brand: "GABOR",  name: "Spring Penny Loafer", description: "Ny pennyloafer i mjukt kalvläder, tillgänglig i tre färger. Formad innersula för heldag-komfort.", price: "1.099 kr" },
        { _key: "p2", brand: "ECCO",   name: "Classic Loafer",      description: "Tidlös klassiker i mörkbrunt kalvläder med ECCOs COMFORT FIBRE innersula.",                         price: "1.299 kr" },
        { _key: "p3", brand: "RIEKER", name: "Spring Lace",         description: "Lättviktig sneaker med elastisk krage och reflexdetaljer. Perfekt för vårvädrets oregelbundna dagar.", price: "799 kr" },
      ],
    },
  ];

  for (const post of posts) {
    await upsert(post);
  }
}

async function seed() {
  await seedHomePage();
  await seedEccoBrandPage();
  await seedBrandPages();
  await seedShoesPages();
  await seedShoeCarePage();
  await seedNyheterPosts();
  console.log("\nDone seeding all documents.");
}

seed().catch((err) => { console.error(err); process.exit(1); });
