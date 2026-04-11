"use client";

import Image from "next/image";
import { motion } from "motion/react";

type Feature = {
  num:     string;
  eyebrow: string;
  title:   string;
  body:    string;
  image:   string;
  alt:     string;
  reverse: boolean;
};

interface Props {
  features: Feature[];
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function GaborFeatures({ features }: Props) {
  return (
    <section className="bg-white">
      {features.map(({ num, eyebrow, title, body, image, alt, reverse }) => (
        <motion.div
          key={num}
          className="grid grid-cols-1 items-stretch md:grid-cols-2"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {/* Image */}
          <motion.div
            className={`relative aspect-4/3 md:aspect-auto md:min-h-screen ${
              reverse ? "md:order-2" : "md:order-1"
            } bg-stone-100`}
            initial={{ opacity: 0, x: reverse ? 80 : -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <Image
              src={image}
              alt={alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            className={`flex flex-col justify-center px-8 py-20 md:px-16 lg:px-24 ${
              reverse ? "md:order-1" : "md:order-2"
            } ${reverse ? "bg-stone-50" : "bg-white"}`}
            initial={{ opacity: 0, x: reverse ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          >
            <span className="font-(family-name:--font-inter) mb-6 block text-xs uppercase tracking-[0.3em] text-primary">
              {num} · {eyebrow}
            </span>
            <h2 className="font-(family-name:--font-manrope) mb-8 text-3xl font-light leading-tight text-stone-900 md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <div className="mb-8 h-px w-16 bg-primary" />
            <p className="font-(family-name:--font-inter) max-w-md text-base leading-relaxed text-secondary">
              {body}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </section>
  );
}
