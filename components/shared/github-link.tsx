import Link from "next/link";
import { Route } from "next";
import * as React from "react";

import { buttonVariants } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";
import { siteConfig } from "@/config/site.config";
import { Icons } from "./icons";

export function GitHubLink() {
  const repo = siteConfig.links.github as Route;
  const githubApi = siteConfig.links.githubApi;

  return (
    <Link
      href={repo}
      target="_blank"
      rel="noreferrer"
      aria-label="GitHub repository"
      className={buttonVariants({
        size: "sm",
        variant: "ghost",
        className: "h-8!",
      })}
    >
      <Icons.gitHub />
      <React.Suspense fallback={<Skeleton className="h-4 w-8" />}>
        <StarsCount githubApi={githubApi} />
      </React.Suspense>
    </Link>
  );
}

export async function StarsCount({ githubApi }: { githubApi: string }) {
  const data = await fetch(githubApi, {
    next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
  });
  const result = await data.json();

  return (
    <span className="text-muted-foreground mt-px text-xs font-mono">
      {result.stargazers_count >= 1000
        ? `${(result.stargazers_count / 1000).toFixed(1)}k`
        : result.stargazers_count.toLocaleString()}
    </span>
  );
}
