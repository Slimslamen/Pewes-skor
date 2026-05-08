"use client";

import Image from "next/image";
import Reveal from "./Reveal";

interface Shoe {
  name: string;
  price: string;
  sizes: string;
  image: string;
  categories?: string[];
}

interface Props {
  brandName: string;
  shoes: Shoe[];
}

export default function BrandProductGrid({ brandName, shoes }: Props) {
  return (
    <section aria-label={`${brandName} produkter`} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {shoes.map((shoe, i) => (
            <Reveal
              key={`${shoe.name}-${i}`}
              delay={(i % 4) * 0.1}
              className="group flex flex-col"
            >
              {/* Image Container */}
              <div className="aspect-3/4 overflow-hidden bg-stone-100 rounded-2xl mb-6 relative">
                <Image
                  src={shoe.image}
                  alt={shoe.name}
                  fill
                  className="object-cover transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Info */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary font-(family-name:--font-inter)">
                    {brandName}
                  </p>
                  <h3 className="text-xl font-medium text-stone-900 font-(family-name:--font-manrope)">
                    {shoe.name}
                  </h3>
                  <p className="text-stone-500 font-medium font-(family-name:--font-inter)">
                    {shoe.price}
                  </p>
                </div>

                {/* Sizes */}
                {shoe.sizes && (
                  <div className="pt-2 border-t border-stone-100">
                    <span className="text-[11px] font-medium px-2 py-1 bg-stone-50 text-stone-600 rounded border border-stone-100">
                      {shoe.sizes}
                    </span>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
