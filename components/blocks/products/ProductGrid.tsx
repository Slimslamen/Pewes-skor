"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Reveal from "../Reveal";

interface Product {
  brand?: string;
  name?: string;
  price?: string;
  description?: string;
  sizes?: string;
  image?: { url?: string; alt?: string };
}

interface Props {
  products?: Product[] | null;
}

const FALLBACK_PRODUCTS: Product[] = [
  {
    brand: "ECCO",
    name: "Sculptured 45 Boot",
    price: "1.299 kr",
    sizes: "36-41",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBllu7V4UfIDA__RYIvIvVxNOeVCYM5cuW26DutTwmW7FbL7gpvDiPr7VzkIxabx0C6o6cMrQW_xlu7JtneUVRE6WVcwi_XH_1NwG2GkD87PJ4WyWCVojZKVAeRCNwYzLQKcZzWnTSQ2sTwpEFAPnVy70c0g7GQzdfg2NDgmLwmJvSNSFLHWnuW1wMUYaOwN555SAecS2qH530cav_DMbhXauDuF-5hen-s54YEkKtF3LGr9KysYjc31fKrNb5Jt7zJrnuKZPGm2YHu",
      alt: "Premium leather ankle boots",
    },
  },
  {
    brand: "RIEKER",
    name: "Modern Flow Sneaker",
    price: "899 kr",
    sizes: "37-42",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbPjRJBiveiH4Zsdv-tKUajuBJGT-E-c74JHdgWWTKlos4THgBA2_JCOTrns2Jnx-4hiWv514LZKH5_tfOXgM2cOBz_pj-i05-uEfJG7e9izC4_NMkJ-EKGuoVnL_Buz9ZkPjB9D4OuZJoqPfLCER5L016dr2dX6Q9BCu6wtkgUVZdK92W15cxspt1anPaD6GSL_kVUGt605cfkeFNXG38zI66PhhHRed8CurJASvTv8RcHtUhs1tak5iYLmOufUDZIcp_NnQSkMdx",
      alt: "Contemporary platform sneakers",
    },
  },
  {
    brand: "GABOR",
    name: "Posh Leather Loafer",
    price: "1.100 kr",
    sizes: "36-40",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk1thIjXgaGZUZykC15MQL5PkQJuyAvSlPfNEIF-A5_7122HbX29C4hcTy7_ecLsHyKH1RO0xE3Upli1fg9PPMOwWDuFm0U3m0Yc3utzxrxJjS5cYJXR7Tr_yeMfQpwuhqnRltRfQJG0wjwerH9h-G0oPaiWX763VekWTTgqi5cNi2u4e-PWKw3po_Tcy1jUXnnZDSf6xZohHIEMrxqDk5gbXfrdMSYdDdPAYBYixLgrc1DtYQyg3cXMW724pVDwPQ-ROQPmGw3ryV",
      alt: "Classic leather loafers",
    },
  },
  {
    brand: "SKECHERS",
    name: "GoWalk Arch Fit",
    price: "949 kr",
    sizes: "38-42",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtSDPwsNsjld1f5vUL5Js-MNavJlKQbp6il9N98VTwdN4XcXj1QN257LlgwGvuDr1CY0p-ALOXi7fH4FtjV8jxf5n3Sn6zsFWP186smdPp-7eeQf-PSD62Yf69M2JMe43JEHctp84JhUmcE0NGIswxGPHczaQQAHmCtucslPM6njV6LkBwq9xpcsIGutzv3lm9_0oaI8vpkMgBtMhBAlNGjhesFUyjDvfxt5b8Lbc9hksav9KHd3O6CAT8hK1dSEQk-y0vmUKJILI-",
      alt: "Active running shoes",
    },
  },
  {
    brand: "ECCO",
    name: "Street Lite Retro",
    price: "1.099 kr",
    sizes: "37-41",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK4t0SThE6oVC2AyKt_NGET2Oq2fiPKmxOmev0ZFasMlMfVU7wEfohRq3ljQylyrMw_FvWQP3vIkdf77XJ7c3YkUte9v2T2lf4DaPHCyoQOwJaqMy1sALhFPUGb3nDMWbrp1FGEyMKGchda-6uUIFDSlBmEar3P0GtYEHpVRVk6USMySspxfBqTdwEf6zSh1-_Mspbo9LoZOPymeB0VCfzQfO6YeGJ8CoMFIAwkADb7gnw7Xqmo9jp6H9zLGQ0iv6mQeOrT6vLKm6v",
      alt: "Street sneakers",
    },
  },
  {
    brand: "DOLOMITE",
    name: "Cinquantaquattro Low",
    price: "1.499 kr",
    sizes: "39-44",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9BFoV4o3O5ua1lY7PdSnL67yKlSovA2xBfU9wxIQ8OBqE1RTNoiWx09TXMxIWS6y6uKHh_s7T6rtnO8CDoz0d21fYf7rv80mnG15VOh513EDkS1h7J6jyRyuRVtHZaNBac8dT0tzeR3HupLOfpYETM5IJkTZh8zaRctbitpMY_mBaYbvBR91Pu_gnuxo-eoSYZ42rk1LSWK4kGgOH2EH3TcqXu4aSi3L6pdP_LGBo108f5oyxhkdCd7QMukgOoe_8zTfO4p9w9RO9",
      alt: "Outdoor boots",
    },
  },
  {
    brand: "GABOR",
    name: "Sunset Strap Sandal",
    price: "799 kr",
    sizes: "36-40",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFAWcfPkJ6h9yAnoCHnZ8mzjeC9S9V4IPWtSfAsegdJJYWqPc9nw6UCiu42nuwaavV7P0ykPLI-a_ZOmTBmWfPk9jJh6G5ckEtU8s_86-j2ahrla63P8C3BOPpiGZ3e0ltFJ_jZXyhnA65RUJGuuLKmGuVslsTTHKbr7GUT8c5ZssTKbfKj1VjRGWqxCoEUdoUMeE-Ou0QHILANAa4rIyL0LST96dpAQ3oaqcCFSe41jQW0kyLO-ARAUWMWJaLhXp0xHhlPS9aCZ",
      alt: "Leather strapped sandals",
    },
  },
  {
    brand: "RIEKER",
    name: "Comfort Suede",
    price: "849 kr",
    sizes: "37-41",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-vo42JSDbvmi7wDnpWJbpoZzIcj7cVaSfqWolR8ETw_3GoSP6lSfSqYGnVoO0FjYa6dFnBXqtIKkLIdJoLnk9H8NpC9tEP2Ompd8aEsVknV08GvgTrhHf78Pot99cDMwOKtgT_xORv054fJd-wmMdwf1691i0NtzaICL9_lX6-RyRKIQkBQxbbXZ3O4fvz4o0L_pDfyJkrO7TqYGNRm5lE-BXJ8RlVYjSfEhs8mmnqxYRVzmuoL6WxSLtlstg6jq4dF2CHq28jwxt",
      alt: "Suede sneakers",
    },
  },
];

const ALL = "Alla märken";

export default function ProductGrid({ products }: Props) {
  const items = products?.length ? products : FALLBACK_PRODUCTS;
  const [activeBrand, setActiveBrand] = useState(ALL);

  const brands = useMemo(() => {
    const unique = Array.from(new Set(items.map((p) => p.brand?.toUpperCase() ?? "").filter(Boolean)));
    unique.sort();
    return [ALL, ...unique];
  }, [items]);

  const filtered = activeBrand === ALL
    ? items
    : items.filter((p) => p.brand?.toUpperCase() === activeBrand);

  return (
    <>
      {/* Brand Filter */}
      <section aria-label="Filtrera efter märke" className="max-w-screen-2xl mx-auto px-6 mb-12 sticky top-18 z-40 py-4 bg-surface/95 backdrop-blur-sm">
        <div role="group" aria-label="Märkesfilter" className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
          {brands.map((brand) => (
            <button
              key={brand}
              type="button"
              aria-pressed={activeBrand === brand}
              onClick={() => setActiveBrand(brand)}
              className={`cursor-pointer flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeBrand === brand
                  ? "bg-primary text-white"
                  : "bg-[#e5e2e1] text-on-secondary-container hover:bg-stone-200"
              }`}
            >
              {brand === ALL ? brand : brand.charAt(0) + brand.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-screen-2xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {filtered.map((product, i) => (
            <Reveal
              key={`${product.brand}-${product.name}-${i}`}
              delay={(i % 4) * 0.08}
              amount={0.15}
              className=" flex flex-col"
            >
              <div className="aspect-3/4 overflow-hidden bg-surface-container-low mb-6 rounded-xl relative">
                {product.image?.url ? (
                  <Image
                    src={product.image.url}
                    alt={product.image.alt ?? product.name ?? ""}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-95"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container" />
                )}
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary font-(family-name:--font-inter)">
                    {product.brand}
                  </p>
                  <h3 className="text-lg font-medium text-stone-900 font-(family-name:--font-manrope)">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-stone-400 text-xs font-light leading-snug line-clamp-2 font-(family-name:--font-inter)">
                      {product.description}
                    </p>
                  )}
                  <p className="text-stone-500 font-light text-sm tracking-tight">
                    {product.price}
                  </p>
                </div>

                {product.sizes && (
                  <div className="pt-2 border-t border-stone-100">
                    <span className="text-[11px] font-medium px-2 py-1 bg-stone-50 text-stone-600 rounded border border-stone-100">
                      {product.sizes}
                    </span>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Result count */}
        <div className="mt-24 flex flex-col items-center gap-6">
          <p aria-live="polite" aria-atomic="true" className="text-outline text-sm">
            Visar {filtered.length} av {items.length} produkter
          </p>
          <div className="w-48 h-1 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(filtered.length / items.length) * 100}%` }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
