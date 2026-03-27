import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const usageType = defineType({
  name: "usage",
  title: "CLI Usage",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "usage",
      title: "Usage",
      description: "The number of times someone queries the CLI",
      type: "number",
      readOnly: true,
    }),
  ],
});
