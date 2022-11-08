import { useContext } from "preact/hooks";
import { useComputed } from "@preact/signals";
import { PlayerQueue } from "@/utils/player_queue.ts";

export default function Playback() {
  const queue = useContext(PlayerQueue);
  const disabled = useComputed(() => queue.current === null);

  const title = useComputed(() => {
    if (queue.isPlaying) return "Pause";
    return "Play";
  });

  return (
    <button
      title={title}
      disabled={disabled}
      onClick={queue.toggle.bind(queue)}
    >
      {title}
    </button>
  );
}
