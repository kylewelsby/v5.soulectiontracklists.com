import { createContext } from "preact";
import { useContext, useMemo } from "preact/hooks";
import { batch, useSignal } from "@preact/signals";
import useSWR from "swr";
import { Show } from "@/utils/types.ts";

import type { PreloadData } from "@/utils/types.ts";

const Fallback = createContext<PreloadData>({});

export const FallbackProvider = Fallback.Provider;

export function useTracklist(slug: string) {
  return useSWRSignal<Show>(`/api/shows/${slug}`);
}

export function useTracklists() {
  return useSWRSignal<readonly Show[]>("/api/shows");
}

export interface ResponseSignal<T> {
  readonly data: T | undefined;
  readonly error: Error | undefined;
}

function useSWRSignal<T>(endpoint: string): ResponseSignal<T> {
  const data = useSignal<T | undefined>(undefined);
  const error = useSignal<T | undefined>(undefined);
  const fallback = useContext(Fallback);
  useSWR(endpoint, null, {
    revalidateIfStale: false,
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallback,
    use: [
      (next) => (...args) => {
        batch(() => {
          data.value = undefined;
          error.value = undefined;
        });

        const result = next(...args);
        batch(() => {
          data.value = result.data as typeof data.value;
          error.value = result.error as typeof error.value;
        });
        return result;
      },
    ],
    isPaused: () => data.value !== undefined,
    fetcher: async () => {
      console.log(`fetching on ${endpoint}`);
      const resp = await fetch(endpoint);
      return await resp.json() as T;
    },
  });
  return useMemo(() => ({
    get data() {
      return data.value;
    },
    get error() {
      return error.value;
    },
  }), [data, error]) as ResponseSignal<T>;
}
