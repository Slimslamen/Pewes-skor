"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { useScroll, useTransform, useMotionValue, motion } from "motion/react";

export interface AnatomyZone {
  label: string;
  title: string;
  body: string;
}

interface Props {
  zones?: AnatomyZone[];
  sectionTitle?: string;
}

const FALLBACK_ZONES: AnatomyZone[] = [
  {
    label: "01 / Sula",
    title: "Sulan",
    body: "Dynamic flex rubber med horisontella spår för maximalt grepp och flexibilitet i varje steg.",
  },
  {
    label: "02 / Mellansulna",
    title: "PHORENE™ mellansullan",
    body: "Ultralätt skum som ger energiåterledning och stötdämpning.",
  },
  {
    label: "03 / Innersula",
    title: "Dual-Fit innersula",
    body: "Avtagbar innersula i textil som anpassar skons bredd efter din fot.",
  },
  {
    label: "04 / Ovandel",
    title: "ECCO GRUUV STUDIO",
    body: "Handsytt premium läder från ECCOs egna garveri. FLUIDFORM™ direktgjutning för sömlös komfort.",
  },
];

// Scroll zone map (0 → 1):
//   0–20%   assembled, static
//   20–40%  outsole ↓160px, midsole ↓80px  → annotation 1
//   40–60%  insole ↑100px                   → annotation 2
//   60–80%  insole ↑160px total             → annotation 3
//   80–100% everything reassembles          → annotation 4

export default function ShoeAnatomy({
  zones = FALLBACK_ZONES,
  sectionTitle = "Anatomy of Innovation",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // ─── Scroll tracking ──────────────────────────────────────────────
  // Track window scrollY — always reliable, never depends on element position
  // being settled at hook-initialisation time.
  const { scrollY } = useScroll();

  // Fix 2: bounds as MotionValues so useTransform always reads live values —
  // no stale-closure problem.
  const boundsStart = useMotionValue(0);
  const boundsEnd   = useMotionValue(1);

  useEffect(() => {
    function measure() {
      const el = containerRef.current;
      if (!el) return;
      // Fix 1: getBoundingClientRect() + scrollY gives exact document position
      // (offsetTop can be wrong inside flex/grid parents).
      const rect   = el.getBoundingClientRect();
      const top    = rect.top + window.scrollY;
      const height = rect.height;                   // 500vh in px after layout
      const vh     = window.innerHeight;
      boundsStart.set(top);
      boundsEnd.set(top + height - vh);
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [boundsStart, boundsEnd]);

  // Fix 2: three-MotionValue form — transformer always receives live values,
  // no stale ref closure.
  const scrollYProgress = useTransform(
    [scrollY, boundsStart, boundsEnd],
    ([y, start, end]: number[]) => {
      if (end <= start) return 0;
      const p = (y - start) / (end - start);
      return Math.max(0, Math.min(1, p));
    }
  );

  // Verification: log progress while developing — remove before shipping
  useEffect(() => {
    return scrollYProgress.on("change", (v) =>
      console.log("[ShoeAnatomy] scrollYProgress:", v.toFixed(3))
    );
  }, [scrollYProgress]);

  // ─── Layer y-transforms ───────────────────────────────────────────
  const outsoleY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4,  0.8,  1],
    [0,   0,  160,  160,  0]
  );
  const midsoleY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.8, 1],
    [0,   0,  80,  80,  0]
  );
  const insoleY = useTransform(
    scrollYProgress,
    [0, 0.4, 0.55, 0.65, 0.8, 1],
    [0,   0, -100, -160, -160, 0]
  );

  // ─── Annotation opacities ─────────────────────────────────────────
  const zone1Opacity = useTransform(scrollYProgress, [0.18, 0.25, 0.37, 0.42], [0, 1, 1, 0]);
  const zone2Opacity = useTransform(scrollYProgress, [0.38, 0.45, 0.57, 0.62], [0, 1, 1, 0]);
  const zone3Opacity = useTransform(scrollYProgress, [0.58, 0.65, 0.77, 0.82], [0, 1, 1, 0]);
  const zone4Opacity = useTransform(scrollYProgress, [0.78, 0.85, 0.97, 1.0],  [0, 1, 1, 0]);
  const zoneOpacities = [zone1Opacity, zone2Opacity, zone3Opacity, zone4Opacity];

  const assembledOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 0.9],
    [1,    0,    0,   1]
  );

  return (
    // 500vh scroll container — its height drives the animation range
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>

      {/* Sticky frame — NO overflow-hidden so animated layers can escape */}
      <div className="sticky top-0 h-screen bg-surface flex flex-col">

        {/* Title */}
        <div className="pt-8 pb-4 text-center shrink-0">
          <h2 className="font-(family-name:--font-manrope) text-2xl md:text-4xl font-bold tracking-tight text-on-surface">
            {sectionTitle}
          </h2>
          <div className="h-0.5 w-16 bg-primary mx-auto mt-3" />
        </div>

        {/* Shoe + annotations */}
        <div className="flex-1 flex flex-col lg:flex-row items-center max-w-7xl mx-auto w-full px-6 pb-8">

          {/* ── Left 55%: layered shoe ── */}
          <div
            className="w-full lg:w-[55%] flex items-center justify-center"
            style={{ pointerEvents: "none" }}
          >
            {/*
              480 × 480 relative container.
              Layers use fill images → all same size.
              Static offset wrappers (angle compensation) wrap each motion.div.
              No overflow constraint → layers can animate outside the box.
            */}
            {/* Fix 3: overflow visible so layers that animate outside the 480×480
                box are not clipped by the browser's default overflow:hidden
                on positioned containers. */}
            <div className="relative" style={{ width: 480, height: 480, overflow: "visible" }}>

              {/* Outsole — z:1, drops down, scaleX(-1) compensates angle */}
              <div className="absolute" style={{ inset: 0, zIndex: 1, top: 12, left: -10 }}>
                <motion.div className="absolute inset-0" style={{ y: outsoleY, scaleX: -1 }}>
                  <Image
                    src="/ecco/layer-outsole.png"
                    alt="Outsole — dark rubber with flex grooves"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </div>

              {/* Midsole — z:2, drops half as much, scaleX(-1) */}
              <div className="absolute" style={{ inset: 0, zIndex: 2, top: 4, left: -5 }}>
                <motion.div className="absolute inset-0" style={{ y: midsoleY, scaleX: -1 }}>
                  <Image
                    src="/ecco/layer-midsole.png"
                    alt="Midsole — white EVA PHORENE foam"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </div>

              {/* Insole — z:3, rises up, slight scale */}
              <div className="absolute" style={{ inset: 0, zIndex: 3, top: 6, left: 0 }}>
                <motion.div className="absolute inset-0" style={{ y: insoleY, scale: 0.95 }}>
                  <Image
                    src="/ecco/layer-insole.png"
                    alt="Insole — beige dual-fit textile"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </div>

              {/* Upper — z:4 (top), anchor layer, no animation */}
              <div className="absolute" style={{ inset: 0, zIndex: 4 }}>
                <Image
                  src="/ecco/layer-upper.png"
                  alt="Upper — cognac leather"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

            </div>
          </div>

          {/* ── Right 45%: annotations ── */}
          <div className="w-full lg:w-[45%] relative" style={{ minHeight: 240 }}>

            {zones.map((zone, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 flex flex-col justify-center"
                style={{ opacity: zoneOpacities[i] }}
              >
                <AnnotationPanel zone={zone} />
              </motion.div>
            ))}

            {/* Assembled hint — visible before scroll starts and after reassembly */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-center"
              style={{ opacity: assembledOpacity }}
            >
              <div className="border-l-2 border-primary pl-6 space-y-3">
                <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.25em] text-primary font-bold">
                  ECCO GRUUV STUDIO
                </span>
                <p className="font-(family-name:--font-inter) text-sm text-secondary leading-relaxed max-w-xs">
                  Scrolla ned för att utforska skons uppbyggnad lager för lager.
                </p>
                <p className="text-outline text-xl animate-bounce inline-block">↓</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

function AnnotationPanel({ zone }: { zone: AnatomyZone }) {
  return (
    <div className="border-l-2 border-primary pl-6 space-y-3">
      <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.25em] text-primary font-bold block">
        {zone.label}
      </span>
      <h3 className="font-(family-name:--font-manrope) text-3xl md:text-4xl font-semibold text-on-surface leading-tight">
        {zone.title}
      </h3>
      <p className="font-(family-name:--font-inter) text-base text-secondary leading-relaxed max-w-sm">
        {zone.body}
      </p>
    </div>
  );
}
