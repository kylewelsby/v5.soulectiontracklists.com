import PlayShow from "@/components/show/PlayShow.tsx";
import { Show } from "@/utils/types.ts";
import Artwork from "@/components/Artwork.tsx";
import locationByISOCode from "@/utils/locationByISOCode.ts";

interface TracklistHeroProps {
  show: Show;
}

export default function TracklistHero({ show }: TracklistHeroProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long" })
    .format(Date.parse(show.published_at));

  const location = locationByISOCode(show.location);

  return (
    <div class="to-black from-transparent bg-gradient-to-b">
      <div class="container mx-auto">
        <div class="flex flex-col lg:(flex-row items-center py-8) py-6 self-start mx-4">
          <Artwork
            src={show.artwork}
            alt={show.title}
            size={320}
          />
          <div class="lg:ml-10">
            <h1 class="tracking-tighter text-4xl font-semibold">
              {show.title}
            </h1>
            <div class="my-2 text-lg font-medium flex flex-col items-start md:(flex-row items-center)">
              <span class="inline-block py-1">{formattedDate}</span>
              <span class="mx-2">&bull;</span>
              <span class="text-opacity-70 inline py-1">
                Live from {location}
              </span>
            </div>
            <PlayShow show={show} />
            <div class="mt-10">
              <div class="text-opacity-50">Listen on</div>
              <div class="flex flex-row my-2">
                {show.links.appleMusic && (
                  <a href={show.links.appleMusic} class="btn text-xs mr-2">
                    Apple Music
                  </a>
                )}
                {show.links.soundcloud && (
                  <a href={show.links.soundcloud} class="btn text-xs mr-2">
                    Soundcloud
                  </a>
                )}
                {show.links.mixcloud && (
                  <a href={show.links.mixcloud} class="btn text-xs mr-2">
                    Mixcloud
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div class="conteiner pb-10">
          <div
            class="mx-4"
            dangerouslySetInnerHTML={{ __html: show.content }}
          />
        </div>
      </div>
    </div>
  );
}
