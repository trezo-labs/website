"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDocsSearch } from "fumadocs-core/search/client";

import { trackEvent } from "@/lib/events";
import { getCurrentBase, getPagesFromFolder } from "@/lib/page-tree";
import { type source } from "@/lib/source";
import { cn } from "@/lib/utils";
import { useConfig } from "@/hooks/use-config";
import { useMutationObserver } from "@/hooks/use-mutation-observer";
import { copyToClipboardWithMeta } from "@/components/shared/copy-button";
import { buttonVariants } from "@/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Separator } from "@/ui/separator";
import { Icons } from "hugeicons-proxy";
import { Route } from "next";
import { useIsMac } from "@/hooks/use-is-mac";

export function CommandMenu({
  tree,
  navItems,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  tree: typeof source.pageTree;
  navItems?: { href: string; label: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [config] = useConfig();
  const isMac = useIsMac();
  const currentBase = getCurrentBase(pathname);
  const [open, setOpen] = React.useState(false);
  const [renderDelayedGroups, setRenderDelayedGroups] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<
    "color" | "page" | "component" | "block" | null
  >(null);
  const [copyPayload, setCopyPayload] = React.useState("");

  const { search, setSearch, query } = useDocsSearch({
    type: "fetch",
  });
  const packageManager = config.packageManager || "pnpm";

  // Track search queries with debouncing to avoid excessive tracking.
  const searchTimeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);
  const lastTrackedQueryRef = React.useRef<string>("");

  const trackSearchQuery = React.useCallback((query: string) => {
    const trimmedQuery = query.trim();

    // Only track if the query is different from the last tracked query and has content.
    if (trimmedQuery && trimmedQuery !== lastTrackedQueryRef.current) {
      lastTrackedQueryRef.current = trimmedQuery;
      trackEvent({
        name: "search_query",
        properties: {
          query: trimmedQuery,
          query_length: trimmedQuery.length,
        },
      });
    }
  }, []);

  const handleSearchChange = React.useCallback(
    (value: string) => {
      // Clear existing timeout.
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Set new timeout to debounce both search and tracking.
      searchTimeoutRef.current = setTimeout(() => {
        React.startTransition(() => {
          setSearch(value);
          trackSearchQuery(value);
        });
      }, 500);
    },
    [setSearch, trackSearchQuery],
  );

  // Cleanup timeout on unmount.
  React.useEffect(() => {
    if (open) {
      const frame = requestAnimationFrame(() => {
        setRenderDelayedGroups(true);
      });

      return () => {
        cancelAnimationFrame(frame);
      };
    }

    setRenderDelayedGroups(false);
  }, [open]);

  React.useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const commandFilter = React.useCallback(
    (value: string, searchValue: string, keywords?: string[]) => {
      const extendValue = value + " " + (keywords?.join(" ") || "");
      if (extendValue.toLowerCase().includes(searchValue.toLowerCase())) {
        return 1;
      }
      return 0;
    },
    [],
  );

  const handlePageHighlight = React.useCallback(
    (isComponent: boolean, item: { url: string; name?: React.ReactNode }) => {
      if (isComponent) {
        const componentName = item.url.split("/").pop();
        setSelectedType("component");
        setCopyPayload(
          `${packageManager} dlx shadcn@latest add ${componentName}`,
        );
      } else {
        setSelectedType("page");
        setCopyPayload("");
      }
    },
    [packageManager, setSelectedType, setCopyPayload],
  );

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    [setOpen],
  );

  const navItemsSection = React.useMemo(() => {
    if (!navItems || navItems.length === 0) {
      return null;
    }

    return (
      <CommandGroup
        heading="Pages"
        className="p-0! **:[[cmdk-group-heading]]:scroll-mt-16 **:[[cmdk-group-heading]]:p-3! **:[[cmdk-group-heading]]:pb-1!"
      >
        {navItems.map((item) => (
          <CommandMenuItem
            key={item.href}
            value={`Navigation ${item.label}`}
            keywords={["nav", "navigation", item.label.toLowerCase()]}
            onHighlight={() => {
              setSelectedType("page");
              setCopyPayload("");
            }}
            onSelect={() => {
              runCommand(() => router.push(item.href as Route));
            }}
          >
            <Icons.ArrowRight02Icon />
            {item.label}
          </CommandMenuItem>
        ))}
      </CommandGroup>
    );
  }, [navItems, runCommand, router]);

  const pageGroupsSection = React.useMemo(() => {
    return tree.children.map((group) => {
      if (group.type !== "folder") {
        return null;
      }

      const pages = getPagesFromFolder(group, currentBase);

      if (pages.length === 0) {
        return null;
      }

      return (
        <CommandGroup
          key={group.$id}
          heading={group.name}
          className="p-0! **:[[cmdk-group-heading]]:scroll-mt-16 **:[[cmdk-group-heading]]:p-3! **:[[cmdk-group-heading]]:pb-1!"
        >
          {pages.map((item) => {
            const isComponent = item.url.includes("/components/");

            return (
              <CommandMenuItem
                key={item.url}
                value={
                  item.name?.toString() ? `${group.name} ${item.name}` : ""
                }
                keywords={isComponent ? ["component"] : undefined}
                onHighlight={() => handlePageHighlight(isComponent, item)}
                onSelect={() => {
                  runCommand(() => router.push(item.url as Route));
                }}
              >
                {isComponent ? (
                  <div className="aspect-square size-4 rounded-full border border-dashed border-muted-foreground" />
                ) : (
                  <Icons.ArrowRight02Icon />
                )}
                {item.name}
              </CommandMenuItem>
            );
          })}
        </CommandGroup>
      );
    });
  }, [tree.children, currentBase, handlePageHighlight, runCommand, router]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }

      if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
        runCommand(() => {
          if (selectedType === "color") {
            copyToClipboardWithMeta(copyPayload, {
              name: "copy_color",
              properties: { color: copyPayload },
            });
          }

          if (selectedType === "block") {
            copyToClipboardWithMeta(copyPayload, {
              name: "copy_npm_command",
              properties: { command: copyPayload, pm: packageManager },
            });
          }

          if (selectedType === "page" || selectedType === "component") {
            copyToClipboardWithMeta(copyPayload, {
              name: "copy_npm_command",
              properties: { command: copyPayload, pm: packageManager },
            });
          }
        });
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [copyPayload, runCommand, selectedType, packageManager]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={buttonVariants({
          variant: "secondary",
          className: cn(
            "bg-card! border border-border/40 text-xs text-surface-foreground/60 dark:bg-card relative h-8! w-full justify-start pl-2.5 font-normal shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64",
          ),
        })}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex tracking-wider">
          Search documentation...
        </span>
        <span className="inline-flex lg:hidden">Search...</span>
        <div className="absolute top-1/2 right-1.5 hidden gap-1 -translate-y-1/2 sm:flex">
          <CommandMenuKbd>{isMac ? "⌘" : "Ctrl"}</CommandMenuKbd>
          <CommandMenuKbd className="aspect-square">K</CommandMenuKbd>
        </div>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="rounded-3xl lg:rounded-[38px] bg-card overflow-hidden ring-secondary corner-shape border-none bg-clip-padding p-4 pb-11 shadow-2xl ring-4"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search documentation...</DialogTitle>
          <DialogDescription>Search for a command to run...</DialogDescription>
        </DialogHeader>
        <Command
          className="rounded-none bg-transparent **:data-[slot=command-input]:h-9! **:data-[slot=command-input]:py-0 **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:h-9! **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border **:data-[slot=command-input-wrapper]:border-input **:data-[slot=command-input-wrapper]:bg-input/50"
          filter={commandFilter}
        >
          <div className="relative">
            <CommandInput
              placeholder="Search documentation..."
              onValueChange={handleSearchChange}
            />
            {query.isLoading && (
              <div className="pointer-events-none absolute top-1/2 right-3 z-10 flex -translate-y-1/2 items-center justify-center">
                <Icons.Loading03Icon className="size-4 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>
          <CommandList className="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5">
            <CommandEmpty className="py-12 text-center text-sm text-muted-foreground">
              {query.isLoading ? "Searching..." : "No results found."}
            </CommandEmpty>
            {navItemsSection}
            {renderDelayedGroups ? (
              <>
                {pageGroupsSection}
                <SearchResults
                  setOpen={setOpen}
                  query={query}
                  search={search}
                />
              </>
            ) : null}
          </CommandList>
        </Command>
        <div className="absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2  border- px-4 text-xs font-medium text-muted-foreground bg-secondary">
          <div className="flex items-center gap-2">
            <CommandMenuKbd>
              <Icons.ArrowTurnBackwardIcon />
            </CommandMenuKbd>{" "}
            {selectedType === "page" || selectedType === "component"
              ? "Go to Page"
              : null}
            {selectedType === "color" ? "Copy OKLCH" : null}
          </div>
          {copyPayload && (
            <>
              <Separator orientation="vertical" className="h-4!" />
              <div className="flex items-center gap-1">
                <CommandMenuKbd>⌘</CommandMenuKbd>
                <CommandMenuKbd>C</CommandMenuKbd>
                {copyPayload}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CommandMenuItem({
  children,
  className,
  onHighlight,
  ...props
}: React.ComponentProps<typeof CommandItem> & {
  onHighlight?: () => void;
  "data-selected"?: string;
  "aria-selected"?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  useMutationObserver(ref, (mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "aria-selected" &&
        ref.current?.getAttribute("aria-selected") === "true"
      ) {
        onHighlight?.();
      }
    });
  });

  return (
    <CommandItem
      ref={ref}
      className={cn(
        "h-9 corner-shape rounded-[10px] sm:rounded-[24px] border border-transparent px-3! font-medium data-[selected=true]:border-input data-[selected=true]:bg-input/50",
        className,
      )}
      {...props}
    >
      {children}
    </CommandItem>
  );
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "pointer-events-none flex h-5 items-center justify-center gap-1 rounded border bg-background px-1 font-sans text-[0.7rem] font-medium text-muted-foreground select-none [&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      {...props}
    />
  );
}

type Query = Awaited<ReturnType<typeof useDocsSearch>>["query"];

function SearchResults({
  setOpen,
  query,
  search,
}: {
  setOpen: (open: boolean) => void;
  query: Query;
  search: string;
}) {
  const router = useRouter();

  const uniqueResults = React.useMemo(() => {
    if (!query.data || !Array.isArray(query.data)) {
      return [];
    }

    return query.data.filter(
      (item, index, self) =>
        !(
          item.type === "text" && item.content.trim().split(/\s+/).length <= 1
        ) && index === self.findIndex((t) => t.content === item.content),
    );
  }, [query.data]);

  if (!search.trim()) {
    return null;
  }

  if (!query.data || query.data === "empty") {
    return null;
  }

  if (query.data && uniqueResults.length === 0) {
    return null;
  }

  return (
    <CommandGroup
      className="px-0! **:[[cmdk-group-heading]]:scroll-mt-16 **:[[cmdk-group-heading]]:p-3! **:[[cmdk-group-heading]]:pb-1!"
      heading="Search Results"
    >
      {uniqueResults.map((item) => {
        return (
          <CommandItem
            key={item.id}
            data-type={item.type}
            onSelect={() => {
              router.push(item.url as Route);
              setOpen(false);
            }}
            className="h-9 corner-shape rounded-[10px] sm:rounded-[24px] border border-transparent px-3! font-normal data-[selected=true]:border-input data-[selected=true]:bg-input/50"
            keywords={[item.content]}
            value={`${item.content} ${item.type}`}
          >
            <div className="line-clamp-1 text-sm">{item.content}</div>
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}
