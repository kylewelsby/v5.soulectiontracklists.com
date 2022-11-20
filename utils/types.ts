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
  links: string;
  data: string;
  media: ShowLinks;
  chaptersCollection: List<Chapter>;
  chapters: [Chapter];
};

export type Chapter = {
  id: string;
  title: string;
  markersCollection: List<Marker>;
  markers: [Marker?];
};

export type Marker = {
  timestamp: string;
  position: number;
  tracks?: Track;
  rawTrack: string;
};

export type Track = {
  id: string;
  title: string;
  slug: string;
  artists: Artist;
  artwork: string;
};

export type Artist = {
  id: string;
  title: string;
  slug: string;
};

export interface PreloadData {
  readonly [key: string]:
    | Show
    | readonly Show[]
    | undefined;
}
