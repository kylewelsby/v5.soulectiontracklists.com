import { pool } from "@/utils/db.ts";
import { Show } from "@/utils/types.ts";
import { render } from "$gfm";

export default async function fetchTracklists(
  tagsRaw?: string,
): Promise<Show[]> {
  let tags = (tagsRaw || "").split(",").map(
    (tag: string): number | number[] | undefined => {
      if (tag === "guest") return 11;
      if (tag === "soulection-radio") return 15;
      if (tag === "takeover") return 5;
      if (tag === "all-dayer") return 19;
      if (tag === "specials") return [10, 19, 12];
    },
  ).flatMap((num) => num).filter((tag) => {
    return Number.isInteger(tag);
  }) as number[];

  if (tags.length === 0) {
    tags = [15, 19];
  }
  const query = `SELECT title, published_at, tags, slug, artwork, content
  FROM shows
  WHERE tags && ARRAY[${tags.join(",")}]
  ORDER BY published_at DESC
  LIMIT 50`;
  const connection = await pool.connect();
  let result;
  try {
    result = await connection.queryObject<Show>(query);
  } finally {
    connection.release();
  }
  return result.rows.map((show) => {
    const excerpt = show.content.split("<!--more-->")[0].trim();
    show.excerpt = render(excerpt)
      .replace(/<a /g, "<span ")
      .replace(/<\/a>/g, "</span>");
    return show;
  });
}
