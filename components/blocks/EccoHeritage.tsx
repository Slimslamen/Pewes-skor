"use client";

import Reveal from "./Reveal";

interface HeritageImage {
  url?: string;
  alt?: string;
}

interface HeritageData {
  eyebrow?: string;
  heading?: string;
  body?: string;
  images?: HeritageImage[];
}

interface Props {
  data?: HeritageData | null;
}

const FALLBACK: HeritageData = {
  eyebrow: "Vårt Arv",
  heading:
    "Grundat 1963 av Karl Toosbuy, byggdes ECCO på filosofin att skon måste följa foten.",
  body: "Från vårt huvudkontor i Bredebro, Danmark, har vi förblivit ett av de få stora skoföretagen i världen som äger och hanterar varje steg i läder- och skotillverkningsprocessen. Vårt arv är rotat i tron att sann lyx finns i skärningspunkten mellan traditionellt hantverk och modern materialvetenskap.",
  images: [
    {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDjE8BechN6WiGCD7wr0l_6IlKFtnuYELGOJudeXhGLn1uNt4TZlnpFFIexmQFQSGBmNH9cLojp7Mc7g56ZOYNFAVXFbxehkkl8AiKsrUNtz1tY3xFSYCophER-J7d5ddFi-wluo7fCmNGTQBrZcDAu-0DjhL5HpuUNNN-2L9vluQHOAuHZ3xxUxQpAjs5ylVe1FbApJ_p7LT5wmXkPfhlRlbAsYHgagnRgJkbNuoi28eqC6Py3DFuocjuvM0W4bVmCTd_1GDGNiVu",
      alt: "Leather workshop with artisan tools",
    },
  ],
};

export default function EccoHeritage({ data }: Props) {
  const d = {
    eyebrow: data?.eyebrow ?? FALLBACK.eyebrow,
    heading: data?.heading ?? FALLBACK.heading,
    body:    data?.body    ?? FALLBACK.body,
    images:  data?.images?.length ? data.images : FALLBACK.images!,
  };

  return (
    <section 
      className="py-32 bg-surface relative overflow-hidden"
      style={{
      backgroundImage: d.images[0]?.url ? `url('${d.images[0].url}')` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <Reveal className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <span className="font-(family-name:--font-inter) text-xs uppercase tracking-widest text-white mb-8 block">
        {d.eyebrow}
      </span>
      <h2 className="font-(family-name:--font-manrope) text-4xl md:text-5xl font-light leading-tight text-white mb-12">
        {d.heading}
      </h2>
      <p className="text-lg text-white/90 font-light leading-relaxed mb-16">
        {d.body}
      </p>
      </Reveal>
    </section>
  );
}
