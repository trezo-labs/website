"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%" },
    );

    for (const id of itemIds ?? []) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      for (const id of itemIds ?? []) {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      }
    };
  }, [itemIds]);

  return activeId;
}

export function DocsTableOfContents({
  toc,
  variant = "list",
  className,
}: {
  toc: {
    title?: React.ReactNode;
    url: string;
    depth: number;
  }[];
  variant?: "dropdown" | "list";
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const itemIds = React.useMemo(
    () => toc.map((item) => item.url.replace("#", "")),
    [toc],
  );
  const activeHeading = useActiveItem(itemIds);

  if (!toc?.length) return null;

  if (variant === "dropdown") {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn("h-8 md:h-7", className)}
          >
            On This Page
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="no-scrollbar max-h-[70svh]"
        >
          {toc.map((item) => (
            <DropdownMenuItem
              key={item.url}
              asChild
              onClick={() => {
                setOpen(false);
              }}
              data-depth={item.depth}
              className="data-[depth=3]:pl-6 data-[depth=4]:pl-8"
            >
              <a href={item.url}>{item.title}</a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div
      className={cn("flex flex-col", className)}
      style={{ fontFamily: "Tahoma, Arial, sans-serif" }}
    >
      {/* Win2k panel title bar */}
      <div
        style={{
          background: "linear-gradient(to right, #003399, #3a6ea5)",
          padding: "2px 6px",
          fontSize: "11px",
          fontWeight: "bold",
          color: "#ffffff",
          userSelect: "none",
          flexShrink: 0,
        }}
      >
        On This Page
      </div>
      <div
        style={{
          padding: "4px 0",
          background: "#d4d0c8",
          flex: 1,
        }}
      >
        {toc.map((item) => {
          const isActive = item.url === `#${activeHeading}`;
          return (
            <a
              key={item.url}
              href={item.url}
              data-active={isActive}
              data-depth={item.depth}
              style={{
                display: "block",
                fontSize: "11px",
                color: isActive ? "#ffffff" : "#0000cc",
                backgroundColor: isActive ? "#003399" : "transparent",
                textDecoration: "none",
                padding: "1px 6px",
                paddingLeft:
                  item.depth === 3
                    ? "18px"
                    : item.depth === 4
                      ? "28px"
                      : "6px",
                fontWeight: isActive ? "bold" : "normal",
              }}
            >
              {item.depth > 2 ? "└ " : "• "}
              {item.title}
            </a>
          );
        })}
      </div>
    </div>
  );
}
