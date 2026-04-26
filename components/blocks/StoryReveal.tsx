"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";


const LINES = [
  {
    label: "Sedan generationer",
    text: "Skor med känsla",
    sub: "Pewes Skor har funnits i Anderstorp i generationer — ett arv av kvalitet och personlig service.",
    img: "/SedanGenerationer.png",
  },
  {
    label: "Noggrant utvalda",
    text: "Kvalitet i varje steg",
    sub: "Vi bär enbart märken vi tror på. ECCO, Gabor, Rieker, Skechers — skor byggda för att hålla.",
    img: "/Kvalite.png",
  },
  {
    label: "Personlig service",
    text: "Vi hjälper dig hitta rätt",
    sub: "Välkommen in på Storgatan 11. Vår personal guidar dig till precis rätt sko för tillfället.",
    img: "/PersonligService.png",
  },
];

function remap(v: number, inA: number, inB: number, outA: number, outB: number): number {
  const t = (v - inA) / (inB - inA);
  const c = t < 0 ? 0 : t > 1 ? 1 : t;
  return outA + c * (outB - outA);
}

/** Desktop sticky-scroll version */
function StoryRevealDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const secTopRef = useRef(0);
  const vhRef = useRef(800);

  // Use absolute scroll position instead of relative progress to avoid
  // framer-motion element-tracking bugs with sticky layouts.
  const { scrollY } = useScroll();

  useEffect(() => {
    const measure = () => {
      vhRef.current = window.innerHeight;
      if (containerRef.current) {
        secTopRef.current =
          containerRef.current.getBoundingClientRect().top + window.scrollY;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Container = 500vh. Effective sticky scroll = 400vh (container – viewport).
  // Fractions below are of that 400vh range.
  //
  // Section 0: text [0.02 → 0.12],  image in [0.02 → 0.10] out [0.28 → 0.36]
  // Section 1: text [0.28 → 0.38],  image in [0.28 → 0.36] out [0.52 → 0.60]
  // Section 2: text [0.52 → 0.62],  image in [0.52 → 0.60] stays

  const op0 = useTransform(scrollY, (y) => {
    const T = secTopRef.current, V = vhRef.current * 4;
    return remap(y, T + V * 0.02, T + V * 0.12, 0, 1);
  });
  const ytx0 = useTransform(scrollY, (y) => {
    const T = secTopRef.current, V = vhRef.current * 4;
    return remap(y, T + V * 0.02, T + V * 0.12, 36, 0);
  });

  const op1 = useTransform(scrollY, (y) => {
    const T = secTopRef.current, V = vhRef.current * 4;
    return remap(y, T + V * 0.28, T + V * 0.38, 0, 1);
  });
  const ytx1 = useTransform(scrollY, (y) => {
    const T = secTopRef.current, V = vhRef.current * 4;
    return remap(y, T + V * 0.28, T + V * 0.38, 36, 0);
  });

  const op2 = useTransform(scrollY, (y) => {
    const T = secTopRef.current, V = vhRef.current * 4;
    return remap(y, T + V * 0.52, T + V * 0.62, 0, 1);
  });
  const ytx2 = useTransform(scrollY, (y) => {
    const T = secTopRef.current, V = vhRef.current * 4;
    return remap(y, T + V * 0.52, T + V * 0.62, 36, 0);
  });

  const imgOp0 = useTransform(scrollY, (y) => {
    const T = secTopRef.current, V = vhRef.current * 4;
    if (y < T + V * 0.02) return 0;
    if (y < T + V * 0.10) return remap(y, T + V * 0.02, T + V * 0.10, 0, 1);
    if (y < T + V * 0.28) return 1;
    if (y < T + V * 0.36) return remap(y, T + V * 0.28, T + V * 0.36, 1, 0);
    return 0;
  });

  const imgOp1 = useTransform(scrollY, (y) => {
    const T = secTopRef.current, V = vhRef.current * 4;
    if (y < T + V * 0.28) return 0;
    if (y < T + V * 0.36) return remap(y, T + V * 0.28, T + V * 0.36, 0, 1);
    if (y < T + V * 0.52) return 1;
    if (y < T + V * 0.60) return remap(y, T + V * 0.52, T + V * 0.60, 1, 0);
    return 0;
  });

  const imgOp2 = useTransform(scrollY, (y) => {
    const T = secTopRef.current, V = vhRef.current * 4;
    if (y < T + V * 0.52) return 0;
    if (y < T + V * 0.60) return remap(y, T + V * 0.52, T + V * 0.60, 0, 1);
    return 1;
  });

  const textOpacities = [op0, op1, op2];
  const textYs = [ytx0, ytx1, ytx2];
  const imgOpacities = [imgOp0, imgOp1, imgOp2];

  return (
    <div ref={containerRef} className="relative bg-surface" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden grid grid-cols-2">
        {/* Left: images */}
        <div className="relative overflow-hidden m-20 mr-15 rounded-sm">
          {LINES.map((line, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              style={{ opacity: imgOpacities[i] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={line.img}
                alt={line.label}
                className="w-full h-full object-cover block"
              />
            </motion.div>
          ))}
        </div>

        {/* Right: text blocks */}
        <div className="flex flex-col justify-center px-20 pl-10 gap-14">
          {LINES.map((line, i) => (
            <motion.div key={i} style={{ opacity: textOpacities[i], y: textYs[i] }}>
              <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.25em] text-primary font-bold block mb-2.5">
                {line.label}
              </span>
              <h2
                className="font-(family-name:--font-manrope) font-extrabold tracking-[-0.03em] text-on-surface leading-[1.1] mb-3"
                style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
              >
                {line.text}
              </h2>
              <p className="font-(family-name:--font-inter) text-[15px] text-secondary leading-[1.7] font-light max-w-90">
                {line.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Mobile static version — each card stacked with image + text */
function StoryRevealMobile() {
  return (
    <section className="bg-surface py-16 px-6" aria-label="Vår historia">
      <div className="flex flex-col gap-16 max-w-lg mx-auto">
        {LINES.map((line) => (
          <div key={line.label} className="flex flex-col gap-5">
            <div className="rounded-sm overflow-hidden aspect-4/3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={line.img}
                alt={line.label}
                className="w-full h-full object-cover block"
              />
            </div>
            <div>
              <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.25em] text-primary font-bold block mb-2">
                {line.label}
              </span>
              <h2
                className="font-(family-name:--font-manrope) font-extrabold tracking-[-0.03em] text-on-surface leading-[1.1] mb-3"
                style={{ fontSize: "clamp(24px, 7vw, 36px)" }}
              >
                {line.text}
              </h2>
              <p className="font-(family-name:--font-inter) text-[15px] text-secondary leading-[1.7] font-light">
                {line.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function StoryReveal() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isMobile) return <StoryRevealMobile />;
  return <StoryRevealDesktop />;
}
