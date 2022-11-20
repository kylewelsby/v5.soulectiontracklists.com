import Artwork from "@/components/Artwork.tsx";
interface TrackRowProps {
  title: string;
  timestamp?: string;
}

export default function TrackRowUntagged({ title, timestamp }: TrackRowProps) {
  const artist = title.split(" - ")[0];
  const track = title.split(" - ")[1];
  return (
    <div class="flex flex-row items-center justify-center p-3 text-lg transition-colors duration-1000 transition dark:hover:bg-gray-800">
      <div class="h-20 w-20 mr-6 relative rounded bg-default-image">
        <Artwork
          src="/default-artist.png"
          alt={title}
        />
      </div>
      <div class="flex flex-col flex-grow min-w-0">
        <span class="text-xs order-first cursor-pointer dark:text-white dark:text-opacity-50 text-black text-opacity-50 font-light flex flex-row items-center">
          {timestamp}
        </span>
        {artist} - {track}
      </div>
    </div>
  );
}
