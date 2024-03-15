import { Head } from "$fresh/runtime.ts";
import { RouteContext } from "$fresh/server.ts";

import fetchShow from "@/utils/soulection/fetchShow.ts";

import ChapterRow from "@/components/show/ChapterRow.tsx";
import TracklistHero from "@/components/show/TracklistHero.tsx";

export default async function Tracklist(_req: Request, ctx: RouteContext) {
  const show = await fetchShow(ctx.params.slug);

  return (
    <>
      <Head>
        <title>{show.title}</title>
      </Head>
      <TracklistHero show={show} />
      <div class="bg-black">
        <div class="container mx-auto p-4 py-8">
          {show.chapters.map((chapter) => (
            <ChapterRow
              chapter={chapter}
            />
          ))}
        </div>
      </div>
    </>
  );
}
