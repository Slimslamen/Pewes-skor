import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { herrPageQuery } from "@/sanity/lib/queries";
import Header from "@/components/layout/HeaderServer";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/blocks/ProductGrid";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Herrskor",
  description:
    "Herrskor från ECCO, Rieker, Dolomite och Skechers. Klassiska oxfords, funktionella vandringsskor och moderna sneakers — med personlig service i Anderstorp.",
  path:        "/skor/herr",
});

const FALLBACK_SUBTITLE =
  "En noggrant utvald kollektion av skor för den moderna mannen. Från tidlösa klassiker till funktionella friluftsskor, alltid med fokus på komfort och hantverk.";

export default async function HerrPage() {
  const { data } = await sanityFetch({ query: herrPageQuery });

  const products = (data?.brands ?? []).flatMap((b) =>
    (b?.products ?? []).map((p) => ({ brand: b?.brand ?? undefined, ...p })),
  );

  return (
    <>
      <BreadcrumbJsonLd crumbs={[
        { name: "Hem",       path: "/" },
        { name: "Sortiment", path: "/skor" },
        { name: "Herr",      path: "/skor/herr" },
      ]} />
      <Header />
      <main className="pt-32 pb-24">
        {/* Category Header */}
        <section className="max-w-screen-2xl mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <nav className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-widest text-outline">
                <Link href="/" className="hover:text-primary transition-colors">Hem</Link>
                <span>›</span>
                <Link href="/skor" className="hover:text-primary transition-colors">Sortiment</Link>
                <span>›</span>
                <span className="text-on-surface">Herr</span>
              </nav>
              <h1 className="font-(family-name:--font-manrope) text-6xl md:text-8xl font-extrabold tracking-tighter text-stone-900 mb-6">
                {data?.page?.title ?? "Herr"}
              </h1>
              <p className="text-secondary leading-relaxed font-light text-lg">
                {data?.page?.subtitle ?? FALLBACK_SUBTITLE}
              </p>
            </div>
          </div>
        </section>

        {/* Products */}
        <ProductGrid products={products} />
      </main>
      <Footer />
    </>
  );
}
