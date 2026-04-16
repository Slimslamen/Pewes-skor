import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/HeaderServer";
import Footer from "@/components/layout/Footer";
import NyheterList, { type NyhetCard } from "@/components/blocks/NyheterList";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { sanityFetch } from "@/sanity/lib/live";
import { nyheterIndexQuery } from "@/sanity/lib/queries";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Nyheter",
  description:
    "Utforska Pewes Skors senaste kollektioner och säsongens nyheter. Handplockade skor för dam, herr och barn från Anderstorp.",
  path:        "/nyheter",
});

// ── Fallback (displayed before any Sanity documents exist) ───────────────────

const FALLBACK_POSTS: NyhetCard[] = [
  {
    title:       "Sommarens nyheter 2026",
    slug:        "sommarens-nyheter-2026",
    publishedAt: "2026-04-01T10:00:00Z",
    season:      "Sommar 2026",
    excerpt:
      "Solen lockar fram de ljusaste skorna. Utforska vår nysläppta sommarkollektion — från luftiga sandaler till färgglada sneakers och tidlösa loafers för de varmaste dagarna.",
    body:
      "Sommarkollektionen 2026 handlar om ljus, luftighet och material som låter foten andas när temperaturen stiger. Vi har handplockat modeller från ECCO, Gabor och Skechers som alla bär den där självklara sommarkänslan — men utan att kompromissa med komfort eller hållbarhet.\n\nFör dam har vi satsat stort på mjuka sandaler i naturläder, med justerbara remmar och formade innersulor som klarar en hel dag på stan. Gabors nya remsandal i benvitt är en av säsongens mest efterfrågade modeller, och ECCO:s Flash-serie har fått både nya färger och en uppdaterad passform.\n\nPå herrsidan dominerar lätta sneakers och slip-ons i mesh och perforerat läder. Skechers Air-Cooled Memory Foam gör comeback i en renare, mer vuxen silhuett — perfekt för dig som vill ha komforten men inte det sportiga utseendet.\n\nKom in till butiken i Anderstorp och prova — hela kollektionen finns på plats från och med den 15 april.",
    coverImage: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFAWcfPkJ6h9yAnoCHnZ8mzjeC9S9V4IPWtSfAsegdJJYWqPc9nw6UCiu42nuwaavV7P0ykPLI-a_ZOmTBmWfPk9jJh6G5ckEtU8s_86-j2ahrla63P8C3BOPpiGZ3e0ltFJ_jZXyhnA65RUJGuuLKmGuVslsTTHKbr7GUT8c5ZssTKbfKj1VjRGWqxCoEUdoUMeE-Ou0QHILANAa4rIyL0LST96dpAQ3oaqcCFSe41jQW0kyLO-ARAUWMWJaLhXp0xHhlPS9aCZ",
      alt: "Sommarens skokollektion 2026",
    },
  },
  {
    title:       "Vårens kollektioner 2026",
    slug:        "varens-kollektioner-2026",
    publishedAt: "2026-02-15T10:00:00Z",
    season:      "Vår 2026",
    excerpt:
      "Vårens kollektion är här — med mjuka pasteller, klassiska läderloafers och lättviktiga sneakers för de första varma dagarna.",
    body:
      "När snön börjar smälta lyfts också garderoben. Vårkollektionen 2026 är byggd kring mjuka pasteller, jordnära toner och material som passar den svenska övergångsperioden — då marken fortfarande är fuktig men vinterkängorna känns overkill.\n\nLoafern står i centrum i år. Vi har tagit in Gabors nya pennyloafer i tre färger, ECCO:s klassiker i mörkbrunt kalvläder och Riekers lättviktsmodell med elastisk krage. Gemensamt för alla tre: de är gjorda för att bäras utan strumpor när det blir varmare, och med strumpor tills dess.\n\nVid sidan av loafrarna hittar du årets första sneakers i det ljusare segmentet — rena silhuetter, dämpade färger och sulor som tål en blöt vårgata. Ett litet men välvalt urval, precis som vi vill ha det.",
    coverImage: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk1thIjXgaGZUZykC15MQL5PkQJuyAvSlPfNEIF-A5_7122HbX29C4hcTy7_ecLsHyKH1RO0xE3Upli1fg9PPMOwWDuFm0U3m0Yc3utzxrxJjS5cYJXR7Tr_yeMfQpwuhqnRltRfQJG0wjwerH9h-G0oPaiWX763VekWTTgqi5cNi2u4e-PWKw3po_Tcy1jUXnnZDSf6xZohHIEMrxqDk5gbXfrdMSYdDdPAYBYixLgrc1DtYQyg3cXMW724pVDwPQ-ROQPmGw3ryV",
      alt: "Vårens skokollektion 2026",
    },
  },
];

export default async function NyheterPage() {
  const { data: posts } = await sanityFetch({ query: nyheterIndexQuery });
  const items = (posts?.length ? posts : FALLBACK_POSTS) as NyhetCard[];

  return (
    <>
      <Header />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Hem",     path: "/" },
          { name: "Nyheter", path: "/nyheter" },
        ]}
      />

      <main className="pt-28 pb-24 bg-surface min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-6">

          {/* Page header */}
          <div className="mb-16">
            <nav className="flex items-center gap-2 mb-6 text-[10px] uppercase tracking-widest text-outline">
              <Link href="/" className="hover:text-primary transition-colors">Hem</Link>
              <span>›</span>
              <span className="text-on-surface">Nyheter</span>
            </nav>
            <h1 className="font-(family-name:--font-manrope) text-6xl md:text-8xl font-extrabold tracking-tighter text-stone-900">
              Nyheter
            </h1>
            <p className="mt-4 text-secondary font-light text-lg max-w-xl">
              Säsongens nyheter och noggrant utvalda kollektioner — direkt till dig.
            </p>
          </div>

          <NyheterList posts={items} />

        </div>
      </main>
      <Footer />
    </>
  );
}
