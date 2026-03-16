import {
  Geist_Mono as FontMono,
  Geist as FontSans,
  Lora as FontSerif,
} from "next/font/google";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const fontVariable = (className?: string) =>
  cn(fontSans.variable, fontMono.variable, fontSerif.variable, className);

export { fontVariable };
