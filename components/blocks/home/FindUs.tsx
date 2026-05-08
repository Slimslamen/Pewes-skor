"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

interface HoursRow { days: string; hours: string; }
interface FindUsData {
  heading?: string;
  address?: string;
  hoursRows?: HoursRow[];
  phone?: string;
  email?: string;
}
interface Props { data?: FindUsData | null; }

const FALLBACK: FindUsData = {
  heading: "Hitta till oss",
  address: "Storgatan 11, 334 32 Anderstorp",
  hoursRows: [
    { days: "Måndag – Fredag", hours: "10:00 – 18:00" },
    { days: "Lördag",          hours: "10:00 – 14:00" },
    { days: "Söndag",          hours: "Stängt" },
  ],
  phone: "0371-150 20",
  email: "info@pewesskor.se",
};

const INFO_BLOCKS = (d: Required<FindUsData>) => [
  { label: "Adress",  lines: [d.address] },
  { label: "Kontakt", lines: [d.phone, d.email] },
  { label: "Måndag – Fredag", lines: [d.hoursRows![0]?.hours ?? "10:00 – 18:00"] },
  { label: "Lördag",          lines: [d.hoursRows![1]?.hours ?? "10:00 – 13:00", "Söndag: Stängt"] },
];

export default function FindUs({ data }: Props) {
  const d = {
    heading:   data?.heading   ?? FALLBACK.heading!,
    address:   data?.address   ?? FALLBACK.address!,
    hoursRows: data?.hoursRows ?? FALLBACK.hoursRows!,
    phone:     data?.phone     ?? FALLBACK.phone!,
    email:     data?.email     ?? FALLBACK.email!,
  };

  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="hitta" aria-label="Hitta till oss" className="py-16 md:py-24 px-6 md:px-16 bg-surface">
      <div
        ref={ref}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start"
      >
        {/* Left: info */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(-40px)",
            transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          }}
          className="flex flex-col gap-8"
        >
          <div>
            <span className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.25em] text-primary font-bold block mb-3">
              Hitta till oss
            </span>
            <h2
              className="font-(family-name:--font-manrope) font-extrabold tracking-[-0.03em] text-on-surface leading-[1.05]"
              style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
            >
              {d.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {INFO_BLOCKS(d).map((block) => (
              <div key={block.label}>
                <p className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.2em] font-bold text-outline mb-2">
                  {block.label}
                </p>
                {block.lines.map((l) => (
                  <p key={l} className="font-(family-name:--font-inter) text-sm text-on-surface leading-[1.7]">
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-2">
            <a
              href={`mailto:${d.email}`}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-outline/30 text-on-surface font-(family-name:--font-manrope) font-bold text-[11px] uppercase tracking-[0.16em] rounded-sm hover:bg-surface-container transition-colors"
            >
              Kontakta oss
            </a>
          </div>
        </div>

        {/* Right: map pin placeholder */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(40px)",
            transition: "opacity 0.9s 0.15s cubic-bezier(0.22,1,0.36,1), transform 0.9s 0.15s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className="rounded overflow-hidden aspect-4/3 w-full">
            <iframe
              src="https://maps.google.com/maps?q=Storgatan+11,+334+32+Anderstorp,+Sweden&output=embed&hl=sv"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pewes Skor på kartan"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
