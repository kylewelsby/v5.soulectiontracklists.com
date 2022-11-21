import { useComputed } from "@preact/signals";

import { useTracklists } from "@/utils/client.ts";
import TracklistCard from "@/components/TracklistCard.tsx";

import { Show } from "@/utils/types.ts";

export default function Discover() {
  const details = useTracklists();
  const tracklists = useComputed(() => details.data);
  if (details.error) {
    console.error(details.error);
    return <div>Error</div>;
  }

  if (tracklists.value === null || tracklists.value === undefined) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h1>Discover</h1>
      {tracklists.value?.map((tracklist: Show) => (
        <TracklistCard tracklist={tracklist} />
      ))}
    </div>
  );
}
