export interface List<T> {
  edges: [T];
}

export interface ShowLinks {
  soundcloud: string;
  appleMusic: string;
  mixcloud: string;
}

export interface ShowNode {
  node: Show;
}

export type Show = {
  title: string;
  tags: [number];
  artwork: string;
  slug: string;
  links: string;
  data: string;
  media: {
    [key: string]: string;
  };
};

export interface PreloadData {
  readonly [key: string]:
    | Show
    | readonly Show[]
    | undefined;
}
