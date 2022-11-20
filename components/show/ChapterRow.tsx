import ChapterHero from "@/components/show/ChapterHero.tsx";
import MarkerRow from "@/components/show/MarkerRow.tsx";
import { Chapter } from "@/utils/types.ts";

interface ChapterProps {
  chapter: Chapter;
}

export default function ChapterRow({ chapter }: ChapterProps) {
  return (
    <div>
      <ChapterHero chapter={chapter} />
      <div>
        {chapter.markers.map((marker) => <MarkerRow marker={marker!} />)}
      </div>
    </div>
  );
}
