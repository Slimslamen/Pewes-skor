import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name:  "siteSettings",
  title: "Webbplatsinställningar",
  type:  "document",
  fields: [
    defineField({
      name:         "maintenanceMode",
      title:        "Underhållsläge",
      type:         "boolean",
      description:  "Aktivera för att visa underhållssidan för alla besökare. Stäng av för att göra hemsidan tillgänglig igen.",
      initialValue: false,
    }),
  ],
});
