import { type Handler } from "$fresh/server.ts";
import { fetchMedia, fetchShowLinks } from "@/utils/soulection/fetchShow.ts";
export const handler: Handler<never> = async (_req, ctx) => {
  const { slug } = ctx.params;

  const links = await fetchShowLinks(slug);
  const media = await fetchMedia(links.soundcloud);
  return Response.json({
    media: media,
  });
};
