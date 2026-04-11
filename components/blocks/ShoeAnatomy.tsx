"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

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
  {
    label: "Komplett",
    title: "Byggd för att hålla",
    body: "Fyra lager, en skon. Varje del samverkar för att ge dig komfort och stil du märker redan vid första steget.",
  },
];

// Image order matches zones above (reversed: assembled → parts)
const LAYER_IMAGES = [
  { src: "/ecco/layer-outsole.png", alt: "Outsole — dark rubber with flex grooves" },
  { src: "/ecco/layer-midsole.png", alt: "Midsole — white EVA PHORENE foam" },
  { src: "/ecco/layer-insole.png", alt: "Insole — beige dual-fit textile" },
  { src: "/ecco/layer-upper.png", alt: "Upper — cognac leather" },
  { src: "/ecco/shoe-assembled.png", alt: "Assembled ECCO GRUUV shoe" },
];

// Zone boundaries (sequential — outgoing reaches 0 exactly where incoming starts from 0):
//   0.00 → 0.15  outsole
//   0.15 → 0.37  midsole
//   0.37 → 0.59  insole
//   0.59 → 0.81  upper
//   0.81 → 1.00  assembled

export default function ShoeAnatomy({ zones = FALLBACK_ZONES, sectionTitle = "Anatomy of Innovation" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Opacity: each image fades OUT before the next fades IN ──────────
  // Zone 4 (assembled) gets ~30% of scroll so the user sees it fully before
  // the sticky frame releases.
  const opacity0 = useTransform(scrollYProgress, [0.00, 0.12, 0.14, 1.00],                   [1, 1, 0, 0]);
  const opacity1 = useTransform(scrollYProgress, [0.00, 0.14, 0.16, 0.26, 0.28, 1.00],       [0, 0, 1, 1, 0, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.00, 0.28, 0.30, 0.40, 0.42, 1.00],       [0, 0, 1, 1, 0, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.00, 0.42, 0.44, 0.53, 0.55, 1.00],       [0, 0, 1, 1, 0, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.00, 0.55, 0.58, 1.00],                   [0, 0, 1, 1]);

  // ── Display: switch to "none" once fully invisible ───────────────────
  // Prevents GPU compositing bleed-through when opacity = 0.
  const disp0 = useTransform(opacity0, (v) => (v < 0.01 ? "none" : "block"));
  const disp1 = useTransform(opacity1, (v) => (v < 0.01 ? "none" : "block"));
  const disp2 = useTransform(opacity2, (v) => (v < 0.01 ? "none" : "block"));
  const disp3 = useTransform(opacity3, (v) => (v < 0.01 ? "none" : "block"));
  const disp4 = useTransform(opacity4, (v) => (v < 0.01 ? "none" : "block"));

  const opacities = [opacity0, opacity1, opacity2, opacity3, opacity4];
  const displays = [disp0, disp1, disp2, disp3, disp4];

  return (
    <div ref={containerRef} className="relative h-[500vh] md:h-[450vh]">
      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen flex flex-col">
        {/* Title — pt clears the fixed site header so it's fully visible when stuck */}
        <div className="pt-24 md:pt-28 text-center shrink-0">
          <h2 className="font-(family-name:--font-manrope) text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-on-surface">
            {sectionTitle}
          </h2>
          <div className="h-0.5 w-16 bg-primary mx-auto mt-3" />
        </div>

        {/* Shoe + annotations */}
        <div className="flex-1 flex flex-col lg:flex-row items-center mt-12 md:mt-16 lg:mt-[-6rem] max-w-7xl mx-auto w-full px-6 pb-8">
          {/* ── Left 55%: scroll-indexed images ── */}
          <div className="w-full lg:w-[55%] flex items-center justify-center" style={{ pointerEvents: "none" }}>
            <div className="relative w-60 h-60 md:w-120 md:h-120 lg:w-150 lg:h-150">
              {LAYER_IMAGES.map((img, i) => (
                <motion.div
                  key={img.src}
                  className="absolute inset-0"
                  style={{ opacity: opacities[i]}}
                >
                  <Image src={img.src} alt={img.alt} fill className="object-contain" priority={i === 0} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right 45%: scroll-indexed annotations ── */}
          <div className="w-full lg:w-[45%] relative min-h-50 md:min-h-60">
            {zones.slice(0, 5).map((zone, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 flex flex-col justify-center"
                style={{ opacity: opacities[i] }}
              >
                <AnnotationPanel zone={zone} />
              </motion.div>
            ))}
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
      <h3 className="font-(family-name:--font-manrope) text-2xl md:text-3xl lg:text-5xl font-semibold text-on-surface leading-tight">
        {zone.title}
      </h3>
      <p className="font-(family-name:--font-inter) text-sm md:text-base lg:text-lg text-secondary leading-relaxed max-w-sm lg:max-w-md">{zone.body}</p>
    </div>
  );
}
