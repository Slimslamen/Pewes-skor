import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery } from "@/sanity/lib/queries";
import Header from "@/components/layout/HeaderServer";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/blocks/HeroSection";
// import HeroShoe3DClient from "@/components/blocks/HeroShoe3DClient";
import StoryReveal from "@/components/blocks/StoryReveal";
import ShoeRiseClient from "@/components/blocks/ShoeRiseClient";
import CategoriesSection from "@/components/blocks/CategoriesSection";
import FindUs from "@/components/blocks/FindUs";
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
        <HeroSection />
        {/* <HeroShoe3DClient /> */}
        <StoryReveal />
        <ShoeRiseClient />
        <CategoriesSection />
        <FindUs data={page?.findUs} />
      </main>
      <Footer />
    </>
  );
}
