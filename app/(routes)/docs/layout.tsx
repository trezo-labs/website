import React from "react";
import { SidebarProvider } from "@/ui/sidebar";
import { DocsSidebar } from "@/components/shared/docs-sidebar";
import { source } from "@/lib/source";

export default function DocsLayout(props: LayoutProps<"/docs">) {
  return (
    <div
      className="container-wrapper flex flex-1 flex-col px-2"
      style={{ background: "#008080" /* Win2k teal desktop */ }}
    >
      <SidebarProvider
        className="min-h-min flex-1 items-start px-0 [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--top-spacing:calc(var(--spacing)*4)] 3xl:fixed:container 3xl:fixed:px-3"
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            background: "#008080",
          } as React.CSSProperties
        }
      >
        <DocsSidebar tree={source.pageTree} />
        <div className="h-full w-full">{props.children}</div>
      </SidebarProvider>
    </div>
  );
}
