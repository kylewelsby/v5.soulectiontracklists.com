import { useContext } from "preact/hooks";

import Controls from "@/components/player/Controls.tsx";
import ShowDisplay from "@/components/player/ShowDisplay.tsx";

import { PlayerQueueContext } from "@/utils/playerQueue.ts";

export default function Display() {
  const queue = useContext(PlayerQueueContext);

  if (queue.current == null) {
    return "";
  }

  return (
    <div class="fixed bottom-0 bg-gray-900 text-gray-300 w-full left-0 right-0 flex flex-row items-center flex-wrap shadow-lg p-4 lg:p-0 lg:flex-nowrap">
      <Controls />
      <ShowDisplay
        show={queue.current}
        chapter={queue.currentChapter}
        marker={queue.currentMarker}
      />
    </div>
  );
}
