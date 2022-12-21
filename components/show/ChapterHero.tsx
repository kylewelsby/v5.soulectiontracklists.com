import { Chapter } from "@/utils/types.ts";

interface ChapterHeroProps {
  chapter: Chapter;
}
export default function ChapterHero({ chapter }: ChapterHeroProps) {
  return (
    <div class="p-4 flex flex-col items-center lg:flex-row lg:items-start">
      <h4 class="text-2xl font-medium">
        {chapter.title}
      </h4>
      <div
        dangerouslySetInnerHTML={{ __html: chapter.content! }}
      />
    </div>
  );
}
