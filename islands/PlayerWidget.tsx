import { useContext } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { PlayerQueue } from "@/utils/player_queue.ts";

import Audio from "@/components/player/Audio.tsx";
import Controls from "@/components/player/Controls.tsx";
import ShowDisplay from "@/components/player/ShowDisplay.tsx";

export default function PlayerWidget() {
  const progression = useSignal(0);
  const duration = useSignal(0);
  const seek = useSignal(0);

  const onProgress = (value: number) => {
    progression.value = value;
    queue.onProgress(value);
  };

  const onDurationFound = (value: number) => {
    duration.value = value;
  };

  const queue = useContext(PlayerQueue);

  const show = queue.current;

  const chapter = queue.currentChapter;

  const marker = queue.currentMarker;

  return (
    <div class="fixed bottom-0 right-0 left-0 bg-gray-900 text(white) w-full flex flex(row wrap) justify-center items-center shadow-lg p-4 lg:(p-0 flex-nowrap)">
      <Controls />
      {(show) && <ShowDisplay show={show} chapter={chapter} marker={marker} />}
      <Audio
        seek={seek}
        onProgress={onProgress}
        onDurationFound={onDurationFound}
      />
    </div>
  );
}
