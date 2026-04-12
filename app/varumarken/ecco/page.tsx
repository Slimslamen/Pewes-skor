import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { eccoPageQuery } from "@/sanity/lib/queries";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ShoeAnatomy from "@/components/blocks/ShoeAnatomy";
import EccoHero from "@/components/blocks/EccoHero";
import EccoHeritage from "@/components/blocks/EccoHeritage";
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

        <EccoHeritage data={page?.heritage} />
      </main>
      <Footer />
    </>
  );
}
