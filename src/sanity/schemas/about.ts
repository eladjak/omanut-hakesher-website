import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Professional Title",
      type: "string",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "storyParagraphs",
      title: "Story Paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "credentials",
      title: "Credentials Badges",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About" };
    },
  },
});
