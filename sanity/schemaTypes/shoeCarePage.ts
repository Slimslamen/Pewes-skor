import { defineType, defineField } from "sanity";

export const shoeCarePage = defineType({
  name:  "shoeCarePage",
  title: "Skovårdsguide",
  type:  "document",
  fields: [
    defineField({ name: "pageTitle",    title: "Sidtitel",   type: "string" }),
    defineField({ name: "pageSubtitle", title: "Underrubrik", type: "text", rows: 2 }),

    defineField({
      name:  "materials",
      title: "Materialsektioner",
      type:  "array",
      of: [
        {
          type: "object",
          name: "materialSection",
          title: "Materialsektion",
          fields: [
            defineField({
              name:  "materialKey",
              title: "Nyckel (lader / nubuck / textil / vandring / syntet)",
              type:  "string",
              options: {
                list: ["lader", "nubuck", "textil", "vandring", "syntet"],
              },
            }),
            defineField({ name: "title", title: "Titel",         type: "string" }),
            defineField({ name: "icon",  title: "Ikon (emoji)",   type: "string" }),
            defineField({ name: "intro", title: "Ingress",        type: "text", rows: 3 }),
            defineField({
              name:  "steps",
              title: "Vård-steg",
              type:  "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "stepTitle", title: "Steg-rubrik",   type: "string" }),
                    defineField({ name: "body",      title: "Beskrivning",   type: "text", rows: 3 }),
                  ],
                  preview: { select: { title: "stepTitle" } },
                },
              ],
            }),
            defineField({ name: "proTip", title: "Pro-tips", type: "text", rows: 2 }),
          ],
          preview: {
            select: { title: "title", subtitle: "materialKey" },
          },
        },
      ],
    }),
  ],

  preview: {
    select: { title: "pageTitle" },
    prepare({ title }) {
      return { title: title ?? "Skovårdsguide" };
    },
  },
});
