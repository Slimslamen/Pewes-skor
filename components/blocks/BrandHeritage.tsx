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
  fallback: Required<Omit<HeritageData, "images">> & { images: HeritageImage[] };
}

export default function BrandHeritage({ data, fallback }: Props) {
  const d = {
    eyebrow: data?.eyebrow ?? fallback.eyebrow,
    heading: data?.heading ?? fallback.heading,
    body:    data?.body    ?? fallback.body,
    images:  data?.images?.length ? data.images : fallback.images,
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

        {d.images.length > 0 && (
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
                    alt={img.alt ?? d.heading}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </section>
  );
}
