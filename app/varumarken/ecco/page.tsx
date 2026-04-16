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

const MOCK_SHOES = [
  {
    name: "ECCO Soft 7 Sneaker",
    price: "1.499 kr",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    category: "Sneakers",
  },
  {
    name: "ECCO Biom 2.1",
    price: "1.699 kr",
    sizes: ["40", "41", "42", "43", "44", "45"],
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
    category: "Outdoor",
  },
  {
    name: "ECCO Street Lite",
    price: "1.299 kr",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800",
    category: "Vardag",
  },
];

export default async function EccoPage() {
  const { data: page } = await sanityFetch({ query: eccoPageQuery });

  const anatomyZones = page?.anatomy?.zones ?? undefined;
  const anatomyTitle = page?.anatomy?.sectionTitle ?? "Anatomy of Innovation";

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
          <BrandProductGrid brandName="ECCO" shoes={MOCK_SHOES} />
        </div>

        <EccoHeritage data={page?.heritage} />
      </main>
      <Footer />
    </>
  );
}
