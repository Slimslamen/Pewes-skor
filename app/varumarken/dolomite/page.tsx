import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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

        {/* ── HERO: full dark, brand name broken across lines ── */}
        <section className="bg-stone-900 min-h-screen flex flex-col justify-center px-6 py-24">
          <div className="max-w-screen-xl mx-auto w-full">
            {/* Provenance strip */}
            <div className="flex items-center gap-8 mb-16">
              <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.4em] text-stone-500">
                Belluno · Italia
              </span>
              <div className="h-px flex-1 bg-stone-700" />
              <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.4em] text-stone-500">
                Est. 1897
              </span>
            </div>

            {/* Brand name broken intentionally for alpine drama */}
            <h1 className="font-(family-name:--font-manrope) font-extrabold tracking-tighter text-white leading-none">
              <span className="block text-[18vw] md:text-[12rem]">DOLO</span>
              <span className="block text-[18vw] md:text-[12rem] text-stone-400 -mt-4 md:-mt-8">MITE</span>
            </h1>

            <div className="mt-16 flex flex-col md:flex-row md:items-end gap-8">
              <p className="font-(family-name:--font-manrope) text-xl md:text-2xl font-light text-stone-300 max-w-md leading-relaxed">
                Alpin expertis sedan 1897. Teknologi för dem som tar bergen på allvar.
              </p>
              <div className="md:ml-auto shrink-0">
                <div className="border border-stone-600 px-6 py-3 inline-flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-widest text-stone-400">
                    Alpin Pioneer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TECHNOLOGY: light break with 4-feature grid ── */}
        <section className="bg-surface py-24">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="mb-16">
              <span className="font-(family-name:--font-inter) text-xs uppercase tracking-widest text-primary block mb-4">
                Teknologi
              </span>
              <h2 className="font-(family-name:--font-manrope) text-4xl md:text-5xl font-bold text-stone-900">
                Byggd för extrema förhållanden
              </h2>
            </div>

            {/* Grid separated by 1px lines */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-outline-variant/30">
              {TECH_FEATURES.map(({ tech, desc }) => (
                <div key={tech} className="bg-white p-8 space-y-4">
                  <h3 className="font-(family-name:--font-manrope) text-lg font-bold text-stone-900">
                    {tech}
                  </h3>
                  <div className="h-0.5 w-8 bg-primary" />
                  <p className="font-(family-name:--font-inter) text-sm text-secondary leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HERITAGE: dark again, oversized year as background texture ── */}
        <section className="bg-stone-900 py-32 relative overflow-hidden">
          {/* Ghost year — visible only as dark texture */}
          <div
            aria-hidden
            className="absolute right-0 top-1/2 -translate-y-1/2 font-(family-name:--font-manrope) font-black text-stone-800 leading-none select-none pointer-events-none"
            style={{ fontSize: "clamp(8rem, 28vw, 24rem)" }}
          >
            1897
          </div>

          <div className="max-w-screen-xl mx-auto px-6 relative z-10">
            <div className="max-w-2xl">
              <span className="font-(family-name:--font-inter) text-xs uppercase tracking-widest text-primary block mb-10">
                Vårt Arv
              </span>
              <p className="font-(family-name:--font-manrope) text-3xl md:text-4xl font-light text-white leading-relaxed mb-12">
                Grundat 1897 i Belluno vid foten av Dolomiterna — ett av de första märkena att tillverka tekniska bergskor i stor skala.
              </p>
              <p className="font-(family-name:--font-inter) text-base text-stone-400 leading-relaxed">
                I dag kombinerar varumärket ett sekel av alpin tradition med modern materialvetenskap för vandringsskor som klarar Europas tuffaste terräng.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
