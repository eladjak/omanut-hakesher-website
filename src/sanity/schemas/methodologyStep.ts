import { defineField, defineType } from "sanity";
import { NumberIcon } from "@sanity/icons";

export const methodologyStep = defineType({
  name: "methodologyStep",
  title: "Methodology Step",
  type: "document",
  icon: NumberIcon,
  fields: [
    defineField({
      name: "step",
      title: "Step Number",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "iconName",
      title: "Icon Name",
      type: "string",
      description: "mic, settings, home, chart",
    }),
  ],
  orderings: [
    { title: "Step", name: "stepAsc", by: [{ field: "step", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "step" },
    prepare({ title, subtitle }) {
      return { title: `${subtitle}. ${title}` };
    },
  },
});
