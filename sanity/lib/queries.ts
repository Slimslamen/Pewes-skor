import { defineQuery } from "next-sanity";

/* ── Home page ── */
export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0] {
    hero {
      heading,
      address,
      hours,
      ctaLabel,
      ctaHref,
      image { "url": coalesce(asset->url, url), alt }
    },
    brands[] { name },
    about {
      eyebrow,
      heading,
      body,
      ctaLabel,
      ctaHref,
      image { "url": coalesce(asset->url, url), alt }
    },
    collection {
      heading,
      subheading,
      categories[] {
        name,
        href,
        image { "url": coalesce(asset->url, url), alt }
      }
    },
    findUs {
      heading,
      address,
      hoursRows[] { days, hours },
      phone,
      email
    },
    featuredBanner {
      eyebrow,
      heading,
      headingAccent,
      headingRest,
      body,
      cta1Label,
      cta1Href,
      cta2Label,
      cta2Href,
      stats[] { value, label },
      image { "url": coalesce(asset->url, url), alt },
      badgeLabel
    }
  }
`);

/* ── ECCO brand page ── */
export const eccoPageQuery = defineQuery(`
  *[_type == "eccoBrandPage"][0] {
    hero {
      headline,
      subheadline
    },
    anatomy {
      sectionTitle,
      zones[] {
        label,
        title,
        body
      }
    },
    heritage {
      eyebrow,
      heading,
      body,
      images[] { "url": coalesce(asset->url, url), alt }
    }
  }
`);

/* ── Women's shoes page ── */
export const damPageQuery = defineQuery(`
  *[_type == "shoesPage" && slug.current == "dam"][0] {
    title,
    subtitle,
    products[] {
      brand,
      name,
      price,
      "image": { "url": coalesce(image.asset->url, image.url), "alt": coalesce(image.imageAlt, image.alt) }
    }
  }
`);

/* ── Men's shoes page ── */
export const herrPageQuery = defineQuery(`
  *[_type == "shoesPage" && slug.current == "herr"][0] {
    title,
    subtitle,
    products[] {
      brand,
      name,
      price,
      "image": { "url": coalesce(image.asset->url, image.url), "alt": coalesce(image.imageAlt, image.alt) }
    }
  }
`);

/* ── Kids' shoes page ── */
export const barnPageQuery = defineQuery(`
  *[_type == "shoesPage" && slug.current == "barn"][0] {
    title,
    subtitle,
    products[] {
      brand,
      name,
      price,
      "image": { "url": coalesce(image.asset->url, image.url), "alt": coalesce(image.imageAlt, image.alt) }
    }
  }
`);

/* ── Generic brand page (Gabor / Rieker / Dolomite / Skechers) ── */
export const brandPageQuery = defineQuery(`
  *[_type == "brandPage" && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    products[] {
      name,
      price,
      category,
      sizes,
      "image": coalesce(image.asset->url, image.url),
      "imageAlt": coalesce(image.imageAlt, "")
    },
    heritage {
      eyebrow,
      heading,
      body,
      images[] { "url": coalesce(asset->url, url), alt }
    }
  }
`);

/* ── Shoe care guide ── */
export const shoeCarePageQuery = defineQuery(`
  *[_type == "shoeCarePage"][0] {
    pageTitle,
    pageSubtitle,
    materials[] {
      materialKey,
      title,
      icon,
      intro,
      steps[] { stepTitle, body },
      proTip
    }
  }
`);

/* ── Nyheter index (all posts, newest first) ── */
export const nyheterIndexQuery = defineQuery(`
  *[_type == "nyhetPost"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    publishedAt,
    season,
    excerpt,
    coverImage { "url": coalesce(asset->url, url), alt }
  }
`);

/* ── Nyheter single post ── */
export const nyhetPostQuery = defineQuery(`
  *[_type == "nyhetPost" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    publishedAt,
    season,
    excerpt,
    coverImage { "url": coalesce(asset->url, url), alt },
    editorial { heading, body },
    products[] {
      brand,
      name,
      description,
      price,
      image { "url": coalesce(asset->url, url), alt }
    }
  }
`);

/* ── Nyheter slugs (for generateStaticParams) ── */
export const nyheterSlugsQuery = defineQuery(`
  *[_type == "nyhetPost" && defined(slug.current)] {
    "slug": slug.current
  }
`);
