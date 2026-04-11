import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DolomiteHero from "@/components/blocks/DolomiteHero";
import DolomiteContent from "@/components/blocks/DolomiteContent";
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
        <DolomiteContent tech={TECH_FEATURES} />
      </main>
      <Footer />
    </>
  );
}
