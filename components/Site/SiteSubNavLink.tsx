import { JSX } from "preact";

export default function SiteNavLink(
  props: JSX.HTMLAttributes<HTMLAnchorElement>,
) {
  return (
    <a
      class="py-4 px-4 flex whitespace-nowrap font-light text(sm black opacity-60) dark:(text(white opacity-60) hover:(text-opacity-100)) hover:(text-opacity-100) transition"
      {...props}
    >
      {props.children}
    </a>
  );
}
