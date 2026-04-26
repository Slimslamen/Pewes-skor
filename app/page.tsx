import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery } from "@/sanity/lib/queries";
import Header from "@/components/layout/HeaderServer";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/blocks/HeroSection";
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

  const storyLines = page?.storyReveal?.items?.length
    ? page.storyReveal.items.map((item: { label?: string | null; text?: string | null; sub?: string | null; imageUrl?: string | null }) => ({
        label: item.label ?? "",
        text:  item.text  ?? "",
        sub:   item.sub   ?? "",
        img:   item.imageUrl ?? "",
      }))
    : undefined;

  const collectionData = page?.collection
    ? {
        eyebrow:    page.collection.eyebrow    ?? undefined,
        heading:    page.collection.heading    ?? undefined,
        categories: page.collection.categories?.map((c: { name?: string | null; label?: string | null; body?: string | null; href?: string | null; image?: { url?: string | null } | null }) => ({
          name:  c.name  ?? "",
          label: c.label ?? "",
          body:  c.body  ?? "",
          href:  c.href  ?? "#",
          image: c.image?.url ?? "",
        })),
      }
    : undefined;

  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection data={page?.hero} />
        <StoryReveal lines={storyLines} />
        <ShoeRiseClient />
        <CategoriesSection data={collectionData} />
        <FindUs data={page?.findUs} />
      </main>
      <Footer />
    </>
  );
}
