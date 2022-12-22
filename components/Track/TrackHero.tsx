import Artwork from "@/components/Artwork.tsx";
import { Track } from "@/utils/types.ts";

export default function TrackHero({ track }: { track: Track }) {
  const formatedTitle = [track.artists?.title, track.title].join(" - ");
  const lastShow = track.shows[0];

  return (
    <div class="from-black to-transparent bg-gradient-to-b">
      <div class="container mx-auto">
        <div class="flex flex-col lg:(flex-row items-center py-8) py-6 self-start mx-4">
          <Artwork
            src={track.artwork}
            alt={formatedTitle}
            size={320}
          />
          <div class="lg:ml-10">
            <h1 class="tracking-tighter text-4xl font-semibold">
              {track.title}
            </h1>
            <h2 class="text-opacity-70 my-2">
              {track.artists?.title}
            </h2>
            <div class="text-white text-opacity-50 underline">
              Played {track.playCount} times (last on {lastShow.title})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
