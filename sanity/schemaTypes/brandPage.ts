import { defineType, defineField } from "sanity";
import {
  QUIZ_STYLE_OPTIONS,
  QUIZ_SEASON_OPTIONS,
  QUIZ_PRIORITY_OPTIONS,
} from "../../lib/quizTags";

export const brandPage = defineType({
  name: "brandPage",
  title: "Varumärkessida",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Varumärkesnamn",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Beskrivning",
      description: "Kort text som beskriver varumärket. Visas under namnet på varumärkessidan.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "slug",
      title: "Slug (URL, t.ex. kavat → /varumarken/kavat)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Visa som Bästsäljande i menyn",
      description:
        "När aktiverat visas varumärket i 'Bästsäljande' i menyn. Annars hamnar det under 'Fler märken'.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "navOrder",
      title: "Ordning i menyn",
      description: "Lägre siffra = tidigare i menylistan. Lämna tomt för alfabetisk ordning.",
      type: "number",
    }),

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
              description: "Välj en eller flera. Produkten visas på motsvarande /skor/-sida.",
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

  ],

  preview: {
    select: { title: "name", subtitle: "slug.current" },
    prepare({ title, subtitle }) {
      return { title: title ?? "Varumärkessida", subtitle };
    },
  },
});
