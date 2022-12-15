import SiteNavLink from "@/components/Site/SiteNavLink.tsx";

export default function SiteNav() {
  return (
    <header class="w-full text-black dark:text-white">
      <div class="container mx-auto flex flex-row items-center py-5 px-5 md:px-2">
        <nav class="md:opacity-100 md:pointer-events-auto flex-1 fixed md:static flex inset-0 flex-col md:flex-row md:flex z-50 transition duration-150 ease-in-out">
          <SiteNavLink href="/">Home</SiteNavLink>
          <SiteNavLink href="/records/">Records</SiteNavLink>
          <SiteNavLink href="/tracklists/">Radio</SiteNavLink>
          <SiteNavLink href="/events/">Events</SiteNavLink>
          <SiteNavLink
            href="https://soulection.supply/"
            rel="noopener"
            target="_blank"
          >
            Supply
          </SiteNavLink>
          <SiteNavLink href="/about/">About</SiteNavLink>
          <SiteNavLink
            href="https://soulection.plus"
            rel="noopener"
            target="_blank"
          >
            Soulection<sup>+</sup>
          </SiteNavLink>
        </nav>
      </div>
    </header>
  );
}
