import { siteConfig } from "@/config/site.config";

export const TOP_LEVEL_SECTIONS = [
  { name: "Introduction", href: "/docs" },
  {
    name: "Installation",
    href: "/docs/installation",
  },
  { name: "Trezo CLI", href: "/docs/packages/cli" },
];
export const EXCLUDED_SECTIONS = ["installation", "cli"];
export const EXCLUDED_PAGES = ["/docs"];

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : siteConfig.url;

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const CORE_PACKAGES = [
  {
    name: "Trezo CLI",
    description:
      "The entry point for creating and configuring Trezo applications.",
    version: "v0.1.0",
    path: "/docs/packages/cli",
    published: true,
  },
  {
    name: "@trezo/evm",
    description:
      "Type-safe toolkit for interacting with EVM smart contracts and wallets.",
    version: "v0.1.6",
    path: "/docs/packages/evm",
    published: true,
  },
  {
    name: "@trezo/starknet",
    description:
      "Type-safe toolkit for building Starknet applications and contract interactions.",
    published: false,
  },
  {
    name: "@trezo/solana",
    description:
      "Developer toolkit for interacting with Solana programs and wallets.",
    published: false,
  },
  {
    name: "@trezo/sui",
    description:
      "Toolkit for building Sui applications with simplified contract interactions.",
    published: false,
  },
];
