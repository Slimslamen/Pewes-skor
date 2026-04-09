import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BrandHero from "@/components/blocks/BrandHero";
import BrandHeritage from "@/components/blocks/BrandHeritage";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Rieker",
  description:
    "Rieker skor hos Pewes Skor i Anderstorp. ANTISTRESS-teknologi, lättvikt och komfort för hela dagen sedan 1874 — utforska hela Rieker-kollektionen.",
  path:        "/varumarken/rieker",
});

const brandLinks = [
  { label: "Sortiment",  href: "/skor" },
  { label: "Varumärken", href: "/varumarken", active: true },
  { label: "Blogg",      href: "/blogg" },
  { label: "Journal",    href: "/journal" },
];

const HERO_FALLBACK = {
  headline:    "RIEKER",
  subheadline: "ANTISTRESS-filosofin sedan 1874",
};

const HERITAGE_FALLBACK = {
  eyebrow: "150 År av Komfort",
  heading:
    "Rieker har under 150 år tillverkat skor som kroppen tackar dig för.",
  body: "Riekers ANTISTRESS-filosofi bygger på att skon ska vara lätt, flexibel och skonsam mot foten hela dagen. Varje modell konstrueras med extra utrymme i tåboxen, mjuka inläggssulor och en lättviktsskala som gör att du aldrig behöver välja mellan stil och välmående. Sedan starten i Tuttlingen 1874 har Rieker levererat skor för det verkliga livet.",
  images: [] as { url?: string; alt?: string }[],
};

export default function RiekerPage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[
        { name: "Hem",        path: "/" },
        { name: "Varumärken", path: "/varumarken" },
        { name: "Rieker",     path: "/varumarken/rieker" },
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
