"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const HERR_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCXWueTO72_4Vp8RNvWcEfrTNnIFpWBC6HJqhn234wOMAUoPPThRvKtqwH_NJyEzG1Bh_aT-aTnui-00yK5BEkaiBe4aSEzSpkjFAb84rCHg0_h_kUJprc5d46KEe4cf30PmOkxqLwyCHOM_cLZHVSZwfzPBYUmEYQ7nYPWQ8qRNXBZFHO-6SYrP8lnNRiEJXlfYETanWiEUEsgJ77EhlNL4Yqxm1mHy6MSEClH_6__wXYTtN2rS4cij1dvhGE9KOL2Bq3ONbaii2GQ";
const DAM_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAkbc0XcQW3tjrMV1WalE25DQB1MCbgZyznh0ryA_FaPUlmSH7UMWGw-xzNfC2HmqSDdakIoxaxfHI8OldsBwGOUZRTWa9OAnfIHXCbax761VUpzu8GcnaT48I4AeHxtBubSIkwmYZwYNjugmOmyut-o5xATnD5pQiLYomeZKAfr1K-y9oPO4tIo4wjMyn93cLYA-TZbVAXqENNS5feGoU1JtpOgj2qJN-D-Ww1iSLDVXbCmfXqLfoTSzbQGr-tGQpTHQGkSpWw9trh";
const BARN_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCYgkuoGad0DOqh9-q2tgcIJa3JzuAEIX5YlzfxL5RaV_ycAWG5fbe199CY8c49gYxu6ZZdtKVqM5xwVYmN0dNQRg7hLtGcXvpPf3agWcw0hJyBRmjZ8KZs7nQX9yFZFknepV9-6nHqxz";

interface CardProps {
  title: string;
  label: string;
  body: string;
  href: string;
  image: string;
  delay?: number;
}

function ExpandCard({ title, label, body, href, image, delay = 0 }: CardProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onClick={() => setOpen(!open)}
      className="border-t border-outline-variant py-7 cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(32px)",
        transition: `opacity 0.8s ${delay}s cubic-bezier(0.22,1,0.36,1), transform 0.8s ${delay}s cubic-bezier(0.22,1,0.36,1)`,
      }}
    >
      <div className="flex justify-between items-center">
        <div>
          <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.22em] text-primary font-bold block mb-1.5">
            {label}
          </span>
          <h3 className="font-(family-name:--font-manrope) text-[22px] font-bold tracking-[-0.02em] text-on-surface">
            {title}
          </h3>
        </div>
        <div
          className="w-9 h-9 rounded-full border border-outline-variant flex items-center justify-center flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "none" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--color-outline)" strokeWidth="1.8" strokeLinecap="round">
            <line x1="7" y1="2" x2="7" y2="12" />
            <line x1="2" y1="7" x2="12" y2="7" />
          </svg>
        </div>
      </div>

      <div
        className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: open ? "320px" : "0",
          transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="pt-5 flex gap-5">
          <div className="w-25 h-30 flex-shrink-0 rounded-sm overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-(family-name:--font-inter) text-sm text-secondary leading-[1.7] font-light">
              {body}
            </p>
            <Link
              href={href}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 font-(family-name:--font-manrope) font-bold text-[11px] uppercase tracking-[0.16em] text-primary hover:opacity-70 transition-opacity"
            >
              Utforska {title} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CategoriesSection() {
  return (
    <section id="collection" className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-16">
        <div className="mb-14">
          <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.25em] text-primary font-bold block mb-3">
            Sortiment
          </span>
          <h2
            className="font-(family-name:--font-manrope) font-extrabold tracking-[-0.03em] text-on-surface"
            style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
          >
            Vårt sortiment
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-12 items-start">
          <ExpandCard
            title="Herr"
            label="Herrkollektion"
            delay={0}
            body="Klassiska kvalitetsskor från ECCO, Lloyd och Vagabond. Allt från eleganta derbies till bekväma promenadskor."
            href="/skor/herr"
            image={HERR_IMG}
          />
          <ExpandCard
            title="Dam"
            label="Damkollektion"
            delay={0.08}
            body="Eleganta damskor från Gabor, Rieker och Ara. Stilfulla val för varje tillfälle."
            href="/skor/dam"
            image={DAM_IMG}
          />
          <ExpandCard
            title="Barn"
            label="Barnkollektion"
            delay={0.16}
            body="Hållbara och bekväma barnskor från Kavat, Viking och Superfit. Skor som håller med barnet."
            href="/skor/barn"
            image={BARN_IMG}
          />
        </div>
      </div>
    </section>
  );
}
