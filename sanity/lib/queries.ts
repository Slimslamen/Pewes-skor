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
      image { asset->{ url }, alt }
    },
    brands[] { name },
    about {
      eyebrow,
      heading,
      body,
      ctaLabel,
      ctaHref,
      image { asset->{ url }, alt }
    },
    collection {
      heading,
      subheading,
      categories[] {
        name,
        href,
        image { asset->{ url }, alt }
      }
    },
    findUs {
      heading,
      address,
      hoursRows[] { days, hours },
      phone,
      email
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
      images[] { asset->{ url }, alt }
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
      image { asset->{ url }, alt }
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
    coverImage { asset->{ url }, alt }
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
    coverImage { asset->{ url }, alt },
    editorial { heading, body },
    products[] {
      brand,
      name,
      description,
      price,
      image { asset->{ url }, alt }
    }
  }
`);

/* ── Nyheter slugs (for generateStaticParams) ── */
export const nyheterSlugsQuery = defineQuery(`
  *[_type == "nyhetPost" && defined(slug.current)] {
    "slug": slug.current
  }
`);
