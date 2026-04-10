import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { sanityFetch } from "@/sanity/lib/live";
import { shoeCarePageQuery } from "@/sanity/lib/queries";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Skovård",
  description:
    "Lär dig sköta dina skor rätt — guide för läder, nubuck, mocka, textil, vandring och syntet. Praktiska råd från oss på Pewes Skor i Anderstorp.",
  path:        "/skovard",
});

// ── Fallback content (shown when Sanity has no document) ────────────────────

interface Step     { stepTitle: string; body: string }
interface Material {
  materialKey: string;
  title:       string;
  intro:       string;
  steps:       Step[];
  proTip:      string;
}

const FALLBACK_MATERIALS: Material[] = [
  {
    materialKey: "lader",
    title:       "Läder",
    intro:
      "Äkta läder är ett naturmaterial som kräver regelbunden vård för att behålla sin form, lyster och hållbarhet. Med rätt rutiner kan ett par läderskor hålla i decennier.",
    steps: [
      {
        stepTitle: "Rengör regelbundet",
        body:
          "Borsta bort smuts och damm med en mjuk borste efter varje bärning. Använd en fuktig trasa med lite neutral tvål för envisare smuts. Torka aldrig med varmt vatten.",
      },
      {
        stepTitle: "Ge näring och fukt",
        body:
          "Applicera ett läderbalm eller skokräm var 4–6 vecka för att återfukta läderfibrerna och förhindra sprickor. Välj en produkt som matchar skodonets färg och lägg på ett tunt lager med cirkelrörelser.",
      },
      {
        stepTitle: "Impregnera",
        body:
          "Spraya med ett vattenavstötande läder-impregnering efter rengöring och innan konditionering. Håll på 20 cm avstånd, låt torka i 15 minuter och upprepa vid behov.",
      },
      {
        stepTitle: "Använd skoblock",
        body:
          "Sätt in skoblock av cederträ direkt när du tar av dig skorna. Cedern absorberar fukt och svett, motverkar lukt och hjälper skorna att behålla sin ursprungliga form.",
      },
      {
        stepTitle: "Torka rätt",
        body:
          "Om skorna blivit blöta: stoppa in tidningspapper och låt torka i rumstemperatur i minst 24 timmar. Placera aldrig nära element, kamin eller i direkt solljus — värme torkar ut läderfibrerna och orsakar sprickor.",
      },
    ],
    proTip:
      "Rotera ditt skoinnehav. Bär inte samma par två dagar i rad — läder mår bra av att vila minst ett dygn för att luftas ut och återhämta sin form.",
  },
  {
    materialKey: "nubuck",
    title:       "Nubuck & Mocka",
    intro:
      "Nubuck och mocka ger ett sofistikerat, matt utseende men är känsligare för fukt och smuts än blankt läder. Med rätt verktyg och rutin bevarar du ytan länge.",
    steps: [
      {
        stepTitle: "Daglig borstning",
        body:
          "Borsta nubuck och mocka med en mjuk suede-borste efter varje bärning, alltid längs fiberns riktning. Det plockar upp damm och håller ytan jämn och sammetslen.",
      },
      {
        stepTitle: "Behandla fläckar genast",
        body:
          "Använd ett suede-suddgummi på torrsmuts och ljusare fläckar. Gnid försiktigt och borsta sedan bort rester. För envisare fläckar: gnid med en mjuk trasa fuktad i lite vitt vin-ättika och låt lufttorka.",
      },
      {
        stepTitle: "Impregnera före bärning",
        body:
          "Spraya med suede/nubuck-impregnering innan första bärningen och sedan var 4–6 vecka. Det skapar ett osynligt skydd mot regn och smuts utan att förändra ytan.",
      },
      {
        stepTitle: "Återuppliva nedtryckta ytor",
        body:
          "Är ytan nedtryckt och glänsig? Håll skorna i 5–10 sekunder över ångande vatten (försiktigt) och borsta sedan upp fibrerna med en torr suede-borste. Det återställer den ursprungliga sammetsytan.",
      },
    ],
    proTip:
      "Undvik nubuck och mocka vid regn och snö. Om skorna ändå blir blöta: borsta av överskottsvatten direkt med en torr borste och låt torka i rumstemperatur — aldrig nära värme.",
  },
  {
    materialKey: "textil",
    title:       "Textil",
    intro:
      "Textilskor — löparskor, sneakers och tygbaserade modeller — är ofta lätta och andningsbara men behöver rätt hantering för att behålla form och funktion.",
    steps: [
      {
        stepTitle: "Daglig rengöring",
        body:
          "Torka av ytan med en mjuk borste eller fuktig trasa och lite mild handtvål. Undvik att blöta hela skons insida — koncentrera rengöringen på överdelen.",
      },
      {
        stepTitle: "Maskintvättning",
        body:
          "Många textilskor tål maskintvättning i 30 °C i en tvättpåse eller tvätta dem i en gammal örngottspåse. Ta ut innersulorna separat och ta av skosnörena. Välj ett skonsamt centrifugeringsprogram.",
      },
      {
        stepTitle: "Torka korrekt",
        body:
          "Stoppa in tidningspapper och lufttorka i rumstemperatur. Aldrig i torktumlare — värmen krymper och deformerar både material och limmade sektioner. Byt tidningspapper varannan timme de första timmarna.",
      },
      {
        stepTitle: "Impregnera",
        body:
          "Spraya med textilimpregnering efter varje tvättning. Det skyddar mot fukt, minskar mängden smuts som fastnar och förkortar rengöringstiden nästa gång.",
      },
    ],
    proTip:
      "Byt skosnören och innersulor regelbundet. Nya sulor och rena snören fräschar upp utseendet dramatiskt utan att du behöver köpa ett nytt par.",
  },
  {
    materialKey: "vandring",
    title:       "Vandring",
    intro:
      "Vandringsskor utsätts för tuffa förhållanden — grus, lera, fukt och temperaturväxlingar. Regelbunden service förlänger livslängden och bibehåller viktiga funktioner som vattentäthet och grepp.",
    steps: [
      {
        stepTitle: "Rengör efter varje tur",
        body:
          "Spola bort grov smuts med kallt vatten och en styvare borste direkt efter turen. Rengör sulorna noga — inbyggd sten och grus sliter på pinnarna och minskar greppet. Torka ur insidan med en torr trasa.",
      },
      {
        stepTitle: "Torka korrekt",
        body:
          "Lossa snöringen och ta ut innersulorna. Fyll med tidningspapper och ställ i rumstemperatur. Aldrig nära kamin, bilens fläkt eller hanteringsvarma ytor — extremvärme förstör Gore-Tex-membran och limmade delar.",
      },
      {
        stepTitle: "Vax och impregnera",
        body:
          "Påför lämpligt skyddsmedel utifrån materialet: vax för glattläder, spray för Gore-Tex- och textilöverdelar. Värm upp läderytorna lätt med hårtork (låg värme) innan du applicerar vaxet — det ökar inpenetrationen.",
      },
      {
        stepTitle: "Kontrollera sula och sömmar",
        body:
          "Kontrollera regelbundet om sulan har skador, urslitna delar eller börjat lossna. En del-lossnad sula bör lagas omedelbart — vatten tränger in och inifrån-fukten förstör skon snabbt.",
      },
      {
        stepTitle: "Förvara rätt",
        body:
          "Förvara i en torr, sval och mörk plats utan att trycka ihop sulorna. Undvik plastpåsar som skapar kondens. En påse med silikagelkuddar håller fukten borta under längre förvaring.",
      },
    ],
    proTip:
      "Reaktivera DWR-skyddet (Durable Water Repellent) efter varje tvättning. Vatten ska fortfarande pärla på ytmaterialet. Om vatten börjar tränga in istället för att pärla är det dags att impregnera igen.",
  },
  {
    materialKey: "syntet",
    title:       "Syntet",
    intro:
      "Syntetiska material — PU-läder, mikrofiber och vattenavvisande ytmaterial — är lättskött men inte underhållsfritt. Rätt behandling bevarar både utseende och funktion.",
    steps: [
      {
        stepTitle: "Rengör med mild tvål",
        body:
          "Blanda lite diskmedel eller handtvål i ljummet vatten. Skrubba försiktigt med en mjuk borste eller trasa. Skölj med en ren trasa fuktad i rent vatten. Upprepa om nödvändigt.",
      },
      {
        stepTitle: "Torka i rumstemperatur",
        body:
          "Syntetmaterial tål inte hög värme — torka alltid i rumstemperatur. Direkt sol bleker och gör materialet sprött med tiden. Låt lufta i skugga.",
      },
      {
        stepTitle: "Behåll formen",
        body:
          "Stoppa in tidningspapper under torkning för att bevara formen, precis som med läder. Syntetmaterial kan deformeras om de torkar i en hopvikt position.",
      },
      {
        stepTitle: "Impregnera",
        body:
          "Många syntetmaterial drar nytta av ett universalimpregnering. Applicera och reaktivera därefter med en hårtork på lägsta värme — värmen aktiverar de vattenavstötande ämnena.",
      },
    ],
    proTip:
      "Undvik organiska lösningsmedel som aceton, sprit eller terpentin — dessa löser upp limmet och kan missfärga syntetmaterial permanent. Håll dig till vatten och mild tvål.",
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

function anchorId(key: string) {
  return `material-${key}`;
}

const NAV_LABELS: Record<string, string> = {
  lader:    "Läder",
  nubuck:   "Nubuck & Mocka",
  textil:   "Textil",
  vandring: "Vandring",
  syntet:   "Syntet",
};

// ── Page ────────────────────────────────────────────────────────────────────

export default async function SkoVardPage() {
  const { data: cms } = await sanityFetch({ query: shoeCarePageQuery });

  const pageTitle    = cms?.pageTitle    ?? "Skovårdsguide";
  const pageSubtitle = cms?.pageSubtitle ?? "Välskötta skor håller längre och ser bättre ut. Här hittar du våra bästa råd för varje typ av material.";
  const materials    = (cms?.materials?.length ? cms.materials : FALLBACK_MATERIALS) as Material[];

  return (
    <>
      <Header />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Hem",     path: "/" },
          { name: "Skovård", path: "/skovard" },
        ]}
      />

      <main className="pt-28 pb-24 bg-surface min-h-screen">

        {/* ── Page hero ─────────────────────────────────────────── */}
        <section className="max-w-screen-2xl mx-auto px-6 mb-16">
          <nav className="flex items-center gap-2 mb-6 text-[10px] uppercase tracking-widest text-outline">
            <Link href="/" className="hover:text-primary transition-colors">Hem</Link>
            <span>›</span>
            <span className="text-on-surface">Skovård</span>
          </nav>

          <div className="max-w-3xl">
            <span className="font-(family-name:--font-inter) text-xs uppercase tracking-[0.2em] text-primary font-bold">
              Vård & Underhåll
            </span>
            <h1 className="font-(family-name:--font-manrope) text-6xl md:text-8xl font-extrabold tracking-tighter text-stone-900 mt-3 mb-6">
              {pageTitle}
            </h1>
            <p className="text-secondary font-light text-xl leading-relaxed">
              {pageSubtitle}
            </p>
          </div>
        </section>

        {/* ── Sticky material nav ────────────────────────────────── */}
        <div className="sticky top-[72px] z-40 bg-surface/95 backdrop-blur-sm border-b border-outline-variant/20 mb-20">
          <div className="max-w-screen-2xl mx-auto px-6 py-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {materials.map((m) => (
                <a
                  key={m.materialKey}
                  href={`#${anchorId(m.materialKey)}`}
                  className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-surface-container text-secondary hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <span>{NAV_LABELS[m.materialKey] ?? m.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Material sections ──────────────────────────────────── */}
        <div className="max-w-screen-2xl mx-auto px-6 space-y-32">
          {materials.map((material, mi) => (
            <section
              key={material.materialKey}
              id={anchorId(material.materialKey)}
              className="scroll-mt-36"
            >
              {/* Section header */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 mb-16 items-end">
                <div>
                  <h2 className="font-(family-name:--font-manrope) text-5xl font-bold tracking-tighter text-on-surface">
                    {material.title}
                  </h2>
                  <div className="w-12 h-px bg-primary mt-5" />
                </div>
                <p className="text-secondary font-light text-lg leading-relaxed">
                  {material.intro}
                </p>
              </div>

              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {material.steps.map((step, si) => (
                  <div
                    key={si}
                    className={`bg-surface-container-low p-8 rounded-xl border border-outline-variant/20 ${
                      si === 0 && material.steps.length % 2 !== 0 ? "md:col-span-2" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center font-(family-name:--font-manrope)">
                        {si + 1}
                      </span>
                      <div>
                        <h3 className="font-(family-name:--font-manrope) font-bold text-on-surface mb-2">
                          {step.stepTitle}
                        </h3>
                        <p className="text-secondary font-light text-sm leading-relaxed">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pro tip */}
              {material.proTip && (
                <div className="bg-primary/5 border-l-4 border-primary px-8 py-6 rounded-r-xl">
                  <p className="font-(family-name:--font-inter) text-xs uppercase tracking-widest text-primary font-bold mb-2">
                    Pro-tips
                  </p>
                  <p className="text-on-surface font-light leading-relaxed">
                    {material.proTip}
                  </p>
                </div>
              )}

              {/* Divider (not on last) */}
              {mi < materials.length - 1 && (
                <div className="mt-32 h-px bg-outline-variant/20" />
              )}
            </section>
          ))}
        </div>

        {/* ── CTA banner ─────────────────────────────────────────── */}
        <section className="max-w-screen-2xl mx-auto px-6 mt-32">
          <div className="bg-inverse-surface rounded-xl px-10 py-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <p className="font-(family-name:--font-inter) text-xs uppercase tracking-widest text-white/50 mb-3">
                Personlig rådgivning
              </p>
              <h3 className="font-(family-name:--font-manrope) text-3xl font-bold text-white tracking-tight">
                Har du frågor om skovård?
              </h3>
              <p className="text-white/60 font-light mt-2">
                Besök oss på Storgatan 11 eller ring 0371-169 60.
              </p>
            </div>
            <Link
              href="/#hitta"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-(family-name:--font-manrope) font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Hitta till oss →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
