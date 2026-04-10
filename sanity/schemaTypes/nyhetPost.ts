import { defineType, defineField } from "sanity";

export const nyhetPost = defineType({
  name:  "nyhetPost",
  title: "Nyheter-inlägg",
  type:  "document",
  fields: [
    defineField({
      name:       "title",
      title:      "Titel",
      type:       "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name:       "slug",
      title:      "Slug",
      type:       "slug",
      options:    { source: "title", maxLength: 80 },
      validation: (R) => R.required(),
    }),
    defineField({ name: "publishedAt", title: "Publicerat",           type: "datetime" }),
    defineField({ name: "season",      title: "Säsong (t.ex. Sommar 2026)", type: "string" }),
    defineField({ name: "excerpt",     title: "Kortbeskrivning",      type: "text", rows: 2 }),

    defineField({
      name:  "coverImage",
      title: "Omslagsbild",
      type:  "object",
      fields: [
        defineField({ name: "asset", title: "Bild",    type: "image", options: { hotspot: true } }),
        defineField({ name: "alt",   title: "Alt-text", type: "string" }),
      ],
    }),

    defineField({
      name:  "editorial",
      title: "Redaktionell text",
      type:  "object",
      fields: [
        defineField({ name: "heading", title: "Rubrik",   type: "string" }),
        defineField({ name: "body",    title: "Brödtext", type: "text", rows: 5 }),
      ],
    }),

    defineField({
      name:  "products",
      title: "Kollektionsprodukter",
      type:  "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "brand",       title: "Varumärke",        type: "string" }),
            defineField({ name: "name",        title: "Produktnamn",      type: "string" }),
            defineField({ name: "description", title: "Kort beskrivning", type: "text", rows: 2 }),
            defineField({ name: "price",       title: "Pris",             type: "string" }),
            defineField({
              name:  "image",
              title: "Produktbild",
              type:  "object",
              fields: [
                defineField({ name: "asset", title: "Bild",    type: "image", options: { hotspot: true } }),
                defineField({ name: "alt",   title: "Alt-text", type: "string" }),
              ],
            }),
          ],
          preview: { select: { title: "name", subtitle: "brand" } },
        },
      ],
    }),
  ],

  preview: {
    select: { title: "title", subtitle: "season" },
  },
});
