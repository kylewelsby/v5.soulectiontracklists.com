import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";
import { List, Show } from "../utils/types.ts";
import { graphql } from "../utils/supabase.ts";

const q = `{
  showsCollection(first: 10, orderBy: [{published_at: DescNullsLast}]) {
    edges {
      node {
        title
        published_at
        profile
        tags
        chaptersCollection {
          edges {
            node {
              title
            }
          }
        }
      }
    }
  }
}`;

interface Data {
  showsCollection: List<Show>;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const data = await graphql<Data>(q);
    return ctx.render(data);
  },
};

function ShowCard(props: { show: Show }) {
  const { show } = props;
  return (
    <a class="flex">{show.node.title}</a>
  )
}

export default function Home(ctx: PageProps<Data>) {
  const { data } = ctx;
  const shows = data.showsCollection.edges.filter((edge) => edge.node.tags.includes(15));
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        {shows.map((show) => <ShowCard show={show} />)}
        <Counter start={3} />
      </div>
    </>
  );
}

