import MarkerRow from "@/components/show/MarkerRow.tsx"
import { Chapter } from "@/utils/types.ts";

interface ChapterProps {
  chapter: Chapter;
}

export default function ChapterRow({ chapter }: ChapterProps) {
  return (
    <div>
      {chapter.title}
      {chapter.markers.map((marker) => (
        <MarkerRow marker={marker} />
      ))}
    </div>
  );
}
