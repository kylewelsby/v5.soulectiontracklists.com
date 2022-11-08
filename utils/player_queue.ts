import { createContext } from "preact";
import { batch, computed, signal } from "@preact/signals";
import type { Show } from "@/utils/types.ts";

export class PlayerQueueSignal {
  readonly #current = signal<Show | null>(null);
  readonly #isPlaying = signal(false);

  readonly #canPlay = computed(() => this.#current.value?.data !== undefined);

  get current() {
    return this.#current.value;
  }

  get isPlaying() {
    return this.#isPlaying.value;
  }

  toggle() {
    if (this.#isPlaying.value) {
      this.#isPlaying.value = false;
      return;
    }

    if (this.#canPlay.value) {
      this.#isPlaying.value = true;
    }
  }

  listenTo(show: Show) {
    const valid = isValidShow(show);

    if (!valid) return;

    batch(() => {
      this.#current.value = show;
      this.#isPlaying.value = true;
    });
  }
}

function isValidShow(show: Show) {
  return Boolean(show.data);
}

export const PlayerQueue = createContext(new PlayerQueueSignal());
