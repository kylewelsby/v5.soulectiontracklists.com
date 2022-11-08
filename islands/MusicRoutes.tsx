import { Route, Router } from "preact-router";
import { IS_BROWSER } from "$fresh/runtime.ts";

import type { PreloadData } from "@/utils/types.ts";
import { FallbackProvider } from "@/utils/client.ts";

import Discover from "@/components/pages/Discover.tsx";
import Tracklist from "@/components/pages/Tracklist.tsx";

interface MusicRouteProps {
  url?: string;
  initial?: PreloadData;
}

export default function MusicRoutes({ url, initial = {} }: MusicRouteProps) {
  return (
    <div>
      <FallbackProvider value={initial}>
        <Router url={IS_BROWSER ? undefined : url} static={!IS_BROWSER}>
          <Route path="/" component={Discover} />
          <Route path="/tracklists/:slug" component={Tracklist} />
        </Router>
      </FallbackProvider>
    </div>
  );
}
