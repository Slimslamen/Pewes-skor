import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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

const CATEGORIES = [
  {
    num: "01",
    cat: "Sneakers",
    desc: "Vardagselegans för den aktiva damfoten. Lätt, luftig och formgiven i naturmaterial.",
  },
  {
    num: "02",
    cat: "Sandaler",
    desc: "Sommarens följeslagare. Mjukt läder, säkra remmar och en passform som håller hela dagen.",
  },
  {
    num: "03",
    cat: "Pumps & Loafers",
    desc: "Klassisk elegans med modern komfort. Från morgonmötet till kvällens middag.",
  },
];

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

        {/* ── HERO: editorial luxury, ultra-thin type ── */}
        <section className="bg-stone-50 min-h-screen flex flex-col justify-between px-6 pt-24 pb-16">
          <div className="max-w-screen-xl mx-auto w-full">
            {/* Rule + provenance */}
            <div className="flex items-center gap-6 mb-20">
              <div className="h-px flex-1 bg-outline-variant/50" />
              <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.35em] text-outline shrink-0">
                Est. 1949 · Rosenheim, Bavaria
              </span>
              <div className="h-px flex-1 bg-outline-variant/50" />
            </div>

            {/* Brand name — thin, not extrabold */}
            <h1 className="font-(family-name:--font-manrope) text-[22vw] font-thin tracking-tighter text-stone-900 leading-none text-center">
              GABOR
            </h1>

            {/* Rule + brand qualities */}
            <div className="flex items-center gap-6 mt-20">
              <div className="h-px flex-1 bg-outline-variant/50" />
              <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.35em] text-secondary shrink-0">
                Passform · Naturmaterial · Stil
              </span>
              <div className="h-px flex-1 bg-outline-variant/50" />
            </div>
          </div>

          {/* Bottom row */}
          <div className="max-w-screen-xl mx-auto w-full flex justify-between items-end mt-16">
            <p className="font-(family-name:--font-inter) text-sm text-outline max-w-xs leading-relaxed">
              Tyskt damhantverk med en filosofi som alltid sätter foten i centrum.
            </p>
            <span className="text-3xl text-outline animate-bounce">↓</span>
          </div>
        </section>

        {/* ── CATEGORIES: editorial 3-column divided grid ── */}
        <section className="bg-white py-24">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-outline-variant/30">
              {CATEGORIES.map(({ num, cat, desc }) => (
                <div key={num} className="px-8 py-12 first:pl-0 last:pr-0 md:first:pl-0 md:last:pr-0">
                  <span className="font-(family-name:--font-inter) text-xs text-outline tracking-widest block mb-6">
                    {num}
                  </span>
                  <h3 className="font-(family-name:--font-manrope) text-2xl font-semibold text-stone-900 mb-4">
                    {cat}
                  </h3>
                  <p className="font-(family-name:--font-inter) text-sm text-secondary leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HERITAGE: pull-quote left, body right ── */}
        <section className="bg-stone-50 py-32">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              {/* Left: pull-quote */}
              <div>
                <blockquote className="font-(family-name:--font-manrope) text-3xl md:text-4xl font-light text-stone-900 leading-relaxed italic">
                  &ldquo;En välsittande sko är en välmående fot.&rdquo;
                </blockquote>
                <div className="mt-10 h-px w-20 bg-primary" />
                <p className="mt-4 font-(family-name:--font-inter) text-xs uppercase tracking-widest text-primary">
                  Gabors filosofi sedan 1949
                </p>
              </div>

              {/* Right: brand story */}
              <div className="space-y-6">
                <span className="font-(family-name:--font-inter) text-xs uppercase tracking-widest text-primary block">
                  Tyskt Damhantverk
                </span>
                <p className="font-(family-name:--font-inter) text-lg text-secondary leading-relaxed">
                  Från sin bas i Rosenheim i Bayern tillverkar Gabor damskor av naturmaterial i kombination med modern teknik. Varje modell genomgår noggranna passformsstudier för att ge en sko som smälter samman med foten — vare sig du väljer sandal, sneaker eller loafer.
                </p>
                <p className="font-(family-name:--font-inter) text-base text-outline leading-relaxed">
                  Hos Pewes Skor i Anderstorp hittar du ett noggrant urval av Gabors säsongsmodeller, utvalda med den svenska damfoten i fokus.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
