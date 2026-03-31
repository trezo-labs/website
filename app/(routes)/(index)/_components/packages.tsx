import Link from "next/link";
import { Route } from "next";
import { cn } from "@/lib/utils";
import { Card } from "@/ui/card";
import { Skeleton } from "@/ui/skeleton";
import { getNpmVersions } from "@/lib/npm";
import { Container } from "@/components/shared/container";
import { CORE_PACKAGES } from "@/lib/constants";

export const Packages = async () => {
  const versions = await getNpmVersions(
    CORE_PACKAGES.map((p) => p.package).filter((p): p is string => Boolean(p)),
  );

  const enriched = CORE_PACKAGES.map((pkg) => ({
    ...pkg,
    version: pkg.package ? versions[pkg.package] : null,
  }));

  function renderVersionBadge(pkg: {
    version?: string | null;
    package?: string;
    published: boolean;
  }) {
    if (!pkg.published) {
      return (
        <span className="px-1.5 py-0.5 bg-foreground text-background text-xs corner-shape">
          Upcoming
        </span>
      );
    }

    if (pkg.package && pkg.version === undefined) {
      return <Skeleton className="h-5 w-14 corner-shape" />;
    }

    if (pkg.version) {
      return (
        <span className="px-1.5 py-0.5 bg-foreground text-background text-xs corner-shape">
          v{pkg.version}
        </span>
      );
    }

    return (
      <span className="px-1.5 py-0.5 bg-foreground text-background text-xs corner-shape">
        —
      </span>
    );
  }

  return (
    <section className="border-b border-dashed">
      <Container className="border-dashed md:border-x">
        <Container
          size="sm"
          className="px-0! py-16 md:py-32 md:space-y-12 space-y-6"
        >
          <div className="relative z-10 mx-auto max-w-xl space-y-4 text-center">
            <h2 className="text-balance text-3xl font-medium lg:text-4xl">
              Core Packages
            </h2>
          </div>

          <div className="mx-auto max-w-5xl grid sm:grid-cols-2 gap-4 *:p-8 lg:grid-cols-3">
            {enriched
              .sort((a, b) => Number(b.published) - Number(a.published))
              .map((pkg) => {
                const Comp = pkg.path ? Link : "div";

                return (
                  <Card
                    key={pkg.name}
                    className={cn(
                      "p-0! overflow-hidden hover:-translate-y-1 transition-all duration-500 hover:scale-[102%] ease-out",
                      {
                        "opacity-50 pointer-events-none": !pkg.published,
                      },
                    )}
                  >
                    <Comp
                      href={pkg.path as Route}
                      className="flex flex-col gap-4 md:gap-6 p-6"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-medium">{pkg.name}</h3>

                        <p className="font-medium">{renderVersionBadge(pkg)}</p>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {pkg.description}
                      </p>
                    </Comp>
                  </Card>
                );
              })}
          </div>
        </Container>
      </Container>
    </section>
  );
};
