import type { StructureResolver } from "sanity/structure";

const singletons = new Set(["siteSettings", "about"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Singletons
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("About")
        .id("about")
        .child(S.document().schemaType("about").documentId("about")),

      S.divider(),

      // Document lists (filter out singletons)
      ...S.documentTypeListItems().filter(
        (listItem) => !singletons.has(listItem.getId()!),
      ),
    ]);
