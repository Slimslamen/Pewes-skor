import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { eccoPageQuery } from "@/sanity/lib/queries";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ShoeAnatomy from "@/components/blocks/ShoeAnatomy";
import EccoHero from "@/components/blocks/EccoHero";
import EccoHeritage from "@/components/blocks/EccoHeritage";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "ECCO",
  description:
    "ECCO-skor hos Pewes Skor i Anderstorp. Danskt hantverk, innovativa material och oslagbar komfort — utforska hela ECCO-kollektionen.",
  path:        "/varumarken/ecco",
});

const eccoLinks = [
  { label: "Sortiment",  href: "/skor" },
  { label: "Varumärken", href: "/varumarken", active: true },
  { label: "Blogg",      href: "/blogg" },
  { label: "Journal",    href: "/journal" },
];

export default async function EccoPage() {
  const { data: page } = await sanityFetch({ query: eccoPageQuery });

  const anatomyZones = page?.anatomy?.zones ?? undefined;
  const anatomyTitle = page?.anatomy?.sectionTitle ?? "Anatomy of Innovation";

  return (
    <>
      <Header links={eccoLinks} />
      <main className="pt-20">
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
