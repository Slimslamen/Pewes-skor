"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { useProgress } from "@react-three/drei";
import Link from "next/link";
import HeroShoe3DScene from "./HeroShoe3DScene";

interface HeroData {
  heading?: string;
  address?: string;
  hours?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

interface Props {
  data?: HeroData | null;
}

const FALLBACK = {
  heading: "Skor med känsla\nsedan generationer",
  address: "Storgatan 11, Anderstorp",
  hours: "Mån–Fre: 10–18",
  ctaLabel: "Se vårt sortiment",
  ctaHref: "#collection",
};

export default function HeroShoe3D({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Overlay copy fades out as the camera starts its approach.
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35], [1, 1, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [1, 1, 0]);

  const { progress: loadProgress, active: loadActive } = useProgress();
  const loaderVisible = loadActive || loadProgress < 100;

  // Dynamic-imported with ssr: false, so window is available at first render.
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 767px)").matches,
  );

  useEffect(() => {
    const mm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mq = window.matchMedia("(max-width: 767px)");
    const onMM = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const onMQ = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mm.addEventListener("change", onMM);
    mq.addEventListener("change", onMQ);
    return () => {
      mm.removeEventListener("change", onMM);
      mq.removeEventListener("change", onMQ);
    };
  }, []);

  const d = {
    heading:  data?.heading  ?? FALLBACK.heading,
    address:  data?.address  ?? FALLBACK.address,
    hours:    data?.hours    ?? FALLBACK.hours,
    ctaLabel: data?.ctaLabel ?? FALLBACK.ctaLabel,
    ctaHref:  data?.ctaHref  ?? FALLBACK.ctaHref,
  };
  const lines = d.heading.split("\n");

  return (
    <div
      ref={containerRef}
      className="relative h-[500vh] md:h-[450vh] bg-surface-container"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 3D canvas layer */}
        <div className="absolute inset-0">
          <HeroShoe3DScene
            progress={scrollYProgress}
            reducedMotion={reducedMotion}
            isMobile={isMobile}
          />
        </div>

        {/* Subtle vignette to lift copy legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-surface/70 via-surface/20 to-transparent pointer-events-none" />

        {/* Overlay copy */}
        <motion.div
          className="relative z-10 h-full flex items-center px-6 md:px-12 pointer-events-none"
          style={{ opacity: overlayOpacity }}
        >
          <div className="max-w-4xl pointer-events-auto">
            <p className="text-on-surface/60 text-xs uppercase tracking-[0.25em] font-(family-name:--font-inter) font-medium mb-6">
              Sedan generationer · Anderstorp
            </p>

            <h1 className="font-(family-name:--font-manrope) text-5xl md:text-7xl lg:text-8xl font-extrabold text-on-surface leading-[0.9] tracking-tighter mb-8">
              {lines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < lines.length - 1 && <br />}
                </span>
              ))}
            </h1>

            <div className="w-16 h-px bg-primary mb-8" />

            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="bg-white/70 backdrop-blur-md border border-outline-variant/40 px-6 py-4 rounded-lg">
                <p className="text-on-surface font-medium tracking-tight">{d.address}</p>
                <p className="text-secondary text-sm">{d.hours}</p>
              </div>

              <Link
                href={d.ctaHref}
                className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white font-(family-name:--font-manrope) font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-primary/30"
              >
                {d.ctaLabel}
                <span className="text-base leading-none">→</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: scrollHintOpacity }}
        >
          <span className="text-on-surface/60 text-[10px] uppercase tracking-widest font-(family-name:--font-inter)">
            Scrolla
          </span>
          <span className="text-primary text-lg animate-bounce">↓</span>
        </motion.div>

        {/* Loading bar (GLB is large — keep user oriented) */}
        <div
          className="absolute top-0 left-0 right-0 z-20 pointer-events-none transition-opacity duration-500"
          style={{ opacity: loaderVisible ? 1 : 0 }}
        >
          <div className="h-0.5 w-full bg-outline-variant/30">
            <div
              className="h-full bg-primary origin-left transition-transform duration-200 ease-out"
              style={{ transform: `scaleX(${Math.max(0, Math.min(1, loadProgress / 100))})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
