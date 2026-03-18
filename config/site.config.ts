export const siteConfig = {
  title: "Trezo",
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : process.env.NEXT_PUBLIC_BASE_URL,
  ogImage: `${process.env.NEXT_PUBLIC_BASE_URL}/og.jpg`,
  description:
    "The modular toolkit for building dapps with type-safe contract interactions, pluggable wallet kits, and high-performance Web3 state management.",
  acronym: "Transaction Runtime & Execution for Web3 Zone Orchestration",
  links: {
    github: "https://github.com/thelastofinusa/trezo",
    githubApi: "https://api.github.com/repos/thelastofinusa/trezo",
  },
  navItems: [
    {
      label: "Docs",
      href: "/docs",
    },
  ],
};
