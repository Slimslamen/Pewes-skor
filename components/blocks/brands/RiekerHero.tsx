"use client";

import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function RiekerHero() {
  return (
    <section className="min-h-screen bg-surface flex items-center px-6 py-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

          {/* Left: brand name + founding detail */}
          <div className="flex flex-col justify-between border-r border-outline-variant/30 pr-0 lg:pr-16 pb-12 lg:pb-0">
            <motion.span
              className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.35em] text-outline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            >
              Est. 1874 · Tuttlingen, Deutschland
            </motion.span>

            <div>
              <motion.h1
                className="font-(family-name:--font-manrope) text-[16vw] lg:text-[9rem] font-extrabold tracking-tighter text-stone-900 leading-none"
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0,    opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
              >
                RIEKER
              </motion.h1>
              <motion.p
                className="font-(family-name:--font-manrope) text-lg text-secondary mt-6 font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
              >
                Skor för det verkliga livet. Varje dag.
              </motion.p>
            </div>

            <motion.span
              className="text-3xl text-outline animate-bounce self-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3, ease: EASE }}
              aria-hidden
            >
              ↓
            </motion.span>
          </div>

          {/* Right half: ANTISTRESS as large typography + intro */}
          <div className="flex flex-col justify-center pl-0 lg:pl-16 pt-12 lg:pt-0">
            <motion.span
              className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.35em] text-primary block mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            >
              Riekers Filosofi
            </motion.span>

            <motion.p
              className="font-(family-name:--font-manrope) font-black tracking-tighter text-stone-900 leading-none mb-8"
              style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0,   opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
            >
              ANTI<br />STRESS
            </motion.p>

            <motion.p
              className="font-(family-name:--font-inter) text-base text-secondary leading-relaxed max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            >
              Lätt. Flexibel. Rymlig. Tre principer som vuxit fram under 150 år av skotillverkning och som utgör grunden i varje Rieker-modell.
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
}
