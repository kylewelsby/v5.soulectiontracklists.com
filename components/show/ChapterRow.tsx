import ChapterHero from "@/components/show/ChapterHero.tsx";
import MarkerRow from "@/components/show/MarkerRow.tsx";
import { Chapter } from "@/utils/types.ts";

interface ChapterProps {
  chapter: Chapter;
}

export default function ChapterRow({ chapter }: ChapterProps) {
  const sortedMarkers = chapter.markers?.slice(0).sort((a, b) =>
    a!.position - b!.position
  ) ?? [];
  return (
    <div>
      <ChapterHero chapter={chapter} />
      <div>
        {sortedMarkers.map((marker) => <MarkerRow marker={marker!} />)}
      </div>
    </div>
  );
}
