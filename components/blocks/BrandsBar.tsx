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
  { name: "ECCO" },
  { name: "Rieker" },
  { name: "Gabor" },
  { name: "Skechers" },
  { name: "DOLOMITE" },
];

export default function BrandsBar({ data }: Props) {
  const brands = data?.length ? data : FALLBACK_BRANDS;
  const duplicatedBrands = [...brands, ...brands]; // Duplicate for seamless looping

  return (
    <section className="py-24 bg-surface overflow-hidden">
      <Reveal className="max-w-screen-2xl mx-auto px-6">
        <p className="font-(family-name:--font-inter) text-[10px] uppercase tracking-[0.3em] text-outline mb-12 text-center">
          Varumärken vi bär
        </p>
        <div className="relative w-full overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee hover:animation-paused group opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            {duplicatedBrands.map((brand, index) => (
              <span
                key={brand.name + index} // Use index for unique key with duplicated items
                className="text-3xl font-bold tracking-tighter text-stone-800 font-(family-name:--font-manrope) mx-12 flex-shrink-0"
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
