import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";

export default function RoutesLayout(props: LayoutProps<"/">) {
  return (
    <div
      data-slot="layout"
      className="relative z-10 flex min-h-svh flex-col"
      style={{ background: "#008080" }}
    >
      <Header />
      <main className="flex flex-1 flex-col">{props.children}</main>
      <Footer />
    </div>
  );
}
