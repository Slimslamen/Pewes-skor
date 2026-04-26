import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { barnPageQuery } from "@/sanity/lib/queries";
import Header from "@/components/layout/HeaderServer";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/blocks/ProductGrid";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Barnskor",
  description:
    "Barnskor anpassade för barnfötter i alla åldrar. ECCO, Skechers, Gabor och Rieker — med rätt stöd, komfort och hållbarhet hos Pewes Skor i Anderstorp.",
  path:        "/skor/barn",
});

const FALLBACK_SUBTITLE =
  "Skor skapade för barnfötter i alla åldrar och aktiviteter. Kvalitet, komfort och hållbarhet — för att barnfötter förtjänar det bästa.";

export default async function BarnPage() {
  const { data } = await sanityFetch({ query: barnPageQuery });

  const products = (data?.brands ?? []).flatMap((b: { brand?: string | null; products?: unknown[] | null }) =>
    (b?.products ?? []).map((p: unknown) => ({ brand: b?.brand ?? undefined, ...(p as object) })),
  );

  return (
    <>
      <BreadcrumbJsonLd crumbs={[
        { name: "Hem",       path: "/" },
        { name: "Sortiment", path: "/skor" },
        { name: "Barn",      path: "/skor/barn" },
      ]} />
      <Header />
      <main id="main-content" className="pt-32 pb-24">
        {/* Category Header */}
        <section className="max-w-screen-2xl mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <nav aria-label="Brödsmulor" className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-widest text-outline">
                <Link href="/" className="hover:text-primary transition-colors">Hem</Link>
                <span>›</span>
                <Link href="/skor" className="hover:text-primary transition-colors">Sortiment</Link>
                <span>›</span>
                <span className="text-on-surface">Barn</span>
              </nav>
              <h1 className="font-(family-name:--font-manrope) text-6xl md:text-8xl font-extrabold tracking-tighter text-stone-900 mb-6">
                {data?.page?.title ?? "Barn"}
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
