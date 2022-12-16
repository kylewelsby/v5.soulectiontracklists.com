import { type Handler, Status } from "$fresh/server.ts";
import { contentType } from "$media_types";
import fetchTracklists from "@/utils/soulection/fetchTracklists.ts";
import { __interactionsRef } from "https://esm.sh/v99/@types/scheduler@0.16.2/X-YS9yZWFjdDpwcmVhY3QvY29tcGF0/tracing.d.ts";

export const handler: Handler<never> = async (req, _ctx) => {
  const url = new URL(req.url);
  const tagsRaw = url.searchParams.get("tag") || "";

  const shows = await fetchTracklists(tagsRaw);

  if (shows === null) {
    return new Response(null, { status: Status.InternalServerError });
  }

  console.log("API CALLED", req.url);
  return Response.json(shows, {
    headers: { "content-type": contentType(".json") },
  });
};
