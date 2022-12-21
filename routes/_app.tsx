import { AppProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <meta http-equiv="Accept-CH" content="DPR, Width, Save-Data" />
        <link rel="icon" href={asset("/favicon.ico")} type="image/x-icon" />
        <link
          rel="preload"
          as="font"
          type="font/woff"
          crossOrigin=""
          href={asset("/fonts/conthrax-sb.woff")}
        />
        <link rel="preconnect" href="https://ik.imagekit.io" />
      </Head>
      <Component />
    </>
  );
}
