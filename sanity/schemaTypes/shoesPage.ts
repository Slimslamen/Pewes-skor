import { defineType, defineField } from "sanity";

export const shoesPage = defineType({
  name: "shoesPage",
  title: "Sko-kategorisida",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug (t.ex. dam / herr / barn)",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "title",    title: "Sidtitel",    type: "string" }),
    defineField({ name: "subtitle", title: "Undertitel",  type: "text", rows: 2 }),
    defineField({
      name: "products",
      title: "Produkter",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "brand", title: "Varumärke",   type: "string" }),
            defineField({ name: "name",  title: "Produktnamn", type: "string" }),
            defineField({ name: "price", title: "Pris (t.ex. 1 299 kr)", type: "string" }),
            defineField({
              name: "image",
              title: "Produktbild",
              type: "object",
              fields: [
                defineField({ name: "asset",    title: "Bild (Sanity upload)", type: "image", options: { hotspot: true } }),
                defineField({ name: "url",      title: "Extern bild-URL",      type: "url" }),
                defineField({ name: "imageAlt", title: "Alt-text",             type: "string" }),
                defineField({ name: "alt",      title: "Alt-text (äldre fält)", type: "string" }),
              ],
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "brand" },
          },
        },
      ],
    }),
  ],

  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
