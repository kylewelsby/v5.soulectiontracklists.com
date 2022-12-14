import type { PreloadData } from "@/utils/types.ts";
import MusicRoutes from "@/islands/MusicRoutes.tsx";
import PlayerWidget from "@/islands/PlayerWidget.tsx";
import SiteNav from "@/components/Site/SiteNav.tsx";

interface MusicBrowserProps {
  url: string;
  initial: PreloadData;
}

export default function MusicBrowser({ url, initial }: MusicBrowserProps) {
  return (
    <div class="relative antialiased text-opacity-90 dark:(bg-[#151515] text-whire dark:text-opacity-90)">
      <SiteNav />
      <main class="w-full pb-[64px]">
        <MusicRoutes url={url} initial={initial} />
      </main>
      <PlayerWidget />
    </div>
  );
}
