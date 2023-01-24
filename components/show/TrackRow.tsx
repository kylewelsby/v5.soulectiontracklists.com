import Artwork from "@/components/Artwork.tsx";

interface TrackRowProps {
  artist: string;
  title: string;
  artwork?: string;
  href?: string;
  timestamp?: string;
  position?: number;
}

export default function TrackRow(
  { artist, title, href, artwork, timestamp, position }: TrackRowProps,
) {
  // const href = `/tracks/${track.id}`;
  const trackName = `${artist} - ${title}`;
  return (
    <a
      href={href}
      class="flex flex-row items-center justify-center py-4 text-lg transition-colors duration-1000 transition dark:hover:bg-gray-800"
    >
      <div class="h-20 w-20 mr-6 relative rounded">
        <Artwork
          src={artwork ? artwork : "/default-artist.png"}
          alt={trackName}
          size={63}
        />
        {position !== undefined && (
          <span class="absolute bottom-0 right-0 bg-gray-800 rounded-full text-white text-xs font-bold px-2 py-1">
            {position + 1}
          </span>
        )}
      </div>
      <div class="flex flex-col flex-grow min-w-0">
        <span class="text-xs order-first cursor-pointer dark:text-white dark:text-opacity-50 text-black text-opacity-50 font-light flex flex-row items-center">
          {timestamp}
        </span>
        <span class="font-light order-3">
          {artist}
        </span>
        <span class="font-medium order-2 truncate">
          {title}
        </span>
      </div>
    </a>
  );
}
