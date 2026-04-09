import { defineType, defineField } from "sanity";

export const eccoBrandPage = defineType({
  name: "eccoBrandPage",
  title: "ECCO Varumärkessida",
  type: "document",
  fields: [
    /* ─── Hero ─── */
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "headline",    title: "Rubrik (stort)",    type: "string" }),
        defineField({ name: "subheadline", title: "Underrubrik",       type: "string" }),
      ],
    }),

    /* ─── Anatomy ─── */
    defineField({
      name: "anatomy",
      title: "Skouppbyggnad (Anatomy)",
      type: "object",
      fields: [
        defineField({
          name: "sectionTitle",
          title: "Sektionsrubrik",
          type: "string",
          initialValue: "Anatomy of Innovation",
        }),
        defineField({
          name: "zones",
          title: "Scroll-zoner (5 stycken)",
          type: "array",
          validation: (Rule) => Rule.max(5),
          of: [
            {
              type: "object",
              title: "Zon",
              fields: [
                defineField({
                  name: "label",
                  title: "Eyebrow-label (t.ex. «01 / Sula»)",
                  type: "string",
                }),
                defineField({
                  name: "title",
                  title: "Titel",
                  type: "string",
                }),
                defineField({
                  name: "body",
                  title: "Brödtext",
                  type: "text",
                  rows: 3,
                }),
              ],
              preview: {
                select: { title: "label", subtitle: "title" },
              },
            },
          ],
        }),
      ],
    }),

    /* ─── Heritage ─── */
    defineField({
      name: "heritage",
      title: "Arv & Historia",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow-label", type: "string" }),
        defineField({ name: "heading", title: "Rubrik",        type: "text", rows: 2 }),
        defineField({ name: "body",    title: "Brödtext",      type: "text", rows: 5 }),
        defineField({
          name: "images",
          title: "Bilder (max 2)",
          type: "array",
          validation: (Rule) => Rule.max(2),
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "asset", title: "Bild",    type: "image", options: { hotspot: true } }),
                defineField({ name: "alt",   title: "Alt-text", type: "string" }),
              ],
            },
          ],
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return { title: "ECCO Varumärkessida" };
    },
  },
});
