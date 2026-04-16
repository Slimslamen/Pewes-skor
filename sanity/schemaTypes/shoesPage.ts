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
  ],

  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
