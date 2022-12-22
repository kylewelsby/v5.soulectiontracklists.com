import { MiddlewareHandlerContext } from "$fresh/server.ts";

export async function handler(_req: Request, ctx: MiddlewareHandlerContext) {
  const resp = await ctx.next();
  resp.headers.set("Accept-CH", "dpr,width,save-data");
  resp.headers.set("Vary", "Accept, Accept-Encoding, CH");
  return resp;
}
