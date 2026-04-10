"use client";

import { motion } from "motion/react";

interface EccoHeroData {
  headline?:    string;
  subheadline?: string;
}

interface Props {
  data?: EccoHeroData | null;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function EccoHero({ data }: Props) {
  const headline    = data?.headline    ?? "ECCO";
  const subheadline = data?.subheadline ?? "Danish Design, Global Quality";

  return (
    <section className="relative min-h-[795px] flex flex-col items-center justify-center overflow-hidden px-6 bg-surface">
      <div className="relative z-10 text-center space-y-8 max-w-4xl">
        <motion.h1
          className="font-(family-name:--font-manrope) text-[18vw] md:text-[8rem] font-extrabold tracking-tighter leading-none text-stone-900"
          initial={{ opacity: 0, scale: 1.25, y: 40 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
        >
          {headline}
        </motion.h1>

        <motion.p
          className="font-(family-name:--font-manrope) text-xl md:text-3xl font-light tracking-[0.3em] uppercase text-primary"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
        >
          {subheadline}
        </motion.p>

        <motion.div
          className="pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
        >
          {/* Scroll hint */}
          <span
            className="inline-block text-4xl text-outline animate-bounce"
            aria-label="Scrolla ned"
          >
            ↓
          </span>
        </motion.div>
      </div>
    </section>
  );
}
