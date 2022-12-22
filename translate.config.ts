import type { Options } from "freshlate";

export default {
  selfURL: import.meta.url,
  languages: {
    en: {
      platforms: {
        "amazonMusic": "Amazon Music",
        "appleMusic": "Apple Music",
        "audioMack": "Audiomack",
        "audius": "Audius",
        "bandcamp": "Bandcamp",
        "beatport": "Beatport",
        "bing": "Bing",
        "deezer": "Deezer",
        "discogs": "Discogs",
        "duckduckgo": "DuckDuckGo",
        "google": "Google",
        "googleplaymusic": "Google Play Music",
        "gumroad": "Gumroad (Download)",
        "lastfm": "Last.fm",
        "soundcloud": "SoundCloud",
        "spotify": "Spotify",
        "tidal": "Tidal",
        "traxsource": "Traxsource",
        "youtube": "YouTube",
        "youtubeMusic": "YouTube Music",
        "vimeo": "Vimeo",
      },
    },
  },
  // fetch_url: "/api/translation/{{lang}}",
  fallback_language: "en",
} as unknown as Options;
