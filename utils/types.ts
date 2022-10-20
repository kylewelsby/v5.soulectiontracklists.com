export interface List<T> {
  edges: [T];
}

export interface Show {
  node: {
    title: string;
    tags: [number];
  }
}
