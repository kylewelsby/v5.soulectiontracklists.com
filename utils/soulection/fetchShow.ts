import { pool } from "@/utils/db.ts";
import { List, Show, ShowLinks } from "@/utils/types.ts";

interface Data {
  showsCollection: List<Show>;
}

interface SoundcloudTranscoding {
  url: string;
  preset: string;
  duration: number;
  snipped: boolean;
  format: SoundcloudTranscodingFormat;
  quality: string;
}

interface SoundcloudTranscodingFormat {
  protocol: string;
  mime_type: string;
}
export default async function fetchShow(slug: string): Promise<Show> {
  // const query = `SELECT
  // json_agg(
  //   json_build_object(
  //   'id', shows.id,
  //   'title', shows.title,
  //   'links', shows.links,
  //     'chapters', chapters
  //   )
  // ) as show
  // FROM shows
  // INNER JOIN (
  //   SELECT
  //     chapters.show,
  //     json_agg(
  //       json_build_object(
  //         'id', chapters.id,
  //         'title', chapters.title,
  //         'markers', markers.markers
  //       )
  //     ) AS chapters
  //   FROM chapters
  //   INNER JOIN (
  //     SELECT
  //       markers.chapter,
  //       json_agg(
  //         json_build_object(
  //           'id', markers.id,
  //           'position', markers.position,
  //           'track_id', markers.track,
  //           'rawTrack', markers."rawTrack",
  //           'tracks', tracks
  //         )
  //       ) AS markers
  //     FROM markers
  //     LEFT JOIN (
  //       SELECT
  //         tracks.id,
  //         tracks.title,
  //         tracks.artwork,
  //         artists
  //       FROM tracks
  //       INNER JOIN (
  //         SELECT
  //           artists.id,
  //           artists.title
  //         FROM artists
  //       ) AS artists ON artists.id = tracks.artist
  //     ) AS tracks ON tracks.id = markers.track
  //     GROUP BY markers.chapter
  //     LIMIT 1000
  //   ) AS markers ON markers.chapter = chapters.id
  //   GROUP BY chapters.id
  // ) AS c ON shows.id = c.show
  // WHERE
  //   shows.slug = '${slug}'
  //   AND shows.profile = 'QiEFFErt688'
  // GROUP BY shows.id
  // LIMIT 1`

  const trackQuery = `SELECT
    tracks.id,
    tracks.title,
    tracks.artwork,
    json_build_object(
      'id', a.id,
      'title', a.title
    ) as artist
  FROM tracks
  JOIN artists a ON tracks.artist = a.id`;

  const markersQuery = `SELECT json_agg(
    json_build_object(
      'id', m.id,
      'timestamp', m.timestamp,
      'rawTrack', m."rawTrack",
      'position', m.position,
      'tracks', json_build_object(
        'id', t.id,
        'title', t.title,
        'artwork', t.artwork,
        'artists', t.artist
      )
    )
  ) FROM markers m
  LEFT JOIN (${trackQuery}) AS t ON t.id = m.track
  WHERE m.chapter = c.id`;

  const query = `SELECT
  s.id,
  s.title,
  s.links,
  json_agg(
    json_build_object(
      'id', c.id,
      'title', c.title,
      'markers',
      (${markersQuery})
    )
  ) AS chapters
FROM shows s
JOIN chapters c ON s.id = c.show AND c."position" = 0
JOIN markers m ON c.id = m.chapter AND m."position" = 0
WHERE s.slug = $SLUG AND s.profile = $PROFILE
GROUP BY s.id, m."position", c."position"
ORDER BY m."position" ASC, c."position" ASC`;
  const connection = await pool.connect();
  let result;
  try {
    const start = Date.now();
    result = await connection.queryObject<Show>({
      text: query,
      args: {
        slug: slug,
        profile: "QiEFFErt688",
      },
    });
    console.log(`🗃️ Query took ${Date.now() - start}ms`);
  } finally {
    connection.release();
  }

  console.debug(result.query);

  return result.rows[0];
}

export async function fetchShowLinks(slug: string): Promise<ShowLinks> {
  const connection = await pool.connect();
  let result;
  try {
    result = await connection.queryObject<Show>(`SELECT
      shows.links
      FROM shows
      WHERE
        shows.slug = '${slug}'
        AND shows.profile = 'QiEFFErt688'
    `);
  } finally {
    connection.release();
  }
  return result.rows[0].links;
}

export async function fetchMedia(soundcloudUrl: string): Promise<string> {
  const searchParams = new URLSearchParams({
    url: soundcloudUrl,
    format: "json",
    client_id: Deno.env.get("SOUNDCLOUD_CLIENT_ID")!,
  });
  const url =
    `https://api-widget.soundcloud.com/resolve?${searchParams.toString()}`;
  const respResolver = await fetch(url).then((res) => {
    if (res.ok) return res.json();
    console.error("Unable to load Soundcloud Media, try the client_id");
    console.error(res.statusText);
  });
  let media;
  if (respResolver) {
    // console.log(respResolver.media.transcodings);
    // let mediaUrl = respResolver.media.transcodings.find((t: SoundcloudTranscoding) => t.format.protocol === "hls" && t.format.mime_type === "audio/mpeg")?.url
    let mediaUrl = respResolver.media.transcodings.find(
      (t: SoundcloudTranscoding) =>
        t.format.protocol === "progressive" &&
        t.format.mime_type === "audio/mpeg",
    )?.url;
    if (!mediaUrl) {
      mediaUrl = respResolver.media.transcodings.at(-1).url;
    }
    mediaUrl = `${mediaUrl}?client_id=${Deno.env.get("SOUNDCLOUD_CLIENT_ID")}`;
    const mediaResolved = await fetch(mediaUrl).then((resp) => resp.json());
    media = mediaResolved.url;
  }
  return media;
}
