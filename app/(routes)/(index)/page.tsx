import { Features } from "./_components/features";
import { HomeHero } from "./_components/hero";
import { Packages } from "./_components/packages";

export default function Home() {
  return (
    <section className="relative overflow-x-clip">
      <HomeHero />
      <Features />
      <Packages />
    </section>
  );
}
