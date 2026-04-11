"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface Props {
  children:  ReactNode;
  className?: string;
  /** Direction the element slides in from. Default: "up" */
  from?:      Direction;
  /** Distance in px for the slide. Default: 60 */
  distance?:  number;
  /** Seconds to delay before animating. Default: 0 */
  delay?:     number;
  /** Seconds the animation takes. Default: 0.9 */
  duration?:  number;
  /** Fraction of the element that must be visible to trigger. Default: 0.2 */
  amount?:    number;
  /** Render as which element. Default: "div" */
  as?:        "div" | "section";
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function offsetFor(from: Direction, distance: number) {
  switch (from) {
    case "up":    return { x: 0,         y: distance };
    case "down":  return { x: 0,         y: -distance };
    case "left":  return { x: -distance, y: 0 };
    case "right": return { x: distance,  y: 0 };
    case "none":  return { x: 0,         y: 0 };
  }
}

export default function Reveal({
  children,
  className,
  from     = "up",
  distance = 60,
  delay    = 0,
  duration = 0.9,
  amount   = 0.2,
  as       = "div",
}: Props) {
  const offset   = offsetFor(from, distance);
  const Element  = as === "section" ? motion.section : motion.div;

  const variants: Variants = {
    hidden:  { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <Element
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </Element>
  );
}
