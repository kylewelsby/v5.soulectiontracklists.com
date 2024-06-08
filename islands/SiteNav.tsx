import { useState } from "preact/hooks";
import SiteNavLink from "@/components/Site/SiteNavLink.tsx";
import SiteIcon from "@/components/Site/SiteIcon.tsx";
import SoulectionIcon from "@/components/SVG/SoulectionIcon.tsx";
import { asset } from "$fresh/runtime.ts";

export default function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }
  return (
    <header class="w-full text-black dark:text-white">
      <div class="container mx-auto flex flex-row items-center py-5 px-5 xl:px-2">
        <nav class={`order-2 xl:order-1 md:opacity-100 pointer-events-auto bg-[#151515] flex-1 fixed md:static inset-0 flex-col md:flex-row md:flex justify-end md:justify-start z-50 transition duration-150 ease-in-out ${isMenuOpen ? 'flex' : 'hidden md:flex'}`}
          onClick={(e) => {e.stopPropagation(); closeMenu()}}
        >
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

        <a
          href="/"
          class="order-1 xl:order-2 flex flex-row items-center font-semibold"
        >
          <SoulectionIcon class="w-10 fill-current"></SoulectionIcon>
        </a>

        <div class="order-3 xl:order-3 flex-1 flex justify-end">

          <button
            class="md:hidden bg-transparent rounded-full text-black flex justify-center items-center w-8 h-8 max-h-8 max-w-8 p-1 border border-black border-opacity-25 dark:border-opacity-25 dark:text-white dark:border-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <SiteIcon icon="menu"></SiteIcon>
          </button>
        </div>
      </div>
    </header>
  );
}
