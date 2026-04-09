import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BrandHero from "@/components/blocks/BrandHero";
import BrandHeritage from "@/components/blocks/BrandHeritage";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Gabor",
  description:
    "Gabor damskor hos Pewes Skor i Anderstorp. Tyskt hantverk, naturmaterial och exceptionell passform sedan 1949 — utforska hela Gabor-kollektionen.",
  path:        "/varumarken/gabor",
});

const brandLinks = [
  { label: "Sortiment",  href: "/skor" },
  { label: "Varumärken", href: "/varumarken", active: true },
  { label: "Blogg",      href: "/blogg" },
  { label: "Journal",    href: "/journal" },
];

const HERO_FALLBACK = {
  headline:    "GABOR",
  subheadline: "Elegans från Bayern sedan 1949",
};

const HERITAGE_FALLBACK = {
  eyebrow: "Tyskt Damhantverk",
  heading:
    "Sedan 1949 har Gabor satt standarden för hur en damsko ska sitta och kännas.",
  body: "Från sin bas i Rosenheim i Bayern tillverkar Gabor damskor av naturmaterial i kombination med modern teknik. Varje modell genomgår noggranna passformsstudier för att ge en sko som smälter samman med foten — vare sig du väljer sandal, sneaker eller vardagsloafer. Gabors filosofi är enkel: en välsittande sko är en välmående fot.",
  images: [] as { url?: string; alt?: string }[],
};

export default function GaborPage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[
        { name: "Hem",        path: "/" },
        { name: "Varumärken", path: "/varumarken" },
        { name: "Gabor",      path: "/varumarken/gabor" },
      ]} />
      <Header links={brandLinks} />
      <main className="pt-20">
        <BrandHero fallback={HERO_FALLBACK} />
        <BrandHeritage fallback={HERITAGE_FALLBACK} />
      </main>
      <Footer />
    </>
  );
}
