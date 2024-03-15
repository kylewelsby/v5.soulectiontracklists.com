import { AppProps } from "$fresh/server.ts";
import { asset, Head, Partial } from "$fresh/runtime.ts";

import SiteNav from "@/components/Site/SiteNav.tsx";
import PlayerWidget from "@/islands/PlayerWidget.tsx";

export default function App({ Component }: AppProps) {
  return (
    <html lang="en-US">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Soulection</title>
        <link rel="icon" href={asset("/favicon.ico")} type="image/x-icon" />
        <link rel="preconnect" href="https://ik.imagekit.io" />
      </head>
      <body f-client-nav>
        <SiteNav />
        <Partial name="body">
          <Component />
        </Partial>
         <PlayerWidget />
      </body>
    </html>
  );
}
