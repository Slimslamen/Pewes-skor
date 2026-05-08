"use client";

import { motion, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Props {
  techTags: string[];
}

const tagContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 1.1 } },
};

const tagItem: Variants = {
  hidden:  { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function SkechersHero({ techTags }: Props) {
  return (
    <section className="bg-stone-50 min-h-screen flex flex-col justify-center px-6 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">

        <motion.span
          className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.4em] text-outline block mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          Since 1992 · El Monte, California
        </motion.span>

        <motion.h1
          className="font-(family-name:--font-manrope) font-black tracking-tighter text-stone-900 leading-none mb-6"
          style={{ fontSize: "clamp(3rem, 14vw, 11rem)" }}
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0   }}
          transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
        >
          SKECHERS
        </motion.h1>

        {/* Thick primary accent bar — scaleX from left */}
        <motion.div
          className="h-2 w-full bg-primary mb-10 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, delay: 0.75, ease: EASE }}
        />

        <div className="flex flex-col md:flex-row md:items-end gap-10">
          <motion.p
            className="font-(family-name:--font-manrope) text-xl md:text-2xl font-light text-secondary max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          >
            Memory Foam-komfort möter California-design. Skor för sport, vardag och allt däremellan.
          </motion.p>

          {/* Tech tags — stagger in */}
          <motion.div
            className="md:ml-auto flex flex-wrap gap-2 shrink-0"
            variants={tagContainer}
            initial="hidden"
            animate="visible"
          >
            {techTags.map((tag) => (
              <motion.span
                key={tag}
                variants={tagItem}
                className="font-(family-name:--font-inter) text-[10px] uppercase tracking-widest border border-outline/40 text-outline px-3 py-1.5"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
