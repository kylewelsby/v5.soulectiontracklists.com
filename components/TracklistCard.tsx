import { Show } from "@/utils/types.ts";
import Tracklist from "./pages/Tracklist.tsx";

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
