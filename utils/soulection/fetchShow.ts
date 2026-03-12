import { readJSON } from "@/utils/data.ts";
import { Show, ShowLinks, SoundcloudTranscoding } from "@/utils/types.ts";
import { render } from "$gfm";
import { timeToSeconds } from "@/utils/timeToSeconds.ts";
import fetchTracklists from "@/utils/soulection/fetchTracklists.ts";

interface V4Show {
  id: string;
  slug: string;
  title: string;
  artwork: string;
  content: string;
  publishedAt?: string;
  published_at?: string;
  location?: string;
  links: { soundcloud?: string; appleMusic?: string; mixcloud?: string };
  chapters: V4Chapter[];
}

interface V4Chapter {
  id: string;
  title: string;
  artwork: string | null;
  content: string | null;
  markers: V4Marker[];
}

interface V4Marker {
  id: string;
  position: number;
  timestamp: string;
  rawTrack: string;
  track: {
    id: string;
    title: string;
    artwork: string | null;
    artist: { id: string; title: string; slug: string };
  } | null;
}

export default async function fetchShow(slug: string): Promise<Show> {
  if (slug === "HEAD") {
    const tracklists = await fetchTracklists();
    slug = tracklists[0].slug;
  }

  const v4 = await readJSON<V4Show>(`shows/${slug}.json`);
  const publishedAt = v4.published_at || v4.publishedAt || "";

  const excerpt = (v4.content || "").split("<!--more-->")[0].trim();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(Date.parse(publishedAt));

  const chapters = (v4.chapters || []).map((chapter) => ({
    id: chapter.id,
    title: chapter.title,
    artwork: chapter.artwork || "",
    content: render(chapter.content || ""),
    markers: (chapter.markers || [])
      .sort((a, b) => a.position - b.position)
      .map((marker) => ({
        id: marker.id,
        timestamp: marker.timestamp,
        position: marker.position,
        msTimestamp: timeToSeconds(marker.timestamp),
        rawTrack: marker.rawTrack,
        tracks: marker.track
          ? {
              id: marker.track.id,
              title: marker.track.title,
              artwork: marker.track.artwork || "",
              artists: marker.track.artist,
            }
          : undefined,
      })),
  }));

  return {
    title: v4.title,
    slug: v4.slug,
    artwork: v4.artwork,
    content: v4.content,
    published_at: publishedAt,
    location: v4.location || "",
    links: v4.links as ShowLinks,
    formattedDate,
    excerpt: render(excerpt)
      .replace(/<a /g, "<span ")
      .replace(/<\/a>/g, "</span>"),
    chapters,
  } as Show;
}

export async function fetchShowLinks(slug: string): Promise<ShowLinks> {
  const v4 = await readJSON<V4Show>(`shows/${slug}.json`);
  return v4.links as ShowLinks;
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
