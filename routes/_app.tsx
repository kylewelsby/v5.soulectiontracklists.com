import { AppProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <meta http-equiv="Accept-CH" content="dpr,width,save-data" />
        <title>Soulection</title>
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
