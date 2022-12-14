import * as postgres from "$postgres";
import { List, Show } from "@/utils/types.ts";

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

const databaseUrl = Deno.env.get("DATABASE_URL")!;
const pool = new postgres.Pool(databaseUrl, 3, true);

export default async function fetchShow(slug: string): Promise<Show> {
  const connection = await pool.connect();
  const result = await connection.queryObject`SELECT
  shows.id,
  shows.title,
  shows.links,
  c.chapters
  FROM shows
  INNER JOIN (
    SELECT
      chapters.show,
      json_agg(
        json_build_object(
          'id', chapters.id,
          'title', chapters.title,
          'markers', markers.markers
        )
      ) AS chapters
    FROM chapters
    INNER JOIN (
      SELECT
        markers.chapter,
        json_agg(
          json_build_object(
            'id', markers.id,
            'position', markers.position,
            'tracks', tracks
          )
        ) AS markers
      FROM markers
      INNER JOIN (
        SELECT
          tracks.id,
          tracks.title,
          tracks.artwork,
          artists
        FROM tracks
        INNER JOIN (
          SELECT
            artists.id,
            artists.title
          FROM artists
        ) AS artists ON artists.id = tracks.artist
      ) AS tracks ON tracks.id = markers.track
      GROUP BY markers.chapter
    ) AS markers ON markers.chapter = chapters.id
    GROUP BY chapters.id
  ) AS c ON shows.id = c.show
  WHERE
    shows.slug = ${slug}
    AND shows.profile = 'QiEFFErt688'`;

  const show = result.rows[0] as unknown as Show;

  if (show && show.links && show.links.soundcloud) {
    const searchParams = new URLSearchParams({
      url: show.links.soundcloud,
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
      mediaUrl = `${mediaUrl}?client_id=${
        Deno.env.get(
          "SOUNDCLOUD_CLIENT_ID",
        )
      }`;
      const mediaResolved = await fetch(mediaUrl).then((resp) => resp.json());
      const media = mediaResolved.url;

      show.data = media;
    }
  }

  return show;
}
