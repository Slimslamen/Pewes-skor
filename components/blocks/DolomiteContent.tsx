"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";

export interface DolomiteTech {
  tech: string;
  desc: string;
}

interface Props {
  tech: DolomiteTech[];
}

// Shared easing — a slow-in, fast-settle curve used across all animations.
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Tech grid — staggered from right to left. staggerDirection: -1 reverses
// the iteration so the last child (rightmost on desktop) enters first.
const gridContainer: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.18, staggerDirection: -1 },
  },
};

const gridItem: Variants = {
  hidden:  { x: 120, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

export default function DolomiteContent({ tech }: Props) {
  return (
    <>
      {/* ── TECHNOLOGY: 4-feature grid, staggered right-to-left on scroll ── */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="font-(family-name:--font-inter) mb-4 block text-xs uppercase tracking-widest text-primary">
              Teknologi
            </span>
            <h2 className="font-(family-name:--font-manrope) text-4xl font-bold text-stone-900 md:text-5xl">
              Byggd för extrema förhållanden
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-px bg-outline-variant/30 md:grid-cols-2 lg:grid-cols-4"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {tech.map(({ tech: name, desc }) => (
              <motion.div
                key={name}
                variants={gridItem}
                className="space-y-4 bg-white p-8"
              >
                <h3 className="font-(family-name:--font-manrope) text-lg font-bold text-stone-900">
                  {name}
                </h3>
                <div className="h-0.5 w-8 bg-primary" />
                <p className="font-(family-name:--font-inter) text-sm leading-relaxed text-secondary">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HERITAGE: text drops from top, "1897" rises from below ── */}
      <section className="relative overflow-hidden bg-stone-900 py-32">
        {/* Ghost year — rises from the bottom of the container */}
        <motion.div
          aria-hidden
          className="font-(family-name:--font-manrope) pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 leading-none font-black text-stone-800 select-none"
          style={{ fontSize: "clamp(8rem, 28vw, 24rem)" }}
          initial={{ y: 300, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          1897
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            className="max-w-2xl"
            initial={{ y: -200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <span className="font-(family-name:--font-inter) mb-10 block text-xs uppercase tracking-widest text-primary">
              Vårt Arv
            </span>
            <p className="font-(family-name:--font-manrope) mb-12 text-3xl font-light leading-relaxed text-white md:text-4xl">
              Grundat 1897 i Belluno vid foten av Dolomiterna — ett av de första märkena att tillverka tekniska bergskor i stor skala.
            </p>
            <p className="font-(family-name:--font-inter) text-base leading-relaxed text-stone-400">
              I dag kombinerar varumärket ett sekel av alpin tradition med modern materialvetenskap för vandringsskor som klarar Europas tuffaste terräng.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
