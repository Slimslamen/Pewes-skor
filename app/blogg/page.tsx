import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BloggList, { type BlogPost } from "@/components/blocks/BloggList";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title:       "Blogg",
  description:
    "Guider, trender och inspiration från oss på Pewes Skor i Anderstorp. Lär dig mer om skovård, aktuella trender och hur du väljer rätt skor.",
  path:        "/blogg",
});

const POSTS: BlogPost[] = [
  {
    slug: "sa-valjer-du-ratt-skor",
    category: "Guide",
    date: "7 april 2026",
    title: "Så väljer du rätt skor för varje tillfälle",
    excerpt:
      "Att hitta det perfekta paret kräver mer än att gilla utseendet. Vi guidar dig genom de viktigaste faktorerna — passform, material och användningsområde — så att dina skor håller länge och känns bekväma hela dagen.",
    body:
      "Den viktigaste frågan är inte hur skon ser ut — det är vad du ska göra i den. En sko för kontoret ställer helt andra krav än en för en långpromenad, och materialet avgör hur den åldras.\n\nBörja med passformen. Mät alltid båda fötterna på eftermiddagen, när foten är som störst, och ge tårna minst en centimeter framför längsta tån. En sko som sitter rätt ska inte behöva \"gås in\" — den ska kännas bekväm från första steget.\n\nMaterialvalet styr livslängden. Fullnarvigt läder andas, formas efter foten och kan putsas upp gång på gång. Syntet är lätt och billigt, men slits snabbare och andas sämre. För vardagsskor och finskor lönar det sig nästan alltid att välja läder.\n\nTänk slutligen på sulan. En gummisula ger bättre grepp i svenskt klimat än en läder- eller korksula, särskilt om du går mycket utomhus. Hos oss i Anderstorp hjälper vi dig gärna att matcha rätt modell till din vardag.",
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
    body:
      "Ett par välvårdade skinnskor kan följa dig i tjugo år. Ett par misskötta är slut efter två säsonger. Skillnaden ligger sällan i priset — den ligger i rutinen.\n\n1. Borsta bort smuts efter varje användning. Torr jord och grus sliter på narvskiktet om det får sitta kvar, och tar du det direkt slipper du de flesta repor.\n\n2. Impregnera innan första användningen. En ny sko har ingen patina och inget skydd — en lätt sprayning tätar läderfibrerna och gör att vatten pärlar av istället för att tränga in.\n\n3. Skokräm varannan till var tredje vecka, beroende på hur ofta du går i dem. Krämen återför fetter och pigment, håller lädret mjukt och döljer små skavanker.\n\n4. Låt skorna vila. Läder behöver minst 24 timmar för att torka helt efter användning. Alternera mellan två par om du kan — de håller mer än dubbelt så länge.\n\n5. Använd skoblock i trä. De suger upp fukt och håller skons form mellan användningarna. Det är den enskilt billigaste investering du kan göra för dina skor.",
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
    body:
      "Våren 2026 är en studie i kontraster. Den tunga, volymrika sneakersilhuetten lever vidare från i fjol, men nu i sällskap av något helt annat: den smala, klassiska loafern har gjort en definitiv comeback.\n\nFärgmässigt är paletten dämpad — benvitt, ljusbeige, mossgrönt och mjukt mörkbrunt dominerar både hyllorna och catwalkarna. De hårda kontrasterna har fått ge vika för jordnära toner som åldras vackert och passar till nästan vad som helst i garderoben.\n\nDet mest intressanta är dock själva mixen. Det är fullt acceptabelt — till och med önskvärt — att bära grova sneakers till en skräddad kostym, eller en polerad loafer till en oversize-jeans. Regelboken är riven.\n\nFrån vårt sortiment vill vi särskilt lyfta ECCO BIOM och Gabors nya loafer-serie. Båda fångar säsongens känsla men på helt olika sätt — och båda finns att prova hos oss i Anderstorp.",
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
    body:
      "ECCO är ett av få skoföretag i världen som kontrollerar hela kedjan själva — från garveri till butikshylla. Det är en ovanlig struktur i en bransch där nästan allt läggs ut på legotillverkare, och den märks i slutprodukten.\n\nAllt börjar i Nederländerna, där företagets egna garverier förvandlar råhudar till mjukt, genomfärgat läder. Därifrån skickas materialet vidare till ECCO:s fabriker i Europa och Asien, där skorna sys, limmas och formas efter läster som tagits fram genom decennier av passformsstudier.\n\nDet som särskiljer ECCO från mängden är tekniken Direct Injection: sulan sprutas direkt på skoöverdelen istället för att limmas på i efterhand. Resultatet är en fog som i princip inte kan släppa, och en flexibilitet som traditionella konstruktionsmetoder har svårt att matcha.\n\nFör oss som säljer skor är ECCO en trygg kompanjon. Du vet alltid vad du får — och kunden som kommer tillbaka efter tre år gör det för att köpa nästa par, inte för att reklamera det första.",
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
    body:
      "Barnfötter är inte små vuxenfötter. De är mjukare, mer formbara och växer i språng — ibland en hel storlek på tre månader, särskilt under de första åren. Det betyder att en sko som satt perfekt i höstas kan vara för liten redan vid jul.\n\nVåra tumregler: kontrollera storleken var åttonde vecka fram till sex års ålder, och var tionde till tolfte vecka därefter. Det enklaste sättet är att trycka med tummen framför längsta tån när barnet står upp i skon — det ska finnas ungefär en tumbredd luft.\n\nMaterialet ska andas. Läder eller textil är nästan alltid att föredra framför plast, särskilt eftersom barn svettas mer om fötterna än vuxna. En styv bakkappa hjälper hälen att sitta på plats, och en flexibel framfot låter foten röra sig naturligt när barnet går och springer.\n\nOch en sak till: köp aldrig ett par att \"växa in i\". En för stor sko skaver, gör barnet osäkert i steget och kan faktiskt bromsa utvecklingen. Rätt storlek — nu — är alltid rätt val.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYgkuoGad0DOqh9-q2tgcIJa3JzuAEIX5YlzfxL5RaV_ycAWG5fbe199CY8c49gYxu6ZZdtKVqM5xwVYmN0dNQRg7hLtGcXvpPf3agWcw0hJyBRmjZ8KZs7nQX9yFZFknepV9-6nHqxz",
    imageAlt: "Children's colourful shoes",
  },
];

export default function BloggPage() {
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

          <BloggList posts={POSTS} />

        </div>
      </main>
      <Footer />
    </>
  );
}
