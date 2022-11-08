import { graphql } from "@/utils/supabase.ts";
import { List, Show, ShowLinks, ShowNode } from "@/utils/types.ts";

interface Data {
  showsCollection: List<ShowNode>;
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
      }
    }
  }
}`;

export default async function fetchShow(slug: string): Promise<Show> {
  const data = await graphql<Data>(q, { slug: slug });
  const show = data.showsCollection.edges[0].node;
  const links: ShowLinks = JSON.parse(show.links);
  const searchParams = new URLSearchParams({
    url: links.soundcloud,
    format: "json",
    client_id: Deno.env.get("SOUNDCLOUD_CLIENT_ID")!,
  });
  const url =
    `https://api-widget.soundcloud.com/resolve?${searchParams.toString()}`;
  const respResolver = await fetch(url).then((resp) => resp.json());
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

  // console.log(media);

  show.data = media;
  show.media = links;

  return show;
}
