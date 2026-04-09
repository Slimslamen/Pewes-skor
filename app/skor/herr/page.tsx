import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/blocks/ProductGrid";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Herrskor",
  description:
    "Herrskor från ECCO, Rieker, Dolomite och Skechers. Klassiska oxfords, funktionella vandringsskor och moderna sneakers — med personlig service i Anderstorp.",
  path:        "/skor/herr",
});

const HERR_PRODUCTS = [
  {
    brand: "ECCO",
    name: "Helsinki 2.0 Oxford",
    description: "Klassisk oxford i nappaskinn med Goodyear-welt-sömnad och lädersula. Perfekt för kontor och formella tillställningar.",
    price: "1.899 kr",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBllu7V4UfIDA__RYIvIvVxNOeVCYM5cuW26DutTwmW7FbL7gpvDiPr7VzkIxabx0C6o6cMrQW_xlu7JtneUVRE6WVcwi_XH_1NwG2GkD87PJ4WyWCVojZKVAeRCNwYzLQKcZzWnTSQ2sTwpEFAPnVy70c0g7GQzdfg2NDgmLwmJvSNSFLHWnuW1wMUYaOwN555SAecS2qH530cav_DMbhXauDuF-5hen-s54YEkKtF3LGr9KysYjc31fKrNb5Jt7zJrnuKZPGm2YHu",
      alt: "ECCO Oxford i svart skinn",
    },
  },
  {
    brand: "RIEKER",
    name: "Tex Derby B1322",
    description: "Lättviktig derby med extra bred passform och antistress-sula. Idealisk för långa arbetsdagar på benen.",
    price: "899 kr",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbPjRJBiveiH4Zsdv-tKUajuBJGT-E-c74JHdgWWTKlos4THgBA2_JCOTrns2Jnx-4hiWv514LZKH5_tfOXgM2cOBz_pj-i05-uEfJG7e9izC4_NMkJ-EKGuoVnL_Buz9ZkPjB9D4OuZJoqPfLCER5L016dr2dX6Q9BCu6wtkgUVZdK92W15cxspt1anPaD6GSL_kVUGt605cfkeFNXG38zI66PhhHRed8CurJASvTv8RcHtUhs1tak5iYLmOufUDZIcp_NnQSkMdx",
      alt: "Rieker derby i brunt",
    },
  },
  {
    brand: "DOLOMITE",
    name: "Cinquantaquattro Low",
    description: "Ikonisk vandringsinspirerad sneaker med gummisulor och vintage-design. Passar lika bra i staden som på lätta stigar.",
    price: "1.499 kr",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9BFoV4o3O5ua1lY7PdSnL67yKlSovA2xBfU9wxIQ8OBqE1RTNoiWx09TXMxIWS6y6uKHh_s7T6rtnO8CDoz0d21fYf7rv80mnG15VOh513EDkS1h7J6jyRyuRVtHZaNBac8dT0tzeR3HupLOfpYETM5IJkTZh8zaRctbitpMY_mBaYbvBR91Pu_gnuxo-eoSYZ42rk1LSWK4kGgOH2EH3TcqXu4aSi3L6pdP_LGBo108f5oyxhkdCd7QMukgOoe_8zTfO4p9w9RO9",
      alt: "Dolomite Cinquantaquattro",
    },
  },
  {
    brand: "ECCO",
    name: "Street Lite Retro M",
    description: "Tidlös retro-sneaker med mjukt nubucksskinn och FLUIDFORM-teknik för oslagbar dämpning hela dagen.",
    price: "1.199 kr",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK4t0SThE6oVC2AyKt_NGET2Oq2fiPKmxOmev0ZFasMlMfVU7wEfohRq3ljQylyrMw_FvWQP3vIkdf77XJ7c3YkUte9v2T2lf4DaPHCyoQOwJaqMy1sAJprc5d46KEe4cf30PmOkxqLwyCHOM_cLZHVSZwfzPBYUmEYQ7nYPWQ8qRNXBZFHO-6SYrP8lnNRiEJXlfYETanWiEUEsgJ77EhlNL4Yqxm1mHy6MSEClH_6__wXYTtN2rS4cij1dvhGE9KOL2Bq3ONbaii2GQ",
      alt: "ECCO Street Lite sneakers",
    },
  },
  {
    brand: "SKECHERS",
    name: "Relaxed Fit Elected",
    description: "Bred passform med Memory Foam-innersula och mjuk mockaöverdelkonstruktion. Skonummer i halvsteg tillgängliga.",
    price: "949 kr",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtSDPwsNsjld1f5vUL5Js-MNavJlKQbp6il9N98VTwdN4XcXj1QN257LlgwGvuDr1CY0p-ALOXi7fH4FtjV8jxf5n3Sn6zsFWP186smdPp-7eeQf-PSD62Yf69M2JMe43JEHctp84JhUmcE0NGIswxGPHczaQQAHmCtucslPM6njV6LkBwq9xpcsIGutzv3lm9_0oaI8vpkMgBtMhBAlNGjhesFUyjDvfxt5b8Lbc9hksav9KHd3O6CAT8hK1dSEQk-y0vmUKJILI-",
      alt: "Skechers Relaxed Fit i grå",
    },
  },
  {
    brand: "RIEKER",
    name: "Comfort Suede Boot",
    description: "Kort känga i äkta mocka med varmfoder och Rieker-antistress-teknologi. Perfekt val när temperaturen sjunker.",
    price: "1.099 kr",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-vo42JSDbvmi7wDnpWJbpoZzIcj7cVaSfqWolR8ETw_3GoSP6lSfSqYGnVoO0FjYa6dFnBXqtIKkLIdJoLnk9H8NpC9tEP2Ompd8aEsVknV08GvgTrhHf78Pot99cDMwOKtgT_xORv054fJd-wmMdwf1691i0NtzaICL9_lX6-RyRKIQkBQxbbXZ3O4fvz4o0L_pDfyJkrO7TqYGNRm5lE-BXJ8RlVYjSfEhs8mmnqxYRVzmuoL6WxSLtlstg6jq4dF2CHq28jwxt",
      alt: "Rieker suede boots",
    },
  },
  {
    brand: "ECCO",
    name: "Soft 7 Tred GTX",
    description: "Gore-Tex-membran håller fötterna torra. Mjukt nubucksskinn och Surround-teknologi för helomslutande komfort.",
    price: "1.599 kr",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk1thIjXgaGZUZykC15MQL5PkQJuyAvSlPfNEIF-A5_7122HbX29C4hcTy7_ecLsHyKH1RO0xE3Upli1fg9PPMOwWDuFm0U3m0Yc3utzxrxJjS5cYJXR7Tr_yeMfQpwuhqnRltRfQJG0wjwerH9h-G0oPaiWX763VekWTTgqi5cNi2u4e-PWKw3po_Tcy1jUXnnZDSf6xZohHIEMrxqDk5gbXfrdMSYdDdPAYBYixLgrc1DtYQyg3cXMW724pVDwPQ-ROQPmGw3ryV",
      alt: "ECCO GTX sneaker",
    },
  },
  {
    brand: "DOLOMITE",
    name: "Torq Tech Hiker",
    description: "Teknisk vandringskänga med vibram-sula, vattentätt läder och ergonomiskt fotbädd. Ger grepp på alla underlag.",
    price: "1.749 kr",
    image: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXWueTO72_4Vp8RNvWcEfrTNnIFpWBC6HJqhn234wOMAUoPPThRvKtqwH_NJyEzG1Bh_aT-aTnui-00yK5BEkaiBe4aSEzSpkjFAb84rCHg0_h_kUJprc5d46KEe4cf30PmOkxqLwyCHOM_cLZHVSZwfzPBYUmEYQ7nYPWQ8qRNXBZFHO-6SYrP8lnNRiEJXlfYETanWiEUEsgJ77EhlNL4Yqxm1mHy6MSEClH_6__wXYTtN2rS4cij1dvhGE9KOL2Bq3ONbaii2GQ",
      alt: "Dolomite hiking boot",
    },
  },
];

export default function HerrPage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[
        { name: "Hem",       path: "/" },
        { name: "Sortiment", path: "/skor" },
        { name: "Herr",      path: "/skor/herr" },
      ]} />
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
                <span className="text-on-surface">Herr</span>
              </nav>
              <h1 className="font-(family-name:--font-manrope) text-6xl md:text-8xl font-extrabold tracking-tighter text-stone-900 mb-6">
                Herr
              </h1>
              <p className="text-secondary leading-relaxed font-light text-lg">
                En noggrant utvald kollektion av skor för den moderna mannen. Från tidlösa klassiker till funktionella friluftsskor, alltid med fokus på komfort och hantverk.
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
            {["Alla märken", "ECCO", "Rieker", "Skechers", "Dolomite"].map((brand, i) => (
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
        <ProductGrid products={HERR_PRODUCTS} />
      </main>
      <Footer />
    </>
  );
}
