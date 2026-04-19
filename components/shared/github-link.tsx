import Link from "next/link";
import { Route } from "next";
import * as React from "react";

import { name as packageName } from "@/package.json";

import { Icons } from "./icons";
import { Skeleton } from "@/ui/skeleton";
import { buttonVariants } from "@/ui/button";
import { siteConfig } from "@/config/site.config";

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
  // Organization urls
  const repo = result.find(
    (item: { name: string }) => item.name === packageName,
  );

  return (
    <span className="text-muted-foreground mt-px text-xs font-mono">
      {repo.stargazers_count <= 50 ? <span className="font-sans">GitHub</span> : repo.stargazers_count >= 1000
        ? `${(repo.stargazers_count / 1000).toFixed(0)}k`
        : repo.stargazers_count.toLocaleString()}
    </span>
  );
}
