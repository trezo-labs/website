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

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Win2k title bar gradient strip */}
      <div
        style={{
          background: "linear-gradient(to right, #003399, #3a6ea5)",
          borderBottom: "2px solid #404040",
          display: "flex",
          alignItems: "center",
          height: "var(--header-height)",
          paddingLeft: "8px",
          paddingRight: "8px",
          gap: "8px",
        }}
      >
        <MobileNav
          tree={source.pageTree}
          items={siteConfig.navItems}
          className="flex lg:hidden"
        />

        <Link
          href="/"
          style={{
            display: "none",
            alignItems: "center",
            gap: "6px",
            textDecoration: "none",
          }}
          className="lg:!flex"
        >
          <Icons.logo className="size-5" style={{ color: "#ffffff" }} />
          <span
            style={{
              color: "#ffffff",
              fontFamily: "Tahoma, Arial, sans-serif",
              fontSize: "12px",
              fontWeight: "bold",
              textShadow: "1px 1px 0 rgba(0,0,0,0.5)",
            }}
          >
            {siteConfig.name}
          </span>
        </Link>

        {/* Win2k menu bar */}
        <div
          style={{
            height: "1px",
            width: "1px",
            background: "rgba(255,255,255,0.3)",
            margin: "0 4px",
          }}
          className="hidden lg:block"
        />

        <MainNav items={siteConfig.navItems} className="hidden lg:flex" />

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:flex">
            <CommandMenu tree={source.pageTree} />
          </div>
          <div
            style={{
              width: "1px",
              height: "16px",
              background: "rgba(255,255,255,0.4)",
            }}
            className="hidden 2xl:block"
          />
          <SiteConfig className="hidden 2xl:flex" />
          <div
            style={{
              width: "1px",
              height: "16px",
              background: "rgba(255,255,255,0.4)",
            }}
          />
          <ModeSwitcher />
        </div>
      </div>
    </header>
  );
};
