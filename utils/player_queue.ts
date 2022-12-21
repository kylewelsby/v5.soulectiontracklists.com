import { createContext } from "preact";
import { batch, computed, signal } from "@preact/signals";
import type { Show } from "@/utils/types.ts";

export class PlayerQueueSignal {
  readonly #current = signal<Show | null>(null);
  readonly #isPlaying = signal(false);
  readonly #position = signal(0);
  readonly #seekTo = signal(0);

  readonly #canPlay = computed(() => this.#current.value?.data !== undefined);

  readonly #currentMarker = computed(() => {
    if (!this.currentChapter) return undefined;

    const markers = this.currentChapter.markers;

    if (!markers) return undefined;

    const marker = markers.find((marker, index) => {
      const nextMarker = markers[index + 1];
      const prevMarker = markers[index - 1];
      if (nextMarker) {
        if (!prevMarker) return this.#position.value < nextMarker.msTimestamp;
        return (
          this.#position.value >= marker.msTimestamp &&
          this.#position.value < nextMarker.msTimestamp
        );
      }
      return this.#position.value >= marker.msTimestamp;
    });

    return marker;
  });

  readonly #nextMarker = computed(() => {
    if (!this.currentChapter) return undefined;
    if (!this.currentMarker) return undefined;

    const markers = this.currentChapter.markers;

    if (!markers) return undefined;

    const index = markers.findIndex((marker) => {
      console.log("marker", marker.id, this.currentMarker!.id);
      return marker.id == this.currentMarker!.id;
    });
    console.log("index", index);
    return markers[index + 1];
  });

  readonly #prevMarker = computed(() => {
    if (!this.currentChapter) return undefined;
    if (!this.currentMarker) return undefined;

    const markers = this.currentChapter.markers;

    if (!markers) return undefined;

    const index = markers.findIndex((marker) => {
      return marker.id == this.currentMarker!.id;
    });
    return markers[index - 1];
  });

  readonly #currentChapter = computed(() => {
    if (!this.current) return undefined;
    const chapters = this.current.chapters;
    return (
      chapters.find((chapter) => {
        const firstMarker = chapter.markers![0];
        return this.#position.value >= firstMarker.msTimestamp;
      }) || chapters[0]
    );
  });

  get current() {
    return this.#current.value;
  }

  get currentMarker() {
    return this.#currentMarker.value;
  }

  get nextMarker() {
    return this.#nextMarker.value;
  }

  get prevMarker() {
    return this.#prevMarker.value;
  }

  get currentChapter() {
    return this.#currentChapter.value;
  }

  get isPlaying() {
    return this.#isPlaying.value;
  }

  get position() {
    return this.#position.value;
  }

  get seekTo() {
    return this.#seekTo.value;
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

  seekBack() {
    if (!this.prevMarker) return;
    this.#seekTo.value = this.prevMarker.msTimestamp;
  }

  seekForward() {
    if (!this.nextMarker) return;
    this.#seekTo.value = this.nextMarker.msTimestamp;
  }

  listenTo(show: Show) {
    if (this.#current.value?.slug === show.slug) return;
    fetch(`/api/shows/${show.slug}/soundcloud`)
      .then((resp) => resp.json())
      .then((json) => {
        show.data = json.media;
        const valid = isValidShow(show);

        if (!valid) return;

        batch(() => {
          this.#current.value = show;
          this.#isPlaying.value = true;
          this.#position.value = 0;
        });
      });
  }

  onProgress(progress: number) {
    this.#position.value = progress;
  }
}

function isValidShow(show: Show) {
  return Boolean(show.data);
}

export const PlayerQueue = createContext(new PlayerQueueSignal());
