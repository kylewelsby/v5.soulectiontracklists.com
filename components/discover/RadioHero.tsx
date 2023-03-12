import { Show } from "@/utils/types.ts";
import PlayShow from "@/components/show/PlayShow.tsx";
import Artwork from "@/components/Artwork.tsx";
import Loading from "@/components/Loading.tsx";
import { useTracklist } from "@/utils/client.ts";
import { useComputed } from "@preact/signals";

export default function RadioHero() {
  const details = useTracklist();
  if (details.error) {
    return <div>Error</div>;
  }
  const tracklist = useComputed(() => details.data);

  if (tracklist.value === null || tracklist.value === undefined) {
    return <Loading />;
  }

  const show = tracklist.value

  const href = `/tracklists/${show.slug}`;

  return (
    <div class="flex flex-col items-center">
      <div class="container mx-auto p-4 py-8">
        <div class="flex flex-row flex-wrap items-center">
          <h2 class="text-2xl md:text-3xl flex-grow font-bold font-header uppercase">
            Radio
          </h2>
          <a href="/tracklists/" class="btn">All Tracklists</a>
        </div>
        <div class="text-gray-400 text-sm font-light">
          Discover the artists and tracks palyed on Soulection Radio, Live Sets and Guest Sessions.
        </div>
        <div class="mt-4 flex flex-col md:flex-row md:items-center">

          <div class="md:w-1/2 lg:w-auto text-center md:text-left md:mr-4">
            <a href={href}>
              <Artwork
                src={show.artwork}
                alt={show.title}
                size={360}
                named="s_home_hero"
              />
            </a>
          </div>

          <div class="md:w-1/2 mt-6 md:mt-0 md:ml-4 flex flex-row md:flex-col items-start">
            <div class="order-2 shadow-md rounded-ful mb-2 ml-4 md:ml-0">
              <a href={href}>
                <PlayShow show={show} />
              </a>
            </div>
            <div class="order-1 flex-grow">
              <a href={href} class="md-1 text-2xl font-bold">
                {show.title}
              </a>
              <div
                class="mb-1 font-light"
                dangerouslySetInnerHTML={{ __html: show.excerpt! }}
              />
              <div class="mb-3 font-light text-gray-400">
                {show.formattedDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
