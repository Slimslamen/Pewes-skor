import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GaborHero from "@/components/blocks/GaborHero";
import GaborFeatures from "@/components/blocks/GaborFeatures";
import Reveal from "@/components/blocks/Reveal";
import BrandProductGrid from "@/components/blocks/BrandProductGrid";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Gabor",
  description:
    "Gabor damskor hos Pewes Skor i Anderstorp. Tyskt hantverk, naturmaterial och exceptionell passform sedan 1949 — utforska hela Gabor-kollektionen.",
  path:        "/varumarken/gabor",
});

type Feature = {
  num:     string;
  eyebrow: string;
  title:   string;
  body:    string;
  image:   string;
  alt:     string;
  reverse: boolean;
};

const FEATURES: Feature[] = [
  {
    num:     "01",
    eyebrow: "Sneakers",
    title:   "Vardagselegans för den aktiva foten",
    body:    "Lätta sulor, mjukt naturläder och en passform som följer foten från första steget. Gabors sneakers förenar sportig komfort med en tidlös silhuett — byggda för hela dagen, från morgonpromenaden till kvällens middag.",
    image:   "/gabor/sneaker.png",
    alt:     "Gabor sneaker i ljust naturläder",
    reverse: false,
  },
  {
    num:     "02",
    eyebrow: "Sandaler",
    title:   "Sommarens följeslagare",
    body:    "Mjukt läder, formbar innersula och säkra remmar som sitter precis där de ska. Gabors sandaler är framtagna för att bära foten genom ljusa dagar utan kompromiss — lika hemma på kullerstenen som i sanden.",
    image:   "/gabor/sandaler.png",
    alt:     "Gabor sandal i mjukt läder",
    reverse: true,
  },
  {
    num:     "03",
    eyebrow: "Pumps & Loafers",
    title:   "Klassisk elegans, modern komfort",
    body:    "Från morgonmötet till kvällens middag. Gabors loafers och pumps förenar det klassiska hantverket från Rosenheim med en inre konstruktion som faktiskt vill bäras — hela dagen, varje dag, utan att tumma på linjerna.",
    image:   "/gabor/loafer.png",
    alt:     "Gabor loafer i mörkt läder",
    reverse: false,
  },
];

const MOCK_SHOES = [
  {
    name: "Gabor Rollingsoft Sneaker",
    price: "1.399 kr",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    image: "/gabor/sneaker.png",
    category: "Sneakers",
  },
  {
    name: "Gabor Comfort Sandal",
    price: "899 kr",
    sizes: ["37", "38", "39", "40", "41"],
    image: "/gabor/sandaler.png",
    category: "Sandaler",
  },
  {
    name: "Gabor Classic Loafer",
    price: "1.100 kr",
    sizes: ["36", "37", "38", "39", "40"],
    image: "/gabor/loafer.png",
    category: "Loafers",
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
      <Header />
      <main>

        <GaborHero />

        {/* ── ALTERNATING FEATURE ROWS ── */}
        <GaborFeatures features={FEATURES} />

        {/* ── PRODUCT LIST ── */}
        <div className="bg-white border-t border-stone-100">
          <div className="max-w-7xl mx-auto px-6 pt-24">
            <Reveal>
              <h2 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-2 font-(family-name:--font-inter)">
                Aktuellt sortiment
              </h2>
            </Reveal>
          </div>
          <BrandProductGrid brandName="Gabor" shoes={MOCK_SHOES} />
        </div>

  {/* ── HERITAGE: pull-quote left, body right ── */}
        <section className="bg-stone-50 py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              {/* Left: pull-quote */}
              <Reveal from="left">
                <blockquote className="font-(family-name:--font-manrope) text-3xl md:text-4xl font-light text-stone-900 leading-relaxed italic">
                  &ldquo;En välsittande sko är en välmående fot.&rdquo;
                </blockquote>
                <div className="mt-10 h-px w-20 bg-primary" />
                <p className="mt-4 font-(family-name:--font-inter) text-xs uppercase tracking-widest text-primary">
                  Gabors filosofi sedan 1949
                </p>
              </Reveal>

              {/* Right: brand story */}
              <Reveal from="right" delay={0.1} className="space-y-6">
                <span className="font-(family-name:--font-inter) text-xs uppercase tracking-widest text-primary block">
                  Tyskt Damhantverk
                </span>
                <p className="font-(family-name:--font-inter) text-lg text-secondary leading-relaxed">
                  Från sin bas i Rosenheim i Bayern tillverkar Gabor damskor av naturmaterial i kombination med modern teknik. Varje modell genomgår noggranna passformsstudier för att ge en sko som smälter samman med foten — vare sig du väljer sandal, sneaker eller loafer.
                </p>
                <p className="font-(family-name:--font-inter) text-base text-outline leading-relaxed">
                  Hos Pewes Skor i Anderstorp hittar du ett noggrant urval av Gabors säsongsmodeller, utvalda med den svenska damfoten i fokus.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
