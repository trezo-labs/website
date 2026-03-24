import type { Route } from "next";
import Link from "next/link";

import { getAllPagesFromFolder, type PageTreeFolder } from "@/lib/page-tree";

export function ComponentsList({
  componentsFolder,
}: {
  componentsFolder: PageTreeFolder;
}) {
  const list = getAllPagesFromFolder(componentsFolder);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
      {list.map((component, index) => (
        <Link
          key={component.$id ?? index}
          href={component.url as Route}
          className="inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline text-base"
        >
          {component.name}
        </Link>
      ))}
    </div>
  );
}
