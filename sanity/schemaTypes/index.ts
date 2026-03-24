import { type SchemaTypeDefinition } from "sanity";

import { presetType } from "./preset";
import { templateType } from "./template";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [presetType, templateType],
};
