import { useMemo } from 'preact/hooks';

const PLATFORMS = [
  'amazon-music',
  'amazonmusic',
  'apple-music',
  'applemusic',
  'audiomack',
  'bandcamp',
  'beatport',
  'bing',
  'deezer',
  'discogs',
  'discord',
  'duckduckgo',
  'facebook',
  'google',
  'instagram',
  'lastfm',
  'mixcloud',
  'soundcloud',
  'spotify',
  'tidal',
  'traxsource',
  'twitch',
  'twitter',
  'youtube',
  'youtube-music',
  'youtubemusic',
  'vimeo',
].sort();

interface IconProps {
  icon: string;
  filled?: boolean; // Make filled optional
}

export default function SiteIcon({icon, filled}: IconProps){

  const filledDefault = useMemo(() => {
    if (filled === undefined) {
      return PLATFORMS.concat([]).includes(icon.toLowerCase().replace(/-/g, ''));
    } else {
      return filled || false;
    }
  }, [icon, filled]);

  const fill = filledDefault ? 'currentColor' : 'none';

  const stroke = filledDefault ? 'none' : 'currentColor';

  const d = useMemo(() => {
    switch (icon) {
      case 'search':
        return 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z';
      case 'share':
        return 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z';
      case 'arrow-right':
        return 'M14 5l7 7m0 0l-7 7m7-7H3';
      case 'arrow-left':
        return 'M10 19l-7-7m0 0l7-7m-7 7h18';
      case 'arrow-down':
        return 'M19 14l-7 7m0 0l-7-7m7 7V3';
      case 'menu':
        return 'M4 6h16M4 12h16M4 18h16';
      case 'chevron-down':
        return 'M19 9l-7 7-7-7';
      case 'chevron-up':
        return 'M5 15l7-7 7 7';
      case 'badge-check':
        return 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z';
      case 'heart':
        return 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z';
      case 'email':
        return 'M8 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2m-4-1v8m0 0 3-3m-3 3L9 8m-5 5h2.586a1 1 0 0 1 .707.293l2.414 2.414a1 1 0 0 0 .707.293h3.172a1 1 0 0 0 .707-.293l2.414-2.414a1 1 0 0 1 .707-.293H20';
      // Add cases for other icons as needed
      default:
        return '';
    }
  }, [icon]);


  return (
    d !== '' ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="100%"
        height="100%"
        fill={fill}
        stroke={stroke}
        d={d}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={d}
        />
      </svg>
    ) : null
  )
}
