import { PageProps } from "$fresh/server.ts";

import { asset, Partial } from "$fresh/runtime.ts";

import SiteNav from "@/components/Site/SiteNav.tsx";
import PlayerWidget from "@/islands/PlayerWidget.tsx";

export default function App({ Component, state }: PageProps) {
  return (
    <html lang="en-US" class="dark">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Soulection</title>
        <link rel="icon" href={asset("/favicon.ico")} type="image/x-icon" />
        <link rel="preconnect" href="https://ik.imagekit.io" />
        <link rel="stylesheet" href="/styles.css" />
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
