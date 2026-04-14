import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BrandProductGrid from "@/components/blocks/BrandProductGrid";
import Reveal from "@/components/blocks/Reveal";
import { notFound } from "next/navigation";

// This would ideally come from a CMS like Sanity
const BRANDS_DATA: Record<string, { name: string; description: string }> = {
  kavat: {
    name: "Kavat",
    description: "Svenska klassiker för barn och vuxna. Hållbara skor tillverkade med omsorg om både fötter och miljö.",
  },
  viking: {
    name: "Viking",
    description: "Norska kvalitetsskor för tuffa nordiska förhållanden. Specialist på vattentäta skor och stövlar.",
  },
  pax: {
    name: "Pax",
    description: "Svensk designtradition sedan 1944. Bekväma och slitstarka barnskor för alla väder.",
  },
  superfit: {
    name: "Superfit",
    description: "Österrikisk expertis på barnfötter. Rekommenderas av läkare för optimal utveckling av växande fötter.",
  },
  legero: {
    name: "Legero",
    description: "Lätta och funktionella skor med fokus på komfort. 'Fötternas favorit' med Gore-Tex skydd.",
  },
  bagheera: {
    name: "Bagheera",
    description: "Svenskt sportmärke från Avesta. Funktionella skor för löpning, träning och aktiv fritid.",
  },
  merrell: {
    name: "Merrell",
    description: "Amerikanskt outdoormärke världskänt för sin komfort och slitstyrka i skog och mark.",
  },
  salomon: {
    name: "Salomon",
    description: "Franskt premiummärke för teknisk outdoor och trailrunning. Innovation för bergsälskare.",
  },
  icebug: {
    name: "Icebug",
    description: "Svensk expert på grepp. Skor med dubbar eller specialgummi för trygga steg på is och halka.",
  },
  vagabond: {
    name: "Vagabond",
    description: "Svenskt modevarumärke med fokus på hantverk och detaljer. Modern design för den stilmedvetna.",
  },
  "ten-points": {
    name: "Ten Points",
    description: "Svensk design möter hållbart hantverk. Skor med karaktär tillverkade i Europa.",
  },
  dockers: {
    name: "Dockers",
    description: "Klassisk amerikansk stil med fokus på kvalitet och funktion för en avslappnad vardag.",
  },
  lloyd: {
    name: "Lloyd",
    description: "Tysk premiumkvalitet sedan 1888. Eleganta skor för herrar med högsta krav på passform.",
  },
  ara: {
    name: "Ara",
    description: "Tysk komfortexpert med fokus på breda passformer och funktionella material för alla fötter.",
  },
};

// Mock shoes generator
const getMockShoes = (brandName: string) => [
  {
    name: `${brandName} Classic Model`,
    price: "1.299 kr",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    category: "Sneakers",
  },
  {
    name: `${brandName} Urban Walker`,
    price: "999 kr",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
    category: "Vardag",
  },
  {
    name: `${brandName} Soft Comfort`,
    price: "1.100 kr",
    sizes: ["36", "37", "38", "39", "40", "41"],
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800",
    category: "Damskor",
  },
  {
    name: `${brandName} All-Terrain`,
    price: "1.499 kr",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    image: "https://images.unsplash.com/photo-1520639889410-1dfa467409f4?auto=format&fit=crop&q=80&w=800",
    category: "Outdoor",
  },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = BRANDS_DATA[slug];

  if (!brand) return { title: "Varumärke" };

  return {
    title: `${brand.name} | Pewes Skor`,
    description: brand.description,
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = BRANDS_DATA[slug];

  if (!brand) {
    notFound();
  }

  const shoes = getMockShoes(brand.name);

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Brand Hero */}
        <section className="bg-stone-50 py-24 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal from="up">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4 block">
                Varumärken
              </span>
              <h1 className="text-5xl md:text-7xl font-light text-stone-900 mb-8 font-(family-name:--font-manrope)">
                {brand.name}
              </h1>
              <p className="text-xl text-stone-600 max-w-2xl leading-relaxed font-light">
                {brand.description}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Product Grid */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-6 pt-16">
            <Reveal delay={0.2}>
              <p className="text- stone-900 text-3xl font-light font-(family-name:--font-manrope)">
                Utvalda skor från {brand.name}
              </p>
            </Reveal>
          </div>
          <BrandProductGrid brandName={brand.name} shoes={shoes} />
        </div>
      </main>
      <Footer />
    </>
  );
}
