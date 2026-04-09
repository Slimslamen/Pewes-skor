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
        defineField({ name: "heading",  title: "Rubrik",    type: "text",   rows: 2 }),
        defineField({ name: "address",  title: "Adress",    type: "string" }),
        defineField({ name: "hours",    title: "Öppettider (kort)", type: "string" }),
        defineField({ name: "ctaLabel", title: "CTA-text",  type: "string" }),
        defineField({ name: "ctaHref",  title: "CTA-länk",  type: "string" }),
        defineField({
          name: "image",
          title: "Bakgrundsbild",
          type: "object",
          fields: [
            defineField({ name: "asset", title: "Bild",    type: "image", options: { hotspot: true } }),
            defineField({ name: "alt",   title: "Alt-text", type: "string" }),
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
          type: "object",
          fields: [
            defineField({ name: "asset", title: "Bild",    type: "image", options: { hotspot: true } }),
            defineField({ name: "alt",   title: "Alt-text", type: "string" }),
          ],
        }),
      ],
    }),

    defineField({
      name: "collection",
      title: "Avdelningar",
      type: "object",
      fields: [
        defineField({ name: "heading",    title: "Rubrik",    type: "string" }),
        defineField({ name: "subheading", title: "Underrubrik", type: "string" }),
        defineField({
          name: "categories",
          title: "Kategorier",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "name", title: "Namn", type: "string" }),
                defineField({ name: "href", title: "Länk", type: "string" }),
                defineField({
                  name: "image",
                  title: "Bild",
                  type: "object",
                  fields: [
                    defineField({ name: "asset", title: "Bild",    type: "image", options: { hotspot: true } }),
                    defineField({ name: "alt",   title: "Alt-text", type: "string" }),
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
  ],

  preview: {
    select: { title: "hero.heading" },
    prepare({ title }) {
      return { title: title ?? "Startsida" };
    },
  },
});
