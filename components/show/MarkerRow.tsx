import TrackRow from "@/components/show/TrackRow.tsx";
import { Marker } from "@/utils/types.ts";

interface MarkerRowProps {
  marker: Marker;
}

export default function MarkerRow({ marker }: MarkerRowProps) {
  if (marker.tracks && marker.tracks.artists) {
    const track = marker.tracks;
    const href = `/tracks/${track.id}`;
    return (
      <div>
        <TrackRow
          artist={track.artists.title}
          title={track.title}
          artwork={track.artwork}
          href={href}
          position={marker.position}
          timestamp={marker.timestamp}
        />
      </div>
    );
  }
  // if (marker.tracks && !marker.tracks.artists) {
  //   console.log(marker)
  // }
  const [artist, track] = (marker.rawTrack).split(" - ");
  return (
    <div>
      <TrackRow
        artist={artist || ""}
        title={track || ""}
        position={marker.position}
        timestamp={marker.timestamp}
      />
    </div>
  );
}
