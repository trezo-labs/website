import { NextResponse } from "next/server";
import { client, writeClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export async function GET() {
  try {
    await writeClient.createIfNotExists({
      _id: "cli-usage",
      _type: "usage",
      usage: 0,
    });

    await writeClient.patch("cli-usage").inc({ usage: 1 }).commit();

    // Use a read-only client (CDN) for published content
    const readClient = client.withConfig({ useCdn: true, token: undefined });

    const query = groq`
*[_type == "preset" && visible == true && !(_id in path("drafts.**"))]
| order(label asc) {
  "label": label,
  "value": value.current,
  "templates": *[
    _type == "template" &&
    references(^._id)
  ] | order(label asc) {
    "label": label,
    "value": value.current,
    "path": path,
    "postSetupCommands": postSetupCommands
  }
}
`;

    const items = await readClient.fetch(query);

    return NextResponse.json(items);
  } catch (error) {
    console.error("/api/presets error", error);
    return NextResponse.json(
      { error: "Failed to fetch terms" },
      { status: 500 },
    );
  }
}
