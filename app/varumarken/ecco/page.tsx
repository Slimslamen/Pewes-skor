import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { eccoPageQuery } from "@/sanity/lib/queries";
import Header from "@/components/layout/HeaderServer";
import Footer from "@/components/layout/Footer";
import ShoeAnatomy from "@/components/blocks/ShoeAnatomy";
import EccoHero from "@/components/blocks/EccoHero";
import EccoHeritage from "@/components/blocks/EccoHeritage";
import BrandProductGrid from "@/components/blocks/BrandProductGrid";
import Reveal from "@/components/blocks/Reveal";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "ECCO",
  description:
    "ECCO-skor hos Pewes Skor i Anderstorp. Danskt hantverk, innovativa material och oslagbar komfort — utforska hela ECCO-kollektionen.",
  path:        "/varumarken/ecco",
});

export default async function EccoPage() {
  const { data: page } = await sanityFetch({ query: eccoPageQuery });

  const anatomyZones = page?.anatomy?.zones ?? undefined;
  const anatomyTitle = page?.anatomy?.sectionTitle ?? "Anatomy of Innovation";
  const shoes = (page?.products ?? []).map((p) => ({
    name: p.name ?? "",
    price: p.price ?? "",
    sizes: p.sizes ?? "",
    image: p.image ?? "",
    categories: p.categories ?? [],
  }));

  return (
    <>
      <BreadcrumbJsonLd crumbs={[
        { name: "Hem",        path: "/" },
        { name: "Varumärken", path: "/varumarken" },
        { name: "ECCO",       path: "/varumarken/ecco" },
      ]} />
      <Header />
      <main className="pt-10">
        <EccoHero data={page?.hero} />

        {/* Anatomy section — scroll-driven, 500vh */}
        <section className="bg-surface">
          <ShoeAnatomy zones={anatomyZones} sectionTitle={anatomyTitle} />
        </section>

        {/* ── PRODUCT LIST ── */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-6 pt-24">
            <Reveal>
              <h2 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-2 font-(family-name:--font-inter)">
                Aktuellt sortiment
              </h2>
            </Reveal>
          </div>
          <BrandProductGrid brandName="ECCO" shoes={shoes} />
        </div>

        <EccoHeritage data={page?.heritage} />
      </main>
      <Footer />
    </>
  );
}
