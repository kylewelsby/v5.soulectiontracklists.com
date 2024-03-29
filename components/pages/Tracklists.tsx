import { PageProps } from "$fresh/server.ts";
import { useComputed } from "@preact/signals";

import { useTracklists } from "@/utils/client.ts";
import Loading from "@/components/Loading.tsx";
import TracklistCard from "@/components/TracklistCard.tsx";
import SiteSubNav from "@/components/Site/SiteSubNav.tsx";
import SiteSubNavLink from "@/components/Site/SiteSubNavLink.tsx";

import { Show } from "@/utils/types.ts";

interface Data {
  tag: string;
}

export default function Tracklists(props: Data) {
  const rawTags = props.tag;

  const details = useTracklists(rawTags);
  const tracklists = useComputed(() => details.data);
  if (details.error) {
    console.error(details.error);
    return <div>Error</div>;
  }

  if (tracklists.value === null || tracklists.value === undefined) {
    return <Loading />;
  }

  return (
    <div class="container mx-auto px-5">
      <SiteSubNav title="Tracklists">
        <SiteSubNavLink href="/tracklists/">All</SiteSubNavLink>
        <SiteSubNavLink href="/tracklists/t/soulection-radio/">
          Soulection Radio
        </SiteSubNavLink>
        <SiteSubNavLink href="/tracklists/t/takeover/">
          Takeovers
        </SiteSubNavLink>
        <SiteSubNavLink href="/tracklists/t/guest/">
          Guest Appearance
        </SiteSubNavLink>
        <SiteSubNavLink href="/tracklists/t/specials/">Specials</SiteSubNavLink>
      </SiteSubNav>
      <h2>All Tracklists</h2>
      {tracklists.value?.map((tracklist: Show) => (
        <TracklistCard tracklist={tracklist} />
      ))}
    </div>
  );
}
