import { Head } from "$fresh/runtime.ts";
import { RouteContext } from "$fresh/server.ts";
import fetchTracklists from "@/utils/soulection/fetchTracklists.ts";

import TracklistCard from "@/components/TracklistCard.tsx";
import TracklistsNav from "@/components/show/TracklistsNav.tsx";

import { Show } from "@/utils/types.ts";

export default async function TracklistsPage(_req: Request, ctx: RouteContext) {
  const shows = await fetchTracklists();
  return (
    <>
      <Head>
        <title>Tracklists</title>
      </Head>
      <div class="container mx-auto px-5">
        <TracklistsNav />
        <h2>All Tracklists</h2>
        {shows.map((tracklist: Show) => <TracklistCard
          tracklist={tracklist}
        />)}
      </div>
    </>
  );
}
