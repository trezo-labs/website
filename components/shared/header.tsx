import Link from "next/link";
import { ModeSwitcher } from "./mode-switcher";
import { Separator } from "@/ui/separator";
import { MainNav } from "./main-nav";
import { siteConfig } from "@/config/site.config";
import { buttonVariants } from "@/ui/button";
import { MobileNav } from "./mobile-nav";
import { CommandMenu } from "./command-menu";
import { SiteConfig } from "./site-config";
import { Icons } from "./icons";
import { source } from "@/lib/source";
import { GitHubLink } from "./github-link";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-dashed bg-background/80 backdrop-blur-xl">
      <div className="container-wrapper px-6 2xl:fixed:px-0">
        <div className="flex h-(--header-height) items-center **:data-[slot=separator]:h-4! 2xl:fixed:container">
          <MobileNav
            tree={source.pageTree}
            items={siteConfig.navItems}
            className="flex lg:hidden"
          />

          <Link
            href="/"
            className={buttonVariants({
              variant: "ghost",
              size: "icon-xs",
              className: "hidden! lg:flex! mr-2",
            })}
          >
            <Icons.logo className="size-6" />
            <span className="sr-only">{siteConfig.name}</span>
          </Link>
          <MainNav items={siteConfig.navItems} className="hidden lg:flex" />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              <CommandMenu tree={source.pageTree} />
            </div>
            <Separator
              orientation="vertical"
              className="ml-2 hidden mt-2 lg:block"
            />
            <GitHubLink />
            <Separator
              orientation="vertical"
              className="hidden mt-2 2xl:flex"
            />
            <SiteConfig className="hidden 2xl:flex" />
            <Separator orientation="vertical" className="mt-2" />
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};
