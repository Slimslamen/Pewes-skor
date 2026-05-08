"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export interface CategoryItem {
  name: string;
  label: string;
  body: string;
  href: string;
  image: string;
}

export interface CollectionData {
  eyebrow?: string | null;
  heading?: string | null;
  categories?: CategoryItem[] | null;
}

interface Props {
  data?: CollectionData | null;
}

const FALLBACK_CATEGORIES: CategoryItem[] = [
  {
    name: "Herr",
    label: "Herrkollektion",
    body: "Klassiska kvalitetsskor från ECCO, Lloyd och Vagabond. Allt från eleganta derbies till bekväma promenadskor.",
    href: "/skor/herr",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXWueTO72_4Vp8RNvWcEfrTNnIFpWBC6HJqhn234wOMAUoPPThRvKtqwH_NJyEzG1Bh_aT-aTnui-00yK5BEkaiBe4aSEzSpkjFAb84rCHg0_h_kUJprc5d46KEe4cf30PmOkxqLwyCHOM_cLZHVSZwfzPBYUmEYQ7nYPWQ8qRNXBZFHO-6SYrP8lnNRiEJXlfYETanWiEUEsgJ77EhlNL4Yqxm1mHy6MSEClH_6__wXYTtN2rS4cij1dvhGE9KOL2Bq3ONbaii2GQ",
  },
  {
    name: "Dam",
    label: "Damkollektion",
    body: "Eleganta damskor från Gabor, Rieker och Ara. Stilfulla val för varje tillfälle.",
    href: "/skor/dam",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkbc0XcQW3tjrMV1WalE25DQB1MCbgZyznh0ryA_FaPUlmSH7UMWGw-xzNfC2HmqSDdakIoxaxfHI8OldsBwGOUZRTWa9OAnfIHXCbax761VUpzu8GcnaT48I4AeHxtBubSIkwmYZwYNjugmOmyut-o5xATnD5pQiLYomeZKAfr1K-y9oPO4tIo4wjMyn93cLYA-TZbVAXqENNS5feGoU1JtpOgj2qJN-D-Ww1iSLDVXbCmfXqLfoTSzbQGr-tGQpTHQGkSpWw9trh",
  },
  {
    name: "Barn",
    label: "Barnkollektion",
    body: "Hållbara och bekväma barnskor från Kavat, Viking och Superfit. Skor som håller med barnet.",
    href: "/skor/barn",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYgkuoGad0DOqh9-q2tgcIJa3JzuAEIX5YlzfxL5RaV_ycAWG5fbe199CY8c49gYxu6ZZdtKVqM5xwVYmN0dNQRg7hLtGcXvpPf3agWcw0hJyBRmjZ8KZs7nQX9yFZFknepV9-6nHqxz",
  },
];

interface CardProps {
  item: CategoryItem;
  delay?: number;
}

function ExpandCard({ item, delay = 0 }: CardProps) {
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

  const toggleId = `category-${item.name.toLowerCase()}`;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(32px)",
        transition: `opacity 0.8s ${delay}s cubic-bezier(0.22,1,0.36,1), transform 0.8s ${delay}s cubic-bezier(0.22,1,0.36,1)`,
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={toggleId}
        onClick={() => setOpen(!open)}
        className="w-full border-t border-outline-variant py-7 cursor-pointer text-left"
      >
        <div className="flex justify-between items-center">
          <div>
            <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.22em] text-primary font-bold block mb-1.5">
              {item.label}
            </span>
            <h3 className="font-(family-name:--font-manrope) text-[22px] font-bold tracking-[-0.02em] text-on-surface">
              {item.name}
            </h3>
          </div>
          <div
            className="w-9 h-9 rounded-full border border-outline-variant flex items-center justify-center shrink-0 transition-transform duration-300"
            style={{ transform: open ? "rotate(45deg)" : "none" }}
            aria-hidden="true"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--color-outline)" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <line x1="7" y1="2" x2="7" y2="12" />
              <line x1="2" y1="7" x2="12" y2="7" />
            </svg>
          </div>
        </div>
      </button>

      <div
        id={toggleId}
        role="region"
        aria-label={`${item.name} detaljer`}
        className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: open ? "320px" : "0",
          transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="pt-5 flex gap-5">
          <div className="w-25 h-30 shrink-0 rounded-sm overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={`${item.name} skor hos Pewes Skor`} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-(family-name:--font-inter) text-sm text-secondary leading-[1.7] font-light">
              {item.body}
            </p>
            <Link
              href={item.href}
              className="inline-flex items-center gap-1.5 font-(family-name:--font-manrope) font-bold text-[11px] uppercase tracking-[0.16em] text-primary hover:opacity-70 transition-opacity"
            >
              Utforska {item.name} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CategoriesSection({ data }: Props) {
  const eyebrow    = data?.eyebrow    ?? "Sortiment";
  const heading    = data?.heading    ?? "Vårt sortiment";
  const categories = data?.categories?.length ? data.categories : FALLBACK_CATEGORIES;

  return (
    <section id="collection" className="py-16 md:py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="mb-10 md:mb-14">
          <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.25em] text-primary font-bold block mb-3">
            {eyebrow}
          </span>
          <h2
            className="font-(family-name:--font-manrope) font-extrabold tracking-[-0.03em] text-on-surface"
            style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
          >
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-12 items-start">
          {categories.map((item, i) => (
            <ExpandCard key={item.name} item={item} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
