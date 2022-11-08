import { graphql } from "@/utils/supabase.ts";
import { List, Show, ShowNode } from "@/utils/types.ts";

interface Data {
  showsCollection: List<ShowNode>;
}

const q = `{
  showsCollection(first: 100, orderBy: [{published_at: DescNullsLast}]) {
    edges {
      node {
        title
        published_at
        tags
        slug
        artwork
      }
    }
  }
}`;

export default async function fetchTracklists(): Promise<Show[]> {
  const data = await graphql<Data>(q);
  return data.showsCollection.edges
    .filter((edge) => edge.node.tags.includes(15))
    .map((edge) => edge.node);
}
