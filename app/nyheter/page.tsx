import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { sanityFetch } from "@/sanity/lib/live";
import { nyheterIndexQuery } from "@/sanity/lib/queries";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Nyheter",
  description:
    "Utforska Pewes Skors senaste kollektioner och säsongens nyheter. Handplockade skor för dam, herr och barn från Anderstorp.",
  path:        "/nyheter",
});

// ── Fallback (displayed before any Sanity documents exist) ───────────────────

interface NyhetCard {
  title:       string;
  slug:        string;
  publishedAt: string;
  season:      string;
  excerpt:     string;
  coverImage?: { url?: string; alt?: string } | null;
}

const FALLBACK_POSTS: NyhetCard[] = [
  {
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
  },
  {
    title:       "Vårens kollektioner 2026",
    slug:        "varens-kollektioner-2026",
    publishedAt: "2026-02-15T10:00:00Z",
    season:      "Vår 2026",
    excerpt:
      "Vårens kollektion är här — med mjuka pasteller, klassiska läderloafers och lättviktiga sneakers för de första varma dagarna.",
    coverImage: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk1thIjXgaGZUZykC15MQL5PkQJuyAvSlPfNEIF-A5_7122HbX29C4hcTy7_ecLsHyKH1RO0xE3Upli1fg9PPMOwWDuFm0U3m0Yc3utzxrxJjS5cYJXR7Tr_yeMfQpwuhqnRltRfQJG0wjwerH9h-G0oPaiWX763VekWTTgqi5cNi2u4e-PWKw3po_Tcy1jUXnnZDSf6xZohHIEMrxqDk5gbXfrdMSYdDdPAYBYixLgrc1DtYQyg3cXMW724pVDwPQ-ROQPmGw3ryV",
      alt: "Vårens skokollektion 2026",
    },
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("sv-SE", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  });
}

export default async function NyheterPage() {
  const { data: posts } = await sanityFetch({ query: nyheterIndexQuery });
  const items = (posts?.length ? posts : FALLBACK_POSTS) as NyhetCard[];
  const [featured, ...rest] = items;

  return (
    <>
      <Header />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Hem",     path: "/" },
          { name: "Nyheter", path: "/nyheter" },
        ]}
      />

      <main className="pt-28 pb-24 bg-surface min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-6">

          {/* Page header */}
          <div className="mb-16">
            <nav className="flex items-center gap-2 mb-6 text-[10px] uppercase tracking-widest text-outline">
              <Link href="/" className="hover:text-primary transition-colors">Hem</Link>
              <span>›</span>
              <span className="text-on-surface">Nyheter</span>
            </nav>
            <h1 className="font-(family-name:--font-manrope) text-6xl md:text-8xl font-extrabold tracking-tighter text-stone-900">
              Nyheter
            </h1>
            <p className="mt-4 text-secondary font-light text-lg max-w-xl">
              Säsongens nyheter och noggrant utvalda kollektioner — direkt till dig.
            </p>
          </div>

          {/* Featured post */}
          <Link
            href={`/nyheter/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 mb-20 overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-500 bg-surface-container-low"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[480px] overflow-hidden">
              {featured.coverImage?.url ? (
                <Image
                  src={featured.coverImage.url}
                  alt={featured.coverImage.alt ?? featured.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-surface-container" />
              )}
              {/* Season badge */}
              <div className="absolute top-6 left-6 bg-primary text-white px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest">
                {featured.season}
              </div>
            </div>

            <div className="flex flex-col justify-center p-10 lg:p-14">
              <p className="font-(family-name:--font-inter) text-xs text-outline mb-4">
                {formatDate(featured.publishedAt)}
              </p>
              <h2 className="font-(family-name:--font-manrope) text-3xl md:text-4xl font-bold text-on-surface tracking-tight leading-tight mb-5 group-hover:text-primary transition-colors duration-300">
                {featured.title}
              </h2>
              <p className="text-secondary font-light leading-relaxed mb-8 line-clamp-4">
                {featured.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 font-(family-name:--font-manrope) text-xs font-bold uppercase tracking-widest text-on-surface group-hover:text-primary transition-colors">
                Utforska kollektion
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>

          {/* Remaining posts */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/nyheter/${post.slug}`}
                  className="group overflow-hidden rounded-xl bg-surface-container-low shadow-sm hover:shadow-lg transition-shadow duration-500"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {post.coverImage?.url ? (
                      <Image
                        src={post.coverImage.url}
                        alt={post.coverImage.alt ?? post.title}
                        fill
                        className="object-cover transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-container" />
                    )}
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                      {post.season}
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-xs text-outline mb-3">
                      {formatDate(post.publishedAt)}
                    </p>
                    <h3 className="font-(family-name:--font-manrope) text-xl font-bold text-on-surface tracking-tight leading-tight mb-3 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-secondary font-light text-sm leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-outline group-hover:text-primary transition-colors font-(family-name:--font-manrope)">
                      Utforska
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
