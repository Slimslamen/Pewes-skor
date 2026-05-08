"use client";

import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function GaborHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/gabor/video.mp4"
        autoPlay
        muted
        playsInline
        preload="metadata"
      />
      {/* Darken for text legibility */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full flex-col justify-between px-6 pt-28 pb-16">

        {/* Top provenance strip */}
        <motion.div
          className="mx-auto flex w-full max-w-7xl items-center gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        >
          <div className="h-px flex-1 bg-white/40" />
          <span className="font-(family-name:--font-inter) shrink-0 text-[10px] uppercase tracking-[0.35em] text-white/80">
            Est. 1949 · Rosenheim, Bavaria
          </span>
          <div className="h-px flex-1 bg-white/40" />
        </motion.div>

        {/* GABOR wordmark + tagline */}
        <div className="mx-auto w-full max-w-7xl text-center">
          <motion.h1
            className="font-(family-name:--font-manrope) text-[22vw] font-thin leading-none tracking-tighter text-white md:text-[18vw]"
            initial={{ opacity: 0, scale: 1.15, y: 30 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
          >
            GABOR
          </motion.h1>
          <motion.p
            className="font-(family-name:--font-inter) mx-auto mt-8 max-w-md text-sm leading-relaxed text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          >
            Tyskt damhantverk med en filosofi som alltid sätter foten i centrum.
          </motion.p>
        </div>

        {/* Bottom strip */}
        <motion.div
          className="mx-auto flex w-full max-w-7xl items-end justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
        >
          <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.35em] text-white/60">
            Passform · Naturmaterial · Stil
          </span>
          <span className="animate-bounce text-2xl text-white/70">↓</span>
        </motion.div>
      </div>
    </section>
  );
}
