import { defineType, defineField } from "sanity";

export const brandPage = defineType({
  name: "brandPage",
  title: "Varumärkessida",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug (t.ex. gabor / rieker / dolomite / skechers)",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "name", title: "Varumärkesnamn", type: "string" }),

    defineField({
      name: "products",
      title: "Produkter",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name",     title: "Produktnamn",  type: "string" }),
            defineField({ name: "price",    title: "Pris",         type: "string" }),
            defineField({ name: "category", title: "Kategori",     type: "string" }),
            defineField({
              name: "sizes",
              title: "Storlekar",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({
              name: "image",
              title: "Produktbild",
              type: "object",
              fields: [
                defineField({ name: "asset",    title: "Bild (Sanity upload)", type: "image", options: { hotspot: true } }),
                defineField({ name: "url",      title: "Extern bild-URL",      type: "url" }),
                defineField({ name: "imageAlt", title: "Alt-text",             type: "string" }),
              ],
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "price" },
          },
        },
      ],
    }),

    defineField({
      name: "heritage",
      title: "Arv & Historia",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow-label",  type: "string" }),
        defineField({ name: "heading", title: "Rubrik",         type: "text",  rows: 2 }),
        defineField({ name: "body",    title: "Brödtext",       type: "text",  rows: 5 }),
        defineField({
          name: "images",
          title: "Bilder (max 2)",
          type: "array",
          validation: (Rule) => Rule.max(2),
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "asset", title: "Bild (Sanity upload)", type: "image", options: { hotspot: true } }),
                defineField({ name: "url",   title: "Extern bild-URL",      type: "url" }),
                defineField({ name: "alt",   title: "Alt-text",             type: "string" }),
              ],
            },
          ],
        }),
      ],
    }),
  ],

  preview: {
    select: { title: "name", subtitle: "slug.current" },
    prepare({ title, subtitle }) {
      return { title: title ?? "Varumärkessida", subtitle };
    },
  },
});
