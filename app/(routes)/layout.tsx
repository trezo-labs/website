import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";

export default function RoutesLayout(props: LayoutProps<"/">) {
  return (
    <div className="bg-background relative flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col">{props.children}</main>
      <Footer />
    </div>
  );
}
