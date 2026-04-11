import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkechersHero from "@/components/blocks/SkechersHero";
import SkechersScroll from "@/components/blocks/SkechersScroll";
import Reveal from "@/components/blocks/Reveal";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Skechers",
  description:
    "Skechers skor hos Pewes Skor i Anderstorp. Memory Foam-komfort, breda passformar och innovativ design sedan 1992 — utforska hela Skechers-kollektionen.",
  path:        "/varumarken/skechers",
});

const TECH_TAGS = ["Memory Foam", "Air-Cooled", "Wide Fit", "Vegan Options"];

const FOAM_SPECS = [
  { label: "Stötdämpning",  value: "Memory Foam" },
  { label: "Ventilation",   value: "Air-Cooled" },
  { label: "Passform",      value: "Wide & Regular" },
  { label: "Användning",    value: "Sport & Vardag" },
];

const STATS = [
  { stat: "160+",   label: "Länder" },
  { stat: "32 år",  label: "av innovation" },
  { stat: "3 000+", label: "modeller globalt" },
];

export default function SkechersPage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[
        { name: "Hem",        path: "/" },
        { name: "Varumärken", path: "/varumarken" },
        { name: "Skechers",   path: "/varumarken/skechers" },
      ]} />
      <Header />
      <main className="pt-20">

        <SkechersHero techTags={TECH_TAGS} />
        {/* ── HERITAGE + STATS + scroll-scrubbed rotating shoe ── */}
        <SkechersScroll stats={STATS} />


        {/* ── MEMORY FOAM: dark section, two-column with spec grid ── */}
        <section className="bg-inverse-surface py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left: feature description */}
              <Reveal from="left">
                <span className="font-(family-name:--font-inter) text-xs uppercase tracking-widest text-primary block mb-6">
                  Signaturteknologi
                </span>
                <h2 className="font-(family-name:--font-manrope) text-5xl md:text-6xl font-bold text-white leading-tight mb-8">
                  Air-Cooled<br />Memory Foam
                </h2>
                <p className="font-(family-name:--font-inter) text-base text-stone-400 leading-relaxed">
                  Innersulor i Air-Cooled Memory Foam formar sig efter din unika fotprofil och ventilerar värme bort från foten. Resultatet: ett mjukt, svalt steg hela dagen lång.
                </p>
              </Reveal>

              {/* Right: 2×2 spec grid */}
              <Reveal from="right" delay={0.1} className="grid grid-cols-2 gap-px bg-stone-700">
                {FOAM_SPECS.map(({ label, value }) => (
                  <div key={label} className="bg-stone-900 p-8">
                    <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-widest text-stone-500 block mb-3">
                      {label}
                    </span>
                    <span className="font-(family-name:--font-manrope) text-lg font-semibold text-white">
                      {value}
                    </span>
                  </div>
                ))}
              </Reveal>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
