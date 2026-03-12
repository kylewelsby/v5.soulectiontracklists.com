import { readJSON } from "@/utils/data.ts";
import { Show } from "@/utils/types.ts";
import { render } from "$gfm";

interface V4ShowListItem {
  id: string;
  title: string;
  slug: string;
  artwork: string;
  content: string;
  tags: number[];
  published_at: string;
  links: { soundcloud?: string; appleMusic?: string; mixcloud?: string };
}

interface V4ShowsByTag {
  shows: V4ShowListItem[];
  count: number;
  totalCount: number;
  tag: { id: number; name: string };
}

const TAG_MAP: Record<string, string> = {
  guest: "guest",
  "soulection-radio": "soulection-radio",
  takeover: "takeover",
  "all-dayer": "soulection-radio",
  specials: "discord",
};

export default async function fetchTracklists(
  tag?: string,
): Promise<Show[]> {
  const tagFile = TAG_MAP[tag || ""] || "soulection-radio";
  const data = await readJSON<V4ShowsByTag>(`shows-by-tag/${tagFile}.json`);

  return data.shows.slice(0, 50).map((show) => {
    const excerpt = show.content.split("<!--more-->")[0].trim();
    return {
      title: show.title,
      slug: show.slug,
      artwork: show.artwork,
      content: show.content,
      tags: show.tags,
      published_at: show.published_at,
      links: show.links,
      excerpt: render(excerpt)
        .replace(/<a /g, "<span ")
        .replace(/<\/a>/g, "</span>"),
    } as Show;
  });
}
