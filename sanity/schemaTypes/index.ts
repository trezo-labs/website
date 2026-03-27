import { type SchemaTypeDefinition } from "sanity";

import { presetType } from "./preset";
import { templateType } from "./template";
import { usageType } from "./cli-usage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [presetType, templateType, usageType],
};
