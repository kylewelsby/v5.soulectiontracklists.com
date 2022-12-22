export interface List<T> {
  edges: [Node<T>];
  pageInfo: PageInfo;
}
export interface PageInfo {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  endCursor: string;
  startCursor: string;
}

export interface ShowLinks {
  soundcloud: string;
  appleMusic: string;
  mixcloud: string;
}

export interface Node<T> {
  node: T;
  cursor: string;
}

export type Show = {
  title: string;
  tags: [number];
  artwork: string;
  slug: string;
  links: ShowLinks;
  data: string;
  media: ShowLinks;
  content: string;
  excerpt?: string;
  location: string;
  published_at: string;
  chapters: Chapter[];
};

export type Chapter = {
  id: string;
  title: string;
  content: string;
  artwork: string;
  markers?: Marker[];
};

export type Marker = {
  id: string;
  timestamp: string;
  position: number;
  msTimestamp: number;
  tracks?: Track;
  rawTrack: string;
};

export type Track = {
  id: string;
  title: string;
  slug: string;
  artists: Artist;
  artwork: string;
  playCount: number;
  shows: Show[];
  links: TrackLink[];
};

export type TrackLink = {
  id: number;
  platform: string;
  href: string;
  artwork: string;
  lastCheckedAt: string;
};

export type Artist = {
  id: string;
  title: string;
  slug: string;
};

export type SoundcloudTranscoding = {
  url: string;
  preset: string;
  duration: number;
  snipped: boolean;
  format: SoundcloudTranscodingFormat;
  quality: string;
};

export type SoundcloudTranscodingFormat = {
  protocol: string;
  mime_type: string;
};

export interface PreloadData {
  readonly [key: string]:
    | Show
    | Track
    | readonly Show[]
    | undefined;
}
