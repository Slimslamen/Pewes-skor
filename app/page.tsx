import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery, quizProductsQuery } from "@/sanity/lib/queries";
import type { QuizProduct } from "@/components/blocks/home/ShoeQuiz";
import Header from "@/components/layout/HeaderServer";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/blocks/home/HeroSection";
import StoryReveal from "@/components/blocks/home/StoryReveal";
import ShoeRiseClient from "@/components/blocks/products/ShoeRiseClient";
import ShoeQuiz from "@/components/blocks/home/ShoeQuiz";
import CategoriesSection from "@/components/blocks/home/CategoriesSection";
import FindUs from "@/components/blocks/home/FindUs";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  path:        "/",
  description:
    "Skoaffär i Anderstorp sedan generationer. Noggrant utvalda skor från ECCO, Rieker, Gabor, Skechers, dolomite med mera. Välkommen till Storgatan 11.",
});

type RawQuizProduct = {
  name?:         string | null;
  price?:        string | null;
  categories?:   string[] | null;
  quizStyle?:    string[] | null;
  quizSeason?:   string[] | null;
  quizPriority?: string[] | null;
  image?:        string | null;
  imageAlt?:     string | null;
  brand?:        string | null;
  brandHref?:    string | null;
};

export default async function HomePage() {
  const [{ data: page }, { data: quiz }] = await Promise.all([
    sanityFetch({ query: homePageQuery }),
    sanityFetch({ query: quizProductsQuery }),
  ]);

  const quizProducts: QuizProduct[] = [
    ...((quiz?.ecco ?? []) as RawQuizProduct[]),
    ...((quiz?.brands ?? []) as { brand?: string | null; brandHref?: string | null; products?: RawQuizProduct[] | null }[])
      .flatMap((b) =>
        (b.products ?? []).map((p) => ({ ...p, brand: b.brand, brandHref: b.brandHref })),
      ),
  ]
    .filter((p): p is RawQuizProduct & { name: string; image: string; brand: string; brandHref: string } =>
      Boolean(p.name && p.image && p.brand && p.brandHref),
    )
    .map((p) => ({
      name:         p.name,
      price:        p.price        ?? "",
      image:        p.image,
      imageAlt:     p.imageAlt     ?? p.name,
      brand:        p.brand,
      brandHref:    p.brandHref,
      categories:   p.categories   ?? [],
      quizStyle:    p.quizStyle    ?? [],
      quizSeason:   p.quizSeason   ?? [],
      quizPriority: p.quizPriority ?? [],
    }));

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
        <HeroSection data={page?.hero} brands={page?.brands} />
        <StoryReveal lines={storyLines} />
        <ShoeRiseClient />
        <ShoeQuiz products={quizProducts} />
        <CategoriesSection data={collectionData} />
        <FindUs data={page?.findUs} />
      </main>
      <Footer />
    </>
  );
}
