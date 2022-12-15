import { JSX } from "preact";

export default function SiteNavLink(
  props: JSX.HTMLAttributes<HTMLAnchorElement>,
) {
  return (
    <a
      class="py-4 px-6 border-b-2 border-opacity-50 sm:border-transparent sm:py-2 sm:px-3 text-center text-xl sm:text-sm text-black sm:text-opacity-50 font-header sm:font-sans hover:text-opacity-80 active:text-opacity-100 dark:text-white sm:dark:text-opacity-60 dark:hover:text-opacity-75 dark:active:text-opacity-100 transition hover:border-b-2 hover:border-white hover:border-opacity-80"
      {...props}
    >
      {props.children}
    </a>
  );
}
