"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { HerrShoe } from "./ShoeIllustrations";
import Link from "next/link";

export default function BigText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Shoe crosses screen diagonally: bottom-left → center → top-right
  const shoeX     = useTransform(scrollYProgress, [0, 0.5, 1.0], ["-80vw", "0vw", "80vw"]);
  const shoeY     = useTransform(scrollYProgress, [0, 0.5, 1.0], ["65vh", "0vh", "-65vh"]);
  const shoeOp    = useTransform(scrollYProgress, [0, 0.08, 0.88, 1.0], [0, 1, 1, 0]);
  const shoeScale = useTransform(scrollYProgress, [0, 0.5, 1.0], [0.82, 1.0, 0.82]);

  // "PEWES" sharpens as shoe crosses through
  const textOp = useTransform(scrollYProgress, [0.35, 0.65, 1.0], [0.05, 1.0, 1.0]);

  // CTA appears near the end
  const ctaOp = useTransform(scrollYProgress, [0.82, 1.0], [0, 1]);
  const ctaY  = useTransform(scrollYProgress, [0.82, 1.0], [24, 0]);

  // Combine shoe X/Y into a CSS transform string MotionValue
  const shoeTransform = useTransform(
    [shoeX, shoeY, shoeScale],
    ([x, y, s]) =>
      `translate(calc(-50% + ${x}), calc(-50% + ${y})) scale(${s})`
  );

  return (
    <div ref={containerRef} className="bg-[#191c1d]" style={{ height: "250vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* Massive background "PEWES" */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <motion.span
            className="font-(family-name:--font-manrope) font-black leading-none select-none whitespace-nowrap text-surface"
            style={{ fontSize: "28vw", letterSpacing: "-0.05em", opacity: textOp }}
          >
            PEWES
          </motion.span>
        </div>

        {/* Shoe in foreground, crossing diagonally */}
        <motion.div
          className="absolute z-10 pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            width: "clamp(260px, 46vmin, 520px)",
            height: "clamp(260px, 46vmin, 520px)",
            opacity: shoeOp,
            transform: shoeTransform,
          }}
        >
          <HerrShoe />
        </motion.div>

        {/* CTA overlay */}
        <motion.div
          className="absolute bottom-20 inset-x-0 text-center flex flex-col items-center gap-5"
          style={{ opacity: ctaOp, y: ctaY }}
        >
          <p className="font-(family-name:--font-inter) text-sm text-surface/60 tracking-[0.08em]">
            Premium skor för hela familjen
          </p>
          <Link
            href="/skor"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 border border-surface/25 text-surface font-(family-name:--font-manrope) font-bold text-[11px] uppercase tracking-[0.18em] rounded-sm hover:bg-surface/[0.08] hover:border-surface/50 transition-all"
          >
            Se alla skor →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
