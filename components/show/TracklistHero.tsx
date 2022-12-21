import { Show } from "@/utils/types.ts";

interface TracklistHeroProps {
  show: Show;
}

export default function TracklistHero({ show }: TracklistHeroProps) {
  return (
    <div class="flex flex-col items-center to-black from-transparent bg-gradient-to-b">
      {show.content}
    </div>
  );
}
