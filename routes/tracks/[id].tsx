import { Head } from "$fresh/runtime.ts";
import { RouteContext } from "$fresh/server.ts";

import TrackHero from "@/components/Track/TrackHero.tsx";
import TrackContent from "@/components/Track/TrackContent.tsx";
import fetchTrack from "@/utils/soulection/fetchTrack.ts";

export default async function TrackPage(_req: Request, ctx: RouteContext) {
  const track = await fetchTrack(ctx.params.id);
  return (
    <>
      <Head>
        <title>Track</title>
      </Head>
      <div>
        <TrackHero track={track} />
        <TrackContent track={track} />
      </div>
    </>
  );
}
