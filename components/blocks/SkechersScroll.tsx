"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";

const FRAME_COUNT = 107;
const framePath = (i: number) =>
  `/skechers/ezgif-frame-${String(i).padStart(3, "0")}.png`;

export interface SkechersStat {
  stat:  string;
  label: string;
}

interface Props {
  stats?: SkechersStat[];
}

const DEFAULT_STATS: SkechersStat[] = [
  { stat: "160+",   label: "Länder" },
  { stat: "32 år",  label: "av innovation" },
  { stat: "3 000+", label: "modeller globalt" },
];

/**
 * Scroll-driven "Vårt arv" section for the Skechers brand page.
 *
 * On desktop, a 107-frame rotating shoe scrubs in from off-screen left and
 * comes to rest inside the rightmost grid column. On mobile, the layout
 * collapses to a static stacked arrangement (no sticky, no scrub).
 */
export default function SkechersScroll({ stats = DEFAULT_STATS }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef       = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Shoe travels across the viewport, ending pushed past the container's
  // right edge so the composition breathes off-frame on the right.
  // Start x is a "peeking" position (not fully off-screen) so frame 1 is
  // already visible in the lower-left the moment the section enters view.
  const shoeX = useTransform(scrollYProgress, [0, 1], ["-95vw", "18vw"]);

  // Preload all frames so the scrub never stalls on cold loads.
  useEffect(() => {
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = framePath(i);
    }
  }, []);

  // Swap the <img> src directly via ref to avoid React re-renders every frame.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const clamped = Math.max(0, Math.min(1, v));
    const idx     = Math.min(FRAME_COUNT - 1, Math.floor(clamped * FRAME_COUNT));
    if (imgRef.current) {
      imgRef.current.src = framePath(idx + 1);
    }
  });

  return (
    <section ref={containerRef} className="relative bg-[#F8FAFA] lg:h-[250vh]">
      {/* ── Desktop: sticky scroll-scrubbed layout ────────────────────── */}
      <div className="sticky top-0 hidden h-screen overflow-hidden lg:block">

        {/* Background shoe layer — absolute, lives behind the text */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center">
          <div className="relative mx-auto h-full w-full max-w-7xl px-6">
            <motion.div
              style={{ x: shoeX }}
              className="absolute top-1/2 right-0 aspect-square w-[75vw] max-w-5xl -translate-y-1/2 will-change-transform"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={framePath(1)}
                alt="Skechers sneaker rotating 360 degrees"
                className="h-full w-full object-contain"
                draggable={false}
              />
            </motion.div>
          </div>
        </div>

        {/* Foreground content — text + stats always in front of the shoe */}
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="grid grid-cols-12 items-center gap-12">

              {/* Brand story */}
              <div className="col-span-5 space-y-6">
                <span className="font-(family-name:--font-inter) block text-xs uppercase tracking-widest text-primary">
                  Vårt Arv
                </span>
                <h2 className="font-(family-name:--font-manrope) text-3xl font-light leading-tight text-stone-900 xl:text-4xl">
                  Skechers bevisar att komfort och stil kan gå hand i hand — varje dag.
                </h2>
                <p className="font-(family-name:--font-inter) text-sm leading-relaxed text-secondary xl:text-base">
                  Sedan starten i El Monte, Kalifornien 1992 har Skechers vuxit till ett av världens ledande skomärken. Med innovationer som Air-Cooled Memory Foam-innersulor, ergonomiska lästsystem och teknikvävar i överdelen erbjuder Skechers en bredd av modeller för träning, arbete och vardag — utan att kompromissa med känslan under foten.
                </p>
              </div>

              {/* Stats */}
              <div className="col-span-3 flex flex-col justify-center gap-10">
                {stats.map(({ stat, label }) => (
                  <div key={label} className="border-l-2 border-primary pl-6">
                    <span className="font-(family-name:--font-manrope) block text-4xl font-bold text-stone-900">
                      {stat}
                    </span>
                    <span className="font-(family-name:--font-inter) text-xs uppercase tracking-widest text-outline">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Reserved empty column so the shoe has visual breathing room on the right */}
              <div className="col-span-4" />

            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: static stacked fallback ──────────────────────────── */}
      <div className="py-24 lg:hidden">
        <div className="mx-auto w-full max-w-screen-xl space-y-12 px-6">
          <div className="space-y-6">
            <span className="font-(family-name:--font-inter) block text-xs uppercase tracking-widest text-primary">
              Vårt Arv
            </span>
            <h2 className="font-(family-name:--font-manrope) text-4xl font-light leading-tight text-stone-900">
              Skechers bevisar att komfort och stil kan gå hand i hand — varje dag.
            </h2>
            <p className="font-(family-name:--font-inter) text-base leading-relaxed text-secondary">
              Sedan starten i El Monte, Kalifornien 1992 har Skechers vuxit till ett av världens ledande skomärken. Med innovationer som Air-Cooled Memory Foam-innersulor, ergonomiska lästsystem och teknikvävar i överdelen erbjuder Skechers en bredd av modeller för träning, arbete och vardag — utan att kompromissa med känslan under foten.
            </p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={framePath(54)}
              alt="Skechers sneaker"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex flex-col gap-8">
            {stats.map(({ stat, label }) => (
              <div key={label} className="border-l-2 border-primary pl-6">
                <span className="font-(family-name:--font-manrope) block text-4xl font-bold text-stone-900">
                  {stat}
                </span>
                <span className="font-(family-name:--font-inter) text-xs uppercase tracking-widest text-outline">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
