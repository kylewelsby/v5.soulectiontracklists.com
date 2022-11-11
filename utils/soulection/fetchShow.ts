import { graphql } from "@/utils/supabase.ts";
import { List, Show, Chapter, Marker, ShowLinks } from "@/utils/types.ts";

interface Data {
  showsCollection: List<Show>;
}

interface MarkersData {
  markersCollection: List<Marker>;
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
        chaptersCollection(first: 30, orderBy: [{position: AscNullsLast}]) {
          edges {
            node {
              id
              title
              markersCollection(first: 30, orderBy: [{position: AscNullsLast}]) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                edges {
                  node {
                    timestamp
                    position
                    tracks {
                      title
                      id
                      slug
                      artists {
                        title
                        id
                        slug
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

const markersQuery = `{
  markersCollection(after: $nextCursor, filter: {chapter: {eq: $chapter}}, orderBy: [{position: AscNullsLast}]) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        timestamp
        position
        tracks {
          title
          id
          slug
          artists {
            title
            id
            slug
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
    Chapter
  ];
  chapters.forEach(async (chapter) => {
    chapter.markers = []
    let lastCursor = null;
    console.log(chapter.id);
    if (chapter.markersCollection.pageInfo.hasNextPage) {
      lastCursor = chapter.markersCollection.pageInfo.endCursor;
    }
    console.log(chapter.markersCollection.pageInfo);
    const markers = chapter.markersCollection.edges.map((edge) => edge.node) as [
      Marker
    ];

    let pages = 0;
    while (pages < 10 && lastCursor !== null) {
      pages++;
      console.log("fetching page", lastCursor);
      const data = (await graphql<MarkersData>(markersQuery, {
        nextCursor: lastCursor!,
        chapter: chapter.id
      })) as MarkersData;
      console.log(data.markersCollection.pageInfo);
      if (lastCursor === data.markersCollection.pageInfo.endCursor) {
        lastCursor = null;
      } else {
        if (data.markersCollection.pageInfo.hasNextPage) {
          lastCursor = data.markersCollection.pageInfo.endCursor;
        } else {
          lastCursor = null;
        }
      }
      const newMarkers = data.markersCollection.edges.map(
        (edge) => edge.node
      ) as [Marker];
      // markers = markers.concat(newMarkers) as [Marker];
      console.log(pages, lastCursor);
    }
    console.log(markers.length);
    chapter.markers = markers;
  });

  show.chapters = chapters;

  const links: ShowLinks = JSON.parse(show!.links);
  show.media = links;
  const searchParams = new URLSearchParams({
    url: links.soundcloud,
    format: "json",
    client_id: Deno.env.get("SOUNDCLOUD_CLIENT_ID")!
  });
  const url = `https://api-widget.soundcloud.com/resolve?${searchParams.toString()}`;
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
        t.format.mime_type === "audio/mpeg"
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
