import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
      <Header links={brandLinks} />
      <main className="pt-20">

        {/* ── HERO: full width, bold name, thick primary accent bar ── */}
        <section className="bg-surface min-h-screen flex flex-col justify-center px-6 py-24">
          <div className="max-w-screen-xl mx-auto w-full">

            <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.4em] text-outline block mb-10">
              Since 1992 · El Monte, California
            </span>

            <h1 className="font-(family-name:--font-manrope) font-black tracking-tighter text-stone-900 leading-none mb-6"
              style={{ fontSize: "clamp(3rem, 14vw, 11rem)" }}>
              SKECHERS
            </h1>

            {/* Thick primary accent bar — the signature visual element */}
            <div className="h-2 w-full bg-primary mb-10" />

            <div className="flex flex-col md:flex-row md:items-end gap-10">
              <p className="font-(family-name:--font-manrope) text-xl md:text-2xl font-light text-secondary max-w-lg leading-relaxed">
                Memory Foam-komfort möter California-design. Skor för sport, vardag och allt däremellan.
              </p>

              {/* Tech tags */}
              <div className="md:ml-auto flex flex-wrap gap-2 shrink-0">
                {TECH_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="font-(family-name:--font-inter) text-[10px] uppercase tracking-widest border border-outline/40 text-outline px-3 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── MEMORY FOAM: dark section, two-column with spec grid ── */}
        <section className="bg-inverse-surface py-24">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left: feature description */}
              <div>
                <span className="font-(family-name:--font-inter) text-xs uppercase tracking-widest text-primary block mb-6">
                  Signaturteknologi
                </span>
                <h2 className="font-(family-name:--font-manrope) text-5xl md:text-6xl font-bold text-white leading-tight mb-8">
                  Air-Cooled<br />Memory Foam
                </h2>
                <p className="font-(family-name:--font-inter) text-base text-stone-400 leading-relaxed">
                  Innersulor i Air-Cooled Memory Foam formar sig efter din unika fotprofil och ventilerar värme bort från foten. Resultatet: ett mjukt, svalt steg hela dagen lång.
                </p>
              </div>

              {/* Right: 2×2 spec grid */}
              <div className="grid grid-cols-2 gap-px bg-stone-700">
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
              </div>

            </div>
          </div>
        </section>

        {/* ── HERITAGE + STATS: two-thirds text, one-third stat sidebar ── */}
        <section className="bg-stone-50 py-32">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">

              {/* Brand story — spans 2 columns */}
              <div className="lg:col-span-2 space-y-8">
                <span className="font-(family-name:--font-inter) text-xs uppercase tracking-widest text-primary block">
                  Vårt Arv
                </span>
                <h2 className="font-(family-name:--font-manrope) text-4xl md:text-5xl font-light text-stone-900 leading-tight">
                  Skechers bevisar att komfort och stil kan gå hand i hand — varje dag.
                </h2>
                <p className="font-(family-name:--font-inter) text-lg text-secondary leading-relaxed">
                  Sedan starten i El Monte, Kalifornien 1992 har Skechers vuxit till ett av världens ledande skomärken. Med innovationer som Air-Cooled Memory Foam-innersulor, ergonomiska lästsystem och teknikvävar i överdelen erbjuder Skechers en bredd av modeller för träning, arbete och vardag — utan att kompromissa med känslan under foten.
                </p>
              </div>

              {/* Stats sidebar */}
              <div className="flex flex-col justify-center gap-10">
                {STATS.map(({ stat, label }) => (
                  <div key={label} className="border-l-2 border-primary pl-6">
                    <span className="font-(family-name:--font-manrope) text-4xl font-bold text-stone-900 block">
                      {stat}
                    </span>
                    <span className="font-(family-name:--font-inter) text-xs uppercase tracking-widest text-outline">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
