import { sanityFetch } from "@/sanity/lib/live";
import { eccoPageQuery } from "@/sanity/lib/queries";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ShoeAnatomy from "@/components/blocks/ShoeAnatomy";
import EccoHero from "@/components/blocks/EccoHero";
import EccoHeritage from "@/components/blocks/EccoHeritage";

const eccoLinks = [
  { label: "Collection", href: "/skor" },
  { label: "Varumärken", href: "/varumarken", active: true },
  { label: "Journal", href: "/journal" },
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
