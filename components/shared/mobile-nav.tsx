"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Route } from "next";
import { source } from "@/lib/source";
import { EXCLUDED_PAGES, TOP_LEVEL_SECTIONS } from "@/lib/constants";
import { getCurrentBase, getPagesFromFolder } from "@/lib/page-tree";

export function MobileNav({
  tree,
  items,
  className,
}: {
  tree: typeof source.pageTree;
  items: { href: string; label: string }[];
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const currentBase = getCurrentBase(pathname);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={buttonVariants({
          variant: "ghost",
          className: cn(
            "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 p-0! hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
            className,
          ),
        })}
      >
        <div className="relative flex h-8 w-4 items-center justify-center">
          <div className="relative size-4">
            <span
              className={cn(
                "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                open ? "top-[0.4rem] -rotate-45" : "top-1",
              )}
            />
            <span
              className={cn(
                "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                open ? "top-[0.4rem] rotate-45" : "top-2.5",
              )}
            />
          </div>
          <span className="sr-only">Toggle Menu</span>
        </div>
        <span className="flex h-8 items-center text-base leading-none font-medium">
          Menu
        </span>
      </PopoverTrigger>
      <PopoverContent
        className="no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none bg-background/90 p-0 shadow-none backdrop-blur duration-100 data-open:animate-none!"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col overflow-auto px-6 py-6">
          <div className="mb-6 flex flex-col gap-4 border-b border-dashed pb-6">
            <div className="text-muted-foreground text-sm font-medium">
              Menu
            </div>
            <div className="flex flex-col gap-3">
              <MobileLink href="/" onOpenChange={setOpen}>
                Home
              </MobileLink>
              {items.map((item, index) => (
                <MobileLink
                  key={index}
                  href={item.href as Route}
                  onOpenChange={setOpen}
                >
                  {item.label}
                </MobileLink>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {tree?.children?.map((group, index) => {
              if (group.type !== "folder") return null;

              const pages = getPagesFromFolder(group, currentBase).filter(
                (page) => !EXCLUDED_PAGES.includes(page.url),
              );

              // If no pages left after filtering, don't render the group
              if (pages.length === 0) return null;

              return (
                <div
                  key={`${group.name}-${index}`}
                  className="flex flex-col gap-4"
                >
                  <div className="text-sm font-medium text-muted-foreground">
                    {group.name}
                  </div>

                  <div className="flex flex-col gap-3">
                    {pages.map((item, i) => (
                      <MobileLink
                        key={`${item.url}-${i}`}
                        href={item.url as Route}
                        onOpenChange={setOpen}
                        className="flex items-center gap-2"
                      >
                        {item.name}
                      </MobileLink>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps<HTMLAnchorElement> & {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href as Route);
        onOpenChange?.(false);
      }}
      className={cn("text-2xl font-medium", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
