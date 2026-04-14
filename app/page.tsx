import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery } from "@/sanity/lib/queries";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomeHero from "@/components/blocks/HomeHero";
import BrandsBar from "@/components/blocks/BrandsBar";
import FeaturedBanner from "@/components/blocks/FeaturedBanner";
import AboutSection from "@/components/blocks/AboutSection";
import CollectionPreview from "@/components/blocks/CollectionPreview";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  path:        "/",
  description:
    "Skoaffär i Anderstorp sedan generationer. Noggrant utvalda skor från ECCO, Rieker, Gabor, Skechers, dolomite med mera. Välkommen till Storgatan 11.",
});

export default async function HomePage() {
  const { data: page } = await sanityFetch({ query: homePageQuery });

  return (
    <>
      <Header />
      <main>
        <HomeHero data={page?.hero} />
        <BrandsBar data={page?.brands} />
        <FeaturedBanner />
        <AboutSection data={page?.about} />
        <CollectionPreview data={page?.collection} />
      </main>
      <Footer />
    </>
  );
}
