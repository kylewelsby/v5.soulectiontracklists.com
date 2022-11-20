import { Chapter } from "@/utils/types.ts";

interface ChapterHeroProps {
  chapter: Chapter;
}
export default function ChapterHero({ chapter }: ChapterHeroProps) {
  return (
    <div class="p-4 flex flex-col items-start lg:flex-row lg:items-center">
      <div>
        <h4 class="text-2xl font-medium">
          {chapter.title}
        </h4>
        {/* <p>{chapter}</p> */}
      </div>
    </div>
  );
}
