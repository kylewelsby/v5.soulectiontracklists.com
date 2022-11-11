import { useContext } from "preact/hooks";
import { useTracklist } from "@/utils/client.ts";
import { PlayerQueue } from "@/utils/player_queue.ts";
import { useComputed } from "@preact/signals";

import ChapterRow from "@/components/show/ChapterRow.tsx";

interface TracklistProps {
  slug: string;
}

export default function Tracklist({ slug }: TracklistProps) {
  const details = useTracklist(slug);
  const queue = useContext(PlayerQueue);

  if (details.error) {
    console.error(details.error);
    return "error";
  }
  const show = useComputed(() => details.data);

  if (show.value === null || show.value === undefined) {
    return "loading";
  }

  const onPlay = (e: MouseEvent) => {
    e.preventDefault();
    queue.listenTo(show.value!);
  };

  return (
    <div>
      <a href="/">Go Back</a>
      <h1>{show.value.title}</h1>
      {show.value!.chapters.map((chapter) => (
        <ChapterRow chapter={chapter}/>
      ))}
      <div onClick={onPlay}>
        Play Show
      </div>
    </div>
  );
}
