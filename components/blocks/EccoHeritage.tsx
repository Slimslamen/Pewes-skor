import Image from "next/image";

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
    {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6tnLluK2Xpj1acKLG5JmriFhY-6SBRWsmozwKGWbmOWZO1LH8iiImWdsn2vjkXRtY3xFSYCophER-J7d5ddFi",
      alt: "Traditional Danish workshop with morning light",
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
    <section className="py-32 bg-surface">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="font-(family-name:--font-inter) text-xs uppercase tracking-widest text-primary mb-8 block">
          {d.eyebrow}
        </span>
        <h2 className="font-(family-name:--font-manrope) text-4xl md:text-5xl font-light leading-tight text-stone-900 mb-12">
          {d.heading}
        </h2>
        <p className="text-lg text-secondary font-light leading-relaxed mb-16">
          {d.body}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {d.images.map((img, i) =>
            img.url ? (
              <div
                key={i}
                className={`relative w-full h-96 overflow-hidden rounded-sm shadow-lg ${
                  i === 1 ? "md:translate-y-12" : ""
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt ?? "ECCO heritage"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
