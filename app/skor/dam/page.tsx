import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { damPageQuery } from "@/sanity/lib/queries";
import Header from "@/components/layout/HeaderServer";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/blocks/ProductGrid";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Damskor",
  description:
    "Utforska vår damkollektion med skor från ECCO, Rieker, Gabor och fler. Tidlösa klassiker och modern design för den moderna kvinnan — hos Pewes Skor i Anderstorp.",
  path:        "/skor/dam",
});

export default async function DamPage() {
  const { data } = await sanityFetch({ query: damPageQuery });

  const products = (data?.brands ?? []).flatMap((b) =>
    (b?.products ?? []).map((p) => ({ brand: b?.brand ?? undefined, ...p })),
  );

  return (
    <>
      <BreadcrumbJsonLd crumbs={[
        { name: "Hem",       path: "/" },
        { name: "Sortiment", path: "/skor" },
        { name: "Dam",       path: "/skor/dam" },
      ]} />
      <Header />
      <main id="main-content" className="pt-32 pb-24">
        {/* Category Header */}
        <section className="max-w-screen-2xl mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <nav aria-label="Brödsmulor" className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-widest text-outline">
                <Link href="/" className="hover:text-primary transition-colors">
                  Hem
                </Link>
                <span>›</span>
                <span className="text-on-surface">Dam</span>
              </nav>
              <h1 className="font-(family-name:--font-manrope) text-6xl md:text-8xl font-extrabold tracking-tighter text-stone-900 mb-6">
                {data?.page?.title ?? "Dam"}
              </h1>
              <p className="text-secondary leading-relaxed font-light text-lg">
                {data?.page?.subtitle ??
                  "En noggrant utvald kollektion av skor för den moderna kvinnan. Från tidlösa klassiker till nutida design, utvald med fokus på hantverk och komfort."}
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
