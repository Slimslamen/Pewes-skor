"use client";

import Link from "next/link";
import { useState } from "react";

interface FooterProps {
  year?: number;
}

export default function Footer({ year = 2025 }: FooterProps) {
  const [email, setEmail] = useState("");

  function handleSubscribe() {
    // Newsletter submission via state — no form element
    if (!email.trim()) return;
    setEmail("");
    // TODO: connect to Sanity-driven newsletter endpoint
  }

  return (
    <footer className="w-full bg-stone-100 border-t border-stone-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 py-20 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="space-y-6">
          <span className="font-(family-name:--font-manrope) text-lg font-bold uppercase tracking-widest text-stone-900">
            Pewes Skor
          </span>
          <p className="font-(family-name:--font-inter) text-sm tracking-normal text-stone-500 leading-relaxed">
            © {year} Pewes Skor. Curator of Footwear.
            <br />
            Kvalitet som känns sedan 1948.
          </p>
        </div>

        {/* Information */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6">
            Information
          </h4>
          <ul className="space-y-3 font-(family-name:--font-inter) text-sm">
            {[
              { label: "Adress", href: "/#hitta" },
              { label: "Öppettider", href: "/#hitta" },
              { label: "Kontakt", href: "/#hitta" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-stone-500 hover:text-stone-900 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6">
            Social
          </h4>
          <ul className="space-y-3 font-(family-name:--font-inter) text-sm">
            {[
              { label: "Instagram", href: "#" },
              { label: "Facebook", href: "#" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-stone-500 hover:text-stone-900 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6">
            Nyhetsbrev
          </h4>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Din e-post"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white border border-stone-200 text-sm px-4 py-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#725a39]"
            />
            <button
              onClick={handleSubscribe}
              className="bg-primary text-white px-4 py-3 rounded-sm hover:bg-primary-container transition-colors"
              aria-label="Prenumerera"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
