import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GaborHero from "@/components/blocks/GaborHero";
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

export default function GaborPage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[
        { name: "Hem",        path: "/" },
        { name: "Varumärken", path: "/varumarken" },
        { name: "Gabor",      path: "/varumarken/gabor" },
      ]} />
      <Header links={brandLinks} />
      <main>

        <GaborHero />

        {/* ── ALTERNATING FEATURE ROWS ── */}
        <section className="bg-white">
          {FEATURES.map(({ num, eyebrow, title, body, image, alt, reverse }) => (
            <div
              key={num}
              className="grid grid-cols-1 items-stretch md:grid-cols-2"
            >
              {/* Image */}
              <div
                className={`relative aspect-[4/3] md:aspect-auto md:min-h-[70vh] ${
                  reverse ? "md:order-2" : "md:order-1"
                } bg-stone-100`}
              >
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <div
                className={`flex flex-col justify-center px-8 py-20 md:px-16 lg:px-24 ${
                  reverse ? "md:order-1" : "md:order-2"
                } ${reverse ? "bg-stone-50" : "bg-white"}`}
              >
                <span className="font-(family-name:--font-inter) mb-6 block text-xs uppercase tracking-[0.3em] text-primary">
                  {num} · {eyebrow}
                </span>
                <h2 className="font-(family-name:--font-manrope) mb-8 text-3xl font-light leading-tight text-stone-900 md:text-4xl lg:text-5xl">
                  {title}
                </h2>
                <div className="mb-8 h-px w-16 bg-primary" />
                <p className="font-(family-name:--font-inter) max-w-md text-base leading-relaxed text-secondary">
                  {body}
                </p>
              </div>
            </div>
          ))}
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
