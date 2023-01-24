import { useContext } from "preact/hooks";
import { useTracklist } from "@/utils/client.ts";
import { PlayerQueue } from "@/utils/player_queue.ts";
import { useComputed } from "@preact/signals";
import { Show } from "@/utils/types.ts";

import Loading from "@/components/Loading.tsx";
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
    return <Loading />;
  }

  const onPlay = (e: MouseEvent) => {
    e.preventDefault();
    const showNew = show.value as unknown as Show;
    queue.listenTo(showNew);
  };

  return (
    <>
      <TracklistHero show={show.value} />
      <div class="bg-black">
        <div class="container mx-auto p-4 py-8">
          {show.value!.chapters.map((chapter) => (
            <ChapterRow
              chapter={chapter}
            />
          ))}
        </div>
      </div>
    </>
  );
}
