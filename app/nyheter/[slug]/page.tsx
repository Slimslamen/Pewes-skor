import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/HeaderServer";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/blocks/ProductGrid";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { nyhetPostQuery, nyheterSlugsQuery } from "@/sanity/lib/queries";
import { generatePageMetadata, buildArticleSchema, siteConfig } from "@/lib/seo";

// ── Static params for pre-rendering known slugs ──────────────────────────────
export async function generateStaticParams() {
  try {
    const slugs: Array<{ slug: string }> = await client.fetch(nyheterSlugsQuery);
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

// ── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await sanityFetch({
    query: nyhetPostQuery,
    params: { slug },
  });

  if (!post) {
    return generatePageMetadata({ title: "Nyhet hittades inte", path: `/nyheter/${slug}` });
  }

  return generatePageMetadata({
    title:       post.title,
    description: post.excerpt ?? undefined,
    path:        `/nyheter/${slug}`,
    imageUrl:    post.coverImage?.url ?? undefined,
    ogType:      "article",
  });
}

// ── Fallback post (Sommarens nyheter 2026) ───────────────────────────────────

const SUMMER_FALLBACK = {
  title:       "Sommarens nyheter 2026",
  slug:        "sommarens-nyheter-2026",
  publishedAt: "2026-04-01T10:00:00Z",
  season:      "Sommar 2026",
  excerpt:
    "Solen lockar fram de ljusaste skorna. Utforska vår nysläppta sommarkollektion — från luftiga sandaler till färgglada sneakers och tidlösa loafers för de varmaste dagarna.",
  coverImage: {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFAWcfPkJ6h9yAnoCHnZ8mzjeC9S9V4IPWtSfAsegdJJYWqPc9nw6UCiu42nuwaavV7P0ykPLI-a_ZOmTBmWfPk9jJh6G5ckEtU8s_86-j2ahrla63P8C3BOPpiGZ3e0ltFJ_jZXyhnA65RUJGuuLKmGuVslsTTHKbr7GUT8c5ZssTKbfKj1VjRGWqxCoEUdoUMeE-Ou0QHILANAa4rIyL0LST96dpAQ3oaqcCFSe41jQW0kyLO-ARAUWMWJaLhXp0xHhlPS9aCZ",
    alt: "Sommarens skokollektion 2026",
  },
  editorial: {
    heading: "Välkommen till Sommarens Nyheter 2026",
    body:
      "Det är dags att byta ut vinterstövlarna mot något som andas med de varma dagarna. Den här säsongen har vi handplockat ett urval av skor som kombinerar stil och komfort för alla sommarens tillfällen — från strandpromenaden till middagen på uteserveringen.\n\nVi har hämtat hem nya modeller från ECCO, Rieker, Gabor och Skechers med fokus på lättviktiga konstruktioner, öppna designs och material som andas. Låt sommaren börja.",
  },
  products: [
    {
      brand:       "ECCO",
      name:        "Cozmo Sandal",
      description: "Mjukt nappaskinn med ergonomisk fotbädd och justerbar kardborrstängning. Perfekt för långa sommardagar.",
      price:       "999 kr",
      image: {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFAWcfPkJ6h9yAnoCHnZ8mzjeC9S9V4IPWtSfAsegdJJYWqPc9nw6UCiu42nuwaavV7P0ykPLI-a_ZOmTBmWfPk9jJh6G5ckEtU8s_86-j2ahrla63P8C3BOPpiGZ3e0ltFJ_jZXyhnA65RUJGuuLKmGuVslsTTHKbr7GUT8c5ZssTKbfKj1VjRGWqxCoEUdoUMeE-Ou0QHILANAa4rIyL0LST96dpAQ3oaqcCFSe41jQW0kyLO-ARAUWMWJaLhXp0xHhlPS9aCZ",
        alt: "ECCO Cozmo Sandal",
      },
    },
    {
      brand:       "GABOR",
      name:        "Sunset Strap",
      description: "Elegant sandalett i glansläder med spänne. Liten klack ger lyft utan att ge avkall på komforten.",
      price:       "799 kr",
      image: {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk1thIjXgaGZUZykC15MQL5PkQJuyAvSlPfNEIF-A5_7122HbX29C4hcTy7_ecLsHyKH1RO0xE3Upli1fg9PPMOwWDuFm0U3m0Yc3utzxrxJjS5cYJXR7Tr_yeMfQpwuhqnRltRfQJG0wjwerH9h-G0oPaiWX763VekWTTgqi5cNi2u4e-PWKw3po_Tcy1jUXnnZDSf6xZohHIEMrxqDk5gbXfrdMSYdDdPAYBYixLgrc1DtYQyg3cXMW724pVDwPQ-ROQPmGw3ryV",
        alt: "Gabor Sunset Strap",
      },
    },
    {
      brand:       "SKECHERS",
      name:        "Go Walk Arch Lite",
      description: "Ultralätt sommar-sneaker med ULTRA GO-dämpning och Arch Fit-innersula. Tål varma dagar.",
      price:       "849 kr",
      image: {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtSDPwsNsjld1f5vUL5Js-MNavJlKQbp6il9N98VTwdN4XcXj1QN257LlgwGvuDr1CY0p-ALOXi7fH4FtjV8jxf5n3Sn6zsFWP186smdPp-7eeQf-PSD62Yf69M2JMe43JEHctp84JhUmcE0NGIswxGPHczaQQAHmCtucslPM6njV6LkBwq9xpcsIGutzv3lm9_0oaI8vpkMgBtMhBAlNGjhesFUyjDvfxt5b8Lbc9hksav9KHd3O6CAT8hK1dSEQk-y0vmUKJILI-",
        alt: "Skechers Go Walk Arch Lite",
      },
    },
    {
      brand:       "RIEKER",
      name:        "Breeze Mule",
      description: "Öppen läder-mule med antiperspirant-behandlad innersulas och flexibel mellansulsteknik.",
      price:       "699 kr",
      image: {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbPjRJBiveiH4Zsdv-tKUajuBJGT-E-c74JHdgWWTKlos4THgBA2_JCOTrns2Jnx-4hiWv514LZKH5_tfOXgM2cOBz_pj-i05-uEfJG7e9izC4_NMkJ-EKGuoVnL_Buz9ZkPjB9D4OuZJoqPfLCER5L016dr2dX6Q9BCu6wtkgUVZdK92W15cxspt1anPaD6GSL_kVUGt605cfkeFNXG38zI66PhhHRed8CurJASvTv8RcHtUhs1tak5iYLmOufUDZIcp_NnQSkMdx",
        alt: "Rieker Breeze Mule",
      },
    },
    {
      brand:       "ECCO",
      name:        "Flowt LX Sandal",
      description: "Minimalistisk sandal med ett band av mjukt nappa. Ergonomisk fotbädd i ett enda formgjutet stycke.",
      price:       "1.099 kr",
      image: {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBllu7V4UfIDA__RYIvIvVxNOeVCYM5cuW26DutTwmW7FbL7gpvDiPr7VzkIxabx0C6o6cMrQW_xlu7JtneUVRE6WVcwi_XH_1NwG2GkD87PJ4WyWCVojZKVAeRCNwYzLQKcZzWnTSQ2sTwpEFAPnVy70c0g7GQzdfg2NDgmLwmJvSNSFLHWnuW1wMUYaOwN555SAecS2qH530cav_DMbhXauDuF-5hen-s54YEkKtF3LGr9KysYjc31fKrNb5Jt7zJrnuKZPGm2YHu",
        alt: "ECCO Flowt LX Sandal",
      },
    },
    {
      brand:       "GABOR",
      name:        "Daydream Wedge",
      description: "Korgvävd wedge-sandal med fotled-band och mjuk mocka-foder. Ger extra höjd med stabil känsla.",
      price:       "949 kr",
      image: {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK4t0SThE6oVC2AyKt_NGET2Oq2fiPKmxOmev0ZFasMlMfVU7wEfohRq3ljQylyrMw_FvWQP3vIkdf77XJ7c3YkUte9v2T2lf4DaPHCyoQOwJaqMy1sAJprc5d46KEe4cf30PmOkxqLwyCHOM_cLZHVSZwfzPBYUmEYQ7nYPWQ8qRNXBZFHO-6SYrP8lnNRiEJXlfYETanWiEUEsgJ77EhlNL4Yqxm1mHy6MSEClH_6__wXYTtN2rS4cij1dvhGE9KOL2Bq3ONbaii2GQ",
        alt: "Gabor Daydream Wedge",
      },
    },
  ],
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("sv-SE", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  });
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function NyhetPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: cmsPost } = await sanityFetch({
    query:  nyhetPostQuery,
    params: { slug },
  });

  // If not in Sanity and not the seeded fallback slug, 404
  const post = cmsPost ?? (slug === SUMMER_FALLBACK.slug ? SUMMER_FALLBACK : null);
  if (!post) notFound();

  const articleSchema = buildArticleSchema({
    title:       post.title,
    description: post.excerpt ?? "",
    url:         `${siteConfig.url}/nyheter/${slug}`,
    publishedAt: post.publishedAt,
    imageUrl:    post.coverImage?.url ?? undefined,
  });

  return (
    <>
      <Header />
      <JsonLd data={articleSchema as Record<string, unknown>} />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Hem",     path: "/" },
          { name: "Nyheter", path: "/nyheter" },
          { name: post.title, path: `/nyheter/${slug}` },
        ]}
      />

      <main className="pt-20 pb-24 bg-surface min-h-screen">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="relative h-[560px] md:h-[640px] overflow-hidden bg-surface-container mb-20">
          {post.coverImage?.url && (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt ?? post.title}
              fill
              priority
              className="object-cover brightness-70"
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 md:px-12 max-w-screen-2xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-6 text-[10px] uppercase tracking-widest text-white/50">
              <Link href="/" className="hover:text-white/80 transition-colors">Hem</Link>
              <span>›</span>
              <Link href="/nyheter" className="hover:text-white/80 transition-colors">Nyheter</Link>
              <span>›</span>
              <span className="text-white/80">{post.season}</span>
            </nav>

            <div className="inline-block bg-primary text-white px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-widest mb-4">
              {post.season}
            </div>
            <h1 className="font-(family-name:--font-manrope) text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tighter leading-none mb-4 max-w-3xl">
              {post.title}
            </h1>
            {post.publishedAt && (
              <p className="text-white/50 text-sm font-(family-name:--font-inter)">
                {formatDate(post.publishedAt)}
              </p>
            )}
          </div>
        </section>

        <div className="max-w-screen-2xl mx-auto px-6">

          {/* ── Excerpt / lead ─────────────────────────────────── */}
          {post.excerpt && (
            <p className="text-secondary font-light text-xl leading-relaxed max-w-3xl mb-20">
              {post.excerpt}
            </p>
          )}

          {/* ── Editorial ──────────────────────────────────────── */}
          {post.editorial?.heading && (
            <section className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 mb-24 pb-24 border-b border-outline-variant/20">
              <div>
                <h2 className="font-(family-name:--font-manrope) text-3xl font-bold tracking-tight text-on-surface leading-tight sticky top-28">
                  {post.editorial.heading}
                </h2>
              </div>
              <div className="space-y-5">
                {(post.editorial.body ?? "").split("\n").filter(Boolean).map((para: string, i: number) => (
                  <p key={i} className="text-secondary font-light text-lg leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* ── Products ───────────────────────────────────────── */}
          {post.products?.length > 0 && (
            <section>
              <div className="mb-12">
                <span className="font-(family-name:--font-inter) text-xs uppercase tracking-[0.2em] text-primary font-bold">
                  Säsongens urval
                </span>
                <h2 className="font-(family-name:--font-manrope) text-4xl font-bold tracking-tighter text-on-surface mt-2">
                  Kollektionens produkter
                </h2>
              </div>
              <ProductGrid products={post.products} />
            </section>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
