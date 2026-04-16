import { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { brandPageQuery, brandPageSlugsQuery } from "@/sanity/lib/queries";
import HeaderServer from "@/components/layout/HeaderServer";
import Footer from "@/components/layout/Footer";
import BrandProductGrid from "@/components/blocks/BrandProductGrid";
import Reveal from "@/components/blocks/Reveal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs: Array<{ slug: string }> = await client.fetch(brandPageSlugsQuery);
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await sanityFetch({ query: brandPageQuery, params: { slug } });

  if (!data?.name) return { title: "Varumärke" };

  return {
    title: `${data.name} | Pewes Skor`,
    description: data.description?.slice(0, 160) ?? `${data.name} skor hos Pewes Skor i Anderstorp.`,
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const { data } = await sanityFetch({ query: brandPageQuery, params: { slug } });

  if (!data?.name) notFound();

  return (
    <>
      <HeaderServer />
      <main className="pt-20">

        {/* ── Brand Hero ── */}
        <section className="bg-stone-50 py-24 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal from="up">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4 block font-(family-name:--font-inter)">
                Varumärken
              </span>
              <h1 className="text-5xl md:text-7xl font-light text-stone-900 mb-8 font-(family-name:--font-manrope)">
                {data.name}
              </h1>
              {data.description && (
                <p className="text-xl text-stone-600 max-w-2xl leading-relaxed font-light whitespace-pre-line">
                  {data.description}
                </p>
              )}
            </Reveal>
          </div>
        </section>

        {/* ── Product Grid ── */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-6 pt-16">
            <Reveal delay={0.2}>
              <p className="text-stone-900 text-3xl font-light font-(family-name:--font-manrope)">
                Utvalda skor från {data.name}
              </p>
            </Reveal>
          </div>
          <BrandProductGrid brandName={data.name} shoes={data.products ?? []} />
        </div>

      </main>
      <Footer />
    </>
  );
}
