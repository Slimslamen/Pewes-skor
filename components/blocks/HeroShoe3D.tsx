"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll } from "motion/react";
import { useProgress } from "@react-three/drei";
import HeroShoe3DScene from "./HeroShoe3DScene";

export default function HeroShoe3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { progress: loadProgress, active: loadActive } = useProgress();
  const loaderVisible = loadActive || loadProgress < 100;

  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 767px)").matches,
  );

  useEffect(() => {
    const mm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mq = window.matchMedia("(max-width: 767px)");
    const onMM = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const onMQ = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mm.addEventListener("change", onMM);
    mq.addEventListener("change", onMQ);
    return () => {
      mm.removeEventListener("change", onMM);
      mq.removeEventListener("change", onMQ);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[500vh] md:h-[450vh] bg-surface-container"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0" style={{ transform: "translate(-10rem, -5rem)" }}>
          <HeroShoe3DScene
            progress={scrollYProgress}
            reducedMotion={reducedMotion}
            isMobile={isMobile}
          />
        </div>

        {/* Loading bar */}
        <div
          className="absolute top-0 left-0 right-0 z-20 pointer-events-none transition-opacity duration-500"
          style={{ opacity: loaderVisible ? 1 : 0 }}
        >
          <div className="h-0.5 w-full bg-outline-variant/30">
            <div
              className="h-full bg-primary origin-left transition-transform duration-200 ease-out"
              style={{ transform: `scaleX(${Math.max(0, Math.min(1, loadProgress / 100))})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
