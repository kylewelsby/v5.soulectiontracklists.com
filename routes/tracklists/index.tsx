import { Handlers, PageProps } from "$fresh/server.ts";
import fetchTracklists from "@/utils/soulection/fetchTracklists.ts";

import MusicBrowser from "@/components/MusicBrowser.tsx";

import { Show } from "@/utils/types.ts";

interface Data {
  [key: string]: readonly Show[] | undefined;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const shows = await fetchTracklists();

    return ctx.render({
      ["/api/shows"]: shows ?? undefined,
    });
  },
};

export default function TracklistsPage({ url, data }: PageProps<Data>) {
  return <MusicBrowser url={url.pathname} initial={data} />;
}
