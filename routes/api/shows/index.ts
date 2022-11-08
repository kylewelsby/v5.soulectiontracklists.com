import { type Handler, Status } from "$fresh/server.ts";
import { contentType } from "$media_types";
import fetchTracklists from "@/utils/soulection/fetchTracklists.ts";

export const handler: Handler<never> = async (_req, _ctx) => {
  const shows = await fetchTracklists();

  if (shows === null) {
    return new Response(null, { status: Status.InternalServerError });
  }

  console.log('API CALLED', shows.length);
  return Response.json(shows, {
    headers: { "content-type": contentType(".json") },
  });
};
