import type { Metadata, Route } from "next";
import { notFound } from "next/navigation";
import { findNeighbour } from "fumadocs-core/page-tree";

import { source } from "@/lib/source";
import { absoluteUrl } from "@/lib/utils";
import { DocsTableOfContents } from "@/components/shared/docs-toc";
import { mdxComponents } from "@/mdx-components";
import { Button, buttonVariants } from "@/ui/button";
import Link from "next/link";
import { Icons } from "hugeicons-proxy";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;

  const page = source.getPage(params.slug);
  if (!page) return notFound();

  const doc = page.data;
  if (!doc.title || !doc.description) return notFound();

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(page.url),
      images: [
        {
          url: `/og?title=${encodeURIComponent(
            doc.title,
          )}&description=${encodeURIComponent(doc.description)}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [
        {
          url: `/og?title=${encodeURIComponent(
            doc.title,
          )}&description=${encodeURIComponent(doc.description)}`,
        },
      ],
      creator: "@shadcn",
    },
  };
}

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;

  const page = source.getPage(params.slug);
  if (!page) return notFound();

  const doc = page.data;
  const MDX = doc.body;

  const neighbours = findNeighbour(source.pageTree, page.url);

  return (
    <div
      data-slot="docs"
      className="flex scroll-mt-24 items-stretch pb-8 xl:w-full"
      style={{ fontSize: "11px", fontFamily: "Tahoma, Arial, sans-serif" }}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-(--top-spacing) shrink-0" />
        {/* Win2k window chrome wrapper */}
        <div
          className="mx-auto flex w-full max-w-160 min-w-0 flex-1 flex-col"
          style={{
            margin: "8px 4px 8px 0",
            borderTop: "2px solid #ffffff",
            borderLeft: "2px solid #ffffff",
            borderRight: "2px solid #404040",
            borderBottom: "2px solid #404040",
          }}
        >
          {/* Win2k title bar */}
          <div
            style={{
              background: "linear-gradient(to right, #003399, #3a6ea5)",
              padding: "3px 4px 3px 6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              userSelect: "none",
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontFamily: "Tahoma, Arial, sans-serif",
                fontSize: "11px",
                fontWeight: "bold",
                textShadow: "1px 1px 0 rgba(0,0,0,0.4)",
              }}
            >
              {doc.title}
            </span>
            {/* Win2k window control buttons */}
            <div style={{ display: "flex", gap: "2px" }}>
              {/* Minimize */}
              <span
                style={{
                  width: "16px",
                  height: "14px",
                  background: "#d4d0c8",
                  borderTop: "2px solid #ffffff",
                  borderLeft: "2px solid #ffffff",
                  borderRight: "2px solid #404040",
                  borderBottom: "2px solid #404040",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  paddingBottom: "2px",
                  cursor: "default",
                  fontSize: "10px",
                  fontFamily: "Tahoma, Arial, sans-serif",
                  fontWeight: "bold",
                  lineHeight: 1,
                  color: "#000000",
                }}
              >
                _
              </span>
              {/* Maximize */}
              <span
                style={{
                  width: "16px",
                  height: "14px",
                  background: "#d4d0c8",
                  borderTop: "2px solid #ffffff",
                  borderLeft: "2px solid #ffffff",
                  borderRight: "2px solid #404040",
                  borderBottom: "2px solid #404040",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "default",
                  fontSize: "8px",
                  lineHeight: 1,
                  color: "#000000",
                }}
              >
                □
              </span>
              {/* Close */}
              <span
                style={{
                  width: "16px",
                  height: "14px",
                  background: "#d4d0c8",
                  borderTop: "2px solid #ffffff",
                  borderLeft: "2px solid #ffffff",
                  borderRight: "2px solid #404040",
                  borderBottom: "2px solid #404040",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "default",
                  fontSize: "9px",
                  fontWeight: "bold",
                  lineHeight: 1,
                  color: "#000000",
                  marginLeft: "2px",
                }}
              >
                ✕
              </span>
            </div>
          </div>

          {/* Win2k menu bar */}
          <div
            style={{
              background: "#d4d0c8",
              borderBottom: "1px solid #808080",
              padding: "1px 4px",
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}
          >
            {["File", "Edit", "View", "Favorites", "Tools", "Help"].map(
              (item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: "Tahoma, Arial, sans-serif",
                    fontSize: "11px",
                    color: "#000000",
                    padding: "1px 6px",
                    cursor: "default",
                  }}
                  className="hover:bg-[#003399] hover:text-white"
                >
                  {item}
                </span>
              ),
            )}
            <div style={{ marginLeft: "auto", display: "flex", gap: "4px" }}>
              {neighbours.previous && (
                <Link
                  href={neighbours.previous.url as Route}
                  style={{
                    fontSize: "11px",
                    fontFamily: "Tahoma, Arial, sans-serif",
                    color: "#000000",
                    textDecoration: "none",
                    padding: "1px 6px",
                    background: "#d4d0c8",
                    borderTop: "2px solid #ffffff",
                    borderLeft: "2px solid #ffffff",
                    borderRight: "2px solid #404040",
                    borderBottom: "2px solid #404040",
                  }}
                >
                  ← Back
                </Link>
              )}
              {neighbours.next && (
                <Link
                  href={neighbours.next.url as Route}
                  style={{
                    fontSize: "11px",
                    fontFamily: "Tahoma, Arial, sans-serif",
                    color: "#000000",
                    textDecoration: "none",
                    padding: "1px 6px",
                    background: "#d4d0c8",
                    borderTop: "2px solid #ffffff",
                    borderLeft: "2px solid #ffffff",
                    borderRight: "2px solid #404040",
                    borderBottom: "2px solid #404040",
                  }}
                >
                  Next →
                </Link>
              )}
            </div>
          </div>

          {/* Content area */}
          <div
            style={{
              background: "#ffffff",
              flex: 1,
              padding: "12px 16px",
              overflowY: "auto",
            }}
          >
            {doc.description && (
              <p
                style={{
                  fontFamily: "Tahoma, Arial, sans-serif",
                  fontSize: "11px",
                  color: "#666666",
                  marginBottom: "12px",
                  borderBottom: "1px solid #d4d0c8",
                  paddingBottom: "8px",
                }}
              >
                {doc.description}
              </p>
            )}

            <div className="w-full flex-1 pb-16 *:data-[slot=alert]:first:mt-0 sm:pb-0">
              <MDX components={mdxComponents} />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                paddingTop: "16px",
                borderTop: "1px solid #d4d0c8",
                marginTop: "16px",
              }}
            >
              {neighbours.previous && (
                <Link
                  href={neighbours.previous.url as Route}
                  style={{
                    fontSize: "11px",
                    fontFamily: "Tahoma, Arial, sans-serif",
                    color: "#000000",
                    textDecoration: "none",
                    padding: "2px 8px",
                    background: "#d4d0c8",
                    borderTop: "2px solid #ffffff",
                    borderLeft: "2px solid #ffffff",
                    borderRight: "2px solid #404040",
                    borderBottom: "2px solid #404040",
                  }}
                >
                  ← {neighbours.previous.name}
                </Link>
              )}
              {neighbours.next && (
                <Link
                  href={neighbours.next.url as Route}
                  style={{
                    marginLeft: "auto",
                    fontSize: "11px",
                    fontFamily: "Tahoma, Arial, sans-serif",
                    color: "#000000",
                    textDecoration: "none",
                    padding: "2px 8px",
                    background: "#d4d0c8",
                    borderTop: "2px solid #ffffff",
                    borderLeft: "2px solid #ffffff",
                    borderRight: "2px solid #404040",
                    borderBottom: "2px solid #404040",
                  }}
                >
                  {neighbours.next.name} →
                </Link>
              )}
            </div>
          </div>

          {/* Win2k status bar */}
          <div
            style={{
              background: "#d4d0c8",
              borderTop: "2px solid #808080",
              padding: "2px 6px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "Tahoma, Arial, sans-serif",
                fontSize: "11px",
                color: "#000000",
                borderRight: "2px solid #808080",
                paddingRight: "8px",
              }}
            >
              Done
            </span>
            <span
              style={{
                fontFamily: "Tahoma, Arial, sans-serif",
                fontSize: "11px",
                color: "#000000",
              }}
            >
              trezo-labs/docs/{doc.title?.toLowerCase().replace(/\s+/g, "-")}
            </span>
          </div>
        </div>
      </div>

      {/* TOC panel */}
      <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[90svh] w-(--sidebar-width) flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
        <div className="h-(--top-spacing) shrink-0"></div>
        {doc.toc?.length ? (
          <div
            className="no-scrollbar flex flex-col gap-8 overflow-y-auto"
            style={{
              margin: "8px 4px 8px 0",
              background: "#d4d0c8",
              borderTop: "2px solid #ffffff",
              borderLeft: "2px solid #ffffff",
              borderRight: "2px solid #404040",
              borderBottom: "2px solid #404040",
            }}
          >
            <DocsTableOfContents toc={doc.toc} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
