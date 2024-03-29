import { useContext } from "preact/hooks";
import { usePlayerQueue } from "@/utils/playerQueue.ts";

export default function SeekBackward() {
  const queue = usePlayerQueue();
  return (
    <button
      title="Seek Forward"
      class="text-gray-100 focus:(outline-none ring)"
      onClick={queue.seekBack.bind(queue)}
    >
      <svg
        viewBox="0 0 337.002 337.002"
        class="fill-current w-6 h-6"
      >
        <path d="M334.241 28.174c-8.757-4.617-19.361-4-27.54 1.586L125.586 153.723c-6.479 4.434-10.365 11.773-10.395 19.639-.023 7.848 3.825 15.219 10.28 19.697l181.098 125.566c8.165 5.662 18.799 6.322 27.602 1.707 8.803-4.602 14.32-13.711 14.32-23.654V51.797c0-9.895-5.487-18.988-14.25-23.623zM31.518 14.524C14.112 14.524 0 28.637 0 46.043v256.406c0 17.406 14.112 31.518 31.518 31.518s31.518-14.111 31.518-31.518V46.043c0-17.406-14.112-31.519-31.518-31.519z" />
      </svg>
    </button>
  );
}
