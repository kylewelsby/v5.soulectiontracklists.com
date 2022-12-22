import { type Handler, Status } from "$fresh/server.ts";
import fetchTrack from "@/utils/soulection/fetchTrack.ts";

export const handler: Handler<never> = async (_req, ctx) => {
  const { id } = ctx.params;
  const track = await fetchTrack(id);
  if (track === null) {
    return new Response(null, { status: Status.NotFound });
  }
  return Response.json(track);
};
