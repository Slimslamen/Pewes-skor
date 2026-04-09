import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BrandHero from "@/components/blocks/BrandHero";
import BrandHeritage from "@/components/blocks/BrandHeritage";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Skechers",
  description:
    "Skechers skor hos Pewes Skor i Anderstorp. Memory Foam-komfort, breda passformar och innovativ design sedan 1992 — utforska hela Skechers-kollektionen.",
  path:        "/varumarken/skechers",
});

const brandLinks = [
  { label: "Sortiment",  href: "/skor" },
  { label: "Varumärken", href: "/varumarken", active: true },
  { label: "Blogg",      href: "/blogg" },
  { label: "Journal",    href: "/journal" },
];

const HERO_FALLBACK = {
  headline:    "SKECHERS",
  subheadline: "Komfort och innovation sedan 1992",
};

const HERITAGE_FALLBACK = {
  eyebrow: "Amerikansk Innovation",
  heading:
    "Skechers bevisar att komfort och stil kan gå hand i hand — varje dag.",
  body: "Sedan starten i El Monte, Kalifornien 1992 har Skechers vuxit till ett av världens ledande skomärken. Med innovationer som Air-Cooled Memory Foam-innersulor, ergonomiska lästsystem och teknikvävar i överdelen erbjuder Skechers en bredd av modeller för träning, arbete och vardag — utan att kompromissa med känslan under foten.",
  images: [] as { url?: string; alt?: string }[],
};

export default function SkechersPage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[
        { name: "Hem",        path: "/" },
        { name: "Varumärken", path: "/varumarken" },
        { name: "Skechers",   path: "/varumarken/skechers" },
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
