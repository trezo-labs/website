import Link from "next/link";
import Image from "next/image";
import { Icons } from "hugeicons-proxy";

import { buttonVariants } from "@/ui/button";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/shared/container";

export const HomeHero = () => {
  return (
    <section className="border-b border-dashed">
      <Container className="border-dashed md:border-x">
        <Container size="sm" className="px-0! py-16 md:py-32">
          <div className="relative overflow-hidden">
            <div className="lg:flex lg:items-center lg:gap-12">
              <div className="relative z-10 mx-auto max-w-xl text-center lg:ml-0 lg:w-1/2 lg:text-left">
                {/* <Link
                  href="/docs/packages/strk"
                  className="mx-auto flex w-fit items-center squircle gap-2 border p-1 pr-3 lg:ml-0"
                >
                  <span className="bg-secondary px-2 py-[3px] squircle text-sm font-medium">
                    {siteConfig.name}
                  </span>
                  <span className="text-sm">
                    Introducing <strong>@trezo/strk</strong>
                  </span>
                  <span
                    className="flex size-2 rounded-full bg-blue-500"
                    title="New"
                  />
                </Link> */}
                <div className="mx-auto flex w-fit items-center squircle gap-2 border p-1 pr-3 lg:ml-0">
                  <span className="bg-secondary px-2 py-[3px] squircle text-sm font-medium">
                    {siteConfig.name}
                  </span>
                  <span className="text-sm">Open Source Web3 Framework</span>
                </div>

                <h1 className="mt-6 text-4xl font-serif leading-[1.2] font-medium sm:text-5xl">
                  Build Modern dApps Without Complexity
                </h1>
                <p className="mt-4 leading-6 text-muted-foreground">
                  {siteConfig.description}
                </p>

                <div className="mt-8 mb-12 flex flex-row items-center justify-center gap-2 lg:justify-start">
                  <Link href="/docs/installation" className={buttonVariants()}>
                    <span>Get Started</span>
                  </Link>
                  <Link
                    href="/docs/installation#core-packages"
                    className={buttonVariants({
                      variant: "link",
                    })}
                  >
                    <span>Explore Packages</span>
                    <Icons.ArrowRight02Icon />
                  </Link>
                </div>

                <ul className="block list-inside space-y-2 lg:w-max lg:list-disc lg:border-t lg:pt-8">
                  <li>Works across blockchains</li>
                  <li>Modular wallet integrations</li>
                  <li>Type-safe contract interactions</li>
                </ul>
              </div>
            </div>

            <div className="absolute inset-0 -ml-4 hidden sm:block">
              <div className="relative">
                <div className="to-background absolute -inset-10 z-1 bg-radial-[at_75%_25%] from-transparent to-40%"></div>
                <Image
                  className="hidden brightness-50 lg:brightness-100 ml-auto dark:block"
                  src="/images/hero-dark.png"
                  alt="app illustration"
                  width={896}
                  height={408}
                  priority
                  quality={100}
                />
                <Image
                  className="opacity-50 lg:opacity-100 dark:hidden ml-auto"
                  src="/images/hero-light.png"
                  alt="app illustration"
                  width={896}
                  height={408}
                  priority
                  quality={100}
                />
              </div>
            </div>
          </div>
        </Container>
      </Container>
    </section>
  );
};
