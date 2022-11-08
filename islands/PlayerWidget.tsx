import { useSignal } from "@preact/signals";

import Audio from "@/components/player/Audio.tsx";
import Controls from "@/components/player/Controls.tsx";

export default function PlayerWidget() {
  const progression = useSignal(0);
  const duration = useSignal(0);
  const seek = useSignal(0);

  const onProgress = (value: number) => {
    progression.value = value;
  };

  const onDurationFound = (value: number) => {
    duration.value = value;
  };

  return (
    <div class="absolute bottom-0 right-0 transform scale-100">
      <Controls />
      {/* {duration.value} */}
      {/* {progression.value} */}
      <Audio
        seek={seek}
        onProgress={onProgress}
        onDurationFound={onDurationFound}
      />
    </div>
  );
}
