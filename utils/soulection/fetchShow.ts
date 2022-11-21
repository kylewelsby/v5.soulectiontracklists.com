import { graphql, supabase } from "@/utils/supabase.ts";
import { Chapter, List, Marker, Show, ShowLinks } from "@/utils/types.ts";

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

const q = `{
  showsCollection(first: 1, filter: {slug: {eq: $slug}}) {
    edges {
      node {
        title
        published_at
        links
        content
        chaptersCollection(first: 30, orderBy: [{position: AscNullsLast}]) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    }
  }
}`;

export default async function fetchShow(slug: string): Promise<Show> {
  const data = await graphql<Data>(q, { slug: slug });
  const show = data.showsCollection.edges[0].node;

  const chapters = show.chaptersCollection.edges.map((edge) => edge.node) as [
    Chapter,
  ];
  for (const chapter of chapters) {
    chapter.markers = [];

    const { data, error } = await supabase
      .from("markers")
      .select(
        "*, tracks:track(id, title, artwork, slug, artists:artist(id, title, slug))",
      )
      .eq("chapter", chapter.id)
      .order("position", { ascending: true })
      .limit(1000);
    if (error) {
      console.error(error);
    }
    chapter.markers = data as [Marker];
  }

  show.chapters = chapters;

  const links: ShowLinks = JSON.parse(show!.links);
  show.media = links;
  const searchParams = new URLSearchParams({
    url: links.soundcloud,
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
    mediaUrl = `${mediaUrl}?client_id=${Deno.env.get("SOUNDCLOUD_CLIENT_ID")}`;
    const mediaResolved = await fetch(mediaUrl).then((resp) => resp.json());
    const media = mediaResolved.url;

    show.data = media;
  }

  return show;
}
