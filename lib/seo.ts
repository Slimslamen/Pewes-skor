import type { Metadata } from "next";

/** Central site config — single source of truth for all SEO */
export const siteConfig = {
  name:      "Pewes Skor i Anderstorp AB",
  shortName: "Pewes Skor Logo",

  url:       "https://pewesskor.se",
  description:
    "Familjens skoaffär i Anderstorp sedan generationer. Noggrant utvalda skor från ECCO, Rieker, Gabor, Skechers och Dolomite — med personlig service.",
  address: {
    streetAddress:   "Storgatan 11",
    postalCode:      "33433",
    addressLocality: "Anderstorp",
    addressRegion:   "Jönköpings län",
    addressCountry:  "SE",
  },
  /** E.164 format for schema.org */
  phone:        "+4637116960",
  phoneDisplay: "0371-169 60",
  email:        "info@pewesskor.se",
  openingHours: "Mo-Fr 10:00-18:00",
  keywords: [
    "skoaffär Anderstorp",
    "skor Småland",
    "köpa skor Anderstorp",
    "ECCO skor",
    "Rieker skor",
    "Gabor skor",
    "Skechers skor",
    "skobutik Jönköpings län",
    "Pewes Skor",
  ] as string[],
} as const;

export interface PageSeoInput {
  /** Page title — will be formatted as "Title | Pewes Skor" by the layout template */
  title?: string;
  description?: string;
  /** Canonical path, e.g. "/skovard" */
  path: string;
  /** Absolute URL for OG image */
  imageUrl?: string;
  /** Override OG type (default: "website") */
  ogType?: "website" | "article";
}

/**
 * Generate a full Next.js Metadata object for a page.
 * The layout sets a title template, so `title` here is just the page portion.
 */
export function generatePageMetadata({
  title,
  description,
  path,
  imageUrl,
  ogType = "website",
}: PageSeoInput): Metadata {
  const canonicalUrl = `${siteConfig.url}${path}`;
  const fullTitle    = title
    ? `${title} | Pewes Skor Logo`
    : `${siteConfig.shortName} — Skor med känsla sedan generationer`;
  const desc = description ?? siteConfig.description;

  return {
    title: title ?? undefined, // layout template turns undefined into the default
    description: desc,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title:       fullTitle,
      description: desc,
      url:         canonicalUrl,
      siteName:    siteConfig.name,
      locale:      "sv_SE",
      type:        ogType,
      ...(imageUrl && {
        images: [{ url: imageUrl, width: 1200, height: 630, alt: fullTitle }],
      }),
    },
    twitter: {
      card:        "summary_large_image",
      title:       fullTitle,
      description: desc,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

// ── JSON-LD schema builders ─────────────────────────────────────────────────

/** Schema.org LocalBusiness / ShoeStore for Pewes Skor */
export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type":    ["LocalBusiness", "ShoeStore"],
    name:       siteConfig.name,
    url:        siteConfig.url,
    telephone:  siteConfig.phone,
    email:      siteConfig.email,
    address: {
      "@type":          "PostalAddress",
      streetAddress:    siteConfig.address.streetAddress,
      postalCode:       siteConfig.address.postalCode,
      addressLocality:  siteConfig.address.addressLocality,
      addressRegion:    siteConfig.address.addressRegion,
      addressCountry:   siteConfig.address.addressCountry,
    },
    openingHoursSpecification: [
      {
        "@type":     "OpeningHoursSpecification",
        dayOfWeek:   ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens:       "10:00",
        closes:      "18:00",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "SEK",
    paymentAccepted:    "Cash, Credit Card",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type":     "GeoCoordinates",
        latitude:    "57.267",
        longitude:   "13.610",
      },
      geoRadius: "50000",
    },
  };
}

/** BreadcrumbList schema */
export function buildBreadcrumbSchema(
  crumbs: Array<{ name: string; url: string }>
) {
  return {
    "@context":        "https://schema.org",
    "@type":           "BreadcrumbList",
    itemListElement:   crumbs.map((crumb, i) => ({
      "@type":   "ListItem",
      position:  i + 1,
      name:      crumb.name,
      item:      crumb.url,
    })),
  };
}

/** WebPage schema */
export function buildWebPageSchema({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    "@context":    "https://schema.org",
    "@type":       "WebPage",
    name:          title,
    description:   description,
    url:           url,
    isPartOf:      { "@id": siteConfig.url },
    publisher:     {
      "@type": "Organization",
      name:    siteConfig.name,
      url:     siteConfig.url,
    },
  };
}

/** Article schema — for blog posts and nyheter */
export function buildArticleSchema({
  title,
  description,
  url,
  publishedAt,
  imageUrl,
}: {
  title:        string;
  description:  string;
  url:          string;
  publishedAt?: string;
  imageUrl?:    string;
}) {
  return {
    "@context":        "https://schema.org",
    "@type":           "Article",
    headline:          title,
    description:       description,
    url:               url,
    datePublished:     publishedAt,
    publisher: {
      "@type": "Organization",
      name:    siteConfig.name,
      url:     siteConfig.url,
    },
    ...(imageUrl && { image: imageUrl }),
  };
}
