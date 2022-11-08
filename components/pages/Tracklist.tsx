import { useContext } from "preact/hooks";
import { useTracklist } from "@/utils/client.ts";
import { PlayerQueue } from "@/utils/player_queue.ts";
import { useComputed } from "@preact/signals";

interface TracklistProps {
  slug: string;
}

export default function Tracklist({ slug }: TracklistProps) {
  const details = useTracklist(slug);
  const queue = useContext(PlayerQueue);

  const show = useComputed(() => details.data);
  if (details.error) {
    console.error(details.error);
    return "error";
  }

  if (show.value === null || show.value === undefined) {
    return "loading";
  }

  const onPlay = (e: MouseEvent) => {
    e.preventDefault();
    queue.listenTo(show.value);
  };

  return (
    <div>
      <a href="/">Go Back</a>
      <h1>{show.value.title}</h1>
      <div onClick={onPlay}>
        Play Show
      </div>
    </div>
  );
}
