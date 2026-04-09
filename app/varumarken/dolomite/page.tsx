import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BrandHero from "@/components/blocks/BrandHero";
import BrandHeritage from "@/components/blocks/BrandHeritage";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Dolomite",
  description:
    "Dolomite vandringsskor hos Pewes Skor i Anderstorp. Över 125 år av italienskt bergshantverk och teknisk precision — utforska hela Dolomite-kollektionen.",
  path:        "/varumarken/dolomite",
});

const brandLinks = [
  { label: "Sortiment",  href: "/skor" },
  { label: "Varumärken", href: "/varumarken", active: true },
  { label: "Blogg",      href: "/blogg" },
  { label: "Journal",    href: "/journal" },
];

const HERO_FALLBACK = {
  headline:    "DOLOMITE",
  subheadline: "Alpin expertis sedan 1897",
};

const HERITAGE_FALLBACK = {
  eyebrow: "Italienskt Berghantverk",
  heading:
    "Från Dolomiterna med 125 år av expertis inom fjällskor.",
  body: "Grundat 1897 i Belluno vid foten av Dolomiterna var Dolomite ett av de första märkena att tillverka tekniska bergskor i stor skala. I dag kombinerar varumärket ett sekel av alpin tradition med modern materialvetenskap — från Gore-Tex-membran till Vibram-sulor — för vandringsskor som klarar Europas tuffaste terräng med råge.",
  images: [] as { url?: string; alt?: string }[],
};

export default function DolomiePage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[
        { name: "Hem",        path: "/" },
        { name: "Varumärken", path: "/varumarken" },
        { name: "Dolomite",   path: "/varumarken/dolomite" },
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
