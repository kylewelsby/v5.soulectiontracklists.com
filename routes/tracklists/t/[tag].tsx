import i18next from "https://deno.land/x/i18next/index.js";
import { RouteContext } from "$fresh/server.ts";
import fetchTracklists from "@/utils/soulection/fetchTracklists.ts";
import TracklistCard from "@/components/TracklistCard.tsx";
import TracklistsNav from "@/components/show/TracklistsNav.tsx";
import { Show } from "@/utils/types.ts";

import enTranslation from "@/locale/en.json" assert {
  type: "json",
};
import { Head } from "$fresh/runtime.ts";

export default async function TracklistsPage(_req: Request, ctx: RouteContext) {
  await i18next.init({
    lng: "en",
    resources: {
      en: {
        translation: enTranslation,
      },
    },
  });

  const shows = await fetchTracklists(ctx.params.tag);
  const title =
    i18next.t(`filter.titles.${ctx.params.tag}`, { count: shows.length }) ||
    "Tracklists";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div class="container mx-auto px-5">
        <TracklistsNav />
        <h2>{title}</h2>
        {shows.map((tracklist: Show) => (
          <TracklistCard
            tracklist={tracklist}
          />
        ))}
      </div>
    </>
  );
}
