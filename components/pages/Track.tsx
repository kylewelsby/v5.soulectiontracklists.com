import { useComputed } from "@preact/signals";
import { useTrack } from "@/utils/client.ts";
import TrackHero from "@/components/Track/TrackHero.tsx";
import SVGIcon from "@/components/SVG/SVGIcon.tsx";
import { Track } from "@/utils/types.ts";

interface Props {
  id: string;
}
export default function TrackPage({ id }: Props) {
  const details = useTrack(id);
  if (details.error) {
    return <div>Error</div>;
  }

  const track = details.data;

  if (track === null || track === undefined) {
    return <div>Loading</div>;
  }

  const platforms = [
    "amazonMusic",
    "appleMusic",
    "audioMack",
    "audius",
    "bandcamp",
    "bing",
    "discogs",
    "deezer",
    "duckduckgo",
    "google",
    "lastfm",
    "soundcloud",
    "spotify",
    "tidal",
    "youtube",
    "traxsource",
    "beatport",
    // 'website',
    // 'instagram',
    // 'facebook',
    // 'dropbox',
    // 'box',
    // 'googleDrive',
    // 'mega',
  ];

  const linkedPlatforms = track.links.map((link) => link.platform).sort();

  const unlinkedPlatforms = platforms.slice(0).filter((platform) => {
    return !linkedPlatforms.includes(platform);
  }).sort();

  const sortedLinks = track.links.slice(0).sort((a, b) => {
    if (a.platform < b.platform) return -1;
    if (a.platform > b.platform) return 1;
    return 0;
  });

  return (
    <>
      <TrackHero track={track} />

      <div class="container mx-auto">
        <div class="mx-4 py-8">
          <h3>Links</h3>
          <h4>Available</h4>
          <p>Buy, Stream, Download, and Support on</p>
          <ul class="grid md:grid-cols-2 lg:grid-cols-2">
            {sortedLinks.map((link) => (
              <li class="my-3">
                <a
                  href={link.href}
                  rel="noopener"
                  target="_blank"
                  class="inline-flex flex-row justify-start items-center rounded-full p-2 -m-2 text-lg font-semibold"
                >
                  <span class="btn text-black bg-white p-2">
                    <span class="w-8 h-8 max-w-8 max-h-8">
                      <SVGIcon icon={link.platform} />
                    </span>
                  </span>
                  <span class="ml-4" data-t-key={`platforms.${link.platform}`}>
                    {link.platform}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <h3 class="mt-8">Search for {track.title} on</h3>
          <ul class="grid md:grid-cols-2 lg:grid-cols-2">
            {unlinkedPlatforms.map((platform) => (
              <li class="my-3">
                <a
                  rel="noopener"
                  target="_blank"
                  class="inline-flex flex-row justify-start items-center rounded-full p-2 -m-2 text-lg font-semibold"
                >
                  <span class="btn text-black bg-white p-2">
                    <span class="w-8 h-8 max-w-8 max-h-8">
                      <SVGIcon icon={platform} />
                    </span>
                  </span>
                  <span class="ml-4" data-t-key={`platforms.${platform}`}>
                    {platform}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
