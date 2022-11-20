import LCD from "@/components/player/LCD.tsx";
import Artwork from "@/components/Artwork.tsx";
import { Show } from "@/utils/types.ts";

interface ShowDisplayProps {
  show: Show;
}
export default function ShowDisplay(props: ShowDisplayProps) {
  const { show } = props;
  return (
    <div class="w-4/5 lg:w-5/12 order-2 lg:order-1 flex-grow flex flex-row items-center">
      <Artwork
        src={show.artwork}
        alt={show.title}
      />
      <div class="w-3/4 ml-2 my-2 flex-grow flex flex-col">
        <a
          href={`/tracklists/${show.slug}`}
          class="truncate overflow-ellipsis overflow-hidden"
        >
          {show.title}
        </a>
        <div class="hidden lg:block text-xs">
          Chapter Title
        </div>
        <a href="#">
          <LCD
            artist="Artist Name"
            title="Song Name"
          />
        </a>
      </div>
    </div>
  );
}
