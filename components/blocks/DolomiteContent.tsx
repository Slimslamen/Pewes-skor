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
      {/* ── HERO: DOLO / MITE slide in from left, shoe slides in from right ── */}
      <section className="relative min-h-screen overflow-hidden bg-stone-900 px-6 py-24">
        <div className="mx-auto flex min-h-[80vh] w-full max-w-7xl flex-col justify-center">

          {/* Provenance strip */}
          <motion.div
            className="mb-16 flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.4em] text-stone-500">
              Belluno · Italia
            </span>
            <div className="h-px flex-1 bg-stone-700" />
            <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.4em] text-stone-500">
              Est. 1897
            </span>
          </motion.div>

          {/* Brand name + shoe — 12-col grid so the shoe lands on the right */}
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">

            {/* DOLO / MITE — left */}
            <div className="lg:col-span-7">
              <h1 className="font-(family-name:--font-manrope) font-extrabold leading-none tracking-tighter text-white">
                <motion.span
                  className="block text-[18vw] md:text-[12rem]"
                  initial={{ x: -400, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2, ease: EASE }}
                >
                  DOLO
                </motion.span>
                <motion.span
                  className="-mt-4 block text-[18vw] text-stone-400 md:-mt-8 md:text-[12rem]"
                  initial={{ x: -400, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4, ease: EASE }}
                >
                  MITE
                </motion.span>
              </h1>
            </div>

            {/* Shoe — right, slides in from off-screen right */}
            <motion.div
              className="relative aspect-square w-full lg:col-span-5"
              initial={{ x: 500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.6, ease: EASE }}
            >
              <Image
                src="/dolomite/shoe.png"
                alt="Dolomite alpin bergssko"
                fill
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

          {/* Tagline + pioneer badge */}
          <motion.div
            className="mt-16 flex flex-col gap-8 md:flex-row md:items-end"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
          >
            <p className="font-(family-name:--font-manrope) max-w-md text-xl font-light leading-relaxed text-stone-300 md:text-2xl">
              Alpin expertis sedan 1897. Teknologi för dem som tar bergen på allvar.
            </p>
            <div className="shrink-0 md:ml-auto">
              <div className="inline-flex items-center gap-3 border border-stone-600 px-6 py-3">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-widest text-stone-400">
                  Alpin Pioneer
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
