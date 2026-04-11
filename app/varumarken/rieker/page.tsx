import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RiekerHero from "@/components/blocks/RiekerHero";
import Reveal from "@/components/blocks/Reveal";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Rieker",
  description:
    "Rieker skor hos Pewes Skor i Anderstorp. ANTISTRESS-teknologi, lättvikt och komfort för hela dagen sedan 1874 — utforska hela Rieker-kollektionen.",
  path:        "/varumarken/rieker",
});

const PILLARS = [
  {
    num: "01",
    title: "Lättvikt",
    body: "Materialen är noggrant valda för att minimera vikt utan att ge avkall på hållbarhet. Foten tröttas aldrig ut.",
  },
  {
    num: "02",
    title: "Flexibilitet",
    body: "Sulan följer fotens naturliga rörelse. Inget motstånd, inget tryck — bara naturlig komfort i varje steg.",
  },
  {
    num: "03",
    title: "Extra utrymme",
    body: "Tåboxen och breddpassformen ger foten luft att andas. Inga klämmande skor, inga skavsår.",
  },
];

export default function RiekerPage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[
        { name: "Hem",        path: "/" },
        { name: "Varumärken", path: "/varumarken" },
        { name: "Rieker",     path: "/varumarken/rieker" },
      ]} />
      <Header />
      <main className="pt-20">

        <RiekerHero />

        {/* ── ANTISTRESS PILLARS: numbered cards with top rule ── */}
        <section className="bg-stone-50 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {PILLARS.map(({ num, title, body }, i) => (
                <Reveal key={num} delay={i * 0.12} className="border-t-2 border-primary pt-8">
                  <span className="font-(family-name:--font-manrope) text-5xl font-thin text-outline block mb-6">
                    {num}
                  </span>
                  <h3 className="font-(family-name:--font-manrope) text-2xl font-bold text-stone-900 mb-4">
                    {title}
                  </h3>
                  <p className="font-(family-name:--font-inter) text-sm text-secondary leading-relaxed">
                    {body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── HERITAGE: text left (container-aligned), video breaks to right edge on desktop ── */}
        <section className="bg-white">
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-2">
            {/* Left: heritage copy */}
            <Reveal from="left" className="px-6 py-24 lg:py-40 lg:pr-20 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
              <div className="max-w-xl">
                <span className="font-(family-name:--font-inter) text-xs uppercase tracking-widest text-primary block mb-10">
                  150 År av Komfort
                </span>
                <h2 className="font-(family-name:--font-manrope) text-4xl md:text-5xl font-light text-stone-900 leading-tight mb-12">
                  Rieker har under 150 år tillverkat skor som kroppen tackar dig för.
                </h2>
                <p className="font-(family-name:--font-inter) text-lg text-secondary leading-relaxed">
                  Sedan starten i Tuttlingen 1874 har Rieker levererat skor för det verkliga livet. ANTISTRESS-filosofin bygger på att skon ska vara lätt, flexibel och skonsam mot foten hela dagen — oavsett om du promenerar i city, arbetar på stan eller njuter av en dagsutflykt i naturen.
                </p>
              </div>
            </Reveal>

            {/* Right: looping video — full-bleed to viewport edge on desktop */}
            <Reveal from="right" delay={0.1} className="relative aspect-4/5 w-full overflow-hidden bg-stone-100 lg:aspect-auto lg:h-full lg:min-h-175">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/rieker/video.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
