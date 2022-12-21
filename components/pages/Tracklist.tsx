import { useContext } from "preact/hooks";
import { useTracklist } from "@/utils/client.ts";
import { PlayerQueue } from "@/utils/player_queue.ts";
import { useComputed } from "@preact/signals";
import { Show } from "@/utils/types.ts";

import ChapterRow from "@/components/show/ChapterRow.tsx";
import TracklistHero from "@/components/show/TracklistHero.tsx";

interface TracklistProps {
  slug: string;
}

export default function Tracklist({ slug }: TracklistProps) {
  const details = useTracklist(slug);
  const queue = useContext(PlayerQueue);

  if (details.error) {
    console.error(details.error);
    return <div>Error</div>;
  }
  const show = useComputed(() => details.data);

  if (show.value === null || show.value === undefined) {
    return <div>Loading</div>;
  }

  const onPlay = async (e: MouseEvent) => {
    e.preventDefault();
    const resp = await fetch(`/api/shows/${slug}/soundcloud`);
    const json = await resp.json();
    const showNew = show as unknown as Show;
    showNew.data = json.media;
    queue.listenTo(showNew);
  };

  return (
    <div class="prose prose(sm) sm:prose lg:prose-lg xl:prose-2xl mx-auto dark:prose-dark">
      <a href="/">Go Back</a>
      <h1>{show.value.title}</h1>
      <TracklistHero show={show.value} />
      <div onClick={onPlay}>
        Play Show
      </div>
      {show.value!.chapters.map((chapter) => <ChapterRow chapter={chapter} />)}
    </div>
  );
}
