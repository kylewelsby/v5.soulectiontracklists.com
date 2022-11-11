import { useContext } from "preact/hooks";

import Controls from "@/components/player/Controls.tsx";
import ShowDisplay from "@/components/player/ShowDisplay.tsx";

import { PlayerQueue } from "@/utils/player_queue.ts";

export default function Display() {
  const queue = useContext(PlayerQueue);

  if (queue.current == null) {
    return "";
  }

  return (
    <div class="fixed bottom-0 bg-gray-900 text-gray-300 w-full left-0 right-0 flex flex-row items-center flex-wrap shadow-lg p-4 lg:p-0">
      <Controls />
      <ShowDisplay
        show={queue.current}
      />
    </div>
  );
}
