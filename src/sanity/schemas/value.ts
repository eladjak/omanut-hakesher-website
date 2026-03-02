import { defineField, defineType } from "sanity";
import { HeartIcon } from "@sanity/icons";

export const value = defineType({
  name: "value",
  title: "Value",
  type: "document",
  icon: HeartIcon,
  fields: [
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
      description: "heart, lightbulb, shield, chart",
    }),
    defineField({
      name: "color",
      title: "Color Classes",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title" },
  },
});
