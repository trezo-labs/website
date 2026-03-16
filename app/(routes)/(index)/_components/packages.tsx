import { cn } from "@/lib/utils";
import { Card } from "@/ui/card";
import { Container } from "@/components/shared/container";
import { CORE_PACKAGES } from "@/lib/constants";

export const Packages = () => {
  return (
    <section className="border-b border-dashed">
      <Container className="border-dashed md:border-x">
        <Container
          size="sm"
          className="px-0! py-16 md:py-32 md:space-y-16 space-y-8"
        >
          <div className="relative z-10 mx-auto max-w-xl space-y-4 text-center">
            <h2 className="text-balance text-3xl font-medium lg:text-4xl">
              Core Packages
            </h2>
          </div>

          <div className="mx-auto max-w-5xl grid sm:grid-cols-2 gap-4 *:p-8 lg:grid-cols-3">
            {CORE_PACKAGES.sort(
              (a, b) => Number(b.published) - Number(a.published),
            ).map((pkg) => (
              <Card
                key={pkg.name}
                className={cn(
                  "flex flex-col gap-4 md:gap-6 bg-card/40",
                  pkg.published ? "" : "opacity-50 pointer-events-none",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-medium">{pkg.name}</h3>
                  <p className="px-1.5 py-0.5 rounded-[24px] bg-secondary corner-shape text-xs font-medium">
                    {pkg.published ? pkg.version : "Upcoming"}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground">
                  {pkg.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Container>
    </section>
  );
};
