import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const presetType = defineType({
  name: "preset",
  title: "Preset",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label Name",
      description:
        "The display name shown in the CLI terminal when listing presets.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      type: "slug",
      description:
        "A unique, URL-friendly identifier generated from the display name. Used internally by the CLI.",
      options: {
        source: "label",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "visible",
      type: "boolean",
      initialValue: () => false,
      description: "Controls whether this preset is visible in the CLI.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "label",
      visible: "visible",
    },
    prepare(selection) {
      const { title, visible } = selection;
      return {
        title,
        subtitle: visible ? "✅ Visible in CLI" : "🚫 Hidden from CLI",
      };
    },
  },
});
