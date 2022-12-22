import { Head } from "$fresh/runtime.ts";

import { Handlers, PageProps } from "$fresh/server.ts";
import fetchShow from "@/utils/soulection/fetchShow.ts";

import MusicBrowser from "@/components/MusicBrowser.tsx";

import { Show } from "@/utils/types.ts";

export const handler: Handlers<ShowData> = {
  async GET(_req, ctx) {
    const { slug } = ctx.params;
    const show = await fetchShow(slug);

    return ctx.render({
      [`/api/shows/${slug}`]: show ?? undefined,
    });
  },
};

interface ShowData {
  [key: string]: Show | undefined;
}

export default function Tracklist({ url, data }: PageProps<ShowData>) {
  return (
    <>
      <Head>
        <title>Show</title>
      </Head>
      <MusicBrowser url={url.pathname} initial={data} />
    </>
  );
}
