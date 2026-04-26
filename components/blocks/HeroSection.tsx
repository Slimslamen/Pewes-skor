"use client";

import Link from "next/link";

const BRANDS = [
  "ECCO", "Rieker", "Gabor", "Skechers", "DOLOMITE",
  "Kavat", "Vagabond", "Merrell", "Ten Points", "Ara",
  "ECCO", "Rieker", "Gabor", "Skechers", "DOLOMITE",
  "Kavat", "Vagabond", "Merrell", "Ten Points", "Ara",
];

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover z-0 opacity-20"
        src="/gabor/video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Main grid */}
      <div className="flex-1 grid grid-cols-2 items-end px-16 pb-16 pt-32 z-10">
        {/* Left: headline */}
        <div className="flex flex-col gap-4">
          <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
            Anderstorp · Sedan 1948
          </span>
          <h1
            className="font-(family-name:--font-manrope) font-black leading-[0.88] tracking-[-0.05em] text-on-surface"
            style={{ fontSize: "clamp(72px, 10vw, 140px)" }}
          >
            Pewes<br />Skor
          </h1>
          <p className="font-(family-name:--font-inter) font-light text-base text-secondary leading-[1.65] mt-2 max-w-72">
            Skoaffär med hjärtat<br />i Anderstorp — sedan generationer.
          </p>
          <div className="flex gap-3 mt-5">
            <Link
              href="#collection"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-white font-(family-name:--font-manrope) font-bold text-[11px] uppercase tracking-[0.16em] rounded-sm hover:opacity-85 transition-opacity"
            >
              Se sortiment
            </Link>
            <Link
              href="#hitta"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-outline/30 text-on-surface font-(family-name:--font-manrope) font-bold text-[11px] uppercase tracking-[0.16em] rounded-sm hover:bg-surface-container transition-colors"
            >
              Hitta hit
            </Link>
          </div>
        </div>

        {/* Right: descriptor */}
        <div className="flex flex-col items-end gap-3 pb-2">
          <p className="font-(family-name:--font-inter) text-sm text-secondary leading-[1.7] text-right max-w-56 font-light">
            Premium skor för hela familjen.<br />
            Storgatan 11, Anderstorp.
          </p>
          <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.22em] text-outline">
            MÅN–FRE 10–18 · LÖR 10–13
          </span>
          <div className="w-px h-16 bg-outline-variant mt-2" />
        </div>
      </div>

      {/* Brand marquee band */}
      <div className="border-t border-outline-variant overflow-hidden whitespace-nowrap py-3.5 bg-surface-container-low">
        <div
          className="inline-flex animate-marquee"
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
          {BRANDS.map((b, i) => (
            <span
              key={i}
              className="font-(family-name:--font-manrope) text-[12px] font-bold uppercase tracking-[0.22em] text-outline mr-16 flex-shrink-0"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
