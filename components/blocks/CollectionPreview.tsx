import Image from "next/image";
import Link from "next/link";

interface Category {
  name: string;
  href: string;
  image?: { url?: string; alt?: string };
}

interface CollectionData {
  heading?: string;
  categories?: Category[];
}

interface Props {
  data?: CollectionData | null;
}

const FALLBACK: CollectionData = {
  heading: "Noggrant utvalda kollektioner för livets alla tillfällen.",
  categories: [
    {
      name: "Dam",
      href: "/skor/dam",
      image: {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkbc0XcQW3tjrMV1WalE25DQB1MCbgZyznh0ryA_FaPUlmSH7UMWGw-xzNfC2HmqSDdakIoxaxfHI8OldsBwGOUZRTWa9OAnfIHXCbax761VUpzu8GcnaT48I4AeHxtBubSIkwmYZwYNjugmOmyut-o5xATnD5pQiLYomeZKAfr1K-y9oPO4tIo4wjMyn93cLYA-TZbVAXqENNS5feGoU1JtpOgj2qJN-D-Ww1iSLDVXbCmfXqLfoTSzbQGr-tGQpTHQGkSpWw9trh",
        alt: "Damkollektion",
      },
    },
    {
      name: "Herr",
      href: "/skor/herr",
      image: {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXWueTO72_4Vp8RNvWcEfrTNnIFpWBC6HJqhn234wOMAUoPPThRvKtqwH_NJyEzG1Bh_aT-aTnui-00yK5BEkaiBe4aSEzSpkjFAb84rCHg0_h_kUJprc5d46KEe4cf30PmOkxqLwyCHOM_cLZHVSZwfzPBYUmEYQ7nYPWQ8qRNXBZFHO-6SYrP8lnNRiEJXlfYETanWiEUEsgJ77EhlNL4Yqxm1mHy6MSEClH_6__wXYTtN2rS4cij1dvhGE9KOL2Bq3ONbaii2GQ",
        alt: "Herrkollektion",
      },
    },
    {
      name: "Barn",
      href: "/skor/barn",
      image: {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYgkuoGad0DOqh9-q2tgcIJa3JzuAEIX5YlzfxL5RaV_ycAWG5fbe199CY8c49gYxu6ZZdtKVqM5xwVYmN0dNQRg7hLtGcXvpPf3agWcw0hJyBRmjZ8KZs7nQX9yFZFknepV9-6nHqxz",
        alt: "Barnkollektion",
      },
    },
  ],
};

export default function CollectionPreview({ data }: Props) {
  const d = {
    heading:    data?.heading    ?? FALLBACK.heading,
    categories: data?.categories?.length ? data.categories : FALLBACK.categories!,
  };

  return (
    <section className="py-32 bg-surface" id="collection">
      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-(family-name:--font-manrope) text-5xl font-bold tracking-tighter mb-4 text-on-surface">
              {d.heading}
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {d.categories.map((cat, i) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={`group cursor-pointer ${i === 1 ? "md:translate-y-12" : ""}`}
            >
              <div className="overflow-hidden mb-6 aspect-[3/4]">
                {cat.image?.url ? (
                  <Image
                    src={cat.image.url}
                    alt={cat.image.alt ?? cat.name}
                    width={600}
                    height={800}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container" />
                )}
              </div>
              <div className="flex justify-between items-center">
                <h3 className="font-(family-name:--font-manrope) text-2xl font-bold">
                  {cat.name}
                </h3>
                <span className="text-sm font-(family-name:--font-inter) uppercase tracking-widest text-outline group-hover:text-primary transition-colors">
                  Se alla →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
