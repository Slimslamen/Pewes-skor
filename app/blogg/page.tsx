import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Blogg",
  description:
    "Guider, trender och inspiration från oss på Pewes Skor i Anderstorp. Lär dig mer om skovård, aktuella trender och hur du väljer rätt skor.",
  path:        "/blogg",
});

interface BlogPost {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  imageAlt: string;
}

const POSTS: BlogPost[] = [
  {
    slug: "sa-valjer-du-ratt-skor",
    category: "Guide",
    date: "7 april 2026",
    title: "Så väljer du rätt skor för varje tillfälle",
    excerpt:
      "Att hitta det perfekta paret kräver mer än att gilla utseendet. Vi guidar dig genom de viktigaste faktorerna — passform, material och användningsområde — så att dina skor håller länge och känns bekväma hela dagen.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBllu7V4UfIDA__RYIvIvVxNOeVCYM5cuW26DutTwmW7FbL7gpvDiPr7VzkIxabx0C6o6cMrQW_xlu7JtneUVRE6WVcwi_XH_1NwG2GkD87PJ4WyWCVojZKVAeRCNwYzLQKcZzWnTSQ2sTwpEFAPnVy70c0g7GQzdfg2NDgmLwmJvSNSFLHWnuW1wMUYaOwN555SAecS2qH530cav_DMbhXauDuF-5hen-s54YEkKtF3LGr9KysYjc31fKrNb5Jt7zJrnuKZPGm2YHu",
    imageAlt: "Premium leather boots on display",
  },
  {
    slug: "skinnvard-tips",
    category: "Vård & Underhåll",
    date: "28 mars 2026",
    title: "5 tips för att vårda dina skinnskor",
    excerpt:
      "Med rätt vård kan ett par lädersko hålla i decennier. Lär dig vilka produkter du ska använda, hur ofta du bör skoskafta och hur du skyddar mot väder och vind.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBk1thIjXgaGZUZykC15MQL5PkQJuyAvSlPfNEIF-A5_7122HbX29C4hcTy7_ecLsHyKH1RO0xE3Upli1fg9PPMOwWDuFm0U3m0Yc3utzxrxJjS5cYJXR7Tr_yeMfQpwuhqnRltRfQJG0wjwerH9h-G0oPaiWX763VekWTTgqi5cNi2u4e-PWKw3po_Tcy1jUXnnZDSf6xZohHIEMrxqDk5gbXfrdMSYdDdPAYBYixLgrc1DtYQyg3cXMW724pVDwPQ-ROQPmGw3ryV",
    imageAlt: "Leather loafer close-up",
  },
  {
    slug: "varen-2026-trender",
    category: "Trender",
    date: "15 mars 2026",
    title: "Vårens skotrend 2026 — det här bär du",
    excerpt:
      "Chunky sneakers möter klassiska loafers. Den här våren handlar det om att mixa stilar med självförtroende. Vi har valt ut de hetaste modellerna från vårt sortiment.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbPjRJBiveiH4Zsdv-tKUajuBJGT-E-c74JHdgWWTKlos4THgBA2_JCOTrns2Jnx-4hiWv514LZKH5_tfOXgM2cOBz_pj-i05-uEfJG7e9izC4_NMkJ-EKGuoVnL_Buz9ZkPjB9D4OuZJoqPfLCER5L016dr2dX6Q9BCu6wtkgUVZdK92W15cxspt1anPaD6GSL_kVUGt605cfkeFNXG38zI66PhhHRed8CurJASvTv8RcHtUhs1tak5iYLmOufUDZIcp_NnQSkMdx",
    imageAlt: "Modern sneakers on pavement",
  },
  {
    slug: "ecco-bakom-kulisserna",
    category: "Varumärke",
    date: "2 mars 2026",
    title: "ECCO — hantverk i varje steg",
    excerpt:
      "Vi tar dig med bakom kulisserna hos ett av världens ledande skoföretag och visar hur deras skor tillverkas från råhud till färdig produkt.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA9BFoV4o3O5ua1lY7PdSnL67yKlSovA2xBfU9wxIQ8OBqE1RTNoiWx09TXMxIWS6y6uKHh_s7T6rtnO8CDoz0d21fYf7rv80mnG15VOh513EDkS1h7J6jyRyuRVtHZaNBac8dT0tzeR3HupLOfpYETM5IJkTZh8zaRctbitpMY_mBaYbvBR91Pu_gnuxo-eoSYZ42rk1LSWK4kGgOH2EH3TcqXu4aSi3L6pdP_LGBo108f5oyxhkdCd7QMukgOoe_8zTfO4p9w9RO9",
    imageAlt: "ECCO shoe construction detail",
  },
  {
    slug: "barnsko-guide",
    category: "Guide",
    date: "18 februari 2026",
    title: "Barnsko-guiden: Vad du behöver veta",
    excerpt:
      "Barnfötter växer snabbt och behöver rätt stöd. Vi reder ut vanliga frågor om storlekar, material och hur ofta du bör köpa nya skor till ditt barn.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYgkuoGad0DOqh9-q2tgcIJa3JzuAEIX5YlzfxL5RaV_ycAWG5fbe199CY8c49gYxu6ZZdtKVqM5xwVYmN0dNQRg7hLtGcXvpPf3agWcw0hJyBRmjZ8KZs7nQX9yFZFknepV9-6nHqxz",
    imageAlt: "Children's colourful shoes",
  },
];

export default function BloggPage() {
  const [featured, ...rest] = POSTS;

  return (
    <>
      <Header />
      <main className="pt-28 pb-24 bg-surface min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-6">

          {/* Page header */}
          <div className="mb-16">
            <nav className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-widest text-outline">
              <Link href="/" className="hover:text-primary transition-colors">Hem</Link>
              <span>›</span>
              <span className="text-on-surface">Blogg</span>
            </nav>
            <h1 className="font-(family-name:--font-manrope) text-6xl md:text-8xl font-extrabold tracking-tighter text-stone-900">
              Blogg
            </h1>
            <p className="mt-4 text-secondary font-light text-lg max-w-xl">
              Guider, trender och inspiration från oss på Pewes Skor.
            </p>
          </div>

          {/* Featured post — full width */}
          <Link
            href={`/blogg/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 mb-20 overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-500 bg-surface-container-low"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
              <Image
                src={featured.imageUrl}
                alt={featured.imageAlt}
                fill
                className="object-cover transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex flex-col justify-center p-10 lg:p-14">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {featured.category}
                </span>
                <span className="text-xs text-outline">{featured.date}</span>
              </div>
              <h2 className="font-(family-name:--font-manrope) text-3xl md:text-4xl font-bold text-on-surface tracking-tight leading-tight mb-5 group-hover:text-primary transition-colors duration-300">
                {featured.title}
              </h2>
              <p className="text-secondary font-light leading-relaxed mb-8">
                {featured.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 font-(family-name:--font-manrope) text-xs font-bold uppercase tracking-widest text-on-surface group-hover:text-primary transition-colors">
                Läs mer <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>

          {/* Remaining posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blogg/${post.slug}`}
                className="group overflow-hidden rounded-xl bg-surface-container-low shadow-sm hover:shadow-lg transition-shadow duration-500"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-outline">{post.date}</span>
                  </div>
                  <h3 className="font-(family-name:--font-manrope) text-xl font-bold text-on-surface tracking-tight leading-tight mb-3 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-secondary font-light text-sm leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 font-(family-name:--font-manrope) text-xs font-bold uppercase tracking-widest text-outline group-hover:text-primary transition-colors">
                    Läs mer <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
