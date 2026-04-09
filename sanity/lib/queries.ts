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
