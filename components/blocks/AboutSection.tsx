"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

interface AboutData {
  eyebrow?: string;
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: { url?: string; alt?: string };
}

interface Props {
  data?: AboutData | null;
}

const FALLBACK: AboutData = {
  eyebrow: "Vårt Arv",
  heading: "En personlig skoaffär med hjärtat i Anderstorp.",
  body: "Sedan generationer har Pewes Skor varit platsen där hantverk möter personlig service. Vi tror på kvalitet som känns i varje steg, och på relationer som varar lika länge som våra skor. Vår butik på Storgatan är mer än bara en affär – det är en del av vår familjehistoria.",
  ctaLabel: "Läs mer om oss",
  ctaHref: "#",
  image: {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB35ZrxF02880phzT7ssz7OnxfTjwwtp-dYdU__7EEkC_6kQHZiJ6kNpPfxKMpLMzOVXuEiO5P-ovcw9RnNmmqB68p17b8vQz1JYyYIi3BD_EVCj6Wu4o97n9lQ4_QMh7_EwbHaWQlvFEwQJ7LUzi0Fj8CzQxoA8A5PcOhbB_8a5h8KtPNgvrLase_OwKXNag66A5_NGf-Hdf4Zrm544tUZsoLSqduBVdxwHArKSn7XCdJFXHCwaGSjOaadn4T6bUZVxI8GzLtz_i-3",
    alt: "Interior of Pewes Skor boutique with warm wood shelving",
  },
};

export default function AboutSection({ data }: Props) {
  const d = {
    eyebrow:  data?.eyebrow  ?? FALLBACK.eyebrow,
    heading:  data?.heading  ?? FALLBACK.heading,
    body:     data?.body     ?? FALLBACK.body,
    ctaLabel: data?.ctaLabel ?? FALLBACK.ctaLabel,
    ctaHref:  data?.ctaHref  ?? FALLBACK.ctaHref,
    image:    data?.image    ?? FALLBACK.image,
  };

  return (
    <section className="py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        {/* Image */}
        <Reveal from="left" className="relative order-2 lg:order-1">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl" />
          {d.image?.url && (
            <div className="relative rounded-xl overflow-hidden shadow-2xl w-full aspect-[4/5]">
              <Image
                src={d.image.url}
                alt={d.image.alt ?? "Om oss"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </Reveal>

        {/* Text */}
        <Reveal from="right" delay={0.1} className="order-1 lg:order-2 space-y-8">
          <span className="font-(family-name:--font-inter) text-xs uppercase tracking-[0.2em] text-primary font-bold">
            {d.eyebrow}
          </span>
          <h2 className="font-(family-name:--font-manrope) text-4xl md:text-5xl font-bold text-on-surface tracking-tight leading-tight">
            {d.heading}
          </h2>
          <p className="text-secondary text-lg leading-relaxed font-light">
            {d.body}
          </p>
          <div className="pt-4">
            <Link
              href={d.ctaHref ?? "#"}
              className="inline-flex items-center gap-2 group text-on-surface font-(family-name:--font-manrope) font-bold uppercase tracking-widest text-xs"
            >
              {d.ctaLabel}
              <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
