import { Handlers, PageProps } from "$fresh/server.ts";
import fetchTracklists from "@/utils/soulection/fetchTracklists.ts";
import fetchShow from "@/utils/soulection/fetchShow.ts";
import MusicBrowser from "@/components/MusicBrowser.tsx";

import { Show } from "@/utils/types.ts";

interface HomeData {
  [key: string]: readonly Show[] | undefined;
}

export const handler: Handlers<HomeData> = {
  async GET(_req, ctx) {
    const show = await fetchShow("HEAD");

    return ctx.render({
      ["/api/shows/HEAD"]: show ?? undefined,
    });
  },
};

export default function HomePage({ url, data }: PageProps<HomeData>) {
  return <MusicBrowser url={url.pathname} initial={data} />;
}
