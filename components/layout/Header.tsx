"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
  dropdown?: { label: string; href: string }[];
}

const BRANDS_DROPDOWN = [
  { label: "Gabor",    href: "/varumarken/gabor" },
  { label: "ECCO",     href: "/varumarken/ecco" },
  { label: "Dolomite", href: "/varumarken/dolomite" },
  { label: "Rieker",   href: "/varumarken/rieker" },
  { label: "Skechers", href: "/varumarken/skechers" },
];


interface HeaderProps {
  links?: NavLink[];
}

const SORTIMENT_DROPDOWN = [
  { label: "Herr", href: "/skor/herr" },
  { label: "Dam", href: "/skor/dam" },
  { label: "Barn", href: "/skor/barn" },
];

const defaultLinks: NavLink[] = [
  { label: "Sortiment", href: "/skor", dropdown: SORTIMENT_DROPDOWN },
  { label: "Varumärken", href: "", dropdown: BRANDS_DROPDOWN },
  { label: "Nyheter", href: "/nyheter" },
  { label: "Skovård", href: "/skovard" },
  { label: "Blogg", href: "/blogg" },
];

export default function Header({ links = defaultLinks }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown when clicking outside nav
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Change header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-surface/80 backdrop-blur-md shadow-[0_20px_40px_rgba(15,15,15,0.04)]" : "bg-transparent"}`}>
      <div className="flex justify-between items-center px-6 pt-4 pb-8 w-full max-w-screen-2xl mx-auto">
        {/* ── Left: hamburger + desktop nav ── */}
        <div className="flex items-center" ref={navRef}>
          <button
            aria-label="Öppna meny"
            className="text-stone-800 scale-95 active:scale-100 transition-transform duration-200 sm:hidden"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setMobileOpen(null);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 pt-2">
            {links.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="relative">
                  {/* Trigger */}
                  <button
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    className={`flex items-center gap-1 font-(family-name:--font-manrope) font-medium tracking-tight transition-colors duration-300 ${
                      link.active ? "text-primary font-semibold" : "text-stone-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className={`transition-transform duration-200 mt-px ${
                        openDropdown === link.label ? "rotate-180" : ""
                      }`}
                    >
                      <polyline points="1 3 5 7 9 3" />
                    </svg>
                  </button>

                  {/* Dropdown panel */}
                  <div
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className={`absolute top-full left-0 w-44 bg-surface
                      border border-outline-variant/40
                      shadow-[0_8px_32px_rgba(15,15,15,0.1)] rounded-sm
                      transition-all duration-200 origin-top
                      ${
                        openDropdown === link.label
                          ? "opacity-100 scale-y-100 pointer-events-auto"
                          : "opacity-0 scale-y-95 pointer-events-none"
                      }`}
                  >
                    {link.dropdown.map((sub, i) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setOpenDropdown(null)}
                        className={`block px-4 py-2.5
                          font-(family-name:--font-manrope) text-sm font-medium
                          text-stone-500 hover:text-primary hover:bg-primary-container/20
                          transition-colors duration-150
                          ${i < link.dropdown!.length - 1 ? "border-b border-outline-variant/20" : ""}
                        `}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-(family-name:--font-manrope) font-medium tracking-tight transition-colors duration-300 ${
                    link.active ? "text-primary font-semibold" : "text-stone-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
        </div>

        {/* ── Centre: wordmark ── */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 flex items-center"
        >
          <Image
            src="/Logo.png"
            alt="Pewes Skor Logo"
            width={160}
            height={60}
            priority
            className="h-14 w-auto object-contain"
          />
        </Link>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant/40 px-6 py-4">
          {links.map((link) => (
            <div key={link.label}>
              {link.dropdown ? (
                <>
                  {/* Expandable mobile brand item */}
                  <button
                    className="w-full flex justify-between items-center py-3 font-(family-name:--font-manrope) font-medium text-stone-800 hover:text-primary transition-colors"
                    onClick={() => setMobileOpen(mobileOpen === link.label ? null : link.label)}
                  >
                    {link.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className={`transition-transform duration-200 ${mobileOpen === link.label ? "rotate-180" : ""}`}
                    >
                      <polyline points="1 3 5 7 9 3" />
                    </svg>
                  </button>
                  {mobileOpen === link.label && (
                    <div className="pl-4 mb-2 border-l-2 border-primary ml-1 space-y-0.5">
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block py-2 font-(family-name:--font-manrope) text-sm text-stone-500 hover:text-primary transition-colors"
                          onClick={() => {
                            setMenuOpen(false);
                            setMobileOpen(null);
                          }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  className="block py-3 font-(family-name:--font-manrope) font-medium text-stone-800 hover:text-primary transition-colors border-b border-outline-variant/10 last:border-0"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
