export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_BASE_URL;

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const CORE_PACKAGES = [
  {
    name: "Trezo CLI",
    description:
      "The entry point for creating and configuring Trezo applications.",
    version: "v1.0.3",
    path: "/docs/cli",
    published: true,
  },
  {
    name: "@trezo/evm",
    description:
      "Type-safe toolkit for interacting with EVM smart contracts and wallets.",
    version: "v1.0.1",
    path: "/docs/packages/evm",
    published: true,
  },
  {
    name: "@trezo/strk",
    description:
      "Type-safe toolkit for building Starknet applications and contract interactions.",
    published: false,
  },
  {
    name: "@trezo/sol",
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
