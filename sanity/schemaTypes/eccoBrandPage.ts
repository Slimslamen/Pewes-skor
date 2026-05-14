import { defineType, defineField } from "sanity";
import {
  QUIZ_STYLE_OPTIONS,
  QUIZ_SEASON_OPTIONS,
  QUIZ_PRIORITY_OPTIONS,
} from "../../lib/quizTags";

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

    /* ─── Products ─── */
    defineField({
      name: "products",
      title: "Produkter",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name",  title: "Produktnamn", type: "string" }),
            defineField({ name: "price", title: "Pris",        type: "string" }),
            defineField({
              name: "categories",
              title: "Kategorier",
              description: "Produkten visas på motsvarande /skor/-sida.",
              type: "array",
              of: [{ type: "string" }],
              options: {
                list: [
                  { title: "Dam",  value: "dam"  },
                  { title: "Herr", value: "herr" },
                  { title: "Barn", value: "barn" },
                ],
              },
              validation: (Rule) => Rule.unique(),
            }),
            defineField({
              name: "sizes",
              title: "Storlekar",
              description: "T.ex. 36-42 eller 37, 39, 41",
              type: "string",
            }),
            defineField({
              name: "image",
              title: "Produktbild",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({ name: "imageAlt", title: "Alt-text",        type: "string" }),
                defineField({ name: "url",      title: "Extern bild-URL", type: "url" }),
              ],
            }),
            defineField({
              name: "quizStyle",
              title: "Skoguide: stil",
              description: "Används endast av Skoguide-frågesporten på startsidan. Visas inte för kunder.",
              type: "array",
              of: [{ type: "string" }],
              options: { list: QUIZ_STYLE_OPTIONS },
              validation: (Rule) => Rule.unique(),
            }),
            defineField({
              name: "quizSeason",
              title: "Skoguide: säsong",
              description: "Används endast av Skoguide-frågesporten. Välj alla säsonger som passar.",
              type: "array",
              of: [{ type: "string" }],
              options: { list: QUIZ_SEASON_OPTIONS },
              validation: (Rule) => Rule.unique(),
            }),
            defineField({
              name: "quizPriority",
              title: "Skoguide: prioritet",
              description: "Används endast av Skoguide-frågesporten. Välj allt som stämmer.",
              type: "array",
              of: [{ type: "string" }],
              options: { list: QUIZ_PRIORITY_OPTIONS },
              validation: (Rule) => Rule.unique(),
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "price" },
          },
        },
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
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({ name: "alt", title: "Alt-text",        type: "string" }),
                defineField({ name: "url", title: "Extern bild-URL", type: "url" }),
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
