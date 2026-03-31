const cache = new Map<string, Promise<string | null>>();

async function fetchNpmVersion(pkg: string) {
  const res = await fetch(`https://registry.npmjs.org/${pkg}`, {
    next: { revalidate: 3600 }, // cache per package
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data?.["dist-tags"]?.latest ?? null;
}

export function getNpmVersion(pkg: string) {
  if (!pkg) return Promise.resolve(null);

  // dedupe in-flight requests
  if (!cache.has(pkg)) {
    cache.set(pkg, fetchNpmVersion(pkg));
  }

  return cache.get(pkg)!;
}

export async function getNpmVersions(packages: string[]) {
  const unique = [...new Set(packages.filter(Boolean))];

  const results = await Promise.all(
    unique.map(async (pkg) => [pkg, await getNpmVersion(pkg)] as const),
  );

  return Object.fromEntries(results) as Record<string, string | null>;
}
