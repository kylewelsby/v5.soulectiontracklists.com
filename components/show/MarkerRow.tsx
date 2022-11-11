import { Marker, Track } from "@/utils/types.ts";

interface MarkerRowProps {
  marker: Marker;
}

function TrackRow({track}: {track: Track}) {
  return (
    <a href="">
      {track.artists.title} - {track.title}
    </a>
  )
}

export default function MarkerRow({ marker }: MarkerRowProps) {
  if (marker.tracks) {
    return (
      <div>
        {marker.timestamp}
        <TrackRow track={marker.tracks!} />
      </div>
    )
  }
  return (
    <div>
      {marker.timestamp}: {marker.rawTrack}
    </div>
  );
}
