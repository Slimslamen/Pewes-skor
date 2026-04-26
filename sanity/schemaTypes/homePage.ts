import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Startsida",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "heading",  title: "Rubrik (används ej direkt — varumärkesnamnet är fast)", type: "text",   rows: 2 }),
        defineField({ name: "subtext",  title: "Undertext under logotyp",                               type: "text",   rows: 2 }),
        defineField({ name: "address",  title: "Högertext / adressrad",                                 type: "text",   rows: 2 }),
        defineField({ name: "hours",    title: "Öppettider (kort, t.ex. MÅN–FRE 10–18 · LÖR 10–13)",  type: "string" }),
        defineField({ name: "ctaLabel", title: "CTA-text",  type: "string" }),
        defineField({ name: "ctaHref",  title: "CTA-länk",  type: "string" }),
        defineField({
          name: "image",
          title: "Bakgrundsbild",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt-text",        type: "string" }),
            defineField({ name: "url", title: "Extern bild-URL", type: "url" }),
          ],
        }),
      ],
    }),

    defineField({
      name: "brands",
      title: "Varumärken (logotyprad)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Namn", type: "string" }),
          ],
        },
      ],
    }),

    defineField({
      name: "storyReveal",
      title: "Historiesegment (StoryReveal)",
      type: "object",
      fields: [
        defineField({
          name: "items",
          title: "Segment",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Etiketttext (liten, övre)",  type: "string" }),
                defineField({ name: "text",  title: "Rubrik",                     type: "string" }),
                defineField({ name: "sub",   title: "Brödtext",                   type: "text", rows: 2 }),
                defineField({
                  name: "image",
                  title: "Bild",
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    defineField({ name: "alt", title: "Alt-text",        type: "string" }),
                    defineField({ name: "url", title: "Extern bild-URL", type: "url" }),
                  ],
                }),
              ],
              preview: {
                select: { title: "text", subtitle: "label" },
              },
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "about",
      title: "Om oss",
      type: "object",
      fields: [
        defineField({ name: "eyebrow",  title: "Eyebrow-label", type: "string" }),
        defineField({ name: "heading",  title: "Rubrik",        type: "string" }),
        defineField({ name: "body",     title: "Brödtext",      type: "text", rows: 4 }),
        defineField({ name: "ctaLabel", title: "CTA-text",      type: "string" }),
        defineField({ name: "ctaHref",  title: "CTA-länk",      type: "string" }),
        defineField({
          name: "image",
          title: "Bild",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt-text",        type: "string" }),
            defineField({ name: "url", title: "Extern bild-URL", type: "url" }),
          ],
        }),
      ],
    }),

    defineField({
      name: "collection",
      title: "Avdelningar (Sortiment-sektion)",
      type: "object",
      fields: [
        defineField({ name: "eyebrow",    title: "Eyebrow-text (t.ex. 'Sortiment')",  type: "string" }),
        defineField({ name: "heading",    title: "Rubrik",                            type: "string" }),
        defineField({ name: "subheading", title: "Underrubrik",                      type: "string" }),
        defineField({
          name: "categories",
          title: "Kategorier",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "name",  title: "Namn (t.ex. 'Herr')",                            type: "string" }),
                defineField({ name: "label", title: "Etikett (t.ex. 'Herrkollektion')",               type: "string" }),
                defineField({ name: "body",  title: "Kortbeskrivning",                                type: "text", rows: 2 }),
                defineField({ name: "href",  title: "Länk",                                          type: "string" }),
                defineField({
                  name: "image",
                  title: "Bild",
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    defineField({ name: "alt", title: "Alt-text",        type: "string" }),
                    defineField({ name: "url", title: "Extern bild-URL", type: "url" }),
                  ],
                }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "findUs",
      title: "Hitta till oss",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Rubrik",  type: "string" }),
        defineField({ name: "address", title: "Adress",  type: "string" }),
        defineField({
          name: "hoursRows",
          title: "Öppettider",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "days",  title: "Dagar",    type: "string" }),
                defineField({ name: "hours", title: "Klockslag", type: "string" }),
              ],
            },
          ],
        }),
        defineField({ name: "phone", title: "Telefon",  type: "string" }),
        defineField({ name: "email", title: "E-post",   type: "string" }),
      ],
    }),

    defineField({
      name: "featuredBanner",
      title: "Utvald Banner",
      type: "object",
      fields: [
        defineField({ name: "eyebrow",       title: "Eyebrow-text (t.ex. 'Ny Kollektion · 2026')", type: "string" }),
        defineField({ name: "heading",       title: "Rubrik rad 1",                                type: "string" }),
        defineField({ name: "headingAccent", title: "Rubrik accentord (visas i primärfärg)",       type: "string" }),
        defineField({ name: "headingRest",   title: "Rubrik rad 2 (efter accent)",                 type: "string" }),
        defineField({ name: "body",          title: "Brödtext",                                    type: "text", rows: 3 }),
        defineField({ name: "cta1Label",     title: "Knapp 1 text (t.ex. Dam)",                    type: "string" }),
        defineField({ name: "cta1Href",      title: "Knapp 1 länk",                                type: "string" }),
        defineField({ name: "cta2Label",     title: "Knapp 2 text (t.ex. Herr)",                   type: "string" }),
        defineField({ name: "cta2Href",      title: "Knapp 2 länk",                                type: "string" }),
        defineField({
          name: "stats",
          title: "Statistikrad (max 3 st)",
          type: "array",
          validation: (Rule) => Rule.max(3),
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "value", title: "Värde (t.ex. '200+')", type: "string" }),
                defineField({ name: "label", title: "Etikett",              type: "string" }),
              ],
            },
          ],
        }),
        defineField({
          name: "image",
          title: "Bild",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt-text",        type: "string" }),
            defineField({ name: "url", title: "Extern bild-URL", type: "url" }),
          ],
        }),
        defineField({ name: "badgeLabel", title: "Badge-text (t.ex. 'Ny kollektion')", type: "string" }),
      ],
    }),
  ],

  preview: {
    select: { title: "hero.heading" },
    prepare({ title }) {
      return { title: title ?? "Startsida" };
    },
  },
});
