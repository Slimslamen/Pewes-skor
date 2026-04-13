import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DolomiteHero from "@/components/blocks/DolomiteHero";
import DolomiteContent from "@/components/blocks/DolomiteContent";
import BrandProductGrid from "@/components/blocks/BrandProductGrid";
import Reveal from "@/components/blocks/Reveal";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Dolomite",
  description:
    "Dolomite vandringsskor hos Pewes Skor i Anderstorp. Över 125 år av italienskt bergshantverk och teknisk precision — utforska hela Dolomite-kollektionen.",
  path:        "/varumarken/dolomite",
});

const TECH_FEATURES = [
  {
    tech: "Gore-Tex",
    desc: "Vattentätt membran som andas. Torrhet och komfort i alla väder utan att kompromissa med luftningen.",
  },
  {
    tech: "Vibram",
    desc: "Hög-grepp-sulor designade för klippor, grus och lera. Originalet för alpin terräng.",
  },
  {
    tech: "Full-grain läder",
    desc: "Premiummaterial som hårdnar och formas med åren och terrängen. Bättre med varje vandring.",
  },
  {
    tech: "Ergonomisk läst",
    desc: "Formgiven efter fotens naturliga rörelse i backen. Mindre belastning, mer kraft framåt.",
  },
];

const MOCK_SHOES = [
  {
    name: "Dolomite 54 Low FG",
    price: "1.799 kr",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
    image: "https://images.unsplash.com/photo-1520639889410-1dfa467409f4?auto=format&fit=crop&q=80&w=800",
    category: "Lifestyle",
  },
  {
    name: "Dolomite Steinbock WT",
    price: "2.199 kr",
    sizes: ["40", "41", "42", "43", "44", "45"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    category: "Hiking",
  },
  {
    name: "Dolomite Crodarossa",
    price: "1.899 kr",
    sizes: ["38", "39", "40", "41", "42"],
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
    category: "Approach",
  },
];

export default function DolomitePage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[
        { name: "Hem",        path: "/" },
        { name: "Varumärken", path: "/varumarken" },
        { name: "Dolomite",   path: "/varumarken/dolomite" },
      ]} />
      <Header />
      <main>
        <DolomiteHero />

        {/* ── PRODUCT LIST ── */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-6 pt-24">
            <Reveal>
              <h2 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-2 font-(family-name:--font-inter)">
                Aktuellt sortiment
              </h2>
            </Reveal>
          </div>
          <BrandProductGrid brandName="Dolomite" shoes={MOCK_SHOES} />
        </div>

        <DolomiteContent tech={TECH_FEATURES} />
      </main>
      <Footer />
    </>
  );
}
