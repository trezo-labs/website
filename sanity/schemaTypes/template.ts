import { CodeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const templateType = defineType({
  name: "template",
  title: "Template",
  type: "document",
  icon: CodeIcon,
  fields: [
    defineField({
      name: "preset",
      title: "Preset",
      type: "reference",
      description:
        "Select the preset this template belongs to. Used to group templates in the CLI.",
      to: [{ type: "preset" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Display Name",
      type: "string",
      description: "The display name of the template as shown in the CLI.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "slug",
      options: {
        source: "label",
      },
      description:
        "A unique identifier for the template (e.g. 'next-ts'). Used internally by the CLI.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "path",
      title: "Repository URL",
      type: "url",
      description:
        "The GitHub repository URL for the template (must include 'github.com').",
      validation: (Rule) =>
        Rule.required()
          .uri({
            scheme: ["http", "https"],
          })
          .custom((value) => {
            if (!value) return true;
            return value.includes("github.com")
              ? true
              : "URL must be a valid GitHub link (include 'github.com').";
          }),
    }),
    defineField({
      name: "postSetupCommands",
      title: "Post Setup Commands",
      type: "array",
      description:
        "Optional list of commands to run after the template is initialized (e.g. 'pnpm install').",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "visible",
      type: "boolean",
      initialValue: () => false,
      description: "Controls whether this template is visible in the CLI.",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "label",
      subtitle: "path",
    },
  },
});
