import { ExamplesIndex } from "@/examples/__index__";
import { readFileFromRoot } from "./read-file";

export function getDemoComponent(name: string) {
  return ExamplesIndex[name]?.component;
}

export async function getDemoItem(name: string) {
  const demo = ExamplesIndex?.[name];
  if (!demo) {
    return null;
  }

  const content = await readFileFromRoot(demo.filePath);

  return {
    name: demo.name,
    type: "registry:internal" as const,
    files: [
      {
        path: demo.filePath,
        content,
        type: "registry:internal" as const,
      },
    ],
  };
}

export function getRegistryComponent(name: string) {
  const demoComponent = getDemoComponent(name);
  if (demoComponent) {
    return demoComponent;
  }
}
