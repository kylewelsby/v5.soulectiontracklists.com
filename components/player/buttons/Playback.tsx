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

  const svgData = useComputed(() => {
    if (queue.isPlaying) {
      return "M28.525.416c15.464 0 28 12.536 28 28s-12.536 28-28 28-28-12.536-28-28 12.536-28 28-28zm-7.175 15c-2.112 0-3.825 1.684-3.825 3.76v19.48c0 2.076 1.713 3.76 3.825 3.76 2.111 0 3.824-1.684 3.824-3.76v-19.48c0-2.076-1.713-3.76-3.824-3.76zm14.351 0c-2.111 0-3.823 1.684-3.824 3.76v19.48c0 2.076 1.712 3.76 3.824 3.76s3.824-1.684 3.824-3.76v-19.48c0-2.076-1.712-3.76-3.824-3.76z";
    }
    return "M28.525.416c15.464 0 28 12.536 28 28s-12.536 28-28 28-28-12.536-28-28 12.536-28 28-28zm-5.687 16.633a.875.875 0 00-1.313.758v21.218a.875.875 0 001.313.758l18.375-10.61a.875.875 0 000-1.515z";
  });

  return (
    <button
      title={title}
      disabled={disabled}
      onClick={queue.toggle.bind(queue)}
      class="rounded-full text-white mx-4 flex justify-center items-center focus:(outline-none ring)"
    >
      <svg
        viewBox="0 0 57 57"
        class="fill-current w-12 h-12"
      >
        <path d={svgData} fill-rule="nonzero" />
      </svg>
    </button>
  );
}
