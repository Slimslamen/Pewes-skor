"use client";

import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  year?: number;
}

export default function Footer({ year = 2025 }: FooterProps) {
  return (
    <footer aria-label="Sidfot" className="w-full bg-stone-100 border-t border-stone-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-8 py-20 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="space-y-6">
          <Image
            src="/Logo.png"
            alt="Pewes Skor Logo"
            width={180}
            height={60}
            className="h-10 w-auto object-contain"
          />
          <p className="font-(family-name:--font-inter) text-sm tracking-normal text-stone-500 leading-relaxed">
            © {year} Pewes Skor. Curator of Footwear.
            <br />
            Kvalitet som känns sedan 1948.
          </p>
          {/* Social */}
          <div className="pt-4">
            <h4 className="font-bold text-[10px] uppercase tracking-widest mb-4">
              Följ oss
            </h4>
            <div className="flex gap-4 font-(family-name:--font-inter) text-sm">
              {[
                { label: "Instagram", href: "https://www.instagram.com/pewesskor/" },
                { label: "Facebook", href: "https://www.facebook.com/people/Pewesskor/100083084989488/?mibextid=wwXIfr&rdid=VyrNfEASHrSzVxss&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18hg5pVUNn%2F%3Fmibextid%3DwwXIfr" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-stone-500 hover:text-stone-900 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Hitta till oss */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6">
            Hitta till oss
          </h4>
          <div className="space-y-6 font-(family-name:--font-inter) text-sm text-stone-500">
            <div>
              <p className="font-bold text-stone-900 mb-1">Besöksadress</p>
              <p>Storgatan 11</p>
              <p>334 32 Anderstorp</p>
            </div>
            <div>
              <p className="font-bold text-stone-900 mb-1">Kontakt</p>
              <p>0371-150 20</p>
              <p>info@pewesskor.se</p>
            </div>
          </div>
        </div>

        {/* Öppettider */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6">
            Öppettider
          </h4>
          <div className="space-y-2 font-(family-name:--font-inter) text-sm text-stone-500">
            {[
              { days: "Måndag – Fredag", hours: "10:00 – 18:00" },
              { days: "Lördag",          hours: "10:00 – 14:00" },
              { days: "Söndag",          hours: "Stängt" },
            ].map((row) => (
              <div key={row.days} className="flex justify-between max-w-60">
                <span>{row.days}</span>
                <span className="text-stone-900">{row.hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="relative h-50 rounded-xl overflow-hidden bg-stone-200 shadow-inner flex items-center justify-center">
          <div className="text-center p-4">
            <p className="font-(family-name:--font-manrope) font-bold uppercase tracking-widest text-[10px] text-stone-400">
              Karta
            </p>
            <p className="text-stone-400 text-[10px] mt-1 italic">Storgatan 11, Anderstorp</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
