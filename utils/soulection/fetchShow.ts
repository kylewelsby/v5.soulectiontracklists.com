import { pool } from "@/utils/db.ts";
import { Show, ShowLinks, SoundcloudTranscoding } from "@/utils/types.ts";
import { render } from "$gfm";
import { timeToSeconds } from "@/utils/timeToSeconds.ts";
import fetchTracklists from "@/utils/soulection/fetchTracklists.ts";

export default async function fetchShow(slug: string): Promise<Show> {
  if (slug === "HEAD") {
    const tracklists = await fetchTracklists();
    slug = tracklists[0].slug;
  }
  const trackQuery = `SELECT
    tracks.id,
    tracks.title,
    tracks.artwork,
    json_build_object(
      'id', a.id,
      'title', a.title
    ) as artists
  FROM tracks
  INNER JOIN artists a ON tracks.artist = a.id`;

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
        'artists', t.artists
      )
    )
  ) FROM markers m
  LEFT JOIN (${trackQuery}) AS t ON t.id = m.track
  WHERE m.chapter = c.id`;

  const query = `SELECT
  s.id,
  s.title,
  s.slug,
  s.published_at,
  s.links,
  s.artwork,
  s.location,
  s.content,
  json_agg(
    json_build_object(
      'id', c.id,
      'title', c.title,
      'artwork', c.artwork,
      'content', c.content,
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
    const logLabel = `🗃️ 'fetchShow' Query took`;
    console.time(logLabel);
    result = await connection.queryObject<Show>({
      text: query,
      args: {
        slug: slug,
        profile: "QiEFFErt688",
      },
    });
    console.timeEnd(logLabel);
  } finally {
    connection.release();
  }

  const show = result.rows[0];

  const excerpt = show.content.split("<!--more-->")[0].trim();
  show.excerpt = render(excerpt)
    .replace(/<a /g, "<span ")
    .replace(/<\/a>/g, "</span>");

  const formattedDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long" })
    .format(Date.parse(show.published_at));
  show.formattedDate = formattedDate;

  let chapters = show.chapters.map((chapter) => {
    chapter.content = render(chapter.content);
    return chapter;
  });
  chapters = chapters.map((chapter) => {
    chapter.markers!.sort((a, b) => {
      if (a.position > b.position) return 1;
      if (a.position < b.position) return -1;
      return 0;
    }).map((marker) => {
      marker.msTimestamp = timeToSeconds(marker.timestamp);
      return marker;
    });
    return chapter;
  });
  show.chapters = chapters;
  return show;
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
