import { pool } from "@/utils/db.ts";
import { Track } from "@/utils/types.ts";

export default async function fetchTrack(id: string): Promise<Track> {
  const query = `SELECT
  t.id,
  t.title,
  t.artwork,
  json_agg(DISTINCT tl) AS links,
  json_build_object(
    'id', a.id,
    'title', a.title
  ) AS artists,

  json_agg(
    json_build_object(
      'id', s.id,
      'title', s.title,
      'slug', s.slug,
      'published_at', s.published_at,
      'artwork', s.artwork
    )
    ORDER BY s.published_at DESC
  ) AS shows,
  (SELECT COUNT(*) FROM markers m WHERE m.track = t.id)::int AS play_count
  FROM tracks t
  INNER JOIN artists a ON t.artist = a.id
  INNER JOIN track_links tl ON t.id = tl.track
  JOIN markers m ON m.track = t.id
  JOIN chapters c ON c.id = m.chapter
  JOIN shows s ON s.id = c.show
  WHERE t.id = $ID
  GROUP BY t.id, a.id`;
  const connection = await pool.connect();
  let result;
  try {
    result = await connection.queryObject<Track>({
      text: query,
      camelcase: true,
      args: { id: id },
    });
  } finally {
    connection.release();
  }

  return result.rows[0];
}
