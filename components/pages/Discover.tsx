import { useComputed } from "@preact/signals";

import { useTracklists } from "@/utils/client.ts";
import TracklistCard from "@/components/TracklistCard.tsx";
import SiteSubNav from "@/components/Site/SiteSubNav.tsx";
import SiteSubNavLink from "@/components/Site/SiteSubNavLink.tsx";

import { Show } from "@/utils/types.ts";

export default function Discover() {
  const details = useTracklists();
  const tracklists = useComputed(() => details.data);
  if (details.error) {
    console.error(details.error);
    return <div>Error</div>;
  }

  if (tracklists.value === null || tracklists.value === undefined) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <SiteSubNav title="Tracklists">
        <SiteSubNavLink href="/tracklists/">All</SiteSubNavLink>
        <SiteSubNavLink href="/tracklists/t/soulection-radio/">Soulection Radio</SiteSubNavLink>
        <SiteSubNavLink href="/tracklists/t/takeover/">Takeovers</SiteSubNavLink>
        <SiteSubNavLink href="/tracklists/t/guest/">Guest Appearance</SiteSubNavLink>
        <SiteSubNavLink href="/tracklists/t/specials/">Specials</SiteSubNavLink>
      </SiteSubNav>
      <h2>All Tracklists</h2>
      {tracklists.value?.map((tracklist: Show) => (
        <TracklistCard tracklist={tracklist} />
      ))}
    </div>
  );
}
