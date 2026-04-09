import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery } from "@/sanity/lib/queries";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomeHero from "@/components/blocks/HomeHero";
import BrandsBar from "@/components/blocks/BrandsBar";
import AboutSection from "@/components/blocks/AboutSection";
import CollectionPreview from "@/components/blocks/CollectionPreview";
import FindUs from "@/components/blocks/FindUs";

export default async function HomePage() {
  const { data: page } = await sanityFetch({ query: homePageQuery });

  return (
    <>
      <Header />
      <main className="pt-20">
        <HomeHero data={page?.hero} />
        <BrandsBar data={page?.brands} />
        <AboutSection data={page?.about} />
        <CollectionPreview data={page?.collection} />
        <FindUs data={page?.findUs} />
      </main>
      <Footer />
    </>
  );
}
