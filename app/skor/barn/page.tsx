import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/blocks/ProductGrid";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Barnskor",
  description:
    "Barnskor anpassade för barnfötter i alla åldrar. ECCO, Skechers, Gabor och Rieker — med rätt stöd, komfort och hållbarhet hos Pewes Skor i Anderstorp.",
  path:        "/skor/barn",
});

const BARN_PRODUCTS = [
  {
    brand: "ECCO",
    name: "Urban Mini Boot",
    description: "Mjuk läder-boot för de minsta. Bred tålbox ger plats för barnfötters naturliga form. Enkel kardborrfästning.",
    price: "749 kr",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYgkuoGad0DOqh9-q2tgcIJa3JzuAEIX5YlzfxL5RaV_ycAWG5fbe199CY8c49gYxu6ZZdtKVqM5xwVYmN0dNQRg7hLtGcXvpPf3agWcw0hJyBRmjZ8KZs7nQX9yFZFknepV9-6nHqxz",
      alt: "ECCO barnboot",
    },
  },
  {
    brand: "SKECHERS",
    name: "S-Lights Twinkle Sparks",
    description: "LED-lysande sneakers i regnbågsfärger. Kardborrrem och stretchsnörning för enkel på- och avtagning. Tvättbara.",
    price: "599 kr",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtSDPwsNsjld1f5vUL5Js-MNavJlKQbp6il9N98VTwdN4XcXj1QN257LlgwGvuDr1CY0p-ALOXi7fH4FtjV8jxf5n3Sn6zsFWP186smdPp-7eeQf-PSD62Yf69M2JMe43JEHctp84JhUmcE0NGIswxGPHczaQQAHmCtucslPM6njV6LkBwq9xpcsIGutzv3lm9_0oaI8vpkMgBtMhBAlNGjhesFUyjDvfxt5b8Lbc9hksav9KHd3O6CAT8hK1dSEQk-y0vmUKJILI-",
      alt: "Skechers S-Lights för barn",
    },
  },
  {
    brand: "ECCO",
    name: "Biom Natural Motion",
    description: "Biomimetrisk design som följer barnfotens naturliga rörelsemönster. Mjuk Yak-läder och fleece-foder. Storlekar 20–35.",
    price: "899 kr",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBllu7V4UfIDA__RYIvIvVxNOeVCYM5cuW26DutTwmW7FbL7gpvDiPr7VzkIxabx0C6o6cMrQW_xlu7JtneUVRE6WVcwi_XH_1NwG2GkD87PJ4WyWCVojZKVAeRCNwYzLQKcZzWnTSQ2sTwpEFAPnVy70c0g7GQzdfg2NDgmLwmJvSNSFLHWnuW1wMUYaOwN555SAecS2qH530cav_DMbhXauDuF-5hen-s54YEkKtF3LGr9KysYjc31fKrNb5Jt7zJrnuKZPGm2YHu",
      alt: "ECCO Biom barn",
    },
  },
  {
    brand: "RIEKER",
    name: "Tex Sneaker Kids",
    description: "Vattentät textilsneaker med varmfoder. Lämplig för höst och vinter. Anti-halk-sula och reflex i hälkappen.",
    price: "549 kr",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbPjRJBiveiH4Zsdv-tKUajuBJGT-E-c74JHdgWWTKlos4THgBA2_JCOTrns2Jnx-4hiWv514LZKH5_tfOXgM2cOBz_pj-i05-uEfJG7e9izC4_NMkJ-EKGuoVnL_Buz9ZkPjB9D4OuZJoqPfLCER5L016dr2dX6Q9BCu6wtkgUVZdK92W15cxspt1anPaD6GSL_kVUGt605cfkeFNXG38zI66PhhHRed8CurJASvTv8RcHtUhs1tak5iYLmOufUDZIcp_NnQSkMdx",
      alt: "Rieker barn sneaker",
    },
  },
  {
    brand: "GABOR",
    name: "Lena Lace Junior",
    description: "Klassisk skolsko i slitstarkt nappaskinn med spänne och snörning. Anatomisk innersula stödjer fötter i tillväxt.",
    price: "649 kr",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk1thIjXgaGZUZykC15MQL5PkQJuyAvSlPfNEIF-A5_7122HbX29C4hcTy7_ecLsHyKH1RO0xE3Upli1fg9PPMOwWDuFm0U3m0Yc3utzxrxJjS5cYJXR7Tr_yeMfQpwuhqnRltRfQJG0wjwerH9h-G0oPaiWX763VekWTTgqi5cNi2u4e-PWKw3po_Tcy1jUXnnZDSf6xZohHIEMrxqDk5gbXfrdMSYdDdPAYBYixLgrc1DtYQyg3cXMW724pVDwPQ-ROQPmGw3ryV",
      alt: "Gabor skolsko för barn",
    },
  },
  {
    brand: "SKECHERS",
    name: "GoRun Fast Valor",
    description: "Ultralätt löparsneaker med Hyper-Burst-dämpning. Stretchstickad överdel för perfekt passform utan snörning.",
    price: "699 kr",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK4t0SThE6oVC2AyKt_NGET2Oq2fiPKmxOmev0ZFasMlMfVU7wEfohRq3ljQylyrMw_FvWQP3vIkdf77XJ7c3YkUte9v2T2lf4DaPHCyoQOwJaqMy1sAJprc5d46KEe4cf30PmOkxqLwyCHOM_cLZHVSZwfzPBYUmEYQ7nYPWQ8qRNXBZFHO-6SYrP8lnNRiEJXlfYETanWiEUEsgJ77EhlNL4Yqxm1mHy6MSEClH_6__wXYTtN2rS4cij1dvhGE9KOL2Bq3ONbaii2GQ",
      alt: "Skechers GoRun för barn",
    },
  },
  {
    brand: "ECCO",
    name: "First Sandal",
    description: "Sommarfavoriten för de allra minsta. Mjukt läder med anpassningsbara remmar och anti-slipdäck. Storlekar 19–26.",
    price: "499 kr",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFAWcfPkJ6h9yAnoCHnZ8mzjeC9S9V4IPWtSfAsegdJJYWqPc9nw6UCiu42nuwaavV7P0ykPLI-a_ZOmTBmWfPk9jJh6G5ckEtU8s_86-j2ahrla63P8C3BOPpiGZ3e0ltFJ_jZXyhnA65RUJGuuLKmGuVslsTTHKbr7GUT8c5ZssTKbfKj1VjRGWqxCoEUdoUMeE-Ou0QHILANAa4rIyL0LST96dpAQ3oaqcCFSe41jQW0kyLO-ARAUWMWJaLhXp0xHhlPS9aCZ",
      alt: "ECCO sandal för barn",
    },
  },
  {
    brand: "RIEKER",
    name: "Zip Ankle Boot Kids",
    description: "Praktisk ankelboot med dragkedja i sidan. Termo-forad innersula och slitstark sula. Designad för aktiva barn.",
    price: "649 kr",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-vo42JSDbvmi7wDnpWJbpoZzIcj7cVaSfqWolR8ETw_3GoSP6lSfSqYGnVoO0FjYa6dFnBXqtIKkLIdJoLnk9H8NpC9tEP2Ompd8aEsVknV08GvgTrhHf78Pot99cDMwOKtgT_xORv054fJd-wmMdwf1691i0NtzaICL9_lX6-RyRKIQkBQxbbXZ3O4fvz4o0L_pDfyJkrO7TqYGNRm5lE-BXJ8RlVYjSfEhs8mmnqxYRVzmuoL6WxSLtlstg6jq4dF2CHq28jwxt",
      alt: "Rieker boot för barn",
    },
  },
];

export default function BarnPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        {/* Category Header */}
        <section className="max-w-screen-2xl mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <nav className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-widest text-outline">
                <Link href="/" className="hover:text-primary transition-colors">Hem</Link>
                <span>›</span>
                <Link href="/skor" className="hover:text-primary transition-colors">Sortiment</Link>
                <span>›</span>
                <span className="text-on-surface">Barn</span>
              </nav>
              <h1 className="font-(family-name:--font-manrope) text-6xl md:text-8xl font-extrabold tracking-tighter text-stone-900 mb-6">
                Barn
              </h1>
              <p className="text-secondary leading-relaxed font-light text-lg">
                Skor skapade för barnfötter i alla åldrar och aktiviteter. Kvalitet, komfort och hållbarhet — för att barnfötter förtjänar det bästa.
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="text-outline">Visar 8 produkter</span>
            </div>
          </div>
        </section>

        {/* Brand Filter */}
        <section className="max-w-screen-2xl mx-auto px-6 mb-12 sticky top-[72px] z-40 py-4 bg-surface/95 backdrop-blur-sm">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
            {["Alla märken", "ECCO", "Rieker", "Skechers", "Gabor"].map((brand, i) => (
              <button
                key={brand}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  i === 0
                    ? "bg-primary text-white"
                    : "bg-[#e5e2e1] text-[#656464] hover:bg-stone-200"
                }`}
              >
                {brand}
              </button>
            ))}
            <div className="h-8 w-px bg-[#d1c5b8]/30 mx-2" />
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
              ⚙ Filtrera
            </button>
          </div>
        </section>

        {/* Products */}
        <ProductGrid products={BARN_PRODUCTS} />
      </main>
      <Footer />
    </>
  );
}
