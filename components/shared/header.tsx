import React from "react";
import Link from "next/link";
import { ModeSwitcher } from "./mode-switcher";
import { Separator } from "@/ui/separator";
import { Container } from "./container";
import { GitHubLink } from "./github-link";
import { MainNav } from "./main-nav";
import { siteConfig } from "@/config/site.config";
import { buttonVariants } from "@/ui/button";
import { MobileNav } from "./mobile-nav";
import { CommandMenu } from "./command-menu";

export const Header = () => {
  return (
    <header className="bg-background/80 sticky top-0 z-50 w-full border-b border-dashed backdrop-blur-xl">
      <Container>
        <div className="flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:h-4!">
          <MobileNav items={siteConfig.navItems} className="flex lg:hidden" />

          <Link
            href="/"
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
              className: "hidden! size-8! lg:flex!",
            })}
          >
            <svg
              viewBox="0 0 209 184"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
            >
              <path
                d="M58.075 92.75L23.25 111.5L58.075 130.25L104.5 155.25L150.925 130.25L185.75 111.5L150.925 92.75M58.075 92.75L104.5 117.75L150.925 92.75M58.075 92.75L23.25 74L104.5 30.25L185.75 74L150.925 92.75"
                stroke="currentColor"
                strokeWidth="12.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="sr-only">{siteConfig.title}</span>
          </Link>

          <MainNav items={siteConfig.navItems} className="hidden lg:flex" />

          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              <CommandMenu navItems={siteConfig.navItems} />
            </div>
            <Separator
              orientation="vertical"
              className="ml-2 mt-2 hidden lg:block"
            />
            <GitHubLink />
            <Separator orientation="vertical" className="mt-2" />
            <ModeSwitcher />
          </div>
        </div>
      </Container>
    </header>
  );
};
