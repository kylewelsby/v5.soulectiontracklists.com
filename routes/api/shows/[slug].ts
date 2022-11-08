import { type Handler, Status } from "$fresh/server.ts";
import { contentType } from "$media_types";
import fetchShow from "@/utils/soulection/fetchShow.ts";

export const handler: Handler<never> = async (_req, ctx) => {
  const { slug } = ctx.params;
  const show = await fetchShow(slug);
  if (show === null) {
    return new Response(null, { status: Status.NotFound });
  }
  console.log("API CALLED", show);
  return Response.json(show, {
    headers: { "content-type": contentType(".json") },
  });
};
