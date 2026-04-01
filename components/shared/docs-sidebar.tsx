"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getAllPagesFromFolder } from "@/lib/page-tree";
import type { source } from "@/lib/source";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/ui/sidebar";

export function DocsSidebar({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: typeof source.pageTree }) {
  const pathname = usePathname();

  const routes = [...tree.children];

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+0.6rem)] z-30 hidden h-[calc(100svh-10rem)] overscroll-none bg-transparent [--sidebar-menu-width:--spacing(56)] lg:flex"
      collapsible="none"
      style={{
        background: "transparent",
      }}
      {...props}
    >
      <div className="h-4" />
      {/* Win2k Explorer pane wrapper */}
      <div
        style={{
          background: "#ffffff",
          borderTop: "2px solid #808080",
          borderLeft: "2px solid #808080",
          borderRight: "2px solid #ffffff",
          borderBottom: "2px solid #ffffff",
          margin: "0 4px 4px 4px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          height: "calc(100% - 1rem)",
        }}
      >
        {/* Pane title bar */}
        <div
          style={{
            background: "linear-gradient(to right, #003399, #3a6ea5)",
            padding: "2px 6px",
            fontFamily: "Tahoma, Arial, sans-serif",
            fontSize: "11px",
            fontWeight: "bold",
            color: "#ffffff",
            userSelect: "none",
            flexShrink: 0,
          }}
        >
          Explorer
        </div>
        <SidebarContent
          className="no-scrollbar overflow-x-hidden"
          style={{
            padding: "4px 0",
            background: "#ffffff",
          }}
        >
          {routes.map((item) => {
            return (
              <SidebarGroup
                key={item.$id}
                style={{ padding: "0", margin: "0" }}
              >
                <SidebarGroupLabel
                  style={{
                    fontFamily: "Tahoma, Arial, sans-serif",
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "#000000",
                    padding: "4px 8px 2px",
                    textTransform: "none",
                    letterSpacing: "0",
                    background: "#d4d0c8",
                    borderBottom: "1px solid #808080",
                    margin: "4px 0 2px",
                  }}
                >
                  📁 {item.name}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  {item.type === "folder" && (
                    <SidebarMenu style={{ gap: "0", padding: "0" }}>
                      {getAllPagesFromFolder(item).map((page) => {
                        const isActive = page.url === pathname;
                        return (
                          <SidebarMenuItem
                            key={page.url}
                            style={{ padding: "0" }}
                          >
                            <Link href={page.url as Route}>
                              <SidebarMenuButton
                                isActive={isActive}
                                style={{
                                  borderRadius: "0",
                                  fontFamily: "Tahoma, Arial, sans-serif",
                                  fontSize: "11px",
                                  color: isActive ? "#ffffff" : "#000000",
                                  padding: "2px 8px 2px 20px",
                                  height: "auto",
                                  width: "100%",
                                  background: isActive
                                    ? "#003399"
                                    : "transparent",
                                  border: isActive
                                    ? "1px dotted #ffffff"
                                    : "1px solid transparent",
                                  fontWeight: "normal",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <span style={{ fontSize: "10px" }}>
                                  {isActive ? "▶" : "📄"}
                                </span>
                                <span>{page.name}</span>
                              </SidebarMenuButton>
                            </Link>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  )}
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
