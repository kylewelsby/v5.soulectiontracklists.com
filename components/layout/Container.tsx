import { ComponentChildren } from "preact";
import { Head } from "$fresh/runtime.ts";

export type Props = {
  children: ComponentChildren;
  title?: string;
};
const Metadata = ({ ...customMeta }) => {
  const meta = {
    title: "Soulection",
    description:
      "Soulection is a Los Angeles-based collective and record label founded by Joe Kay in 2011. Soulection is a platform for artists to share their music and connect with fans.",
    ...customMeta,
  };
  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
    </Head>
  );
};

export default function Container({ children, ...customMeta }: Props) {
  return (
    <main class="container" id="swup">
      <Metadata {...customMeta}></Metadata>
      {children}
    </main>
  );
}
