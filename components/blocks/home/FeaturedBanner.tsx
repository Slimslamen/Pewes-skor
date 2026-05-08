import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";

interface FeaturedBannerData {
  eyebrow?:       string | null;
  heading?:       string | null;
  headingAccent?: string | null;
  headingRest?:   string | null;
  body?:          string | null;
  cta1Label?:     string | null;
  cta1Href?:      string | null;
  cta2Label?:     string | null;
  cta2Href?:      string | null;
  stats?:         Array<{ value?: string | null; label?: string | null }> | null;
  image?:         { url?: string | null; alt?: string | null } | null;
  badgeLabel?:    string | null;
}

interface Props {
  data?: FeaturedBannerData | null;
}

const FALLBACK_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCXWueTO72_4Vp8RNvWcEfrTNnIFpWBC6HJqhn234wOMAUoPPThRvKtqwH_NJyEzG1Bh_aT-aTnui-00yK5BEkaiBe4aSEzSpkjFAb84rCHg0_h_kUJprc5d46KEe4cf30PmOkxqLwyCHOM_cLZHVSZwfzPBYUmEYQ7nYPWQ8qRNXBZFHO-6SYrP8lnNRiEJXlfYETanWiEUEsgJ77EhlNL4Yqxm1mHy6MSEClH_6__wXYTtN2rS4cij1dvhGE9KOL2Bq3ONbaii2GQ";

const FALLBACK_STATS = [
  { value: "200+",    label: "Modeller" },
  { value: "5",       label: "Varumärken" },
  { value: "1 butik", label: "Anderstorp" },
];

export default function FeaturedBanner({ data }: Props) {
  const eyebrow     = data?.eyebrow     ?? "Ny Kollektion · 2026";
  const heading     = data?.heading     ?? "Utforska";
  const accent      = data?.headingAccent ?? "vårens";
  const headingRest = data?.headingRest ?? "nyheter";
  const body        = data?.body        ?? "Noggrant utvalda stilar för den nya säsongen. Från klassiska oxfords till moderna sneakers — alltid med fokus på komfort och hantverk.";
  const cta1Label   = data?.cta1Label   ?? "Dam";
  const cta1Href    = data?.cta1Href    ?? "/skor/dam";
  const cta2Label   = data?.cta2Label   ?? "Herr";
  const cta2Href    = data?.cta2Href    ?? "/skor/herr";
  const stats       = data?.stats?.length ? data.stats : FALLBACK_STATS;
  const imageUrl    = data?.image?.url  ?? FALLBACK_IMAGE;
  const imageAlt    = data?.image?.alt  ?? "Ny skokollektion 2026";
  const badge       = data?.badgeLabel  ?? "Ny kollektion";

  return (
    <section className="bg-surface-container-low overflow-hidden">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">

        {/* Left — editorial text */}
        <Reveal from="left" className="flex flex-col justify-center px-10 py-20 md:px-16 lg:px-24 order-2 lg:order-1">
          <span className="font-(family-name:--font-inter) text-xs uppercase tracking-[0.2em] text-primary font-bold mb-6">
            {eyebrow}
          </span>
          <h2 className="font-(family-name:--font-manrope) text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tighter text-on-surface leading-[0.95] mb-6">
            {heading}<br />
            <span className="text-primary">{accent}</span>{headingRest ? ` ${headingRest}` : ""}
          </h2>
          <p className="text-secondary font-light text-lg leading-relaxed max-w-md mb-10">
            {body}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={cta1Href}
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-(family-name:--font-manrope) font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-primary/90 transition-all duration-300 shadow-md shadow-primary/20"
            >
              {cta1Label} <span>→</span>
            </Link>
            <Link
              href={cta2Href}
              className="inline-flex items-center gap-3 px-8 py-4 border border-outline/30 text-on-surface font-(family-name:--font-manrope) font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-surface transition-all duration-300"
            >
              {cta2Label} <span>→</span>
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-14 flex gap-10 border-t border-outline/10 pt-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-(family-name:--font-manrope) text-2xl font-bold text-on-surface">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-widest text-outline mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Right — image */}
        <Reveal from="right" className="relative order-1 lg:order-2 min-h-90 lg:min-h-0">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-surface-container-low/10" />
          <div className="absolute bottom-6 right-6 bg-primary text-white px-5 py-3 rounded-sm shadow-lg">
            <p className="font-(family-name:--font-manrope) text-xs font-bold uppercase tracking-widest">
              {badge}
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
