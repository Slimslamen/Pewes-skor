"use client";

import Reveal from "./Reveal";

interface Brand {
  name: string;
}

interface Props {
  data?: Brand[] | null;
}

const FALLBACK_BRANDS: Brand[] = [
  { name: "ECCO" },
  { name: "Rieker" },
  { name: "Gabor" },
  { name: "Skechers" },
  { name: "DOLOMITE" },
];

export default function BrandsBar({ data }: Props) {
  const brands = data?.length ? data : FALLBACK_BRANDS;

  return (
    <section className="py-24 bg-surface">
      <Reveal className="max-w-screen-2xl mx-auto px-6">
        <p className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.3em] text-outline mb-12 text-center">
          Varumärken vi bär
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
          {brands.map((brand) => (
            <span
              key={brand.name}
              className="text-3xl font-bold tracking-tighter text-stone-800 font-(family-name:--font-manrope)"
            >
              {brand.name}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
