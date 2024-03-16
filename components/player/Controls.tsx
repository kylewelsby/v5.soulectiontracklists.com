import Playback from "@/components/player/buttons/Playback.tsx";
import SeekForward from "@/components/player/buttons/SeekForward.tsx";
import SeekBackward from "@/components/player/buttons/SeekBackward.tsx";

export default function Controls() {
  return (
    <div class="w-full order-1 py-2 flex flex-row justify-center lg:w-2/12 lg:order-2">
      <SeekBackward />
      <Playback />
      <SeekForward />
    </div>
  );
}
