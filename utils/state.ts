import { effect, signal } from "@preact/signals";

export const playerUrl = signal("");
export const playerPlaying = signal(false);
effect(() => {
  // console.log("player playing?", playerPlaying.value);
});
