import { useContext } from "preact/hooks";
import { usePlayerQueue } from "@/utils/playerQueue.ts";

export default function SeekForward() {
  const queue = usePlayerQueue();
  return (
    <button
      title="Seek Forward"
      class="text-gray-100 focus:(outline-none ring)"
      onClick={queue.seekForward.bind(queue)}
    >
      <svg
        viewBox="0 0 337.002 337.002"
        class="fill-current w-6 h-6"
      >
        <path d="M222.902 147.886L41.783 23.923c-8.174-5.588-18.775-6.201-27.533-1.586C5.478 26.971 0 36.065 0 45.962v244.879c0 9.941 5.508 19.053 14.328 23.654 8.802 4.617 19.42 3.955 27.594-1.709l181.104-125.564c6.45-4.479 10.297-11.85 10.266-19.699-.017-7.863-3.909-15.204-10.39-19.637zM305.484 9.502c-17.406 0-31.518 14.112-31.518 31.519v254.96c0 17.407 14.111 31.519 31.518 31.519s31.518-14.111 31.518-31.519V41.021c0-17.406-14.11-31.519-31.518-31.519z" />
      </svg>
    </button>
  );
}
