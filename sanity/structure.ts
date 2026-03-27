import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.divider(),
      // Section: Visible Templates grouped by preset
      S.listItem()
        .title("Visible Templates by Preset")
        .child(
          S.documentList()
            .title("Presets (Visible Templates)")
            .filter(
              '_type == "preset" && visible == true && !(_id in path("drafts.**"))',
            )
            .child((presetId) =>
              S.documentList()
                .title("Templates")
                .filter('_type == "template" && preset._ref == $presetId')
                .params({ presetId }),
            ),
        ),

      // Section: All Presets
      S.listItem()
        .title("All Presets")
        .child(S.documentList().title("Presets").filter('_type == "preset"')),

      S.divider(),

      // ✅ Usage (single document)
      S.listItem().title("CLI Usage").child(
        S.document().schemaType("usage").documentId("cli-usage"), // must match your API patch ID
      ),

      // Other document types
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["preset", "template", "usage"].includes(item.getId()!),
      ),
    ]);
