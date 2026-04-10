import Image from "next/image";
import Link from "next/link";

interface HomeHeroData {
  heading?: string;
  address?: string;
  hours?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: { url?: string; alt?: string };
}

interface Props {
  data?: HomeHeroData | null;
}

const FALLBACK = {
  heading: "Skor med känsla\nsedan generationer",
  address: "Storgatan 11, Anderstorp",
  hours: "Mån–Fre: 10–18",
  ctaLabel: "Se vårt sortiment",
  ctaHref: "#collection",
  image: {
    url: "/Hero.png",
    alt: "Premium leather shoes on minimal concrete pedestal",
  },
};

export default function HomeHero({ data }: Props) {
  const d = {
    heading:  data?.heading  ?? FALLBACK.heading,
    address:  data?.address  ?? FALLBACK.address,
    hours:    data?.hours    ?? FALLBACK.hours,
    ctaLabel: data?.ctaLabel ?? FALLBACK.ctaLabel,
    ctaHref:  data?.ctaHref  ?? FALLBACK.ctaHref,
    image:    data?.image    ?? FALLBACK.image,
  };

  const lines = d.heading.split("\n");

  return (
    <section className="relative h-[795px] flex items-center px-6 md:px-12 overflow-hidden bg-surface-container">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        {d.image.url && (
          <Image
            src={d.image.url}
            alt={d.image.alt ?? "Hero"}
            fill
            priority
            className="object-cover brightness-75"
            sizes="100vw"
          />
        )}
        {/* Directional gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        {/* Eyebrow */}
        <p className="text-white/60 text-xs uppercase tracking-[0.25em] font-(family-name:--font-inter) font-medium mb-6">
          Sedan generationer · Anderstorp
        </p>

        <h1 className="font-(family-name:--font-manrope) text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.9] tracking-tighter mb-8">
          {lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </h1>

        {/* Thin decorative rule */}
        <div className="w-16 h-px bg-primary mb-8" />

        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Address badge */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 px-6 py-4 rounded-lg">
            <p className="text-white/90 font-medium tracking-tight">{d.address}</p>
            <p className="text-white/60 text-sm">{d.hours}</p>
          </div>

          {/* CTA */}
          <Link
            href={d.ctaHref}
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white font-(family-name:--font-manrope) font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-primary/30"
          >
            {d.ctaLabel}
            <span className="text-base leading-none">→</span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-white/40 text-[10px] uppercase tracking-widest font-(family-name:--font-inter)">Scrolla</span>
        <span className="text-white/50 text-lg animate-bounce">↓</span>
      </div>
    </section>
  );
}
