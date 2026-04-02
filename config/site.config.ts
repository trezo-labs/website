import { BASE_URL } from "@/lib/constants";

export const siteConfig = {
  name: "Trezo",
  title: "Build Modern dApps Without Complexity",
  url: BASE_URL,
  ogImage: `${BASE_URL}/og.jpg`,
  description:
    "The modular toolkit for building dapps with type-safe contract interactions, pluggable wallet kits, and high-performance Web3 state management.",
  acronym: "Transaction Runtime & Execution for Web3 Zone Orchestration",
  links: {
    github: "https://github.com/trezo-labs",
    githubApi: "https://api.github.com/orgs/trezo-labs/repos",
  },
  navItems: [
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Changelog",
      href: "/docs/changelog",
    },
  ],
};
