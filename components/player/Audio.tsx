import { useContext, useRef } from "preact/hooks";
import {
  batch,
  type ReadonlySignal,
  useComputed,
  useSignal,
  useSignalEffect,
} from "@preact/signals";

import { usePlayerQueue } from "@/utils/playerQueue.ts";

interface AudioProps {
  seek: ReadonlySignal<number>;

  onProgress: (time: number) => void;
  onDurationFound: (duration: number) => void;
}
export default function Audio({
  seek,
  onProgress,
  onDurationFound,
}: AudioProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const isLoading = useSignal(true);

  const queue = usePlayerQueue();
  const src = useComputed(() => queue.current?.data ?? "");

  useSignalEffect(() => {
    if (isLoading.value) return;

    if (!queue.isPlaying) {
      audioRef.current?.pause();
      return;
    }

    // deno-lint-ignore no-explicit-any
    audioRef.current?.play().catch((err: any) => {
      console.error(err);
      queue.toggle();
    });
  });

  useSignalEffect(() => {
    if (queue.seekTo === undefined) return;
    if (queue.seekTo <= 0) return;
    if (audioRef.current === null) return;

    console.log("seeking to", queue.seekTo);

    audioRef.current.currentTime = queue.seekTo;
  });

  const onLoadUpdate = (event: Event) => {
    const { readyState = undefined } = event.target as HTMLAudioElement;

    if (readyState === undefined) return;

    batch(() => {
      isLoading.value = readyState < 3;

      if (readyState === 0) {
        onDurationFound(0);
      }
    });
  };

  const onDurationChange = (event: Event) => {
    const { duration = undefined } = event.target as HTMLAudioElement;

    if (duration !== undefined) {
      onDurationFound(duration);
    }
  };

  const onTimeUpdate = (event: Event) => {
    const { currentTime = undefined } = event.target as HTMLAudioElement;

    if (currentTime !== undefined) {
      onProgress(currentTime);
    }
  };
  const onEnded = () => {
    if (audioRef.current !== null) {
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <audio
      ref={audioRef}
      src={src}
      controls={false}
      autoPlay={false}
      onLoadStart={onLoadUpdate}
      onCanPlay={onLoadUpdate}
      onCanPlayThrough={onLoadUpdate}
      onDurationChange={onDurationChange}
      onTimeUpdate={onTimeUpdate}
      onEnded={onEnded}
    />
  );
}
