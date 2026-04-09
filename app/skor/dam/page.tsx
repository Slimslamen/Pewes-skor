import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { damPageQuery } from "@/sanity/lib/queries";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/blocks/ProductGrid";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Damskor",
  description:
    "Utforska vår damkollektion med skor från ECCO, Rieker, Gabor och fler. Tidlösa klassiker och modern design för den moderna kvinnan — hos Pewes Skor i Anderstorp.",
  path:        "/skor/dam",
});

const damLinks = [
  { label: "Collection", href: "/skor", active: false },
  { label: "Dam", href: "/skor/dam", active: true },
  { label: "Herr", href: "/skor/herr" },
  { label: "Journal", href: "/journal" },
];

export default async function DamPage() {
  const { data: page } = await sanityFetch({ query: damPageQuery });

  return (
    <>
      <Header links={damLinks} />
      <main className="pt-32 pb-24">
        {/* Category Header */}
        <section className="max-w-screen-2xl mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <nav className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-widest text-outline">
                <a href="/" className="hover:text-primary transition-colors">
                  Hem
                </a>
                <span>›</span>
                <span className="text-on-surface">Dam</span>
              </nav>
              <h1 className="font-(family-name:--font-manrope) text-6xl md:text-8xl font-extrabold tracking-tighter text-stone-900 mb-6">
                {page?.title ?? "Dam"}
              </h1>
              <p className="text-secondary leading-relaxed font-light text-lg">
                {page?.subtitle ??
                  "En noggrant utvald kollektion av skor för den moderna kvinnan. Från tidlösa klassiker till nutida design, utvald med fokus på hantverk och komfort."}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="text-outline">Visar 24 produkter</span>
            </div>
          </div>
        </section>

        {/* Brand Filter */}
        <section className="max-w-screen-2xl mx-auto px-6 mb-12 sticky top-[72px] z-40 py-4 bg-surface/95 backdrop-blur-sm">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
            {["Alla märken", "Ecco", "Rieker", "Gabor", "Skechers", "Dolomite"].map(
              (brand, i) => (
                <button
                  key={brand}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    i === 0
                      ? "bg-primary text-white"
                      : "bg-[#e5e2e1] text-[#656464] hover:bg-stone-200"
                  }`}
                >
                  {brand}
                </button>
              )
            )}
            <div className="h-8 w-px bg-[#d1c5b8]/30 mx-2" />
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
              ⚙ Filtrera
            </button>
          </div>
        </section>

        {/* Products */}
        <ProductGrid products={page?.products} />
      </main>
      <Footer />
    </>
  );
}
