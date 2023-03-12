import LCD from "@/components/player/LCD.tsx";
import Artwork from "@/components/Artwork.tsx";
import { Chapter, Marker, Show } from "@/utils/types.ts";

interface ShowDisplayProps {
  show: Show;
  chapter?: Chapter;
  marker?: Marker;
}
export default function ShowDisplay(props: ShowDisplayProps) {
  const { show, chapter, marker } = props;
  let artwork;
  if (marker && marker.tracks && marker.tracks.artwork) {
    artwork = marker!.tracks.artwork;
  } else if (chapter && chapter.artwork) {
    artwork = chapter.artwork;
  } else {
    artwork = show.artwork;
  }

  return (
    <>
      <div class="w-4/5 order-2 flex-grow flex flex-row items-center lg:(!w-5/12 !order-1)">
        <Artwork
          src={artwork}
          alt={show.title}
          size={64}
          style="border-radius: 0px;"
        />
        <div class="w-4/5 ml-2 my-2 flex-grow flex flex-col">
          <a
            href={`/tracklists/${show.slug}`}
            class="truncate overflow-ellipsis overflow-hidden"
          >
            {show.title}
          </a>
          {chapter && (
            <div class="hidden lg:!block text-xs">
              {chapter.title}
            </div>
          )}
          {marker && (
            <div class="flex-grow lg:hidden">
              <LCD
                marker={marker}
              />
            </div>
          )}
        </div>
      </div>
      <div class="lg:(flex w-5/12) order-3 justify-end overflow(hidden ellipsis)">
        <div class="flex flex(row nowrap grow) min-w-0 items-center justify-end lg:mr-4">
          {marker && (
            <LCD
              marker={marker}
            />
          )}
        </div>
      </div>
    </>
  );
}
