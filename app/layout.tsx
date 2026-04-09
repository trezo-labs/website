import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import "@/styles/globals.css";
import { fontVariable } from "@/fonts";
import { siteConfig } from "@/config/site.config";
import { BASE_URL, META_THEME_COLORS } from "@/lib/constants";
import { ThemeProvider } from "@/components/provider/theme.provider";
import { LayoutProvider } from "@/hooks/use-layout";
import { ActiveThemeProvider } from "@/components/shared/active-theme";
import { TailwindIndicator } from "@/components/shared/tailwind-indicator";
import { TooltipProvider } from "@/ui/tooltip";
import { Toaster } from "@/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.title}`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(BASE_URL as string),
  authors: [
    {
      name: "Holiday",
      url: "https://x.com/thelastofinusa",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${BASE_URL}/images/opengraph.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${BASE_URL}/images/opengraph.png`],
    creator: "@thelastofinusa",
  },
  icons: {
    shortcut: "/favicon_dark/favicon.ico",
    icon: [
      {
        url: "/favicon_light/favicon.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon_dark/favicon.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/favicon_light/apple-touch-icon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon_dark/apple-touch-icon.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  manifest: `${BASE_URL}/site.webmanifest`,
};

export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
                if (localStorage.layout) {
                  document.documentElement.classList.add('layout-' + localStorage.layout)
                }
              } catch (_) {}
            `,
          }}
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />
      </head>

      <body
        className={fontVariable(
          "text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
        )}
      >
        <ThemeProvider>
          <LayoutProvider>
            <ActiveThemeProvider>
              <TooltipProvider delay={0}>
                {props.children}
                <Toaster position="top-center" />
              </TooltipProvider>
              <TailwindIndicator />
              <Analytics />
            </ActiveThemeProvider>
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
