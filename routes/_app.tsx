import { AppProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href={asset("/favicon.ico")} type="image/x-icon" />
        <link
          rel="preload"
          as="font"
          href="/fonts/conthrax-sb.woff"
        />
        <link rel="preconnect" href="https://ik.imagekit.io" />
        <link
          rel="preload"
          as="image"
          href="https://ik.imagekit.io/29e7mvzdh/soulection/tr:h-128,w-128,ar-1:1,c-maintain_ratio,fo-auto/default-artist.png"
        />
      </Head>
      <Component />
    </>
  );
}
