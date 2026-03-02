import { defineField, defineType } from "sanity";
import { BulbOutlineIcon } from "@sanity/icons";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: "serviceId",
      title: "Service ID",
      type: "string",
      description: "URL-friendly identifier (e.g. couples, workshops)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      description: "For homepage cards",
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "text",
      rows: 4,
      description: "For services page",
    }),
    defineField({
      name: "whoIsItFor",
      title: "Who Is It For?",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
    }),
    defineField({
      name: "pricing",
      title: "Pricing",
      type: "string",
    }),
    defineField({
      name: "iconName",
      title: "Icon Name",
      type: "string",
      description: "heart, users, user, video",
    }),
    defineField({
      name: "color",
      title: "Color Classes",
      type: "string",
      description: "Tailwind classes, e.g. bg-primary/10 text-primary",
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
    select: { title: "title", subtitle: "serviceId" },
  },
});
