"use client";

import Link from "next/link";

interface HeroData {
  heading?:  string | null;
  subtext?:  string | null;
  address?:  string | null;
  hours?:    string | null;
  ctaLabel?: string | null;
  ctaHref?:  string | null;
}

interface Props {
  data?:   HeroData | null;
  brands?: Array<{ name: string }> | null;
}

const FALLBACK_BRANDS = [
  "ECCO", "Rieker", "Gabor", "Skechers", "DOLOMITE",
  "Kavat", "Vagabond", "Merrell", "Ten Points", "Ara",
];

export default function HeroSection({ data, brands }: Props) {
  const heading  = data?.heading  ?? "Pewes\nSkor";
  const subtext  = data?.subtext  ?? "Skoaffär med hjärtat\ni Anderstorp — sedan generationer.";
  const address  = data?.address  ?? "Premium skor för hela familjen.\nStorgatan 11, Anderstorp.";
  const hours    = data?.hours    ?? "MÅN–FRE 10–18 · LÖR 10–13";
  const ctaLabel = data?.ctaLabel ?? "Se sortiment";
  const ctaHref  = data?.ctaHref  ?? "#collection";

  const brandList = brands?.length ? brands.map((b) => b.name) : FALLBACK_BRANDS;
  const marqueeItems = [...brandList, ...brandList];

  return (
    <section className="relative h-screen flex flex-col overflow-hidden" aria-label="Välkommen till Pewes Skor">
      {/* Decorative background video — hidden from assistive tech */}
      <video
        className="absolute inset-0 h-full w-full object-cover z-0 opacity-20"
        src="/gabor/video.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Main grid — stacks on mobile, side-by-side on md+ */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 items-end px-6 md:px-16 pb-10 md:pb-16 pt-28 md:pt-32 z-10">
        {/* Left: headline */}
        <div className="flex flex-col gap-4">
          <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
            Anderstorp · Sedan 1948
          </span>
          <h1
            className="font-(family-name:--font-manrope) font-black leading-[0.88] tracking-[-0.05em] text-on-surface"
            style={{ fontSize: "clamp(56px, 10vw, 140px)" }}
          >
            {heading.split("\n").map((part, i, arr) => (
              <span key={i}>{part}{i < arr.length - 1 && <br />}</span>
            ))}
          </h1>
          <p className="font-(family-name:--font-inter) font-light text-base text-secondary leading-[1.65] mt-2 max-w-72">
            {subtext.split("\n").map((line, i) => (
              <span key={i}>{line}{i < subtext.split("\n").length - 1 && <br />}</span>
            ))}
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-white font-(family-name:--font-manrope) font-bold text-[11px] uppercase tracking-[0.16em] rounded-sm hover:opacity-85 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {ctaLabel}
            </Link>
            <Link
              href="#hitta"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-outline/30 text-on-surface font-(family-name:--font-manrope) font-bold text-[11px] uppercase tracking-[0.16em] rounded-sm hover:bg-surface-container transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Hitta hit
            </Link>
          </div>
        </div>

        {/* Right: descriptor — hidden on smallest screens to preserve clarity */}
        <div className="hidden md:flex flex-col items-end gap-3 pb-2">
          <p className="font-(family-name:--font-inter) text-sm text-secondary leading-[1.7] text-right max-w-56 font-light">
            {address.split("\n").map((line, i) => (
              <span key={i}>{line}{i < address.split("\n").length - 1 && <br />}</span>
            ))}
          </p>
          <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.22em] text-outline">
            {hours}
          </span>
          <div className="w-px h-16 bg-outline-variant mt-2" aria-hidden="true" />
        </div>
      </div>

      {/* Brand marquee band */}
      <div
        className="border-t border-outline-variant overflow-hidden whitespace-nowrap py-3.5 bg-surface-container-low z-10"
        aria-hidden="true"
      >
        <div
          className="inline-flex animate-marquee"
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
          {marqueeItems.map((name, i) => (
            <span
              key={i}
              className="font-(family-name:--font-manrope) text-[12px] font-bold uppercase tracking-[0.22em] text-outline mr-16 shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
