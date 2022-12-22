import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import MusicBrowser from "@/components/MusicBrowser.tsx";
import fetchTrack from "@/utils/soulection/fetchTrack.ts";
import { Track } from "@/utils/types.ts";

interface Data {
  [key: string]: Track | undefined;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const { id } = ctx.params;
    const track = await fetchTrack(id);

    return ctx.render({
      [`/api/tracks/${id}`]: track ?? undefined,
    });
  },
};

export default function TrackPage({ url, data }: PageProps<Data>) {
  return (
    <>
      <Head>
        <title>Track</title>
      </Head>
      <MusicBrowser url={url.pathname} initial={data} />
    </>
  );
}
