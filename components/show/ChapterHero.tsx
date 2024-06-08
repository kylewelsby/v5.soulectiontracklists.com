import { Chapter } from "@/utils/types.ts";
import Artwork from "@/components/Artwork.tsx";

interface ChapterHeroProps {
  chapter: Chapter;
}
export default function ChapterHero({ chapter }: ChapterHeroProps) {
  return (
    <div class="flex flex-row items-start">
      { chapter.artwork && (<Artwork
        src={chapter.artwork}
        alt={chapter.title}
        size={128}
        loading="eager"
      />)}
      <div>
        <h4 class="text-2xl font-medium">{chapter.title}</h4>
        <div
          class="mt-4"
          dangerouslySetInnerHTML={{ __html: chapter.content! }}
        />
      </div>
    </div>
  );
}
