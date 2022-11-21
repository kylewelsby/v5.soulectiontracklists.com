import Artwork from "@/components/Artwork.tsx";
import { Show } from "@/utils/types.ts";

interface TracklistCardProps {
  tracklist: Show;
}

export default function TracklistCard({ tracklist }: TracklistCardProps) {
  const excerpt = tracklist.content.split("<!--more-->")[0].trim();
  const formattedDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long" })
    .format(Date.parse(tracklist.published_at));
  return (
    <a
      class="dark:hover:bg-gray-800 transition p-4 -mx-4 flex flex-row items-center"
      href={`/tracklist/${tracklist.slug}`}
    >
      <Artwork
        src={tracklist.artwork}
        alt={tracklist.title}
        size={32}
      />
      <div class="ml-4 flex-grow min-w-0">
        <h4 class="text-lg font-bold mb-2">{tracklist.title}</h4>
        <div
          class="text-gray-300 truncate mb-2"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        >
        </div>
        <div class="text-sm">{formattedDate}</div>
      </div>
    </a>
  );
}
