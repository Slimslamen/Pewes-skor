import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Varumärken",
  description:
    "Utforska våra varumärken hos Pewes Skor i Anderstorp. ECCO, Gabor, Dolomite, Rieker och Skechers — fem världsmärken med ett gemensamt fokus: komfort och hantverk.",
  path:        "/varumarken",
});

const brandLinks = [
  { label: "Sortiment",  href: "/skor" },
  { label: "Varumärken", href: "/varumarken", active: true },
  { label: "Blogg",      href: "/blogg" },
  { label: "Journal",    href: "/journal" },
];

const BRANDS = [
  {
    name: "ECCO",
    slug: "ecco",
    origin: "Bredebro, Danmark",
    founded: "1963",
    tagline: "Danskt hantverk, global komfort.",
    body: "Pionjärer inom FLUIDFORM-teknik och egenägda garveriprocesser. ECCO kontrollerar varje steg — från råhuden till den färdiga skon.",
    span: "lg:col-span-2",
    accent: "border-t-2 border-primary",
  },
  {
    name: "GABOR",
    slug: "gabor",
    origin: "Rosenheim, Bayern",
    founded: "1949",
    tagline: "Passform som respekterar foten.",
    body: "75 år av tyskt damhantverk. Varje modell formas runt foten, aldrig tvärtom.",
    span: "",
    accent: "border-t-2 border-stone-300",
  },
  {
    name: "DOLOMITE",
    slug: "dolomite",
    origin: "Belluno, Italia",
    founded: "1897",
    tagline: "Alpin precision i varje steg.",
    body: "Grundat vid foten av Dolomiterna. Gore-Tex, Vibram och ett sekel av bergsteknik.",
    span: "",
    accent: "border-t-2 border-stone-800",
  },
  {
    name: "RIEKER",
    slug: "rieker",
    origin: "Tuttlingen, Deutschland",
    founded: "1874",
    tagline: "ANTISTRESS — lätt, flexibel, rymlig.",
    body: "150 år av filosofin att skon ska tjäna foten, inte tvärtom. Klassens lättviktigaste.",
    span: "",
    accent: "border-t-2 border-outline-variant",
  },
  {
    name: "SKECHERS",
    slug: "skechers",
    origin: "El Monte, Kalifornien",
    founded: "1992",
    tagline: "Memory Foam möter California-design.",
    body: "Air-Cooled Memory Foam, breda passformar och innovativa material för sport och vardag.",
    span: "",
    accent: "border-t-2 border-primary",
  },
];

export default function VarumarkenPage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[
        { name: "Hem",        path: "/" },
        { name: "Varumärken", path: "/varumarken" },
      ]} />
      <Header links={brandLinks} />
      <main className="pt-20">

        {/* ── PAGE HEADER ── */}
        <section className="bg-surface py-24 px-6">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.35em] text-outline block mb-6">
                  Pewes Skor · Anderstorp
                </span>
                <h1 className="font-(family-name:--font-manrope) text-6xl md:text-8xl font-extrabold tracking-tighter text-stone-900 leading-none">
                  Våra<br />Varumärken
                </h1>
              </div>
              <p className="font-(family-name:--font-inter) text-base text-secondary leading-relaxed max-w-sm">
                Fem noggrant utvalda världsmärken. Varje ett med sin egen historia, sin egen teknik och sin egen definition av vad en bra sko är.
              </p>
            </div>
          </div>
        </section>

        {/* ── BRAND GRID ── */}
        <section className="bg-white py-4 pb-24 px-6">
          <div className="max-w-screen-xl mx-auto">

            {/* Row 1: ECCO (wide) + GABOR */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-outline-variant/20 mb-px">
              {BRANDS.slice(0, 2).map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/varumarken/${brand.slug}`}
                  className={`group bg-white p-10 md:p-14 flex flex-col justify-between min-h-[360px] hover:bg-stone-50 transition-colors duration-300 ${brand.span}`}
                >
                  <div className={`${brand.accent} pt-8`}>
                    <h2 className="font-(family-name:--font-manrope) text-5xl md:text-6xl font-extrabold tracking-tighter text-stone-900 mb-2">
                      {brand.name}
                    </h2>
                    <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-widest text-outline">
                      {brand.origin} · Est. {brand.founded}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <p className="font-(family-name:--font-manrope) text-xl font-light text-stone-700 italic">
                      {brand.tagline}
                    </p>
                    <p className="font-(family-name:--font-inter) text-sm text-secondary leading-relaxed">
                      {brand.body}
                    </p>
                    <span className="font-(family-name:--font-inter) text-xs uppercase tracking-widest text-primary flex items-center gap-2 pt-2 group-hover:gap-3 transition-all duration-300">
                      Utforska varumärket →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Row 2: DOLOMITE + RIEKER + SKECHERS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/20">
              {BRANDS.slice(2).map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/varumarken/${brand.slug}`}
                  className="group bg-white p-10 flex flex-col justify-between min-h-[320px] hover:bg-stone-50 transition-colors duration-300"
                >
                  <div className={`${brand.accent} pt-6`}>
                    <h2 className="font-(family-name:--font-manrope) text-4xl font-extrabold tracking-tighter text-stone-900 mb-2">
                      {brand.name}
                    </h2>
                    <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-widest text-outline">
                      Est. {brand.founded}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="font-(family-name:--font-manrope) text-lg font-light text-stone-700 italic">
                      {brand.tagline}
                    </p>
                    <p className="font-(family-name:--font-inter) text-sm text-secondary leading-relaxed">
                      {brand.body}
                    </p>
                    <span className="font-(family-name:--font-inter) text-xs uppercase tracking-widest text-primary flex items-center gap-2 pt-2 group-hover:gap-3 transition-all duration-300">
                      Utforska →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="bg-inverse-surface py-24 px-6">
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div>
              <h2 className="font-(family-name:--font-manrope) text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                Hitta din sko.
              </h2>
              <p className="font-(family-name:--font-inter) text-base text-stone-400 max-w-md leading-relaxed">
                Alla märken finns i vår butik på Storgatan 11 i Anderstorp. Välkommen in — vi hjälper dig hitta rätt.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                href="/skor"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-(family-name:--font-manrope) font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-primary/90 transition-all duration-300"
              >
                Se sortimentet →
              </Link>
              <Link
                href="/skovard"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-stone-600 text-stone-300 font-(family-name:--font-manrope) font-bold uppercase tracking-widest text-xs rounded-sm hover:border-stone-400 transition-all duration-300"
              >
                Skövård
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
