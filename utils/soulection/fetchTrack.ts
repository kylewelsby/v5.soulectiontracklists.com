import { readChunkedData } from "@/utils/data.ts";
import { Track } from "@/utils/types.ts";

interface V4TrackChunk {
  data: {
    id: string;
    title: string;
    slug: string;
    artwork: string | null;
    artist: { id: string; title: string; slug: string };
  };
  appearanceCount: number;
  markers: {
    chapter: {
      id: string;
      show: {
        id: string;
        slug: string;
        title: string;
        artwork: string;
        published_at: string;
      };
    };
  }[];
  linkedPlatforms: {
    id: number;
    platform: string;
    href: string;
    artwork: string | null;
    last_checked_at: string;
  }[];
}

export default async function fetchTrack(id: string): Promise<Track> {
  const chunk = await readChunkedData<V4TrackChunk>("tracks", id, 200);
  if (!chunk) {
    throw new Error(`Track not found: ${id}`);
  }

  const seen = new Set<string>();
  const shows = chunk.markers
    .filter((m) => {
      if (!m.chapter?.show?.id || seen.has(m.chapter.show.id)) return false;
      seen.add(m.chapter.show.id);
      return true;
    })
    .map((m) => ({
      id: m.chapter.show.id,
      title: m.chapter.show.title,
      slug: m.chapter.show.slug,
      artwork: m.chapter.show.artwork,
      published_at: m.chapter.show.published_at,
    }))
    .sort(
      (a, b) =>
        new Date(b.published_at).getTime() -
        new Date(a.published_at).getTime(),
    );

  return {
    id: chunk.data.id,
    title: chunk.data.title,
    slug: chunk.data.slug,
    artwork: chunk.data.artwork || "",
    artists: chunk.data.artist,
    playCount: chunk.appearanceCount,
    links: chunk.linkedPlatforms.map((lp) => ({
      id: lp.id,
      platform: lp.platform,
      href: lp.href,
      artwork: lp.artwork || "",
      lastCheckedAt: lp.last_checked_at,
    })),
    shows,
  } as Track;
}
