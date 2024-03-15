import SiteSubNav from "@/components/Site/SiteSubNav.tsx";
import SiteSubNavLink from "@/components/Site/SiteSubNavLink.tsx";
export default function TracklistsNav() {
  return (
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
  )
}
