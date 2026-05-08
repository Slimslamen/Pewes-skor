import { defineQuery } from "next-sanity";

/* ── Home page ── */
export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0] {
    hero {
      heading,
      subtext,
      address,
      hours,
      ctaLabel,
      ctaHref,
      image { "url": coalesce(asset->url, url), alt }
    },
    brands[] { name },
    storyReveal {
      items[] {
        label,
        text,
        sub,
        "imageUrl": coalesce(image.asset->url, image.url)
      }
    },
    collection {
      eyebrow,
      heading,
      subheading,
      categories[] {
        name,
        label,
        body,
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
    products[] {
      name,
      price,
      sizes,
      categories,
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

/* ── Women's shoes page ── */
export const damPageQuery = defineQuery(`
  {
    "page": *[_type == "shoesPage" && slug.current == "dam"][0] { title, subtitle },
    "brands": *[_type == "brandPage" && defined(slug.current)] | order(name asc) {
      "brand": name,
      "products": products["dam" in categories] {
        name,
        price,
        sizes,
        categories,
        "image": { "url": coalesce(image.asset->url, image.url), "alt": coalesce(image.imageAlt, image.alt) }
      }
    }
  }
`);

/* ── Men's shoes page ── */
export const herrPageQuery = defineQuery(`
  {
    "page": *[_type == "shoesPage" && slug.current == "herr"][0] { title, subtitle },
    "brands": *[_type == "brandPage" && defined(slug.current)] | order(name asc) {
      "brand": name,
      "products": products["herr" in categories] {
        name,
        price,
        sizes,
        categories,
        "image": { "url": coalesce(image.asset->url, image.url), "alt": coalesce(image.imageAlt, image.alt) }
      }
    }
  }
`);

/* ── Kids' shoes page ── */
export const barnPageQuery = defineQuery(`
  {
    "page": *[_type == "shoesPage" && slug.current == "barn"][0] { title, subtitle },
    "brands": *[_type == "brandPage" && defined(slug.current)] | order(name asc) {
      "brand": name,
      "products": products["barn" in categories] {
        name,
        price,
        sizes,
        categories,
        "image": { "url": coalesce(image.asset->url, image.url), "alt": coalesce(image.imageAlt, image.alt) }
      }
    }
  }
`);

/* ── Generic brand page (Gabor / Rieker / Dolomite / Skechers) ── */
export const brandPageQuery = defineQuery(`
  *[_type == "brandPage" && slug.current == $slug][0] {
    name,
    description,
    "slug": slug.current,
    products[] {
      name,
      price,
      categories,
      sizes,
      "image": coalesce(image.asset->url, image.url),
      "imageAlt": coalesce(image.imageAlt, "")
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

/* ── Header navigation brand links ────────────────────────────────
   Derived directly from brandPage documents — creating a brandPage
   in Studio automatically adds it to the header menu. ECCO is
   appended manually because it uses a different schema type. */
export const headerBrandsQuery = defineQuery(`
  {
    "bestSellingBrands": *[_type == "brandPage" && featured == true && defined(slug.current)]
      | order(coalesce(navOrder, 999) asc, name asc) {
        "label": name,
        "href":  "/varumarken/" + slug.current
      },
    "otherBrands": *[_type == "brandPage" && featured != true && defined(slug.current)]
      | order(coalesce(navOrder, 999) asc, name asc) {
        "label": name,
        "href":  "/varumarken/" + slug.current
      }
  }
`);

/* ── All brand page slugs (for generateStaticParams on [slug] route) ── */
export const brandPageSlugsQuery = defineQuery(`
  *[_type == "brandPage" && defined(slug.current)] {
    "slug": slug.current
  }
`);
