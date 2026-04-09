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
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmqIpNQH_vWKwngta9L0T3bUAlNXdexkNfHFcKifOcabOLF6z0aO4oDip-9qW2O2lNvi4msz4Cg7wKIrVzd9jrJ6MzvB5o_uVN3Ry239z_xukptbM1jOswvhHvLBd16TXnFqFjbHQ-Ptn2UnGSxrJSmXEX6lqEfIip24-7Z6QwqNVfmjr6nNNF2Y6x35U9ETz6etW_tGCEz5eUZVNGn-EDNoIXHD3LIMqjVKhHebm-NHBlh4iYlx7Y9s1QNir5alfqHlKXwZJ0RtLd",
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
            className="object-cover grayscale-[0.2] brightness-90"
            sizes="100vw"
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        <h1 className="font-(family-name:--font-manrope) text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.9] tracking-tighter mb-6">
          {lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Address badge */}
          <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-lg">
            <p className="text-white/90 font-medium tracking-tight">{d.address}</p>
            <p className="text-white/70 text-sm">{d.hours}</p>
          </div>

          {/* CTA */}
          <Link
            href={d.ctaHref}
            className="inline-flex items-center px-10 py-5 bg-primary text-white font-(family-name:--font-manrope) font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-primary-container transition-all duration-300 transform hover:-translate-y-1"
          >
            {d.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
