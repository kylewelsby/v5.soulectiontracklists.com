import { render } from "$gfm";
import Artwork from "@/components/Artwork.tsx";
import { Show } from "@/utils/types.ts";

interface TracklistCardProps {
  tracklist: Show;
}

export default function TracklistCard({ tracklist }: TracklistCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long" })
    .format(Date.parse(tracklist.published_at));

  return (
    <a
      class="dark:hover:bg-gray-800 transition p-4 -mx-4 flex flex-row items-center"
      href={`/tracklists/${tracklist.slug}`}
    >
      <Artwork
        src={tracklist.artwork}
        alt={tracklist.title}
        size={128}
        named="s_list_item_square"
      />
      <div class="ml-4 flex-grow min-w-0">
        <h4 class="mb-2">{tracklist.title}</h4>
        <div
          class="text-gray-300 truncate mb-2"
          dangerouslySetInnerHTML={{ __html: tracklist.excerpt! }}
        />
        <div class="text-sm">{formattedDate}</div>
      </div>
    </a>
  );
}
