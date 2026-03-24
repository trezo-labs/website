import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Templates grouped by ONLY visible + published presets
      S.listItem()
        .title("Templates")
        .child(
          S.documentList()
            .title("Templates by Preset")
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

      S.divider(),

      // Presets (all)
      S.documentTypeListItem("preset").title("Presets"),

      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() && !["preset", "template"].includes(item.getId()!),
      ),
    ]);
