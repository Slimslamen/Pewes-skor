"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useGLTF } from "@react-three/drei";
import ShoeModel from "./ShoeModel";

// Kick off GLB downloads as soon as this module loads (client-only via ShoeRiseClient ssr:false)
useGLTF.preload("/herr.glb");
useGLTF.preload("/dam.glb");
useGLTF.preload("/barn.glb");

export default function ShoeRise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const secTopRef = useRef(0);
  const vhRef = useRef(800);

  // Absolute scrollY — avoids framer-motion sticky-layout offset bug (see lessons.md)
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

  // Container = 420vh. Effective sticky scroll = 320vh = vhRef * 3.2.
  const prog = (y: number) =>
    Math.max(0, Math.min(1, (y - secTopRef.current) / (vhRef.current * 3.2)));

  const lp = (a: number, b: number, t: number) =>
    a + (b - a) * Math.max(0, Math.min(1, t));

  // ── Herr: enter [0→0.10], dwell [0.10→0.30], exit [0.30→0.42] ───────────
  const herrY = useTransform(scrollY, (y) => {
    const v = vhRef.current, q = prog(y);
    if (q <= 0.10) return lp(-v * 1.1, 0, q / 0.10);
    if (q <= 0.30) return 0;
    if (q <= 0.42) return lp(0, v * 1.1, (q - 0.30) / 0.12);
    return v * 1.1;
  });
  const herrOp = useTransform(scrollY, (y) => {
    const q = prog(y);
    if (q <= 0.08) return q / 0.08;
    if (q <= 0.30) return 1;
    if (q <= 0.42) return lp(1, 0, (q - 0.30) / 0.12);
    return 0;
  });
  const herrScale = useTransform(scrollY, (y) => {
    const q = prog(y);
    return q <= 0.10 ? lp(0.88, 1.0, q / 0.10) : 1.0;
  });

  // ── Dam: enter [0.35→0.48], dwell [0.48→0.68], exit [0.68→0.80] ─────────
  const damY = useTransform(scrollY, (y) => {
    const v = vhRef.current, q = prog(y);
    if (q <= 0.35) return -v * 1.1;
    if (q <= 0.48) return lp(-v * 1.1, 0, (q - 0.35) / 0.13);
    if (q <= 0.68) return 0;
    if (q <= 0.80) return lp(0, v * 1.1, (q - 0.68) / 0.12);
    return v * 1.1;
  });
  const damOp = useTransform(scrollY, (y) => {
    const q = prog(y);
    if (q <= 0.35) return 0;
    if (q <= 0.46) return (q - 0.35) / 0.11;
    if (q <= 0.68) return 1;
    if (q <= 0.80) return lp(1, 0, (q - 0.68) / 0.12);
    return 0;
  });
  const damScale = useTransform(scrollY, (y) => {
    const q = prog(y);
    if (q <= 0.35) return 0.88;
    if (q <= 0.48) return lp(0.88, 1.0, (q - 0.35) / 0.13);
    return 1.0;
  });

  // ── Barn: enter [0.73→0.86], dwell [0.86→1.0] ────────────────────────────
  const barnY = useTransform(scrollY, (y) => {
    const v = vhRef.current, q = prog(y);
    if (q <= 0.73) return -v * 1.1;
    if (q <= 0.86) return lp(-v * 1.1, 0, (q - 0.73) / 0.13);
    return 0;
  });
  const barnOp = useTransform(scrollY, (y) => {
    const q = prog(y);
    if (q <= 0.73) return 0;
    if (q <= 0.84) return (q - 0.73) / 0.11;
    return 1;
  });
  const barnScale = useTransform(scrollY, (y) => {
    const q = prog(y);
    if (q <= 0.73) return 0.88;
    if (q <= 0.86) return lp(0.88, 1.0, (q - 0.73) / 0.13);
    return 1.0;
  });

  // Background warms subtly as scroll progresses
  const bgColor = useTransform(scrollY, (y) => {
    const q = prog(y);
    const ri = (a: number, b: number, t: number) =>
      Math.round(a + (b - a) * Math.max(0, Math.min(1, t)));
    if (q <= 0.5) {
      const t = q / 0.5;
      return `rgb(${ri(237, 227, t)},${ri(238, 224, t)},${ri(239, 221, t)})`;
    }
    const t = (q - 0.5) / 0.5;
    return `rgb(${ri(227, 219, t)},${ri(224, 216, t)},${ri(221, 213, t)})`;
  });

  const labelOp = useTransform(scrollY, (y) => {
    const q = prog(y);
    if (q <= 0.10) return 0;
    if (q <= 0.20) return (q - 0.10) / 0.10;
    if (q <= 0.95) return 1;
    return lp(1, 0, (q - 0.95) / 0.05);
  });

  const scrollHintOp = useTransform(scrollY, (y) => {
    const q = prog(y);
    return q <= 0.08 ? 1 - q / 0.08 : 0;
  });

  const [label, setLabel] = useState("Herr");
  useMotionValueEvent(scrollY, "change", (y) => {
    const q = prog(y);
    if (q >= 0.80) setLabel("Barn");
    else if (q >= 0.42) setLabel("Dam");
    else setLabel("Herr");
  });

  const shoeSize = "clamp(200px, 52vmin, 560px)";

  return (
    <div ref={containerRef} className="relative" style={{ height: "420vh" }}>
      <motion.div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        {/* Eyebrow */}
        <motion.div
          className="absolute top-20 md:top-20 inset-x-0 text-center pointer-events-none"
          style={{ opacity: labelOp }}
        >
          <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
            En del av våran kollektion · 2026
          </span>
        </motion.div>

        {/* Herr shoe */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ y: herrY, opacity: herrOp, scale: herrScale }}
        >
          <div style={{ width: shoeSize, height: shoeSize }}>
            <ShoeModel path="/herr.glb" />
          </div>
        </motion.div>

        {/* Dam shoe */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ y: damY, opacity: damOp, scale: damScale }}
        >
          <div style={{ width: shoeSize, height: shoeSize, transform: "scaleX(-1)" }}>
            <ShoeModel path="/Dam.glb" />
          </div>
        </motion.div>

        {/* Barn shoe */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ y: barnY, opacity: barnOp, scale: barnScale }}
        >
          <div style={{ width: shoeSize, height: shoeSize }}>
            <ShoeModel path="/barn.glb" />
          </div>
        </motion.div>

        {/* Category label — bottom */}
        <motion.div
          className="absolute bottom-16 md:bottom-18 inset-x-0 text-center pointer-events-none"
          style={{ opacity: labelOp }}
        >
          <h2
            className="font-(family-name:--font-manrope) font-black tracking-[-0.05em] text-on-surface"
            style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
          >
            {label}
          </h2>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
          style={{ opacity: scrollHintOp }}
        >
          <span className="font-(family-name:--font-inter) text-[9px] uppercase tracking-[0.25em] text-outline">
            Scrolla
          </span>
          <div className="animate-bounce">
            <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
              <rect x="1" y="1" width="10" height="16" rx="5" stroke="var(--color-outline)" strokeWidth="1.2" />
              <circle cx="6" cy="5.5" r="1.8" fill="var(--color-outline)" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
