import { Show } from "@/utils/types.ts";

interface TracklistCardProps {
  tracklist: Show;
}

export default function TracklistCard({ tracklist }: TracklistCardProps) {
  return (
    <div>
      <a href={`/tracklists/${tracklist.slug}`}>show: {tracklist.title}</a>
    </div>
  );
}
