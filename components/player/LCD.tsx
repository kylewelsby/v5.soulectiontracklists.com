import { Marker } from "@/utils/types.ts";
interface LCDProps {
  marker: Marker;
}
export default function LCD(props: LCDProps) {
  const { marker } = props;
  let title = null;
  let artist = null;

  if (!marker.tracks || !marker.tracks.artists) {
    const parts = marker.rawTrack.split(" - ");
    title = parts[1];
    artist = parts[0];
  } else {
    title = marker.tracks.title;
    artist = marker.tracks.artists.title;
  }

  return (
    <div class="flex flex-row self-end justify-self-end whitespace-nowrap">
      <span class="text-white font-bold">
        {title}
      </span>
      <span class="mx-2">
        by
      </span>
      <span class="underline text-white font-bold">
        {artist}
      </span>
    </div>
  );
}
