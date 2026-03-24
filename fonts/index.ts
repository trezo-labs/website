import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const fontSans = localFont({
  src: "./Geist/Geist-VariableFont_wght.ttf",
  variable: "--font-sans",
  preload: true,
});

const fontSerif = localFont({
  src: "./Lora/Lora-VariableFont_wght.ttf",
  variable: "--font-serif",
  preload: true,
});

const fontMono = localFont({
  src: "./GeistMono/GeistMono-VariableFont_wght.ttf",
  variable: "--font-mono",
  preload: true,
});

const fontVariable = (className?: string) =>
  cn(fontSans.variable, fontMono.variable, fontSerif.variable, className);

export { fontVariable };
