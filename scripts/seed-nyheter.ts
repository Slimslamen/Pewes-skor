/**
 * Seed script — creates "Sommarens nyheter 2026" in Sanity.
 *
 * Usage:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=<id> \
 *   NEXT_PUBLIC_SANITY_DATASET=<dataset> \
 *   SANITY_API_TOKEN=<write-token> \
 *   npx tsx scripts/seed-nyheter.ts
 *
 * The SANITY_API_TOKEN must have write permission (Editor or above).
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token     = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars. Required: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-04-07",
  token,
  useCdn: false,
});

const document = {
  _type:       "nyhetPost",
  title:       "Sommarens nyheter 2026",
  slug:        { _type: "slug", current: "sommarens-nyheter-2026" },
  publishedAt: "2026-04-01T10:00:00.000Z",
  season:      "Sommar 2026",
  excerpt:
    "Solen lockar fram de ljusaste skorna. Utforska vår nysläppta sommarkollektion — från luftiga sandaler till färgglada sneakers och tidlösa loafers för de varmaste dagarna.",
  editorial: {
    heading: "Välkommen till Sommarens Nyheter 2026",
    body:
      "Det är dags att byta ut vinterstövlarna mot något som andas med de varma dagarna. Den här säsongen har vi handplockat ett urval av skor som kombinerar stil och komfort för alla sommarens tillfällen — från strandpromenaden till middagen på uteserveringen.\n\nVi har hämtat hem nya modeller från ECCO, Rieker, Gabor och Skechers med fokus på lättviktiga konstruktioner, öppna designs och material som andas. Låt sommaren börja.",
  },
  products: [
    {
      _type:       "object",
      _key:        "prod-1",
      brand:       "ECCO",
      name:        "Cozmo Sandal",
      description: "Mjukt nappaskinn med ergonomisk fotbädd och justerbar kardborrstängning. Perfekt för långa sommardagar.",
      price:       "999 kr",
    },
    {
      _type:       "object",
      _key:        "prod-2",
      brand:       "GABOR",
      name:        "Sunset Strap",
      description: "Elegant sandalett i glansläder med spänne. Liten klack ger lyft utan att ge avkall på komforten.",
      price:       "799 kr",
    },
    {
      _type:       "object",
      _key:        "prod-3",
      brand:       "SKECHERS",
      name:        "Go Walk Arch Lite",
      description: "Ultralätt sommar-sneaker med ULTRA GO-dämpning och Arch Fit-innersula.",
      price:       "849 kr",
    },
    {
      _type:       "object",
      _key:        "prod-4",
      brand:       "RIEKER",
      name:        "Breeze Mule",
      description: "Öppen läder-mule med antiperspirant-behandlad innersula och flexibel mellansulsteknik.",
      price:       "699 kr",
    },
  ],
};

async function seed() {
  console.log("Creating 'Sommarens nyheter 2026' in Sanity…");
  const result = await client.create(document);
  console.log("Created document:", result._id);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
