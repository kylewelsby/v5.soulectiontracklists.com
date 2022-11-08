import type { PreloadData } from "@/utils/types.ts";
import MusicRoutes from "@/islands/MusicRoutes.tsx";
import PlayerWidget from "@/islands/PlayerWidget.tsx";

interface MusicBrowserProps {
  url: string;
  initial: PreloadData;
}

export default function MusicBrowser({ url, initial }: MusicBrowserProps) {
  return (
    <div>
      {/* <Navigation url={url} /> */}
      <main>
        {url}
        <pre>{initial}</pre>
        <MusicRoutes url={url} initial={initial} />
        <PlayerWidget />
      </main>
    </div>
  );
}
